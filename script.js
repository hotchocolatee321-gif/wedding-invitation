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

    // Click "Enter" -> Blur & Zoom transition to main layout, auto-start loops
    enterBtn.addEventListener("click", () => {
        // Play primary background music loop
        if (bgMusic) {
            bgMusic.play().catch(err => console.log("Music play blocked:", err));
        }
        
        // Apply cinematic blur, minor scaling zoom, and fade transition
        landingPage.style.filter = "blur(15px)";
        landingPage.style.transform = "scale(1.08)";
        landingPage.style.opacity = "0";
        landingPage.style.pointerEvents = "none";
        
        // Reveal the main content container halfway through the fade transition
        setTimeout(() => {
            mainContent.classList.remove("hidden");
            
            // Trigger background cinematic video clip
            if (bgVideo) {
                bgVideo.currentTime = 0;
                bgVideo.play().catch(e => console.log("Background video play error:", e));
            }

            // Smoothly ease in the opacity of the main section
            setTimeout(() => {
                mainContent.classList.add("opacity-100");
                // Refresh AOS positions to ensure smooth scrolling triggers
                AOS.refresh();
                // Start ambient champagne luxury flakes canvas falling loop
                initPetalFall();
            }, 50);

        }, 600); // 600ms matching perfectly with the middle frame of your 1200ms layout transition

        // Completely hide the landing element from DOM once the animation finishes
        setTimeout(() => {
            landingPage.style.display = "none";
        }, 1200);
    });

    // Countdown Logic calibrated to July 30, 2026
    const weddingDate = new Date("July 30, 2026 09:00:00").getTime();

    const runCountdown = () => {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff <= 0) {
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d < 10 ? "0" + d : d;
        document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
        document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
        document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
    };
    
    // Run instantly on load, then loop every second
    runCountdown();
    setInterval(runCountdown, 1000);

    // Falling Luxury Petals Canvas Animation Loop
    function initPetalFall() {
        const canvas = document.getElementById("petal-canvas");
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        
        // Track visual screen boundary so particles match mobile screen scales beautifully
        let w = canvas.width = canvas.parentElement.offsetWidth;
        let h = canvas.height = window.innerHeight; 

        // Handle dynamic adjustments for mobile screens turning sideways
        window.addEventListener('resize', () => {
            if(canvas.parentElement) {
                w = canvas.width = canvas.parentElement.offsetWidth;
                h = canvas.height = window.innerHeight;
            }
        });

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
                ctx.fillStyle = 'rgba(223, 186, 115, 0.25)'; // Champagne luxury flakes
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();

                p.y += p.speedY;
                p.x += p.speedX;

                // Loop particles seamlessly back to top once they exit the viewport base
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
