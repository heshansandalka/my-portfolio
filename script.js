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

// 4. Smooth Scroll with Navbar Offset
document.querySelectorAll('nav ul li a, a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 80;
        const offset = navHeight + 20;

        const rect = target.getBoundingClientRect();
        window.scrollTo({
            top: rect.top + window.scrollY - offset,
            behavior: 'smooth'
        });
    });
});

// 5. Navbar Scroll Effect & Active Link
const navbar = document.querySelector('nav');
const sections = document.querySelectorAll('section, #home');
const navLinks = document.querySelectorAll('nav ul li a');

// ✅ 
window.addEventListener('scroll', function() {
    // Scroll Effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Link Highlighting
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
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
    observer.observe(section);
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

function resizeBGCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGlassBackground();
}

function drawGlassBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(10, 16, 32, 0.98)');
    gradient.addColorStop(1, 'rgba(7, 11, 24, 1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeBGCanvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
drawGlassBackground();

// 8. Custom Cursor
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function(e) {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
    });

    document.querySelectorAll("a, button, .whatsapp-float").forEach(link => {
        link.addEventListener("mouseenter", () => {
            cursorOutline.classList.add("cursor-hover");
        });
        link.addEventListener("mouseleave", () => {
            cursorOutline.classList.remove("cursor-hover");
        });
    });
}

// 9. Back to Top Button
const backToTopButton = document.getElementById("backToTop");

window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

if (backToTopButton) {
    backToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// 10. Projects Data
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
        tech: ["PHP", "MySQL", "Bootstrap","Xampp","Firebase"],
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
        tech: ["React","HTML","xml", "CSS", "JS","Json","FireBase"],
        live: "https://hyperlocal-weather-impact-and-commu-three.vercel.app/login",
        github: "https://github.com/pabasaramalshi29-ai/Hyperlocal-Weather-Impact-and-Community-Alert-Web-App/tree/heshan",
        badge: "Live"
    },
    {
        "title": "Health & Wellness App",
        "description": "A modern mobile application built with Flutter for health tracking and wellness advice.",
        "image": "adf7.png",
        "tech": ["Flutter", "Dart", "Android"],
        "live": "https://drive.google.com/file/d/1gcYqMEAHE1Awct3BgcX4MwwPzu2wpuQq/view?usp=drivesdk",
        "github": "https://github.com/heshansandalka/health_wellness_app",
        "badge": "APK Install"
    }
];

const projectContainer = document.getElementById('project-list');

function displayProjects() {
    projectContainer.innerHTML = projects.map((project, index) => {
        const liveButtonLabel = project.badge === "APK Install" ? "APK Install" : "Live Demo";
        const liveButtonIcon = project.badge === "APK Install" ? "fa-download" : "fa-rocket";
        const liveButtonHtml = (project.live && project.live !== "#") 
            ? `<a href="${project.live}" target="_blank" class="link-btn demo">
                   <i class="fa-solid ${liveButtonIcon}"></i> ${liveButtonLabel}
               </a>`
            : `<button class="link-btn demo" style="background: #ef4444; cursor: not-allowed; border: none;">
                   <i class="fa-solid fa-clock"></i> Pending
               </button>`;

        return `
        <div class="glass-card" data-aos="fade-up" data-aos-delay="${index * 200}">
            <div class="card-image">
                <img src="${project.image}" alt="${project.title}">
                <span class="badge">${project.badge}</span>
            </div>
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="card-links">
                    <a href="${project.github}" target="_blank" class="link-btn github">
                        <i class="fa-brands fa-github"></i> Code
                    </a>
                    ${liveButtonHtml}
                </div>
            </div>
        </div>
        `;
    }).join('');
}

displayProjects();

// 11. Typing Animation
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

// 12. Education Date Auto-Update
document.addEventListener("DOMContentLoaded", function() {
    const dateSpan = document.getElementById('edu-date');
    const currentYear = new Date().getFullYear();
    
    if (currentYear > 2024) {
        dateSpan.innerText = `2024 - ${currentYear}`;
    }
});

// 13. Online/Offline Status
function checkConnection() {
    const badge = document.getElementById('status-badge');
    const text = document.getElementById('status-text');
    
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

// 14. Split Main Words (white & green)
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

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