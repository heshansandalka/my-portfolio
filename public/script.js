// 1. Enable AOS & Typed.js on Load
document.addEventListener('DOMContentLoaded', () => {
    if (window.AOS) {
        AOS.init({
            duration: 700,
            once: true,
            easing: 'ease-in-out',
        });
    }

    if (window.Typed && document.querySelector('.typing-text')) {
        new Typed('.typing-text', {
            strings: [
                'Software Engineering Student',
                'Web Developer',
                'UI/UX Enthusiast',
                'AI Content Creator'
            ],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
        });
    }

    // Auto-update Education Date
    const dateSpan = document.getElementById('edu-date');
    const currentYear = new Date().getFullYear();
    if (dateSpan && currentYear > 2024) {
        dateSpan.innerHTML = `<i class="fa-solid fa-calendar-days"></i> 2024 - ${currentYear}`;
    }
});

// 2. EmailJS Config & Contact Form
if (window.emailjs) {
    emailjs.init("zEDA7fLYScvC8_Nnt");
}

const contactForm = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        sendBtn.innerHTML = "Sending... <i class='fa-solid fa-spinner fa-spin'></i>";
        sendBtn.style.opacity = "0.7";
        sendBtn.disabled = true;

        emailjs.sendForm('service_mrtx1k4', 'template_7e6ruba', this)
            .then(() => {
                alert('Thank you! Your message was successfully received..');
                sendBtn.innerHTML = "Send Message <i class='fa-solid fa-paper-plane'></i>";
                sendBtn.style.opacity = "1";
                sendBtn.disabled = false;
                contactForm.reset();
            }, (error) => {
                alert('Sorry, the message could not be sent. Please try again.');
                console.error('EmailJS Error:', error);
                sendBtn.innerHTML = "Send Message <i class='fa-solid fa-paper-plane'></i>";
                sendBtn.style.opacity = "1";
                sendBtn.disabled = false;
            });
    });
}

// 3. Active Nav Link Highlighting (Intersection Observer)
const sections = document.querySelectorAll('section, #home');
const navLinks = document.querySelectorAll('nav ul li a');

if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));
}

// 4. Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    document.querySelectorAll('#nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });
}

// 5. Throttled Back-to-Top Scroll Listener
const backToTopButton = document.getElementById("backToTop");
let scrollTicking = false;

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                backToTopButton.style.display = scrollY > 300 ? "flex" : "none";
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// 6. Online/Offline Status Check
function checkConnection() {
    const badge = document.getElementById('status-badge');
    const text = document.getElementById('status-text');
    if (!badge || !text) return;

    if (navigator.onLine) {
        badge.className = 'status-badge online';
        text.innerText = 'Active';
    } else {
        badge.className = 'status-badge offline';
        text.innerText = 'Offline';
    }
}

window.addEventListener('online', checkConnection);
window.addEventListener('offline', checkConnection);
checkConnection();