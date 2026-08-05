<div align="center">

# 💊 RxMate

**دستیار هوشمند نسخه و آزمایش | AI-Powered Prescription & Lab Test Assistant**

</div>

<!-- 📸 لینک اسکرین‌شات سایت را اینجا جایگزین کن -->
<!-- 📸 Replace the placeholder below with your site's screenshot link -->
![RxMate Screenshot](YOUR_SCREENSHOT_URL_HERE)

---

<div dir="rtl">

## 🇮🇷 فارسی

### دربارهٔ پروژه

**RxMate** یک رابط کاربری تک‌صفحه‌ای است که به کاربر امکان می‌دهد متن نسخه یا شرح‌حال پزشکی را وارد کند — یا حتی تصویر اسکن‌شدهٔ نسخه را آپلود کند — و یک تحلیل اولیهٔ ساختاریافته از یک مدل زبانی هوش مصنوعی دریافت کند.

پروژه با تمرکز بر طراحی مدرن، رسپانسیو، و تجربهٔ کاربری شبیه یک «پد نسخهٔ» واقعی ساخته شده است.

### ✨ امکانات

- طراحی تک‌صفحه‌ای، مدرن و کاملاً رسپانسیو (فایل‌های HTML، CSS و JS جدا)
- دریافت متن نسخه/آزمایش از کاربر
- آپلود اختیاری تصویر نسخهٔ اسکن‌شده — تصویر مستقیماً توسط یک مدل چندوجهی (Vision) تحلیل می‌شود
- اتصال به بک‌اند جنگو و ارسال درخواست به مدل‌های زبانی رایگان از طریق OpenRouter
- فال‌بک خودکار بین چند مدل رایگان برای مقابله با محدودیت نرخ (Rate Limit)
- نمایش پاسخ ساختاریافتهٔ مدل (خلاصهٔ شرح‌حال، تحلیل اولیه، پیشنهاد، هشدارها)

### 🛠 پشته فناوری

| بخش | فناوری |
|---|---|
| فرانت‌اند | HTML5, CSS3, Vanilla JavaScript |
| بک‌اند | Django |
| مدل زبانی | OpenRouter API (مدل‌های رایگان متنی و Vision) |

### 🚀 راه‌اندازی پروژه

```bash
# کلون کردن پروژه
git clone https://github.com/YOUR_USERNAME/rxmate.git
cd rxmate

# ساخت و فعال‌سازی محیط مجازی
python -m venv venv
source venv/bin/activate      # ویندوز: venv\Scripts\activate

# نصب پکیج‌ها
pip install -r requirements.txt
```

### 🔑 تنظیم متغیرهای محیطی

یک فایل `.env` بساز (یا متغیر محیطی را مستقیم در سیستم ست کن):

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

کلید رایگان را از اینجا بساز: https://openrouter.ai/settings/keys

### ▶️ اجرای پروژه

```bash
python manage.py migrate
python manage.py runserver
```

سپس در مرورگر به آدرس زیر برو:
```
http://127.0.0.1:8000/
```

### ⚠️ سلب مسئولیت

این ابزار صرفاً یک نمونهٔ آموزشی/توسعه‌ای است. پاسخ‌های تولیدشده توسط هوش مصنوعی **جایگزین تشخیص، ویزیت و نظر پزشک متخصص نیستند**. هرگونه تصمیم دارویی یا درمانی باید با تأیید پزشک انجام شود.

</div>

---

## 🇬🇧 English

### About the Project

**RxMate** is a single-page interface that lets users enter a prescription or medical history as text — or upload a scanned image of a prescription — and receive a structured, preliminary analysis from an AI language model.

The project focuses on a modern, fully responsive design with a UX inspired by a real prescription pad.

### ✨ Features

- Single-page, modern, fully responsive design (separate HTML, CSS, and JS files)
- Text input for prescriptions / lab test requests
- Optional scanned prescription image upload — read directly by a multimodal (vision) model
- Django backend connected to free language models via OpenRouter
- Automatic fallback across multiple free models to handle rate limits
- Structured model response display (summary, preliminary analysis, suggestions, warnings)

### 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Django |
| LLM Provider | OpenRouter API (free text & vision models) |

### 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/rxmate.git
cd rxmate

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 🔑 Environment Variables

Create a `.env` file (or set the environment variable directly on your system):

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Get a free API key here: https://openrouter.ai/settings/keys

### ▶️ Running the Project

```bash
python manage.py migrate
python manage.py runserver
```

Then open your browser at:
```
http://127.0.0.1:8000/
```

### ⚠️ Disclaimer

This tool is a learning/development prototype. AI-generated responses **are not a substitute for diagnosis, examination, or advice from a licensed physician**. Any medical or medication decision must be confirmed by a doctor.

---

<div align="center">

Made with 💊 and ☕

</div>
