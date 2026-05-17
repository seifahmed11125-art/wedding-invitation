document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const introScreen = document.getElementById('intro-screen');
    const openBtn = document.getElementById('open-btn');
    const mainContent = document.getElementById('main-content');
    const waxSeal = document.getElementById('wax-seal');

    // --- Opening Invitation Logic ---
    openBtn.addEventListener('click', () => {
        // Phase 1: Wax seal melts/disappears and flap opens
        introScreen.classList.add('opening');
        
        // Phase 2: Card slides up and everything expands
        setTimeout(() => {
            introScreen.classList.add('revealing');
        }, 800);

        // Phase 3: Transition to main content
        setTimeout(() => {
            introScreen.classList.add('fade-out');
            mainContent.classList.remove('hidden');
            document.body.classList.add('main-visible');
            
            // Allow scroll after animation
            document.body.style.overflowY = 'auto';
            
            // Remove intro from DOM after fade out
            setTimeout(() => {
                introScreen.style.display = 'none';
            }, 1200);
        }, 2200);
    });

    // Disable scroll initially
    document.body.style.overflowY = 'hidden';

    // --- Countdown Logic ---
    const weddingDate = new Date('July 30, 2026 20:30:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown').innerHTML = "<h3 class='monogram'>The Big Day is Here!</h3>";
        }
    };

    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // --- Intersection Observer for Scroll Reveals ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));
});
