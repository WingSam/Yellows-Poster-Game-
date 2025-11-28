// Yellows Staff Portal - Prize Redemption

document.addEventListener('DOMContentLoaded', () => {
    initStaffPortal();
    loadStats();
    loadRecentRedemptions();
});

function initStaffPortal() {
    const redeemBtn = document.getElementById('redeem-btn');
    redeemBtn.addEventListener('click', redeemPrize);

    const codeInput = document.getElementById('redemption-code');
    codeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            redeemPrize();
        }
    });

    // Auto-uppercase input
    codeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
    });
}

async function redeemPrize() {
    const code = document.getElementById('redemption-code').value.trim().toUpperCase();
    const resultDiv = document.getElementById('redemption-result');

    if (!code) {
        showRedemptionResult('⚠️ Please enter a prize code', 'error');
        return;
    }

    // Get prize from database
    const prizeData = await getPrizeFromDatabase(code);

    if (!prizeData) {
        showRedemptionResult('❌ Invalid prize code', 'error');
        playSound('error');
        shakInput();
        return;
    }

    if (prizeData.redeemed) {
        showRedemptionResult(
            `❌ Already redeemed on ${new Date(prizeData.redeemedAt).toLocaleString()}`,
            'error'
        );
        playSound('error');
        shakInput();
        return;
    }

    // Mark as redeemed
    prizeData.redeemed = true;
    prizeData.redeemedAt = new Date().toISOString();
    prizeData.redeemedBy = 'Staff'; // Could add staff ID here

    await updatePrizeInDatabase(prizeData);

    showRedemptionResult(
        `✅ Success! Redeemed: ${prizeData.prize} for ${prizeData.name}`,
        'success'
    );
    playSound('success');

    // Clear input
    document.getElementById('redemption-code').value = '';

    // Update stats and recent list
    loadStats();
    loadRecentRedemptions();

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

function shakInput() {
    const input = document.getElementById('redemption-code');
    input.style.animation = 'shake 0.5s';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);

    // Add shake animation
    if (!document.getElementById('shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

function loadStats() {
    const prizes = JSON.parse(localStorage.getItem('yellows_prizes') || '[]');

    // Today's redemptions
    const today = new Date().toDateString();
    const todayRedeemed = prizes.filter(p => {
        if (!p.redeemed || !p.redeemedAt) return false;
        return new Date(p.redeemedAt).toDateString() === today;
    }).length;

    // Total pending
    const totalPending = prizes.filter(p => !p.redeemed).length;

    document.getElementById('today-redeemed').textContent = todayRedeemed;
    document.getElementById('total-pending').textContent = totalPending;
}

function loadRecentRedemptions() {
    const prizes = JSON.parse(localStorage.getItem('yellows_prizes') || '[]');
    const recentList = document.getElementById('recent-list');

    // Get redeemed prizes, sort by redemption time (most recent first)
    const redeemed = prizes
        .filter(p => p.redeemed && p.redeemedAt)
        .sort((a, b) => new Date(b.redeemedAt) - new Date(a.redeemedAt))
        .slice(0, 10); // Show last 10

    if (redeemed.length === 0) {
        recentList.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No redemptions yet</p>';
        return;
    }

    recentList.innerHTML = redeemed.map(prize => `
        <div class="recent-item">
            <div class="recent-item-header">
                <span class="recent-item-name">${prize.name}</span>
                <span class="recent-item-time">${formatTimeAgo(prize.redeemedAt)}</span>
            </div>
            <div class="recent-item-prize">${prize.prize}</div>
            <div class="recent-item-code">${prize.prizeCode}</div>
        </div>
    `).join('');
}

function formatTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return past.toLocaleDateString();
}

// Database Functions (LocalStorage - replace with real backend)
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

// Backend Communication
async function sendToBackend(endpoint, data, method = 'POST') {
    try {
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
        console.log('Backend not available, using localStorage');
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
        console.log('Backend not available, using localStorage');
    }
    return null;
}

async function sendFollowUpEmail(prizeData) {
    const emailData = {
        to: prizeData.email,
        type: 'followup',
        prizeData: prizeData
    };

    await sendToBackend('/api/email/followup', emailData);
}

// Sound Effects
function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch (type) {
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
        console.log('Audio not supported');
    }
}

// Auto-refresh stats every 30 seconds
setInterval(() => {
    loadStats();
    loadRecentRedemptions();
}, 30000);
