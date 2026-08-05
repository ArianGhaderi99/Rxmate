const rxInput      = document.getElementById('rx-input');
const rxMeta        = document.getElementById('rx-meta');
const charCountEl   = document.getElementById('char-count');
const clearBtn      = document.getElementById('clear-btn');
const submitBtn     = document.getElementById('submit-btn');

const uploadBox        = document.getElementById('upload-box');
const rxImageInput     = document.getElementById('rx-image');
const uploadEmpty       = document.getElementById('upload-empty');
const uploadPreview     = document.getElementById('upload-preview');
const uploadPreviewImg  = document.getElementById('upload-preview-img');
const uploadRemoveBtn   = document.getElementById('upload-remove');

const reportEmpty   = document.getElementById('report-empty');
const reportContent = document.getElementById('report-content');
const reportBody    = document.getElementById('report-body');
const reportTime    = document.getElementById('report-time');
const reportActions = document.getElementById('report-actions');
const copyBtn       = document.getElementById('copy-btn');

const toastEl       = document.getElementById('toast');

// تبدیل اعداد لاتین به فارسی برای نمایش شمارشگر
function toPersianDigits(num) {
  const fa = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return String(num).replace(/[0-9]/g, d => fa[d]);
}

// ---- شمارشگر کاراکتر ----
function updateCharCount() {
  charCountEl.textContent = toPersianDigits(rxInput.value.length);
}
rxInput.addEventListener('input', updateCharCount);
updateCharCount();

// ---- پاک کردن فرم ----
clearBtn.addEventListener('click', () => {
  rxInput.value = '';
  rxMeta.value = '';
  updateCharCount();
  resetImageUpload();
  rxInput.focus();
});

// ---- بارگذاری تصویر نسخهٔ اسکن‌شده ----
function showImagePreview(file) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('لطفاً یک فایل تصویری انتخاب کنید');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadPreviewImg.src = e.target.result;
    uploadEmpty.hidden = true;
    uploadPreview.hidden = false;
  };
  reader.readAsDataURL(file);
}

function resetImageUpload() {
  rxImageInput.value = '';
  uploadPreviewImg.src = '';
  uploadPreview.hidden = true;
  uploadEmpty.hidden = false;
}

uploadBox.addEventListener('click', (e) => {
  if (e.target === uploadRemoveBtn) return;
  rxImageInput.click();
});

rxImageInput.addEventListener('change', () => {
  if (rxImageInput.files && rxImageInput.files[0]) {
    showImagePreview(rxImageInput.files[0]);
  }
});

uploadRemoveBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  resetImageUpload();
});

['dragover', 'dragenter'].forEach(evt => {
  uploadBox.addEventListener(evt, (e) => {
    e.preventDefault();
    uploadBox.classList.add('dragover');
  });
});

['dragleave', 'drop'].forEach(evt => {
  uploadBox.addEventListener(evt, (e) => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
  });
});

uploadBox.addEventListener('drop', (e) => {
  const file = e.dataTransfer.files && e.dataTransfer.files[0];
  if (file) {
    rxImageInput.files = e.dataTransfer.files;
    showImagePreview(file);
  }
});

// ---- نمایش نوتیفیکیشن کوچک ----
let toastTimer = null;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

// ---- قالب زمان گزارش ----
function formatTimestamp() {
  const d = new Date();
  return d.toLocaleString('fa-IR', {
    hour: '2-digit', minute: '2-digit',
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
}


async function sendToModel(prescriptionText) {
  const meta = rxMeta.value.trim();
  const formData = new FormData();

  formData.append("text", prescriptionText);
  formData.append("meta", meta);


  if (rxImageInput.files && rxImageInput.files[0]) {
    formData.append("image", rxImageInput.files[0]);
  }

  const response = await fetch("/api/analyze/", {
    method: "POST",
    body: formData, 
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || "خطا در ارتباط با سرور");
  }

  const data = await response.json();
  return data.result;
}



submitBtn.addEventListener('click', async () => {
  const text = rxInput.value.trim();
  if (!text) {
    rxInput.focus();
    showToast('لطفاً ابتدا متن نسخه را وارد کنید');
    return;
  }

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    const result = await sendToModel(text);

    reportEmpty.hidden = true;
    reportContent.hidden = false;
    reportActions.hidden = false;
    reportTime.textContent = `ثبت‌شده در ${formatTimestamp()}`;
    reportBody.textContent = result;
  } catch (err) {
    showToast('خطا در دریافت پاسخ مدل');
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});


copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(reportBody.textContent);
    showToast('پاسخ کپی شد');
  } catch (err) {
    showToast('کپی خودکار ممکن نشد');
  }
});


rxInput.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    submitBtn.click();
  }
});
