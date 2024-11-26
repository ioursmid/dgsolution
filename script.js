// Crie um novo arquivo script.js e adicione:

// Contador para números
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    
    const countUp = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(counter), 20);
        } else {
            counter.innerText = target;
        }
    };

    // Inicia o contador quando o elemento está visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});

// Navbar scroll behavior
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Função para enviar mensagem para o WhatsApp
function sendWhatsAppMessage(formData) {
    const phone = '5517999754390';
    const message = `*Nova Mensagem do Site*\n\n*Nome:* ${formData.nome}\n*Email:* ${formData.email}\n*Telefone:* ${formData.telefone}\n*Assunto:* ${formData.assunto}\n*Mensagem:* ${formData.mensagem}`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Handler do formulário de contato
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (this.checkValidity()) {
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            assunto: document.getElementById('assunto').value,
            mensagem: document.getElementById('mensagem').value
        };

        sendWhatsAppMessage(formData);
        this.reset();
        
        // Fecha o modal se estiver aberto
        const modal = bootstrap.Modal.getInstance(document.getElementById('contatoModal'));
        if (modal) {
            modal.hide();
        }
    }
    
    this.classList.add('was-validated');
});

// Promo Banner Handler
document.addEventListener('DOMContentLoaded', () => {
    const promoBanner = document.getElementById('promoBanner');
    const closePromoBanner = document.getElementById('closePromoBanner');
    const navbar = document.querySelector('.navbar');

    if (closePromoBanner) {
        closePromoBanner.addEventListener('click', () => {
            promoBanner.classList.add('hidden');
            navbar.classList.add('banner-hidden');
            document.body.style.paddingTop = '0';
        });
    }

    // Smooth Scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de números mais suave
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Aplica a animação suave aos contadores
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});

// Loading Handler
window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const preloader = document.getElementById('preloader');
    
    if (loadingOverlay && preloader) {
        setTimeout(() => {
            loadingOverlay.classList.add('hide');
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                loadingOverlay.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Back to Top Handler
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Cookie Consent Handler
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookies = document.getElementById('acceptCookies');

// Verifica se já aceitou os cookies
if (cookieConsent && !localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
        cookieConsent.style.transform = 'translateY(0)';
    }, 1000);
}

// Handler para aceitar cookies
if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.style.transform = 'translateY(100%)';
        setTimeout(() => {
            cookieConsent.style.display = 'none';
        }, 500); // Espera a animação terminar antes de esconder
    });
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Form Enhancement
const form = document.getElementById('contatoForm');
if (form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Salva o valor no localStorage
        input.addEventListener('input', () => {
            localStorage.setItem(`form_${input.id}`, input.value);
        });

        // Restaura o valor do localStorage
        const savedValue = localStorage.getItem(`form_${input.id}`);
        if (savedValue) {
            input.value = savedValue;
        }
    });

    // Limpa localStorage após envio bem-sucedido
    form.addEventListener('submit', () => {
        inputs.forEach(input => {
            localStorage.removeItem(`form_${input.id}`);
        });
    });
}

// Dark Mode Handler
const darkModeToggle = document.getElementById('darkModeToggle');
const theme = localStorage.getItem('theme');

if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        darkModeToggle.checked = true;
    }
}

darkModeToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight * 100}%`;
    scrollProgress.style.transform = `scaleX(${totalScroll / windowHeight})`;
});

// Floating Navigation Active State
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.floating-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Enhanced Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Notification System
class NotificationSystem {
    constructor() {
        this.container = document.getElementById('notificationContainer');
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = this.getIcon(type);
        
        notification.innerHTML = `
            <i class="bi ${icon} me-2"></i>
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
        `;

        this.container.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => {
                this.container.removeChild(notification);
            }, 500);
        }, duration);
    }

    getIcon(type) {
        switch(type) {
            case 'success':
                return 'bi-check-circle-fill';
            case 'error':
                return 'bi-x-circle-fill';
            default:
                return 'bi-info-circle-fill';
        }
    }
}

// Inicializar sistema de notificações
const notifications = new NotificationSystem();

// Exemplo de uso
document.getElementById('contatoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (!this.checkValidity()) {
        notifications.show('Por favor, preencha todos os campos corretamente.', 'error');
        event.stopPropagation();
    } else {
        const formData = {
            nome: this.querySelector('#nome').value,
            email: this.querySelector('#email').value,
            mensagem: this.querySelector('#mensagem').value
        };

        // Mensagem para WhatsApp
        const message = `*Novo contato do site*\n\nNome: ${formData.nome}\nEmail: ${formData.email}\nMensagem: ${formData.mensagem}`;
        
        // Abre WhatsApp com a mensagem formatada
        openWhatsApp(message);
        
        notifications.show('Mensagem enviada com sucesso! Redirecionando para o WhatsApp...', 'success');
        this.reset();
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('contatoModal'));
        modal.hide();
    }
    
    this.classList.add('was-validated');
});

// Partner Logos Animation
const partnerLogos = document.querySelectorAll('.partner-logo');
partnerLogos.forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        partnerLogos.forEach(otherLogo => {
            if (otherLogo !== this) {
                otherLogo.style.opacity = '0.3';
            }
        });
    });

    logo.addEventListener('mouseleave', function() {
        partnerLogos.forEach(otherLogo => {
            otherLogo.style.opacity = '0.6';
        });
    });
});

// Blog Cards Hover Effect
document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.blog-image img').style.transform = 'scale(1.1)';
    });

    card.addEventListener('mouseleave', function() {
        this.querySelector('.blog-image img').style.transform = 'scale(1)';
    });
});

// Adicione uma função para abrir o WhatsApp com mensagem personalizada
function openWhatsApp(message) {
    const phone = '5517999754390';
    const text = encodeURIComponent(message || 'Olá! Gostaria de saber mais sobre seus serviços de landing page.');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

// Typed Text Effect
const texts = ['Convertem', 'Impressionam', 'Vendem'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector('.typed-text').textContent = letter;
    if (letter.length === currentText.length) {
        setTimeout(() => {
            index = 0;
            count++;
        }, 2000);
    }
    setTimeout(type, 200);
}

document.addEventListener('DOMContentLoaded', () => {
    type();
}); 