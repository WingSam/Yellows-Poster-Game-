// Yellows Hotdog Jackpot - Main JavaScript

// Prize Configuration
const PRIZES = [
    { name: "Free Topping", color: "#FFD700", emoji: "🧀" },
    { name: "£1 Off", color: "#FF6347", emoji: "💷" },
    { name: "Bonus Fries", color: "#FFA500", emoji: "🍟" },
    { name: "Secret Menu Item", color: "#FF4500", emoji: "🤫" },
    { name: "Free Topping", color: "#FFD700", emoji: "🧅" },
    { name: "£2 Off", color: "#FF6347", emoji: "💰" },
    { name: "Free Drink", color: "#FFA500", emoji: "🥤" },
    { name: "Free Hotdog", color: "#FF4500", emoji: "🌭" }
];

// Instagram configuration
const INSTAGRAM_URL = "https://instagram.com/yellows"; // UPDATE WITH YOUR ACTUAL INSTAGRAM
const CAMPAIGN_HASHTAG = "#YellowsHotdogJackpot";

// State
let userData = {};
let currentPrize = null;
let prizeCode = null;
let wheelCanvas = null;
let wheelCtx = null;
let isSpinning = false;
let currentRotation = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Check if staff portal should be shown
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('staff') === 'true') {
        showScreen('staff-screen');
        initStaffPortal();
        return;
    }

    // Track QR scan
    trackQRScan(urlParams);

    // Setup form submission
    const entryForm = document.getElementById('entry-form');
    entryForm.addEventListener('submit', handleFormSubmit);

    // Setup spin button
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.addEventListener('click', spinWheel);

    // Setup Instagram button
    const instagramBtn = document.getElementById('instagram-btn');
    instagramBtn.addEventListener('click', () => {
        window.open(INSTAGRAM_URL, '_blank');
        trackEvent('instagram_follow', { source: 'prize_screen' });
    });

    // Setup share button
    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', shareToInstagram);

    // Setup show to staff button
    const showStaffBtn = document.querySelector('.btn-show-staff');
    showStaffBtn.addEventListener('click', () => {
        // Enlarge the prize code for easy viewing
        const prizeCodeEl = document.getElementById('prize-code');
        prizeCodeEl.style.fontSize = '3rem';
        prizeCodeEl.style.animation = 'pulse 1s infinite';

        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email) {
        alert('Please fill in both fields!');
        return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Store user data
    userData = { name, email, timestamp: new Date().toISOString() };

    // Track user entry
    trackEvent('user_entry', userData);

    // Show user's name in spin screen
    document.getElementById('user-name').textContent = name;

    // Initialize wheel
    initWheel();

    // Transition to spin screen
    showScreen('spin-screen');

    // Save to localStorage for persistence
    localStorage.setItem('yellows_user', JSON.stringify(userData));
}

function initWheel() {
    wheelCanvas = document.getElementById('wheel');
    wheelCtx = wheelCanvas.getContext('2d');
    drawWheel();
}

function drawWheel(rotation = 0) {
    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const radius = wheelCanvas.width / 2 - 10;
    const sliceAngle = (2 * Math.PI) / PRIZES.length;

    wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

    // Draw slices
    PRIZES.forEach((prize, index) => {
        const startAngle = rotation + index * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        // Draw slice
        wheelCtx.beginPath();
        wheelCtx.moveTo(centerX, centerY);
        wheelCtx.arc(centerX, centerY, radius, startAngle, endAngle);
        wheelCtx.closePath();
        wheelCtx.fillStyle = prize.color;
        wheelCtx.fill();

        // Draw border
        wheelCtx.strokeStyle = '#FFFFFF';
        wheelCtx.lineWidth = 3;
        wheelCtx.stroke();

        // Draw emoji and text
        const textAngle = startAngle + sliceAngle / 2;
        const textRadius = radius * 0.65;
        const textX = centerX + Math.cos(textAngle) * textRadius;
        const textY = centerY + Math.sin(textAngle) * textRadius;

        wheelCtx.save();
        wheelCtx.translate(textX, textY);
        wheelCtx.rotate(textAngle + Math.PI / 2);

        // Draw emoji
        wheelCtx.font = 'bold 30px Arial';
        wheelCtx.textAlign = 'center';
        wheelCtx.fillStyle = '#FFFFFF';
        wheelCtx.fillText(prize.emoji, 0, -10);

        // Draw prize name
        wheelCtx.font = 'bold 14px Poppins';
        wheelCtx.fillText(prize.name, 0, 15);

        wheelCtx.restore();
    });

    // Draw center circle
    wheelCtx.beginPath();
    wheelCtx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    wheelCtx.fillStyle = '#FFFFFF';
    wheelCtx.fill();
    wheelCtx.strokeStyle = '#FFD700';
    wheelCtx.lineWidth = 5;
    wheelCtx.stroke();

    // Draw center text
    wheelCtx.font = 'bold 20px Poppins';
    wheelCtx.fillStyle = '#FF6347';
    wheelCtx.textAlign = 'center';
    wheelCtx.textBaseline = 'middle';
    wheelCtx.fillText('SPIN', centerX, centerY);
}

function spinWheel() {
    if (isSpinning) return;

    isSpinning = true;
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.disabled = true;
    spinBtn.style.opacity = '0.5';

    // Play sound (if available)
    playSound('spin');

    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50]);
    }

    // Random prize selection
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    currentPrize = PRIZES[prizeIndex];

    // Calculate rotation
    const sliceAngle = (2 * Math.PI) / PRIZES.length;
    const targetAngle = (prizeIndex * sliceAngle) + (sliceAngle / 2);
    const spins = 5; // Number of full rotations
    const totalRotation = (spins * 2 * Math.PI) + targetAngle;

    // Animate spin
    const duration = 4000; // 4 seconds
    const startTime = Date.now();
    const startRotation = currentRotation;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease out cubic)
        const eased = 1 - Math.pow(1 - progress, 3);

        currentRotation = startRotation + (totalRotation * eased);
        drawWheel(currentRotation);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Spin complete
            isSpinning = false;
            onSpinComplete();
        }
    }

    animate();
}

