(function() {
    const navHtml = `
<nav id="main-nav">
    <div class="logo">Sandalka</div>
    <div class="menu-icon" id="menu-toggle">
        <i class="fa-solid fa-bars"></i>
    </div>
    <ul id="nav-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>
`;

    const cursorHtml = `
<div class="cursor-dot"></div>
<div class="cursor-outline"></div>
`;

    function inject() {
        const placeholder = document.getElementById('nav-placeholder');
        if (placeholder) {
            // inject cursor if not present
            if (!document.querySelector('.cursor-dot')) {
                placeholder.insertAdjacentHTML('beforebegin', cursorHtml);
            }
            placeholder.innerHTML = navHtml;
        } else {
            // insert cursor then nav at top
            if (!document.querySelector('.cursor-dot')) {
                document.body.insertAdjacentHTML('afterbegin', cursorHtml + navHtml);
            } else {
                document.body.insertAdjacentHTML('afterbegin', navHtml);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
    } else {
        inject();
    }
})();
