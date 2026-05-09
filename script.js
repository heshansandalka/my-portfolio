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
