document.addEventListener('DOMContentLoaded', () => {
    
    // --- Preloader ---
    const loader = document.getElementById('loader');
    const loaderBar = document.querySelector('.loader-bar');
    const loaderPct = document.querySelector('.loader-percentage');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress > 100) progress = 100;
        
        loaderBar.style.width = `${progress}%`;
        loaderPct.textContent = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                // Trigger reveals after loader hides
                setTimeout(revealElements, 500);
            }, 800);
        }
    }, 150);

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if device supports hover (desktop)
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Fast follow for dot
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Smooth follow for outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
        
        // Hover effects on links/buttons
        const interactables = document.querySelectorAll('a, button, .project-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(0, 255, 102, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    } else {
        // Hide custom cursor on mobile
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }

    // --- Glitch Effect for Title ---
    const glitchTitle = document.querySelector('.glitch-title');
    const originalText = glitchTitle.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    
    glitchTitle.addEventListener('mouseover', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            glitchTitle.textContent = originalText.split('')
                .map((char, index) => {
                    if(index < iterations) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
            
            if(iterations >= originalText.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    });

    // --- Dynamic Roles ---
    const roles = document.querySelectorAll('.dynamic-roles .role');
    let currentRole = 0;
    
    setInterval(() => {
        roles[currentRole].classList.remove('active');
        currentRole = (currentRole + 1) % roles.length;
        roles[currentRole].classList.add('active');
    }, 3000);

    // --- Scroll Reveal ---
    const reveals = document.querySelectorAll('.reveal');
    
    function revealElements() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealElements);

    // --- Navbar Scroll Effect ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Matrix Background Effect ---
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for( let x = 0; x < columns; x++ ) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff66';
        ctx.font = fontSize + 'px monospace';
        
        for( let i = 0; i < drops.length; i++ ) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if( drops[i] * fontSize > canvas.height && Math.random() > 0.975 )
                drops[i] = 0;
            
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
