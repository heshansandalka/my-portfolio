// 1. Enable AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 700,
        once: true,
        easing: 'ease-in-out',
    });
});

// 2. EmailJS Config
(function() {
    emailjs.init("zEDA7fLYScvC8_Nnt");
})();

// 3. Contact Form
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

// 5. Navbar Scroll Effect & Active Link
const navbar = document.querySelector('nav');
const sections = document.querySelectorAll('section, #home');
const navLinks = document.querySelectorAll('nav ul li a');

// Active Link Highlighting
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

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
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// 6. Mobile Menu Toggle
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

// 7. Background Canvas
const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');

function drawGlassBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(10, 16, 32, 0.98)');
    gradient.addColorStop(1, 'rgba(7, 11, 24, 1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function resizeBGCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGlassBackground();
}

window.addEventListener('resize', resizeBGCanvas, { passive: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
drawGlassBackground();

// 8. Throttled scroll handling (navbar + back-to-top combined into 1 rAF loop)
const backToTopButton = document.getElementById("backToTop");
let scrollTicking = false;

function handleScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (backToTopButton) {
        backToTopButton.style.display = scrollY > 300 ? "block" : "none";
    }

    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(handleScroll);
        scrollTicking = true;
    }
}, { passive: true });

if (backToTopButton) {
    backToTopButton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// 9. Projects Data
const projects = [
    {
        title: "CineMate Movie App",
        description: "Modern movie browsing platform with a dark UI and responsive layouts.",
        image: "adf1.png",
        tech: ["HTML", "CSS", "JS"],
        live: "https://heshansandalka.github.io/CineMate/",
        github: "https://github.com/heshansandalka/CineMate",
        badge: "Live"
    },
    {
        title: "EPM System",
        description: "Full-stack Employee Project Management system built with PHP and MySQL. This Host in infinityFree web site",
        image: "adf5.png",
        tech: ["PHP", "MySQL", "Bootstrap", "Xampp", "Firebase"],
        live: "https://empsystem.42web.io",
        github: "https://github.com/heshansandalka/epm_system",
        badge: "Live"
    },
    {
        title: "Simple chatBot",
        description: "Chatbot with Python. This Host  in pythonanywhere.com",
        image: "adf3.png",
        tech: ["Python"],
        live: "https://sandalka.pythonanywhere.com/",
        github: "https://github.com/heshansandalka/chatbot-in-Python",
        badge: "Python"
    },
    {
        title: "Sky Plains",
        description: "The natural beauty of Horton Plains.",
        image: "adf4.jpeg",
        tech: ["HTML", "CSS", "JS"],
        live: "https://heshansandalka.github.io/Sky-Plains/",
        github: "https://github.com/heshansandalka/Sky-Plains",
        badge: "Live"
    },
    {
        title: "Hyperlocal Weather App(Group Project)",
        description: "Hyperlocal Weather Impact & Community Alert(Group  Project)",
        image: "adf6.png",
        tech: ["React", "HTML", "xml", "CSS", "JS", "Json", "FireBase"],
        live: "https://hyperlocal-weather-impact-and-commu-three.vercel.app/login",
        github: "https://github.com/pabasaramalshi29-ai/Hyperlocal-Weather-Impact-and-Community-Alert-Web-App/tree/heshan",
        badge: "Live"
    },
    {
        title: "Health & Wellness App",
        description: "A modern mobile application built with Flutter for health tracking and wellness advice.",
        image: "adf7.png",
        tech: ["Flutter", "Dart", "Android"],
        live: "https://drive.google.com/file/d/1gcYqMEAHE1Awct3BgcX4MwwPzu2wpuQq/view?usp=drivesdk",
        github: "https://github.com/heshansandalka/health_wellness_app",
        badge: "APK Install"
    }
];

const projectContainer = document.getElementById('project-list');

// 9a. Escape helper (also reused for text splitting below)
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// 9b. Render project cards — images use data-src so they only fetch
// when they actually scroll into view (real lazy-load, not just the
// loading="lazy" hint), which cuts initial network/image load time.
function displayProjects() {
    if (!projectContainer) return;

    projectContainer.innerHTML = projects.map((project, index) => {
        const liveButtonLabel = project.badge === "APK Install" ? "APK Install" : "Live Demo";
        const liveButtonIcon = project.badge === "APK Install" ? "fa-download" : "fa-rocket";
        const liveButtonHtml = (project.live && project.live !== "#")
            ? `<a href="${project.live}" target="_blank" rel="noopener" class="link-btn demo">
                   <i class="fa-solid ${liveButtonIcon}"></i> ${liveButtonLabel}
               </a>`
            : `<button class="link-btn demo" style="background: #ef4444; cursor: not-allowed; border: none;">
                   <i class="fa-solid fa-clock"></i> Pending
               </button>`;

        return `
        <div class="glass-card" data-aos="fade-up" data-aos-delay="${index * 200}">
            <div class="card-image">
                <img data-src="${project.image}" alt="${escapeHtml(project.title)}" width="400" height="250" class="lazy-img" decoding="async">
                <span class="badge">${project.badge}</span>
            </div>
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="card-links">
                    <a href="${project.github}" target="_blank" rel="noopener" class="link-btn github">
                        <i class="fa-brands fa-github"></i> Code
                    </a>
                    ${liveButtonHtml}
                </div>
            </div>
        </div>
        `;
    }).join('');

    initLazyImages();
    injectProjectsStructuredData();
}

// 9c. Real lazy-loading via IntersectionObserver — image only downloads
// when its card is ~200px from entering the viewport.
function initLazyImages() {
    const lazyImages = document.querySelectorAll('img.lazy-img[data-src]');

    if (!('IntersectionObserver' in window)) {
        // Fallback: just load everything immediately
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
        return;
    }

    const imgObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                obs.unobserve(img);
            }
        });
    }, { rootMargin: '200px 0px', threshold: 0.01 });

    lazyImages.forEach(img => imgObserver.observe(img));
}

