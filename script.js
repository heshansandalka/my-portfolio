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

// Starry Background Animation
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const starCount = 150; // තරු ගණන (අවශ්‍ය නම් වැඩිකරන්න)

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// තරු නිර්මාණය කිරීම
class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speed = Math.random() * 0.2; // තරු චලනය වන වේගය
        this.opacity = Math.random();
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initStars() {
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

initStars();
animate();
