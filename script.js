// 1. AOS (Animate On Scroll) ආරම්භ කිරීම
// මින් වෙබ් අඩවිය පහළට scroll කරන විට elements ලස්සනට දිස්වේ.
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000, // animation එක තත්පර 1ක් පුරා සිදුවේ
        once: true,     // එක් වරක් පමණක් animation එක පෙන්වයි
        easing: 'ease-in-out',
    });
});

// 2. EmailJS Config (ඔබේ Gmail එකට පණිවිඩ ලැබීමට)
(function() {
    // ඔබේ EmailJS Public Key එක මෙතැනට ඇතුළත් කරන්න
    emailjs.init("zEDA7fLYScvC8_Nnt"); 
})();

// 3. Contact Form එක පාලනය කිරීම
const contactForm = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // පිටුව refresh වීම වළක්වයි

        // Button එකේ පෙනුම වෙනස් කිරීම
        sendBtn.innerHTML = "Sending... <i class='fa-solid fa-spinner fa-spin'></i>";
        sendBtn.style.opacity = "0.7";
        sendBtn.disabled = true;

        // EmailJS හරහා පණිවිඩය යැවීම
        // YOUR_SERVICE_ID සහ YOUR_TEMPLATE_ID නිවැරදිව ඇතුළත් කරන්න
        emailjs.sendForm('service_mrtx1k4', 'template_7e6ruba', this)
            .then(() => {
                alert('Thank you! Your message was successfully received..');
                sendBtn.innerHTML = "Send Message <i class='fa-solid fa-paper-plane'></i>";
                sendBtn.style.opacity = "1";
                sendBtn.disabled = false;
                contactForm.reset(); // Form එක හිස් කරයි
            }, (error) => {
                alert('Sorry, the message could not be sent. Please try again.');
                console.error('EmailJS Error:', error);
                sendBtn.innerHTML = "Send Message <i class='fa-solid fa-paper-plane'></i>";
                sendBtn.style.opacity = "1";
                sendBtn.disabled = false;
            });
    });
}

// 4. Smooth Scrolling (Navigation links සඳහා)
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 5. Navbar එක Scroll කරන විට වෙනස් වීම (Glassmorphism effect)
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        nav.style.background = "rgba(15, 23, 42, 0.95)";
        nav.style.top = "0";
        nav.style.width = "100%";
        nav.style.left = "0";
        nav.style.right = "0";
        nav.style.borderRadius = "0";
    } else {
        nav.style.background = "rgba(15, 23, 42, 0.8)";
        nav.style.top = "20px";
        nav.style.width = "90%";
        nav.style.left = "5%";
        nav.style.borderRadius = "50px";
    }
});

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

// අයිකනය ක්ලික් කළ විට මෙනුව පෙන්වන්න/සඟවන්න
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // අයිකනය 'X' (Close) බවට පත් කිරීමට (Optional)
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// ලින්ක් එකක් ක්ලික් කළ පසු මෙනුව ඉබේම වැසීමට
document.querySelectorAll('#nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');

let particlesArray;
let mouse = {
    x: null,
    y: null,
    radius: 150 // මවුස් එක වටා බලපෑම ඇති වන ප්‍රමාණය
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle එකක ස්වභාවය
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // Particle එක ඇඳීම
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#38bdf8'; // Particles වල පාට (Sky Blue)
        ctx.fill();
    }
    // තිරය ඇතුළේ චලනය පාලනය
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Particles සමූහය සෑදීම
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        let color = '#38bdf8';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// එකිනෙක යා කරමින් ඉරි ඇඳීම (Connect function)
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(56, 189, 248, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// ඇනිමේෂන් එක පවත්වාගෙන යාම
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Window එක resize කරන විට වෙනස් වීම
window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

// මුලින්ම පණ ගැන්වීම
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
init();
animate();

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // තිත මවුස් එකත් එක්කම යයි
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // රවුම මඳක් ප්‍රමද වී smooth ලෙස පස්සෙන් එයි
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

// හැම link එකක් සහ WhatsApp button එකක් උඩටම mouse එක ගියපු ගමන් රවුම ලොකු වෙන්න
const links = document.querySelectorAll("a, button, .whatsapp-float");

links.forEach(link => {
    link.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("cursor-hover");
    });
    link.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-hover");
    });
});

// Smooth Scrolling සඳහා
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const backToTopButton = document.getElementById("backToTop");

// පිටුව 300px වඩා පහළට Scroll කළහොත් බොත්තම පෙන්වන්න
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// බොත්තම ක්ලික් කළ විට ඉහළටම යන්න
backToTopButton.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

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
        description: "Full-stack Employee Project Management system built with PHP and MySQL.",
        image: "adf2.png",
        tech: ["PHP", "MySQL", "Bootstrap"],
        live: "#",
        github: "https://github.com/heshansandalka/EPM-System",
        badge: "PHP"
    },
    {
        title: "Simple chatBot",
        description: "Chatbot with Python   .",
        image: "weather-app-screenshot.png",
        tech: ["Python"],
        live: "#",
        github: "https://github.com/heshansandalka/chatbot-in-Python",
        badge: "React"
    }
];

const projectContainer = document.getElementById('project-list');

function displayProjects() {
    projectContainer.innerHTML = projects.map((project, index) => `
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
                    <a href="${project.live}" target="_blank" class="link-btn demo">
                        <i class="fa-solid fa-rocket"></i> Live Demo
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Function එක call කිරීම
displayProjects();