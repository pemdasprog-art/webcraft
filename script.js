// تبديل القائمة على الهاتف
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.querySelector('.mobile-menu-btn');
    const icon = document.getElementById('menu-icon');
    menu.classList.toggle('active');
    btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    
    if (menu.classList.contains('active')) {
        icon.innerHTML = `
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        `;
    } else {
        icon.innerHTML = `
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        `;
    }
}

// تأثير الشريط العائم عند التمرير
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// عدادات ديناميكية للأرقام
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('ar-EG');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('ar-EG');
        }
    }, 30);
}

// مراقب التقاطع للعدادات
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value').forEach(el => {
    counterObserver.observe(el);
});

// إرسال نموذج الاتصال
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    // بسيط التحقق
    if (!name || !message) {
        alert('يرجى ملء جميع الحقول');
        return;
    }
    
    // صيغة الرسالة للواتساب
    const whatsappMessage = `الاسم : ${name}\nالرساله : ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // رقم الواتساب بالصيغة الدولية (01115636125 -> 201115636125)
    const whatsappNumber = '201115636125';
    
    // رابط الواتساب
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // فتح الواتساب
    window.open(whatsappUrl, '_blank');
    
    // إظهار الإشعار
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    // إخفاء بعد 3 ثواني
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.classList.remove('show', 'hide');
        }, 300);
    }, 3000);
    
    // إعادة تعيين النموذج
    form.reset();
});

// تمرير سلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || !document.querySelector(href)) return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // إغلاق الهاتف في القائمة
        const menu = document.getElementById('mobileMenu');
        if (menu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// مراقب التقاطع للعناصر
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// مراقبة العناصر القابلة للأنيميشن
document.querySelectorAll('.service-card, .stat-card, .pricing-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// الاستجابة للشاشات الصغيرة
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const menu = document.getElementById('mobileMenu');
        if (menu.classList.contains('active')) {
            toggleMenu();
        }
    }
});