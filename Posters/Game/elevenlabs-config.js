// ElevenLabs Voice Configuration for Yellows Hotdog Jackpot
// ULTRA-PREMIUM VOICE EXPERIENCE

const ELEVENLABS_CONFIG = {
    // ADD YOUR ELEVENLABS API KEY HERE
    apiKey: 'YOUR_ELEVENLABS_API_KEY', // Get from: https://elevenlabs.io/

    // Voice IDs (choose from ElevenLabs library or use defaults)
    voices: {
        // Energetic announcer voice (like sports/game shows)
        announcer: '21m00Tcm4TlvDq8ikWAM', // Rachel - energetic

        // Warm welcoming voice (for landing)
        welcome: 'pNInz6obpgDQGcFmaJgB', // Adam - warm male

        // Exciting hype voice (for winning)
        winner: 'EXAVITQu4vr4xnSDxMaL', // Bella - excited female
    },

    // Voice scripts for different moments
    scripts: {
        welcome: "Welcome to Yellows Hotdog Jackpot! Manchester's hottest hotdogs are waiting for you. Spin the wheel and win amazing prizes!",

        spinReady: "Get ready to spin! Your prize is just moments away...",

        spinning: "And here we go! The wheel is spinning! What will you win?",

        building: "It's slowing down... almost there...",

        // Dynamic winner announcements (will use prize name)
        winnerPrefix: "Congratulations! You've won",
        winnerSuffix: "Show this code to our staff and claim your amazing prize!",

        freeTopping: "A free topping! Make your hotdog exactly how you want it!",
        onePoundOff: "One pound off your order! That's a tasty discount!",
        twoPoundsOff: "Two pounds off! Now that's a winner!",
        bonusFries: "Bonus fries! Crispy, golden, and absolutely free!",
        freeDrink: "A free drink! Perfectly refreshing!",
        freeHotdog: "A free hotdog! The ultimate prize! You're eating for free today!",
        secretMenu: "Access to our secret menu! You've unlocked something special!",
    }
};

// ElevenLabs API Handler
class YellowsVoiceOver {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.elevenlabs.io/v1';
        this.audioQueue = [];
        this.isPlaying = false;
    }

    // Generate speech from text
    async textToSpeech(text, voiceId) {
        try {
            const response = await fetch(`${this.baseURL}/text-to-speech/${voiceId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': this.apiKey
                },
                body: JSON.stringify({
                    text: text,
                    model_id: 'eleven_monolingual_v1',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                        style: 0.5,
                        use_speaker_boost: true
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Voice generation failed');
            }

            const audioBlob = await response.blob();
            return URL.createObjectURL(audioBlob);
        } catch (error) {
            console.log('Voice unavailable, continuing without audio:', error.message);
            return null;
        }
    }

    // Play audio with promise
    async playAudio(audioURL) {
        if (!audioURL) return;

        return new Promise((resolve) => {
            const audio = new Audio(audioURL);
            audio.volume = 0.8;

            audio.onended = () => {
                URL.revokeObjectURL(audioURL);
                resolve();
            };

            audio.onerror = () => {
                console.log('Audio playback error');
                resolve();
            };

            audio.play().catch(() => {
                console.log('Autoplay blocked');
                resolve();
            });
        });
    }

    // Queue and play voice
    async speak(text, voiceId) {
        const audioURL = await this.textToSpeech(text, voiceId);
        if (audioURL) {
            await this.playAudio(audioURL);
        }
    }

    // Speak with cache (for repeated phrases)
    async speakCached(scriptKey, voiceType = 'announcer') {
        const text = ELEVENLABS_CONFIG.scripts[scriptKey];
        const voiceId = ELEVENLABS_CONFIG.voices[voiceType];

        if (text && voiceId) {
            await this.speak(text, voiceId);
        }
    }

    // Dynamic prize announcement
    async announcePrize(prizeName) {
        const voiceId = ELEVENLABS_CONFIG.voices.winner;

        // Map prize to script
        const prizeScripts = {
            'Free Topping': ELEVENLABS_CONFIG.scripts.freeTopping,
            '£1 Off': ELEVENLABS_CONFIG.scripts.onePoundOff,
            '£2 Off': ELEVENLABS_CONFIG.scripts.twoPoundsOff,
            'Bonus Fries': ELEVENLABS_CONFIG.scripts.bonusFries,
            'Free Drink': ELEVENLABS_CONFIG.scripts.freeDrink,
            'Free Hotdog': ELEVENLABS_CONFIG.scripts.freeHotdog,
            'Secret Menu Item': ELEVENLABS_CONFIG.scripts.secretMenu,
        };

        const prizeScript = prizeScripts[prizeName] || prizeName;
        const fullScript = `${ELEVENLABS_CONFIG.scripts.winnerPrefix} ${prizeScript} ${ELEVENLABS_CONFIG.scripts.winnerSuffix}`;

        await this.speak(fullScript, voiceId);
    }
}

// Initialize voice system
let voiceSystem = null;

function initializeVoice() {
    if (ELEVENLABS_CONFIG.apiKey && ELEVENLABS_CONFIG.apiKey !== 'YOUR_ELEVENLABS_API_KEY') {
        voiceSystem = new YellowsVoiceOver(ELEVENLABS_CONFIG.apiKey);
        console.log('🎙️ Voice system initialized!');
    } else {
        console.log('ℹ️ ElevenLabs API key not configured. Running without voice.');
    }
}

// Convenience functions
async function playWelcomeVoice() {
    if (voiceSystem) {
        await voiceSystem.speakCached('welcome', 'welcome');
    }
}

async function playSpinReadyVoice() {
    if (voiceSystem) {
        await voiceSystem.speakCached('spinReady', 'announcer');
    }
}

async function playSpinningVoice() {
    if (voiceSystem) {
        await voiceSystem.speakCached('spinning', 'announcer');
    }
}

async function playWinnerVoice(prizeName) {
    if (voiceSystem) {
        await voiceSystem.announcePrize(prizeName);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ELEVENLABS_CONFIG,
        YellowsVoiceOver,
        initializeVoice,
        playWelcomeVoice,
        playSpinReadyVoice,
        playSpinningVoice,
        playWinnerVoice
    };
}
