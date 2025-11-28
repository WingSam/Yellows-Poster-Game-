/* ========================================
   YELLOWS HOTDOG JACKPOT - ULTRA PREMIUM
   KFC-Level Game Logic
   ======================================== */

// ========================================
// PRIZE CONFIGURATION
// ========================================

const PRIZES = [
    { name: "Free Topping", color: "#FFD700", emoji: "🧀", weight: 25 },
    { name: "£1 Off Next Visit", color: "#FF6347", emoji: "💷", weight: 20 },
    { name: "£2 Off Next Visit", color: "#4CAF50", emoji: "💰", weight: 15 },
    { name: "Bonus Fries", color: "#FF9800", emoji: "🍟", weight: 15 },
    { name: "Free Drink", color: "#2196F3", emoji: "🥤", weight: 12 },
    { name: "Free Hotdog", color: "#E91E63", emoji: "🌭", weight: 8 },
    { name: "Secret Menu Item", color: "#9C27B0", emoji: "🤫", weight: 4 },
    { name: "VIP Gold Pass", color: "#FFC700", emoji: "👑", weight: 1 }
];

// ========================================
// GLOBAL STATE
// ========================================

let currentUser = {
    name: '',
    email: '',
    prizeWon: null,
    prizeCode: '',
    timestamp: null,
    location: null
};

let soundEnabled = true;
let isSpinning = false;

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initLoadingScreen();
    initFormHandlers();
    initWheelCanvas();
    initSoundToggle();
    captureLocationData();
    drawWheel();
    addInteractiveFeatures();
    initClickSounds();
});

// ========================================
// PARTICLE BACKGROUND
// ========================================

function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(255, 199, 0, ${Math.random() * 0.5})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========================================
// LOADING SCREEN
// ========================================

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.loading-progress-premium');

    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);

            setTimeout(() => {
                loadingScreen.classList.remove('active');
                loadingScreen.style.display = 'none';
                showScreen('landing-screen');

                // Try to play welcome voice
                if (typeof playVoice === 'function') {
                    playVoice('welcome');
                }
            }, 500);
        }

        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }, 200);
}

// ========================================
// SCREEN MANAGEMENT
// ========================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// ========================================
// FORM HANDLING
// ========================================

function initFormHandlers() {
    const form = document.getElementById('entry-form');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    if (!nameInput || !emailInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
        alert('Please fill in all fields');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    currentUser.name = name;
    currentUser.email = email;
    currentUser.timestamp = new Date().toISOString();

    // Display user name on spin screen
    const userNameDisplay = document.getElementById('user-name');
    if (userNameDisplay) {
        userNameDisplay.textContent = name.split(' ')[0];
    }

    // Transition to spin screen
    showScreen('spin-screen');

    // Try to play spinning voice
    if (typeof playVoice === 'function') {
        setTimeout(() => playVoice('spinning'), 500);
    }

    // Save to localStorage
    saveToLocalStorage();
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// WHEEL CANVAS
// ========================================

let wheelCanvas, wheelCtx;
let currentRotation = 0;

function initWheelCanvas() {
    wheelCanvas = document.getElementById('wheel');
    if (!wheelCanvas) return;

    wheelCtx = wheelCanvas.getContext('2d');

    // Make wheel responsive
    resizeWheel();
    window.addEventListener('resize', resizeWheel);

    const spinBtn = document.getElementById('spin-btn');
    if (spinBtn) {
        spinBtn.addEventListener('click', spinWheel);
    }
}

function resizeWheel() {
    if (!wheelCanvas) return;

    // Calculate responsive size
    const container = document.querySelector('.wheel-container-ultra');
    if (container) {
        const size = Math.min(container.offsetWidth, container.offsetHeight, 350);
        wheelCanvas.width = size;
        wheelCanvas.height = size;
        drawWheel();
    }
}

function drawWheel() {
    if (!wheelCanvas || !wheelCtx) return;

    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const radius = wheelCanvas.width / 2 - 10;

    wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

    const totalSlices = PRIZES.length;
    const sliceAngle = (2 * Math.PI) / totalSlices;

    PRIZES.forEach((prize, index) => {
        const startAngle = currentRotation + index * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        // Draw slice
        wheelCtx.beginPath();
        wheelCtx.moveTo(centerX, centerY);
        wheelCtx.arc(centerX, centerY, radius, startAngle, endAngle);
        wheelCtx.closePath();
        wheelCtx.fillStyle = prize.color;
        wheelCtx.fill();
        wheelCtx.strokeStyle = '#000';
        wheelCtx.lineWidth = 3;
        wheelCtx.stroke();

        // Draw text
        wheelCtx.save();
        wheelCtx.translate(centerX, centerY);
        wheelCtx.rotate(startAngle + sliceAngle / 2);
        wheelCtx.textAlign = 'center';
        wheelCtx.fillStyle = '#000';
        wheelCtx.font = 'bold 14px Poppins';
        wheelCtx.fillText(prize.emoji, radius * 0.7, 5);
        wheelCtx.font = 'bold 11px Poppins';
        wheelCtx.fillText(prize.name.substring(0, 12), radius * 0.7, 20);
        wheelCtx.restore();
    });

    // Draw center circle
    wheelCtx.beginPath();
    wheelCtx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    wheelCtx.fillStyle = '#FFC700';
    wheelCtx.fill();
    wheelCtx.strokeStyle = '#000';
    wheelCtx.lineWidth = 4;
    wheelCtx.stroke();

    // Draw center text
    wheelCtx.fillStyle = '#000';
    wheelCtx.font = 'bold 16px Poppins';
    wheelCtx.textAlign = 'center';
    wheelCtx.fillText('SPIN', centerX, centerY + 5);
}

function spinWheel() {
    if (isSpinning) return;

    isSpinning = true;
    const spinBtn = document.getElementById('spin-btn');
    if (spinBtn) {
        spinBtn.disabled = true;
        spinBtn.style.opacity = '0.6';
    }

    // Calculate winning prize based on weights
    const winningPrize = selectWeightedPrize();
    const winningIndex = PRIZES.indexOf(winningPrize);

    // Calculate rotation
    const spins = 5 + Math.random() * 3; // 5-8 full rotations
    const sliceAngle = (2 * Math.PI) / PRIZES.length;
    const targetAngle = (2 * Math.PI * spins) + (winningIndex * sliceAngle) + (sliceAngle / 2);

    const duration = 4000; // 4 seconds
    const startTime = Date.now();
    const startRotation = currentRotation;

    function animate() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        currentRotation = startRotation + (targetAngle * easeOut);
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            handleWin(winningPrize);
        }
    }

    animate();
}

