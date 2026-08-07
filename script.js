// 1. Enable AOS (Animate On Scroll)
// This makes the elements look nice when you scroll down the website.
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 700, // Reduced animation duration for better performance.
        once: true,    // Show the animation only once
        easing: 'ease-in-out',
    });
});

// 2. EmailJS Config (to receive messages in your Gmail)
(function() {
    //Enter your EmailJS Public Key here.
    emailjs.init("zEDA7fLYScvC8_Nnt"); 
})();

// 3. Controlling the Contact Form
const contactForm = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents page refresh

// Changing the appearance of the button
        sendBtn.innerHTML = "Sending... <i class='fa-solid fa-spinner fa-spin'></i>";
        sendBtn.style.opacity = "0.7";
        sendBtn.disabled = true;

      // Sending the message via EmailJS
// Enter YOUR_SERVICE_ID and YOUR_TEMPLATE_ID correctly
        emailjs.sendForm('service_mrtx1k4', 'template_7e6ruba', this)
            .then(() => {
                alert('Thank you! Your message was successfully received..');
                sendBtn.innerHTML = "Send Message <i class='fa-solid fa-paper-plane'></i>";
                sendBtn.style.opacity = "1";
                sendBtn.disabled = false;
                contactForm.reset(); // Clears the form
            }, (error) => {
                alert('Sorry, the message could not be sent. Please try again.');
                console.error('EmailJS Error:', error);
                sendBtn.innerHTML = "Send Message <i class='fa-solid fa-paper-plane'></i>";
                sendBtn.style.opacity = "1";
                sendBtn.disabled = false;
            });
    });
}

// 4. Smooth Scrolling (for navigation links)
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 5. The navbar changes when scrolling (Glassmorphism effect)
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

// Show/hide the menu when the icon is clicked
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Change the icon to 'X' (Close) (Optional)
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// To automatically close the menu and make the icon 3 lines again after clicking a link
document.querySelectorAll('#nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
       // 1. Close the menu
        navMenu.classList.remove('active');
        
        // 2. Change the icon back to 3 bars (fa-bars)
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});
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

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

   // The dot moves with the mouse.
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

  // The circle will be slightly curved and follow smoothly.
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

// The circle will get bigger as you hover your mouse over every link and WhatsApp button.
const links = document.querySelectorAll("a, button, .whatsapp-float");

links.forEach(link => {
    link.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("cursor-hover");
    });
    link.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-hover");
    });
});

//for Smooth Scrolling 
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

// Show button if page scrolls down more than 300px
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Go to the top when the button is clicked
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
    }

    ,
    {
        title: "Sky Plains",
        description: "The natural beauty of Horton Plains.",
        image: "adf4.jpeg",
        tech: ["HTML", "CSS", "JS"],
        live: "https://heshansandalka.github.io/Sky-Plains/",
        github: "https://github.com/heshansandalka/Sky-Plains",
        badge: "Live"
    }

    ,
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
        
        // The part that determines the Live Button
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

//Calling the function
displayProjects();

// Typing Animation Setup
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

document.addEventListener("DOMContentLoaded", function() {
    const dateSpan = document.getElementById('edu-date');
    const currentYear = new Date().getFullYear();
    
  // The year will automatically change from January 1st of each year
    if (currentYear > 2024) {
        dateSpan.innerText = `2024 - ${currentYear}`;
    }
});

const statusBadge = document.getElementById('status-badge');
const statusText = document.getElementById('status-text');

function checkConnection() {
    const badge = document.getElementById('status-badge');
    const text = document.getElementById('status-text');
    
    if (navigator.onLine) {
        badge.className = 'status-badge online'; //Match CSS
        text.innerText = 'Active';
    } else {
        badge.className = 'status-badge offline';
        text.innerText = 'Offline';
    }
}
// Fires when the page loads and when the connection changes.
window.addEventListener('online', checkConnection);
window.addEventListener('offline', checkConnection);

//Check at startup
checkConnection();