/**
 * YELLOWS HOTDOG JACKPOT - BACKEND EXAMPLE
 *
 * This is an example backend implementation using Node.js + Express
 * You can deploy this to platforms like:
 * - Vercel
 * - Netlify Functions
 * - AWS Lambda
 * - Heroku
 * - Railway
 *
 * SETUP:
 * 1. npm init -y
 * 2. npm install express cors dotenv nodemailer mongodb
 * 3. Create .env file with your credentials
 * 4. Run: node backend-example.js
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (replace with MongoDB, PostgreSQL, etc.)
let prizes = [];
let scans = [];
let events = [];

// ========================================
// ANALYTICS ENDPOINTS
// ========================================

// Track QR scan
app.post('/api/analytics', (req, res) => {
    const scanData = {
        id: generateId(),
        ...req.body,
        ip: req.ip,
        timestamp: new Date().toISOString()
    };

    scans.push(scanData);

    console.log('QR Scan tracked:', scanData);

    res.json({ success: true, scanId: scanData.id });
});

// Track events (user_entry, prize_won, instagram_follow, etc.)
app.post('/api/analytics/events', (req, res) => {
    const eventData = {
        id: generateId(),
        ...req.body,
        ip: req.ip,
        timestamp: new Date().toISOString()
    };

    events.push(eventData);

    console.log('Event tracked:', eventData);

    res.json({ success: true, eventId: eventData.id });
});

// Get analytics summary
app.get('/api/analytics/summary', (req, res) => {
    const summary = {
        totalScans: scans.length,
        totalPrizes: prizes.length,
        totalRedeemed: prizes.filter(p => p.redeemed).length,
        redemptionRate: prizes.length > 0
            ? (prizes.filter(p => p.redeemed).length / prizes.length * 100).toFixed(2)
            : 0,
        instagramFollows: events.filter(e => e.event === 'instagram_follow').length,
        socialShares: events.filter(e => e.event === 'social_share').length
    };

    res.json(summary);
});

// ========================================
// PRIZE ENDPOINTS
// ========================================

// Save new prize
app.post('/api/prizes', async (req, res) => {
    try {
        const prizeData = {
            id: generateId(),
            ...req.body,
            createdAt: new Date().toISOString()
        };

        prizes.push(prizeData);

        // Send email notification
        await sendPrizeEmail(prizeData);

        console.log('Prize saved:', prizeData);

        res.json({ success: true, prize: prizeData });
    } catch (error) {
        console.error('Error saving prize:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get prize by code
app.get('/api/prizes/:code', (req, res) => {
    const prize = prizes.find(p => p.prizeCode === req.params.code);

    if (!prize) {
        return res.status(404).json({ success: false, error: 'Prize not found' });
    }

    res.json({ success: true, prize });
});

// Update prize (for redemption)
app.put('/api/prizes/:code', async (req, res) => {
    try {
        const index = prizes.findIndex(p => p.prizeCode === req.params.code);

        if (index === -1) {
            return res.status(404).json({ success: false, error: 'Prize not found' });
        }

        prizes[index] = {
            ...prizes[index],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        // If prize was redeemed, send follow-up email
        if (req.body.redeemed) {
            await sendFollowUpEmail(prizes[index]);
        }

        console.log('Prize updated:', prizes[index]);

        res.json({ success: true, prize: prizes[index] });
    } catch (error) {
        console.error('Error updating prize:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get all prizes (for admin)
app.get('/api/prizes', (req, res) => {
    res.json({ success: true, prizes });
});

// ========================================
// EMAIL ENDPOINTS
// ========================================

// Send prize email
app.post('/api/email/prize', async (req, res) => {
    try {
        await sendPrizeEmail(req.body);
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending prize email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Send follow-up email
app.post('/api/email/followup', async (req, res) => {
    try {
        await sendFollowUpEmail(req.body);
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending follow-up email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ========================================
// HELPER FUNCTIONS
// ========================================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

async function sendPrizeEmail(prizeData) {
    // Example using Nodemailer
    // Configure with your email service (Gmail, SendGrid, etc.)

    const nodemailer = require('nodemailer');

    // Create transporter (configure with your email service)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: '"Yellows Hotdog Shop" <noreply@yellows.com>',
        to: prizeData.email,
        subject: `🎉 You won ${prizeData.prize} at Yellows!`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
                    .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 15px; }
                    .logo { font-size: 2.5rem; font-weight: 800; color: #FFD700; text-align: center; margin-bottom: 20px; }
                    h1 { color: #FF6347; text-align: center; }
                    .prize-code { background: #FFF8DC; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; border: 3px dashed #FFD700; }
                    .code { font-size: 2rem; font-weight: 800; color: #2C1810; letter-spacing: 3px; font-family: 'Courier New', monospace; }
                    .button { display: inline-block; background: #FF6347; color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; margin: 20px 0; font-weight: 600; }
                    .footer { text-align: center; color: #999; margin-top: 30px; font-size: 0.9rem; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">YELLOWS 🌭</div>
                    <h1>Congratulations ${prizeData.name}!</h1>
                    <p style="text-align: center; font-size: 1.1rem;">You've won: <strong>${prizeData.prize}</strong></p>

                    <div class="prize-code">
                        <p style="margin-bottom: 10px;">Your Prize Code:</p>
                        <div class="code">${prizeData.prizeCode}</div>
                    </div>

                    <p style="text-align: center;">Show this code to our staff to claim your prize!</p>

                    <div style="text-align: center;">
                        <a href="https://instagram.com/yellows" class="button">
                            Follow us on Instagram for an extra free topping!
                        </a>
                    </div>

                    <div class="footer">
                        <p>See you soon at Yellows! 🌭</p>
                        <p>Share your win with #YellowsHotdogJackpot</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    // Send email (uncomment when configured)
    // await transporter.sendMail(mailOptions);

    console.log('Prize email would be sent to:', prizeData.email);
}

async function sendFollowUpEmail(prizeData) {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const loyaltyCode = generateId().toUpperCase().substring(0, 8);

    const mailOptions = {
        from: '"Yellows Hotdog Shop" <noreply@yellows.com>',
        to: prizeData.email,
        subject: '🌭 Join the Yellows Hotdog Club!',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
                    .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 15px; }
                    .logo { font-size: 2.5rem; font-weight: 800; color: #FFD700; text-align: center; margin-bottom: 20px; }
                    h1 { color: #2C1810; text-align: center; }
                    .benefits { background: #FFF8DC; padding: 20px; border-radius: 10px; margin: 20px 0; }
                    .benefits ul { list-style: none; padding: 0; }
                    .benefits li { padding: 10px 0; border-bottom: 1px solid #FFD700; }
                    .benefits li:last-child { border-bottom: none; }
                    .button { display: inline-block; background: #FF6347; color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; margin: 20px 0; font-weight: 600; }
                    .code { background: #2C1810; color: #FFD700; padding: 15px; border-radius: 10px; text-align: center; font-size: 1.5rem; font-weight: 800; letter-spacing: 3px; font-family: 'Courier New', monospace; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">YELLOWS 🌭</div>
                    <h1>Thanks for visiting, ${prizeData.name}!</h1>
                    <p style="text-align: center;">We hope you enjoyed your ${prizeData.prize}!</p>

                    <h2 style="text-align: center; color: #FF6347;">Join the Yellows Hotdog Club</h2>

                    <div class="benefits">
                        <ul>
                            <li>🎁 Early access to new menu items</li>
                            <li>🎂 Birthday freebies</li>
                            <li>💰 Members-only discounts</li>
                            <li>🌭 Secret menu access</li>
                            <li>🎉 Exclusive event invitations</li>
                        </ul>
                    </div>

                    <p style="text-align: center;">Your exclusive club code:</p>
                    <div class="code">${loyaltyCode}</div>

                    <div style="text-align: center;">
                        <a href="https://yellows.com/join-club?code=${loyaltyCode}" class="button">
                            Join the Club Now!
                        </a>
                    </div>

                    <p style="text-align: center; margin-top: 30px; color: #999;">
                        Share your experience with <strong>#YellowsHotdogJackpot</strong> for more perks!
                    </p>
                </div>
            </body>
            </html>
        `
    };

    // Send email (uncomment when configured)
    // await transporter.sendMail(mailOptions);

    console.log('Follow-up email would be sent to:', prizeData.email);
}

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
    console.log(`🌭 Yellows Backend running on port ${PORT}`);
    console.log(`📊 API endpoints:`);
    console.log(`   - POST /api/analytics`);
    console.log(`   - POST /api/analytics/events`);
    console.log(`   - GET  /api/analytics/summary`);
    console.log(`   - POST /api/prizes`);
    console.log(`   - GET  /api/prizes/:code`);
    console.log(`   - PUT  /api/prizes/:code`);
    console.log(`   - GET  /api/prizes`);
    console.log(`   - POST /api/email/prize`);
    console.log(`   - POST /api/email/followup`);
});

// ========================================
// MONGODB EXAMPLE (OPTIONAL)
// ========================================

/*
const { MongoClient } = require('mongodb');

const mongoClient = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
    await mongoClient.connect();
    const db = mongoClient.db('yellows');

    return {
        prizes: db.collection('prizes'),
        scans: db.collection('scans'),
        events: db.collection('events')
    };
}

// Use in endpoints like:
// const { prizes } = await connectDB();
// await prizes.insertOne(prizeData);
*/

module.exports = app;
