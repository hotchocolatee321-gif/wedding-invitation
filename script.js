document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Animate On Scroll (AOS) animations
    AOS.init({
        duration: 1000,
        once: true
    });

    const enterBtn = document.getElementById("enter-btn");
    const landingPage = document.getElementById("landing-page");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    
    // Select the main hero background video inside the main app content
    const bgVideo = document.querySelector("#main-content video");

    // Click "Enter" -> Fade out royal landing view, load main cards and auto-start video
    enterBtn.addEventListener("click", () => {
        // Play primary background music loop
        bgMusic.play().catch(err => console.log("Music play blocked:", err));
        
        // Add a smooth fade-and-scale-down layout transition
        landingPage.classList.add("opacity-0", "scale-95", "pointer-events-none");
        
        // Reveal the main card content block
        mainContent.classList.remove("hidden");
        
        // Instantly play the main hero background video from the start frame
        if (bgVideo) {
            bgVideo.currentTime = 0;
            bgVideo.play().catch(e => console.log("Background video play error:", e));
        }

        setTimeout(() => {
            mainContent.classList.add("opacity-100");
            // Refresh AOS triggers to fire layouts flawlessly
            AOS.refresh();
            // Start ambient luxury flakes falling loop
            initPetalFall();
        }, 150);
    });

    // Countdown Logic calibrated to July 30, 2026
    const weddingDate = new Date("July 30, 2026 09:00:00").getTime();

    const runCountdown = () => {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff <= 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d < 10 ? "0" + d : d;
        document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
        document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
        document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
    };
    setInterval(runCountdown, 1000);

    // Falling Luxury Petals Loop
    function initPetalFall() {
        const canvas = document.getElementById("petal-canvas");
        const ctx = canvas.getContext("2d");
        
        let w = canvas.width = canvas.parentElement.offsetWidth;
        let h = canvas.height = canvas.parentElement.offsetHeight;

        const petalCount = 25;
        const petals = Array.from({ length: petalCount }, () => ({
            x: Math.random() * w,
            y: Math.random() * h - h,
            r: Math.random() * 3 + 2,
            speedY: Math.random() * 1.2 + 0.6,
            speedX: Math.random() * 0.6 - 0.3
        }));

        function animate() {
            ctx.clearRect(0, 0, w, h);
            petals.forEach(p => {
                ctx.beginPath();
                ctx.fillStyle = 'rgba(223, 186, 115, 0.25)'; // Champagne ambient flakes
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();

                p.y += p.speedY;
                p.x += p.speedX;

                if (p.y > h) {
                    p.y = -10;
                    p.x = Math.random() * w;
                }
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
});