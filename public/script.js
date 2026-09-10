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


// Hero Image  Mouse Movement 3D Effect 
const heroRight = document.querySelector('.hero-right');
const heroImage = document.querySelector('.hero-image');

if (heroRight && heroImage) {
    heroRight.addEventListener('mousemove', (e) => {
        const rect = heroRight.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const rotateX = -y * 25; 
        const rotateY = x * 25;

        heroImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        heroImage.style.animation = 'none'; // Mouse  float animation 
    });

    heroRight.addEventListener('mouseleave', () => {
        heroImage.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        heroImage.style.transition = `transform 0.5s ease`;
        heroImage.style.animation = 'float 4s ease-in-out infinite'; //  float 
    });

    heroRight.addEventListener('mouseenter', () => {
        heroImage.style.transition = `transform 0.1s ease-out`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const ratingCard = document.getElementById('ratingCard');
    const ratingCount = document.getElementById('ratingCount');

    //  Save  Rating 
    const savedRating = localStorage.getItem('clientRating');
    if (savedRating) {
        ratingCount.textContent = parseFloat(savedRating).toFixed(1);
    }

    ratingCard.addEventListener('click', () => {
        let currentRating = parseFloat(ratingCount.textContent);

        //  5.0  0.1 
        if (currentRating < 5.0) {
            currentRating = Math.min(5.0, currentRating + 0.1);
            
            // UI  update ක
            ratingCount.textContent = currentRating.toFixed(1);
            
            // Browser  LocalStorage  save 
            localStorage.setItem('clientRating', currentRating.toFixed(1));

            // Click  Animation 
            ratingCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                ratingCard.style.transform = 'scale(1)';
            }, 150);
        }
    });
});

// 7. Luxury Glowing Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    // Only activate on non-touch devices with fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let dot = document.getElementById('cursorDot');
    let outline = document.getElementById('cursorOutline');

    if (!dot) {
        dot = document.createElement('div');
        dot.id = 'cursorDot';
        dot.className = 'cursor-dot';
        dot.setAttribute('aria-hidden', 'true');
        document.body.appendChild(dot);
    }

    if (!outline) {
        outline = document.createElement('div');
        outline.id = 'cursorOutline';
        outline.className = 'cursor-outline';
        outline.setAttribute('aria-hidden', 'true');
        document.body.appendChild(outline);
    }

    dot.style.pointerEvents = 'none';
    outline.style.pointerEvents = 'none';

    let mouseX = -100;
    let mouseY = -100;
    let outlineX = -100;
    let outlineY = -100;
    let isVisible = false;

    // Instant tracking for center dot with GPU acceleration
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            dot.style.opacity = '1';
            outline.style.opacity = '1';
            outlineX = mouseX;
            outlineY = mouseY;
            isVisible = true;
        }

        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    // Smooth physics loop for follower outline ring
    function renderCursor() {
        if (isVisible) {
            // Lerp with responsive damping factor
            outlineX += (mouseX - outlineX) * 0.16;
            outlineY += (mouseY - outlineY) * 0.16;
            outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
        }
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Mouse Down / Up interactions
    window.addEventListener('mousedown', () => {
        dot.classList.add('cursor-active');
        outline.classList.add('cursor-active');
    });

    window.addEventListener('mouseup', () => {
        dot.classList.remove('cursor-active');
        outline.classList.remove('cursor-active');
    });

    // Click Ripple effect
    window.addEventListener('click', (e) => {
        if (!isVisible) return;
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        document.body.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 550);
    });

    // Mouse Leave / Enter window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        outline.style.opacity = '0';
        isVisible = false;
    });

    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        outline.style.opacity = '1';
        isVisible = true;
    });

    // Dynamic hover states for all clickable & interactive elements
    const interactiveSelector = `
        a, 
        button, 
        input[type="submit"], 
        input[type="button"], 
        .rating-card, 
        .menu-icon, 
        .whatsapp-float, 
        #backToTop, 
        .project-card, 
        .skill-card, 
        .service-card, 
        .filter-btn, 
        .hero-btn, 
        .social-icon, 
        .cyber-social-row,
        .cyber-send-btn,
        [role="button"]
    `;

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
            dot.classList.add('cursor-hover');
            outline.classList.add('cursor-hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector)) {
            dot.classList.remove('cursor-hover');
            outline.classList.remove('cursor-hover');
        }
    });
});

