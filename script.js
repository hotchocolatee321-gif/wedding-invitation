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

    // Track chosen RSVP option globally
    window.attendSelected = null;

    // Click "Enter" -> Blur & Zoom transition to main layout, auto-start loops
    if (enterBtn) {
        enterBtn.addEventListener("click", () => {
            // Play primary background music loop
            if (bgMusic) {
                bgMusic.play().catch(err => console.log("Music play blocked:", err));
            }
            
            // Apply cinematic blur, minor scaling zoom, and fade transition
            if (landingPage) {
                landingPage.style.filter = "blur(15px)";
                landingPage.style.transform = "scale(1.08)";
                landingPage.style.opacity = "0";
                landingPage.style.pointerEvents = "none";
            }
            
            // Reveal the main content container halfway through the fade transition
            setTimeout(() => {
                if (mainContent) {
                    mainContent.classList.remove("hidden");
                }
                
                // Trigger background cinematic video clip
                if (bgVideo) {
                    bgVideo.currentTime = 0;
                    bgVideo.play().catch(e => console.log("Background video play error:", e));
                }

                // Smoothly ease in the opacity of the main section
                setTimeout(() => {
                    if (mainContent) {
                        mainContent.classList.add("opacity-100");
                    }
                    // Refresh AOS positions to ensure smooth scrolling triggers
                    AOS.refresh();
                    // Start ambient champagne luxury flakes canvas falling loop
                    initPetalFall();
                }, 50);

            }, 600); // 600ms matching perfectly with the middle frame of your 1200ms layout transition

            // Completely hide the landing element from DOM once the animation finishes
            setTimeout(() => {
                if (landingPage) {
                    landingPage.style.display = "none";
                }
            }, 1200);
        });
    }

    // Countdown Logic calibrated to July 30, 2026
    const weddingDate = new Date("July 30, 2026 17:00:00").getTime();

    const runCountdown = () => {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (diff <= 0) {
            if (daysEl) daysEl.innerText = "00";
            if (hoursEl) hoursEl.innerText = "00";
            if (minutesEl) minutesEl.innerText = "00";
            if (secondsEl) secondsEl.innerText = "00";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = d < 10 ? "0" + d : d;
        if (hoursEl) hoursEl.innerText = h < 10 ? "0" + h : h;
        if (minutesEl) minutesEl.innerText = m < 10 ? "0" + m : m;
        if (secondsEl) secondsEl.innerText = s < 10 ? "0" + s : s;
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

    // Global Functions for HTML Click Handlers
    window.selectAttend = function(option) {
        attendSelected = option;
        const optYes = document.getElementById('optYes');
        const optNo = document.getElementById('optNo');
        
        if (option === 'yes') {
            if (optYes) optYes.classList.add('selected');
            if (optNo) optNo.classList.remove('selected');
        } else {
            if (optNo) optNo.classList.add('selected');
            if (optYes) optYes.classList.remove('selected');
        }
    };

    window.submitRSVP = function() {
        const nameInput = document.getElementById('rsvpName');
        const name = nameInput ? nameInput.value.trim() : "";
        const submitBtn = document.querySelector('.rsvp-submit');

        if (!name) {
            alert('Please enter your full name.');
            return;
        }
        if (!attendSelected) {
            alert('Please select your attendance.');
            return;
        }

        // Disable button visually during request processing
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        // Prepare structured data context payload
        const rsvpData = {
            name: name,
            attending: attendSelected === 'yes' ? 'Yes, Attending' : 'No, Regretfully Decline'
        };

        // Submit form data asynchronously straight to Formspree
        fetch('https://formspree.io/f/xdavkzry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(rsvpData)
        })
        .then(response => {
            if (response.ok) {
                // Reveal thank-you screen block dynamically
                const formEl = document.getElementById('rsvpForm');
                const successEl = document.getElementById('rsvpSuccess');
                if (formEl) formEl.style.display = 'none';
                if (successEl) successEl.style.display = 'block';
            } else {
                alert('Something went wrong. Please try submitting again.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send RSVP';
                }
            }
        })
        .catch(error => {
            console.error('Submission error:', error);
            alert('Failed to send RSVP. Please check your internet connection.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send RSVP';
            }
        });
    };
});