function onSpinComplete() {
    // Play win sound
    playSound('win');

    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }

    // Generate prize code
    prizeCode = generatePrizeCode();

    // Save prize data
    const prizeData = {
        ...userData,
        prize: currentPrize.name,
        prizeCode: prizeCode,
        wonAt: new Date().toISOString(),
        redeemed: false
    };

    // Track prize win
    trackEvent('prize_won', prizeData);

    // Save to database
    savePrizeToDatabase(prizeData);

    // Send email (would be handled by backend)
    sendPrizeEmail(prizeData);

    // Small delay before showing prize screen
    setTimeout(() => {
        displayPrize();
        showScreen('prize-screen');
        triggerConfetti();
    }, 500);
}

function displayPrize() {
    document.getElementById('prize-name').textContent = currentPrize.emoji + ' ' + currentPrize.name;
    document.getElementById('prize-code').textContent = prizeCode;
}

function generatePrizeCode() {
    const prefix = 'YLW';
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${random}`;
}

function triggerConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#FFD700', '#FFA500', '#FF6347', '#FF4500'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3500);
        }, i * 20);
    }
}

function shareToInstagram() {
    const shareText = `🎉 I just won ${currentPrize.name} at Yellows! 🌭 ${CAMPAIGN_HASHTAG}`;

    // Try native share if available
    if (navigator.share) {
        navigator.share({
            title: 'Yellows Hotdog Jackpot',
            text: shareText,
            url: window.location.href
        }).catch(() => {
            // Fallback to copying text
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }

    trackEvent('social_share', { prize: currentPrize.name });
}

function fallbackShare(text) {
    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard! Now paste it in your Instagram story 📱');
    }).catch(() => {
        prompt('Copy this text to share:', text);
    });
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Staff Portal Functions
function initStaffPortal() {
    const redeemBtn = document.getElementById('redeem-btn');
    redeemBtn.addEventListener('click', redeemPrize);

    const codeInput = document.getElementById('redemption-code');
    codeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            redeemPrize();
        }
    });
}

async function redeemPrize() {
    const code = document.getElementById('redemption-code').value.trim().toUpperCase();
    const resultDiv = document.getElementById('redemption-result');

    if (!code) {
        showRedemptionResult('Please enter a prize code', 'error');
        return;
    }

    // Get prize from database
    const prizeData = await getPrizeFromDatabase(code);

    if (!prizeData) {
        showRedemptionResult('❌ Invalid prize code', 'error');
        playSound('error');
        return;
    }

    if (prizeData.redeemed) {
        showRedemptionResult(`❌ Already redeemed on ${new Date(prizeData.redeemedAt).toLocaleString()}`, 'error');
        playSound('error');
        return;
    }

    // Mark as redeemed
    prizeData.redeemed = true;
    prizeData.redeemedAt = new Date().toISOString();
    prizeData.redeemedBy = 'Staff'; // Could add staff ID here

    await updatePrizeInDatabase(prizeData);

    showRedemptionResult(`✅ Success! Redeemed: ${prizeData.prize} for ${prizeData.name}`, 'success');
    playSound('success');

    // Clear input
    document.getElementById('redemption-code').value = '';

    // Track redemption
    trackEvent('prize_redeemed', prizeData);

    // Send follow-up email
    sendFollowUpEmail(prizeData);
}

function showRedemptionResult(message, type) {
    const resultDiv = document.getElementById('redemption-result');
    resultDiv.textContent = message;
    resultDiv.className = `redemption-result ${type}`;
    resultDiv.style.display = 'block';

    setTimeout(() => {
        resultDiv.style.display = 'none';
    }, 5000);
}

// Database Functions (LocalStorage simulation - replace with real backend)
async function savePrizeToDatabase(prizeData) {
    try {
        // Get existing prizes
        const prizes = JSON.parse(localStorage.getItem('yellows_prizes') || '[]');
        prizes.push(prizeData);
        localStorage.setItem('yellows_prizes', JSON.stringify(prizes));

        // Also send to backend if available
        await sendToBackend('/api/prizes', prizeData);
    } catch (error) {
        console.error('Error saving prize:', error);
    }
}

async function getPrizeFromDatabase(code) {
    try {
        const prizes = JSON.parse(localStorage.getItem('yellows_prizes') || '[]');
        const prize = prizes.find(p => p.prizeCode === code);

        // Also check backend if available
        const backendPrize = await fetchFromBackend(`/api/prizes/${code}`);
        return backendPrize || prize;
    } catch (error) {
        console.error('Error getting prize:', error);
        return null;
    }
}

async function updatePrizeInDatabase(prizeData) {
    try {
        const prizes = JSON.parse(localStorage.getItem('yellows_prizes') || '[]');
        const index = prizes.findIndex(p => p.prizeCode === prizeData.prizeCode);
        if (index !== -1) {
            prizes[index] = prizeData;
            localStorage.setItem('yellows_prizes', JSON.stringify(prizes));
        }

        // Also update backend if available
        await sendToBackend(`/api/prizes/${prizeData.prizeCode}`, prizeData, 'PUT');
    } catch (error) {
        console.error('Error updating prize:', error);
    }
}

// Tracking Functions
function trackQRScan(urlParams) {
    const trackingData = {
        event: 'qr_scan',
        timestamp: new Date().toISOString(),
        location: urlParams.get('loc') || 'unknown',
        campaign: urlParams.get('campaign') || 'default',
        userAgent: navigator.userAgent,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        referrer: document.referrer
    };

    // Get geolocation if permitted
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                trackingData.latitude = position.coords.latitude;
                trackingData.longitude = position.coords.longitude;
                sendToBackend('/api/analytics', trackingData);
            },
            () => {
                // User denied location
                sendToBackend('/api/analytics', trackingData);
            }
        );
    } else {
        sendToBackend('/api/analytics', trackingData);
    }

    // Save to localStorage
    const scans = JSON.parse(localStorage.getItem('yellows_scans') || '[]');
    scans.push(trackingData);
    localStorage.setItem('yellows_scans', JSON.stringify(scans));
}

function trackEvent(eventName, data = {}) {
    const eventData = {
        event: eventName,
        timestamp: new Date().toISOString(),
        ...data
    };

    // Send to backend
    sendToBackend('/api/analytics/events', eventData);

    // Save to localStorage
    const events = JSON.parse(localStorage.getItem('yellows_events') || '[]');
    events.push(eventData);
    localStorage.setItem('yellows_events', JSON.stringify(events));
}

// Backend Communication (placeholder functions)
async function sendToBackend(endpoint, data, method = 'POST') {
    try {
        // Replace with your actual backend URL
        const backendURL = '/backend' + endpoint;

        const response = await fetch(backendURL, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log('Backend not available, using localStorage:', error.message);
    }
    return null;
}

async function fetchFromBackend(endpoint) {
    try {
        const backendURL = '/backend' + endpoint;
        const response = await fetch(backendURL);

        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log('Backend not available, using localStorage:', error.message);
    }
    return null;
}

// Email Functions (would be handled by backend)
async function sendPrizeEmail(prizeData) {
    const emailData = {
        to: prizeData.email,
        subject: `🎉 You won ${prizeData.prize} at Yellows!`,
        body: `
            Hi ${prizeData.name}!

            Congratulations! You've won: ${prizeData.prize}

            Your prize code is: ${prizeData.prizeCode}

            Show this code to our staff to claim your prize!

            Want more? Follow us on Instagram @yellows for an extra free topping!

            See you soon at Yellows! 🌭
        `
    };

    await sendToBackend('/api/email/prize', emailData);
}

async function sendFollowUpEmail(prizeData) {
    const emailData = {
        to: prizeData.email,
        subject: '🌭 Join the Yellows Hotdog Club!',
        body: `
            Hi ${prizeData.name}!

            Thanks for redeeming your ${prizeData.prize}!

            Join the Yellows Hotdog Club for exclusive deals:
            - Early access to new menu items
            - Birthday freebies
            - Members-only discounts

            Click here to join: [LOYALTY_LINK]

            Your secret club code: ${generatePrizeCode()}

            Share your experience with ${CAMPAIGN_HASHTAG} for more perks!

            The Yellows Team 🌭
        `
    };

    await sendToBackend('/api/email/followup', emailData);
}

// Sound Effects (using Web Audio API)
function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch (type) {
            case 'spin':
                oscillator.frequency.value = 400;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
                break;

            case 'win':
                // Celebratory ascending notes
                [523, 659, 784, 1047].forEach((freq, i) => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    osc.frequency.value = freq;
                    osc.type = 'sine';
                    gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3);
                    osc.start(audioContext.currentTime + i * 0.1);
                    osc.stop(audioContext.currentTime + i * 0.1 + 0.3);
                });
                break;

            case 'success':
                oscillator.frequency.value = 800;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;

            case 'error':
                oscillator.frequency.value = 200;
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.4);
                break;
        }
    } catch (error) {
        console.log('Audio not supported:', error.message);
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generatePrizeCode,
        trackEvent,
        PRIZES
    };
}
