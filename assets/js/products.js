function showToast(message, type = 'info') {
    // بررسی وجود کانتینر Toast
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // ایجاد Toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // آیکون مناسب بر اساس نوع
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="ri-check-line"></i>';
            break;
        case 'error':
            icon = '<i class="ri-error-warning-line"></i>';
            break;
        case 'warning':
            icon = '<i class="ri-alert-line"></i>';
            break;
        case 'info':
        default:
            icon = '<i class="ri-information-line"></i>';
            break;
    }
    
    // ساختار داخلی Toast
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">${message}</div>
        <button class="toast-close"><i class="ri-close-line"></i></button>
    `;
    
    // افزودن به کانتینر
    toastContainer.appendChild(toast);
    
    // نمایش با انیمیشن
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // رویداد بستن
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        closeToast(toast);
    });
    
    // بستن خودکار پس از 5 ثانیه
    setTimeout(() => {
        closeToast(toast);
    }, 5000);
}

/**
 * بستن Toast
 */
function closeToast(toast) {
    // حذف با انیمیشن
    toast.classList.remove('show');
    
    setTimeout(() => {
        toast.remove();
        
        // حذف کانتینر در صورت خالی بودن
        const toastContainer = document.querySelector('.toast-container');
        if (toastContainer && !toastContainer.hasChildNodes()) {
            toastContainer.remove();
        }
    }, 300);
}

// وقتی صفحه کاملاً بارگذاری شد
window.addEventListener('load', function() {
    // پنهان کردن لودر صفحه
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        pageLoader.classList.add('hide');
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 500);
    }
    
    // انیمیشن ورود عناصر
    const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .fade-right, .fade-left');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}); 