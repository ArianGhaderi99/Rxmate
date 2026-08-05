from django.shortcuts import render
import json
import base64
import time
from openai import OpenAI, RateLimitError
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from base.prompts import SYSTEM_PROMPT


def simple_view(request):
    return render(request, "base/main.html")


client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)


TEXT_MODEL = "openai/gpt-oss-20b:free"


VISION_MODELS = [
    "google/gemma-4-31b-it:free",
    "google/gemma-4-26b-a4b-it:free",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
]

MAX_IMAGE_SIZE_MB = 8
ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}


@require_POST
@csrf_exempt
def analyze_prescription(request):

    try:
        user_text = request.POST.get("text", "").strip()
        meta = request.POST.get("meta", "")
        image_file = request.FILES.get("image")

        if not user_text and not image_file:
            return JsonResponse(
                {"error": "متن نسخه یا تصویر آن وارد نشده است"},
                status=400
            )

        prompt_text = f"شناسه یادداشت:\n{meta}\n\nمتن بیمار:\n{user_text or '(متنی وارد نشده — فقط تصویر ضمیمه شده است)'}"

        if image_file:
            if image_file.content_type not in ALLOWED_IMAGE_TYPES:
                return JsonResponse(
                    {"error": "فرمت تصویر پشتیبانی نمی‌شود (فقط JPG/PNG/WebP)"},
                    status=400
                )
            if image_file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024:
                return JsonResponse(
                    {"error": f"حجم تصویر بیشتر از {MAX_IMAGE_SIZE_MB} مگابایت است"},
                    status=400
                )

       
            image_bytes = image_file.read()
            b64_image = base64.b64encode(image_bytes).decode("utf-8")
            data_url = f"data:{image_file.content_type};base64,{b64_image}"

            user_message_content = [
                {"type": "text", "text": prompt_text},
                {"type": "image_url", "image_url": {"url": data_url}},
            ]
            primary_model = VISION_MODELS[0]
            fallback_models = VISION_MODELS
        else:
            user_message_content = prompt_text
            primary_model = TEXT_MODEL
            fallback_models = [TEXT_MODEL]

        try:
            response = client.chat.completions.create(
                model=primary_model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_message_content},
                ],
                extra_body={"models": fallback_models}, 
            )
        except RateLimitError:
            time.sleep(4)
            response = client.chat.completions.create(
                model=primary_model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_message_content},
                ],
                extra_body={"models": fallback_models},
            )

        result = response.choices[0].message.content

        return JsonResponse({"result": result})

    except RateLimitError:
        return JsonResponse(
            {"error": "مدل‌های رایگان در حال حاضر شلوغ هستند. چند لحظه دیگر دوباره امتحان کنید."},
            status=503
        )
    except Exception as e:
        print("ERROR:", e)
        return JsonResponse({"error": str(e)}, status=500)