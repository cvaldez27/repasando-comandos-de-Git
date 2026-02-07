// ===================================
// VARIABLES GLOBALES
// ===================================
let isAnnualPricing = false;

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offset = 80; // Altura del navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// PRICING TOGGLE
// ===================================
function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    const priceAmounts = document.querySelectorAll('.price-amount');
    
    if (toggle) {
        toggle.addEventListener('click', () => {
            isAnnualPricing = !isAnnualPricing;
            toggle.classList.toggle('active');
            
            priceAmounts.forEach(price => {
                const monthly = price.dataset.monthly;
                const yearly = price.dataset.yearly;
                
                if (isAnnualPricing) {
                    animateValue(price, parseInt(monthly), parseInt(yearly), 500);
                } else {
                    animateValue(price, parseInt(yearly), parseInt(monthly), 500);
                }
            });
        });
    }
}

// Animar cambio de precios
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===================================
// INTERSECTION OBSERVER - ANIMACIONES AL SCROLL
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const animatedElements = document.querySelectorAll(`
        .feature-card,
        .comparison-card,
        .flow-step,
        .use-case-card,
        .pricing-card,
        .faq-item
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
    
    // CSS para la animación
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// CONTADORES ANIMADOS
// ===================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const isMultiplier = text.includes('x');
    const target = parseInt(text.replace(/[^0-9]/g, ''));
    
    let current = 0;
    const increment = target / 60; // 1 segundo de animación
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            if (isPercentage) {
                element.textContent = target + '%';
            } else if (isMultiplier) {
                element.textContent = target + 'x';
            } else {
                element.textContent = target;
            }
            clearInterval(timer);
        } else {
            if (isPercentage) {
                element.textContent = Math.floor(current) + '%';
            } else if (isMultiplier) {
                element.textContent = Math.floor(current) + 'x';
            } else {
                element.textContent = Math.floor(current);
            }
        }
    }, 16);
}

// ===================================
// PARALLAX EFFECT EN HERO
// ===================================
function initParallax() {
    const hero = document.querySelector('.hero');
    const nebula = document.querySelector('.nebula-overlay');
    const stars = document.querySelector('.stars-background');
    
    if (hero && nebula && stars) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallaxSpeed = scrolled * 0.5;
                nebula.style.transform = `translateY(${parallaxSpeed}px)`;
                stars.style.transform = `translateY(${parallaxSpeed * 0.3}px)`;
            }
        });
    }
}

// ===================================
// MOUSE TRAIL EFFECT (EFECTO GALAXY)
// ===================================
function initMouseTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        // Crear efecto de partículas
        if (Math.random() > 0.95) {
            createParticle(trailX, trailY);
        }
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: particleFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// CSS para partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFade {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) translateY(-20px);
        }
    }
`;
document.head.appendChild(particleStyle);

// ===================================
// CARDS HOVER EFFECT (GLOW)
// ===================================
function initCardGlow() {
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .use-case-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Añadir CSS para el efecto
    const style = document.createElement('style');
    style.textContent = `
        .feature-card,
        .pricing-card,
        .use-case-card {
            position: relative;
            overflow: hidden;
        }
        
        .feature-card::after,
        .pricing-card::after,
        .use-case-card::after {
            content: '';
            position: absolute;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
            left: var(--mouse-x, 50%);
            top: var(--mouse-y, 50%);
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .feature-card:hover::after,
        .pricing-card:hover::after,
        .use-case-card:hover::after {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// TYPED TEXT EFFECT (OPCIONAL)
// ===================================
function initTypedText() {
    const typedElement = document.querySelector('.gradient-text');
    
    if (typedElement) {
        const text = typedElement.textContent;
        typedElement.textContent = '';
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < text.length) {
                typedElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50);
            }
        }
        
        // Iniciar después de un pequeño delay
        setTimeout(typeChar, 500);
    }
}

// ===================================
// LAZY LOADING DE IMÁGENES
// ===================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// PERFORMANCE: THROTTLE SCROLL EVENTS
// ===================================
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// ===================================
// INICIALIZACIÓN
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initPricingToggle();
    initScrollAnimations();
    initCounters();
    initParallax();
    initMouseTrail();
    initCardGlow();
    initLazyLoading();
    
    // Log de bienvenida
    console.log('%c🌌 BINAH Intelligence Network', 'color: #8B5CF6; font-size: 20px; font-weight: bold;');
    console.log('%cSistema de optimización de prompts cargado correctamente', 'color: #EC4899;');
});

// ===================================
// PREVENIR ERRORES EN PRODUCCIÓN
// ===================================
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.message);
    // Aquí podrías enviar el error a un servicio de tracking
});

// ===================================
// PERFORMANCE MONITORING
// ===================================
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
                console.log('⚡ Tiempo de carga:', entry.loadEventEnd - entry.startTime, 'ms');
            }
        }
    });
    
    perfObserver.observe({ entryTypes: ['navigation'] });
}

// ===================================
// EXPORTAR FUNCIONES (SI SE NECESITA)
// ===================================
window.BINAH = {
    version: '1.0.0',
    init: () => {
        console.log('BINAH system initialized');
    }
};
