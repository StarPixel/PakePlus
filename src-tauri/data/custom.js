window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
//非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug

// ========== 1. منع النقر بزر الماوس الأيمن ==========
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    console.log('Right click disabled');
    return false;
});

// ========== 2. منع اختصارات لوحة المفاتيح ==========
// قائمة بالاختصارات الممنوعة
const forbiddenKeys = [
    'F12',           // أدوات المطور
    'Control+s',     // حفظ الصفحة
    'Control+p',     // طباعة
    'Control+u',     // عرض المصدر
    'Control+Shift+i', // أدوات المطور (بديل)
    'Control+Shift+c', // فحص العنصر
    'Control+Shift+j', // وحدة التحكم
    'Control+r',     // إعادة التحميل (يمكن استثناؤه إذا أردت)
    'Control+Shift+r' // إعادة تحميل كاملة
];

document.addEventListener('keydown', (e) => {
    // بناء مفتاح الاختصار
    let key = '';
    if (e.ctrlKey) key += 'Control+';
    if (e.shiftKey) key += 'Shift+';
    if (e.altKey) key += 'Alt+';
    key += e.key;
    
    // منع الاختصارات الممنوعة
    if (forbiddenKeys.includes(key) || key === 'F12') {
        e.preventDefault();
        console.log(`Shortcut disabled: ${key}`);
        return false;
    }
    
    // منع F5 و Ctrl+F5 (إعادة التحميل - اختياري)
    if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
        e.preventDefault();
        console.log('Reload disabled');
        return false;
    }
});

// ========== 3. التحقق من الاتصال بالإنترنت وعرض صفحة بيضاء ==========
// دالة لعرض صفحة بيضاء
const showWhiteScreen = () => {
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#ffffff';
    document.documentElement.style.backgroundColor = '#ffffff';
    console.log('No internet connection - white screen displayed');
};

// التحقق من الاتصال عند تحميل الصفحة
if (!navigator.onLine) {
    showWhiteScreen();
}

// مراقبة حالة الاتصال
window.addEventListener('online', () => {
    console.log('Internet connection restored');
    // يمكنك إعادة تحميل الصفحة أو إظهار المحتوى مرة أخرى
    // window.location.reload(); // اختياري: إعادة تحميل الصفحة تلقائياً
});

window.addEventListener('offline', () => {
    console.log('Internet connection lost');
    showWhiteScreen();
});

// التحقق الدوري كل 5 ثوانٍ (اختياري للمزيد من الأمان)
setInterval(() => {
    if (!navigator.onLine) {
        showWhiteScreen();
    }
}, 5000);

// ========== 4. الكود الأصلي لمعالجة الروابط ==========
const hookClick = (e) => {
    const origin = e.target.closest('a');
    const isBaseTargetBlank = document.querySelector('head base[target="_blank"]');
    console.log('origin', origin, isBaseTargetBlank);
    
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault();
        console.log('handle origin', origin);
        location.href = origin.href;
    } else {
        console.log('not handle origin', origin);
    }
};

// تطبيق معالج النقر على جميع الروابط
document.addEventListener('click', hookClick);

فقط ازل التعليقات والفراغات