// 9d. SEO: inject JSON-LD structured data for the project list so
// crawlers/SEO tools can read the portfolio content directly from the
// page <head>, without depending on the JS-rendered DOM being parsed.
function injectProjectsStructuredData() {
    if (document.getElementById('projects-jsonld')) return;

    const itemListElement = projects.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "CreativeWork",
            "name": project.title,
            "description": project.description,
            "url": project.live && project.live !== "#" ? project.live : project.github,
            "codeRepository": project.github,
            "keywords": project.tech.join(", ")
        }
    }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": itemListElement
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'projects-jsonld';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
}

displayProjects();

// 10. Typing Animation
document.addEventListener('DOMContentLoaded', () => {
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
});

// 11. Education Date Auto-Update
document.addEventListener("DOMContentLoaded", function() {
    const dateSpan = document.getElementById('edu-date');
    const currentYear = new Date().getFullYear();

    if (dateSpan && currentYear > 2024) {
        dateSpan.innerText = `2024 - ${currentYear}`;
    }
});

// 12. Online/Offline Status
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

// 13. Split Main Words (white & green)
function splitMainWords() {
    document.querySelectorAll('.main-word').forEach(el => {
        const text = el.textContent.trim();
        if (!text) return;

        let first = '';
        let second = '';
        const parts = text.split(/\s+/);
        if (parts.length > 1) {
            first = parts.shift();
            second = parts.join(' ');
        } else {
            const len = text.length;
            const mid = Math.ceil(len / 2);
            first = text.slice(0, mid);
            second = text.slice(mid);
        }

        el.innerHTML = `<span class="first">${escapeHtml(first)}</span> <span class="second">${escapeHtml(second)}</span>`;
    });
}

document.addEventListener('DOMContentLoaded', splitMainWords);