function selectWeightedPrize() {
    const totalWeight = PRIZES.reduce((sum, prize) => sum + prize.weight, 0);
    let random = Math.random() * totalWeight;

    for (let prize of PRIZES) {
        random -= prize.weight;
        if (random <= 0) {
            return prize;
        }
    }

    return PRIZES[0]; // Fallback
}

// ========================================
// PRIZE HANDLING
// ========================================

function handleWin(prize) {
    currentUser.prizeWon = prize;
    currentUser.prizeCode = generatePrizeCode();

    // Display prize
    const prizeNameEl = document.getElementById('prize-name');
    const prizeCodeEl = document.getElementById('prize-code');

    if (prizeNameEl) {
        prizeNameEl.textContent = prize.emoji + ' ' + prize.name;
    }

    if (prizeCodeEl) {
        prizeCodeEl.textContent = currentUser.prizeCode;
    }

    // Save to localStorage
    saveToLocalStorage();

    // Show prize screen
    setTimeout(() => {
        showScreen('prize-screen');
        initConfetti();
        initFireworks();
        animateTrophyRain();
        animateStats();

        // Try to play winner voice
        if (typeof playVoice === 'function') {
            playVoice('winner', prize.name);
        }
    }, 1000);
}

function generatePrizeCode() {
    const prefix = 'YLW';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp.substring(0, 3)}${random}`;
}

// ========================================
// CONFETTI ANIMATION
// ========================================

function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const confettiCount = 150;
    const colors = ['#FFD700', '#FFC700', '#FF6347', '#4CAF50', '#2196F3', '#E91E63'];

    class Confetto {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    for (let i = 0; i < confettiCount; i++) {
        confetti.push(new Confetto());
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(c => {
            c.update();
            c.draw();
        });
        requestAnimationFrame(animateConfetti);
    }

    animateConfetti();
}

// ========================================
// FIREWORKS ANIMATION
// ========================================

function initFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.5;
            this.speed = 5;
            this.particles = [];
            this.exploded = false;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }

        update() {
            if (!this.exploded) {
                this.y -= this.speed;
                if (this.y <= this.targetY) {
                    this.explode();
                }
            } else {
                this.particles.forEach(p => p.update());
                this.particles = this.particles.filter(p => p.life > 0);
            }
        }

        explode() {
            this.exploded = true;
            for (let i = 0; i < 30; i++) {
                this.particles.push(new Particle(this.x, this.y, this.color));
            }
        }

        draw() {
            if (!this.exploded) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            } else {
                this.particles.forEach(p => p.draw());
            }
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.speedX = (Math.random() - 0.5) * 6;
            this.speedY = (Math.random() - 0.5) * 6;
            this.life = 100;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += 0.1; // Gravity
            this.life -= 2;
        }

        draw() {
            ctx.globalAlpha = this.life / 100;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function createFirework() {
        if (Math.random() < 0.05) {
            fireworks.push(new Firework());
        }
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        createFirework();

        fireworks.forEach((fw, index) => {
            fw.update();
            fw.draw();

            if (fw.exploded && fw.particles.length === 0) {
                fireworks.splice(index, 1);
            }
        });

        requestAnimationFrame(animateFireworks);
    }

    animateFireworks();
}

// ========================================
// TROPHY RAIN
// ========================================

function animateTrophyRain() {
    const container = document.querySelector('.trophy-rain');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const trophy = document.createElement('div');
            trophy.className = 'trophy-emoji';
            trophy.textContent = '🏆';
            trophy.style.left = Math.random() * 100 + '%';
            trophy.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(trophy);

            setTimeout(() => {
                trophy.remove();
            }, 4000);
        }, i * 200);
    }
}

// ========================================
// STATS ANIMATION
// ========================================

function animateStats() {
    const playersEl = document.getElementById('total-players');
    const prizesEl = document.getElementById('prizes-won');

    if (playersEl) {
        animateNumber(playersEl, 0, 1847, 2000);
    }

    if (prizesEl) {
        animateNumber(prizesEl, 0, 1203, 2000);
    }
}

function animateNumber(element, start, end, duration) {
    const startTime = Date.now();

    function update() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    update();
}

// ========================================
// SOUND TOGGLE
// ========================================

function initSoundToggle() {
    const soundBtn = document.getElementById('sound-toggle');

    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            const icon = soundBtn.querySelector('.sound-icon');
            if (icon) {
                icon.textContent = soundEnabled ? '🔊' : '🔇';
            }
        });
    }
}

// ========================================
// INSTAGRAM BUTTON
// ========================================

const instagramBtn = document.getElementById('instagram-btn');
if (instagramBtn) {
    instagramBtn.addEventListener('click', () => {
        window.open('https://www.instagram.com/yellows', '_blank');
    });
}

// ========================================
// SHARE BUTTON
// ========================================

const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'I just won at Yellows Hotdog Jackpot!',
            text: `I just won ${currentUser.prizeWon?.name || 'a prize'} at Yellows! 🌭🎰 Try your luck!`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            // Fallback - copy to clipboard
            const text = `${shareData.text} ${shareData.url}`;
            navigator.clipboard.writeText(text).then(() => {
                alert('Share text copied to clipboard!');
            });
        }
    });
}

// ========================================
// LOCATION TRACKING
// ========================================

function captureLocationData() {
    const urlParams = new URLSearchParams(window.location.search);
    currentUser.location = {
        source: urlParams.get('loc') || 'direct',
        campaign: urlParams.get('campaign') || 'default',
        referrer: document.referrer
    };

    // Try to get geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                currentUser.location.lat = position.coords.latitude;
                currentUser.location.lng = position.coords.longitude;
                saveToLocalStorage();
            },
            error => {
                console.log('Geolocation denied or unavailable');
            }
        );
    }
}

// ========================================
// LOCAL STORAGE
// ========================================

function saveToLocalStorage() {
    const allData = JSON.parse(localStorage.getItem('yellows_jackpot_data') || '{"users": [], "codes": []}');

    // Update or add user
    const existingIndex = allData.users.findIndex(u => u.email === currentUser.email);
    if (existingIndex >= 0) {
        allData.users[existingIndex] = currentUser;
    } else {
        allData.users.push(currentUser);
    }

    // Add prize code if exists
    if (currentUser.prizeCode) {
        allData.codes.push({
            code: currentUser.prizeCode,
            email: currentUser.email,
            prize: currentUser.prizeWon?.name,
            timestamp: currentUser.timestamp,
            redeemed: false
        });
    }

    localStorage.setItem('yellows_jackpot_data', JSON.stringify(allData));
}

// ========================================
// VOICE INTEGRATION (Optional)
// ========================================

// This function will be called if elevenlabs-config.js provides it
if (typeof window.playVoice === 'undefined') {
    window.playVoice = function(type, prizeName) {
        // Fallback - no voice
        console.log(`Voice: ${type}`, prizeName);
    };
}

// ========================================
// INTERACTIVE FEATURES - MAXIMUM ENGAGEMENT
// ========================================

function addInteractiveFeatures() {
    // Logo click animation and easter egg
    const logo = document.querySelector('.logo-image-ultra');
    if (logo) {
        let clickCount = 0;
        logo.addEventListener('click', () => {
            clickCount++;
            logo.style.transform = 'scale(1.15) rotate(360deg)';
            playClickSound('medium');

            setTimeout(() => {
                logo.style.transform = '';
            }, 500);

            // Easter egg: 5 clicks shows special message
            if (clickCount === 5) {
                showEasterEgg();
                clickCount = 0;
            }
        });
    }

    // Floating ingredients become clickable
    const ingredients = document.querySelectorAll('.ingredient');
    ingredients.forEach((ingredient, index) => {
        ingredient.style.cursor = 'pointer';
        ingredient.addEventListener('click', () => {
            ingredient.style.animation = 'none';
            ingredient.style.transform = 'scale(2) rotate(720deg)';
            ingredient.style.opacity = '0';
            playClickSound('high');

            setTimeout(() => {
                ingredient.style.animation = '';
                ingredient.style.transform = '';
                ingredient.style.opacity = '0.7';
            }, 1000);
        });
    });

    // Product cards pop on hover
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.1) translateY(-10px)';
            card.style.zIndex = '1000';
            playHoverSound();
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.zIndex = '';
        });
    });

    // Button hover effects with sound
    const buttons = document.querySelectorAll('.btn-ultra');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            playHoverSound();
        });

        btn.addEventListener('click', () => {
            playClickSound('high');
            createRippleEffect(btn, event);
        });
    });

    // Input fields glow on focus
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
            playClickSound('low');
        });

        input.addEventListener('blur', () => {
            input.parentElement.style.transform = '';
        });

        input.addEventListener('input', () => {
            if (input.value.length % 3 === 0 && input.value.length > 0) {
                playClickSound('low');
            }
        });
    });

    // Social buttons mega interaction
    const socialBtns = document.querySelectorAll('.social-ultra-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-5px) scale(1.05)';
            playHoverSound();
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });

        btn.addEventListener('click', () => {
            playClickSound('high');
            btn.style.animation = 'bounceOut 0.5s ease';
            setTimeout(() => {
                btn.style.animation = '';
            }, 500);
        });
    });

    // Value props interactive
    const props = document.querySelectorAll('.prop');
    props.forEach((prop, index) => {
        prop.addEventListener('click', () => {
            prop.style.transform = 'scale(1.1) rotate(5deg)';
            prop.style.background = 'rgba(255, 199, 0, 0.3)';
            playClickSound('medium');

            setTimeout(() => {
                prop.style.transform = '';
                prop.style.background = '';
            }, 300);
        });
    });

    // Shake animation for headlines
    const headlines = document.querySelectorAll('.headline-burst, .headline-explode');
    headlines.forEach(headline => {
        headline.addEventListener('mouseenter', () => {
            headline.style.animation = 'headlineShake 0.5s ease';
            playHoverSound();
        });

        headline.addEventListener('mouseleave', () => {
            headline.style.animation = '';
        });
    });

    // Screen shake on big wins
    window.screenShake = function() {
        const body = document.body;
        body.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            body.style.animation = '';
        }, 500);
    };
}

// ========================================
// SOUND EFFECTS SYSTEM
// ========================================

let audioContext;
let soundEffectsEnabled = true;

function initClickSounds() {
    // Initialize Web Audio API (works on modern browsers)
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playClickSound(pitch = 'medium') {
    if (!soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const frequencies = {
        low: 200,
        medium: 400,
        high: 600
    };

    oscillator.frequency.value = frequencies[pitch] || 400;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function playHoverSound() {
    if (!soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 300;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
}

function playWinSound() {
    if (!soundEnabled || !audioContext) return;

    // Victory fanfare
    const frequencies = [392, 440, 494, 523, 587];
    frequencies.forEach((freq, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = freq;
            oscillator.type = 'triangle';

            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }, index * 100);
    });
}

// ========================================
// RIPPLE EFFECT
// ========================================

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple-effect';

    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ========================================
// EASTER EGG
// ========================================

function showEasterEgg() {
    const overlay = document.createElement('div');
    overlay.className = 'easter-egg-overlay';
    overlay.innerHTML = `
        <div class="easter-egg-content">
            <h2 class="easter-egg-title">🎉 SECRET UNLOCKED! 🎉</h2>
            <p class="easter-egg-text">You found the hotdog master's secret!</p>
            <p class="easter-egg-code">Use code: <strong>MASTER5</strong> for 5% extra off!</p>
            <button class="btn-ultra" onclick="this.parentElement.parentElement.remove()">
                <span class="btn-text-main">AWESOME!</span>
            </button>
        </div>
    `;

    document.body.appendChild(overlay);
    playWinSound();

    setTimeout(() => {
        overlay.remove();
    }, 5000);
}
