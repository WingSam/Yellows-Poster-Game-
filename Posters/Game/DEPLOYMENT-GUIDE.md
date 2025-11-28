# 🌭 YELLOWS HOTDOG JACKPOT - COMPLETE DEPLOYMENT GUIDE

## 📦 WHAT YOU HAVE

Your `Game` folder contains everything needed for the campaign:

### Customer-Facing:
- `game.html` - Main game (QR code destination)
- `game.css` - Game styling
- `game.js` - Game functionality
- `poster1.jpg` - Blurred hotdog image
- `poster2.jpg` - Ghost hotdog image

### Staff Tools:
- `staff.html` - Prize redemption portal
- `staff.css` - Staff portal styling
- `staff.js` - Redemption logic

### Admin:
- `admin.html` - Analytics dashboard
- `admin.css` - Dashboard styling
- `admin.js` - Dashboard functionality

### Backend (Optional):
- `backend-example.js` - Node.js server
- `package.json` - Dependencies
- `.env.example` - Configuration template

---

## 🚀 DEPLOYMENT OPTIONS

Choose ONE option below based on your needs:

---

## ✅ OPTION 1: NETLIFY (EASIEST - RECOMMENDED)

**Time: 5 minutes | Cost: FREE | No coding required**

### Step 1: Sign Up
1. Go to https://www.netlify.com
2. Click "Sign Up" (top right)
3. Choose "Email" (or GitHub/Google)
4. Verify your email

### Step 2: Deploy Your Site
1. Log into Netlify dashboard
2. Look for the big box that says "Want to deploy a new site without connecting to Git? Drag and drop your site folder here"
3. **Drag your entire `Game` folder** and drop it on that box
4. Wait 30-60 seconds
5. **DONE!** Netlify gives you a URL like: `https://spontaneous-hotdog-abc123.netlify.app`

### Step 3: Get Your URLs
After deployment, you'll have:
- **Customer Game**: `https://your-site.netlify.app/game.html`
- **Staff Portal**: `https://your-site.netlify.app/staff.html`
- **Admin Dashboard**: `https://your-site.netlify.app/admin.html`

### Step 4: (Optional) Custom Domain
1. In Netlify dashboard, click "Domain Settings"
2. Click "Add custom domain"
3. Enter your domain (e.g., `play.yellows.com`)
4. Follow DNS instructions (Netlify provides them)

**✅ YOUR SITE IS NOW LIVE!**

---

## ✅ OPTION 2: VERCEL (DEVELOPER-FRIENDLY)

**Time: 5 minutes | Cost: FREE**

### Step 1: Sign Up
1. Go to https://vercel.com
2. Click "Sign Up"
3. Use GitHub, GitLab, or Email

### Step 2: Deploy
1. Click "Add New" → "Project"
2. Click "Deploy from local files"
3. Drag and drop your `Game` folder
4. Click "Deploy"
5. Wait 30 seconds
6. **DONE!** You get: `https://yellows-jackpot.vercel.app`

**✅ YOUR SITE IS NOW LIVE!**

---

## ✅ OPTION 3: GITHUB PAGES (FREE FOREVER)

**Time: 10 minutes | Cost: FREE | Requires GitHub account**

### Step 1: Create GitHub Account
1. Go to https://github.com
2. Sign up (if you don't have an account)

### Step 2: Create Repository
1. Click "+" (top right) → "New repository"
2. Name it: `yellows-jackpot`
3. Make it "Public"
4. Click "Create repository"

### Step 3: Upload Files
1. Click "uploading an existing file"
2. Drag all files from your `Game` folder
3. Click "Commit changes"

### Step 4: Enable GitHub Pages
1. Go to Settings (in your repository)
2. Click "Pages" (left sidebar)
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait 2-3 minutes
6. Your site will be at: `https://your-username.github.io/yellows-jackpot/game.html`

**✅ YOUR SITE IS NOW LIVE!**

---

## 📱 CREATE QR CODES

Once your site is live, create QR codes for your posters:

### Method 1: QR Code Generator (Easiest)
1. Go to https://www.qr-code-generator.com/
2. Select "URL" type
3. Enter your game URL with tracking:

**For Poster 1 (Blurred Hotdog):**
```
https://your-site.netlify.app/game.html?loc=poster1&campaign=launch2025
```

**For Poster 2 (Ghost Hotdog):**
```
https://your-site.netlify.app/game.html?loc=poster2&campaign=launch2025
```

4. Click "Generate QR Code"
5. Download as PNG (high resolution)
6. Add to your poster designs in Photoshop/Canva

### Method 2: Location-Specific QR Codes

Create different QR codes for different locations to track performance:

**Arndale Food Hall:**
```
https://your-site.netlify.app/game.html?loc=arndale&campaign=launch2025
```

**High Street Window:**
```
https://your-site.netlify.app/game.html?loc=highstreet&campaign=launch2025
```

**Instagram Bio:**
```
https://your-site.netlify.app/game.html?loc=instagram&campaign=launch2025
```

**Table Tents (In-store):**
```
https://your-site.netlify.app/game.html?loc=tabletent&campaign=launch2025
```

### QR Code Design Tips:
- Use high resolution (300 DPI minimum for print)
- Add a "Scan to Win!" call-to-action around it
- Make it at least 2cm x 2cm in size
- Test the QR code with your phone before printing!

---

## 🎮 HOW TO USE THE SYSTEM

### For Customers:
1. **Scan QR code** on poster
2. **Enter name & email**
3. **Tap to spin** the wheel
4. **Win a prize** (with unique code)
5. **Show code to staff** to redeem

### For Staff:
1. Go to: `https://your-site.netlify.app/staff.html`
2. Customer shows their phone with prize code
3. Enter the code (e.g., `YLW-ABC123`)
4. Click "Redeem Prize"
5. System validates and marks as redeemed
6. Give customer their prize!

### For You (Admin):
1. Go to: `https://your-site.netlify.app/admin.html`
2. See real-time stats:
   - Total scans
   - Prizes won
   - Redemption rates
   - Top locations
   - User database
3. Export data as JSON
4. Update prizes dynamically

---

## 📊 WHAT WORKS NOW (WITHOUT BACKEND)

✅ **Full game functionality** - Spin, win, display codes
✅ **Staff redemption** - Validate and redeem prizes
✅ **Admin dashboard** - View all analytics
✅ **QR tracking** - Location and campaign data
✅ **Data storage** - Saved in browser (localStorage)
✅ **Social sharing** - Instagram integration

❌ **Email notifications** - Requires backend setup
❌ **Centralized database** - Data is per-device only
❌ **Cross-device sync** - Need backend for this

**The game is 100% functional for your campaign launch!**

Data saves locally on each device. For a small campaign, this works perfectly. When you want emails and centralized data, follow the backend setup below.

---

## 🔧 OPTIONAL: BACKEND SETUP (FOR EMAILS & DATABASE)

**Only do this if you want:**
- Email notifications when customers win
- Centralized database across all devices
- Follow-up emails for loyalty program

### Step 1: Deploy Backend to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Click "Deploy from GitHub repo"
5. Click "Deploy from local files"
6. Upload ONLY these files:
   - `backend-example.js`
   - `package.json`
   - `.env.example` (rename to `.env`)

### Step 2: Set Environment Variables

In Railway dashboard:
1. Click "Variables" tab
2. Add these variables:

```
PORT=3000
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
MONGODB_URI=your-mongodb-connection
```

### Step 3: Get MongoDB (Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create a free cluster
4. Click "Connect"
5. Copy connection string
6. Add to Railway as `MONGODB_URI`

### Step 4: Setup Gmail for Emails

1. Go to https://myaccount.google.com/apppasswords
2. Create an "App Password" for Yellows
3. Copy the 16-character password
4. Add to Railway as `EMAIL_PASSWORD`
5. Use your Gmail as `EMAIL_USER`

### Step 5: Connect Frontend to Backend

In your deployed site, update `game.js` line 483:

```javascript
const backendURL = 'https://your-backend.railway.app' + endpoint;
```

Replace `your-backend.railway.app` with your Railway URL.

Re-upload to Netlify/Vercel.

**✅ NOW YOU HAVE:**
- Email notifications
- Centralized database
- Cross-device data sync

---

## 🎯 TESTING CHECKLIST

Before printing your posters:

### Test Customer Flow:
- [ ] Scan QR code with your phone
- [ ] Form accepts name and email
- [ ] Wheel spins and shows animation
- [ ] Prize displays with code
- [ ] Code is readable (not too small)
- [ ] Instagram button works
- [ ] Share button works

### Test Staff Portal:
- [ ] Can access staff.html
- [ ] Can enter prize codes
- [ ] Valid codes show success
- [ ] Invalid codes show error
- [ ] Already redeemed codes show warning
- [ ] Stats update in real-time

### Test Admin Dashboard:
- [ ] Can access admin.html
- [ ] Stats show correctly
- [ ] User database displays
- [ ] Search and filters work
- [ ] Export data works
- [ ] Prize configuration works

### Test on Different Devices:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet
- [ ] Desktop browser

---

## 🚨 TROUBLESHOOTING

### QR Code doesn't work:
- Make sure URL is correct (include `/game.html`)
- Test QR code before printing
- Ensure QR code is at least 2cm x 2cm

### Game doesn't load:
- Check all files uploaded correctly
- Ensure `poster1.jpg` and `poster2.jpg` are in same folder
- Clear browser cache and try again

### Wheel doesn't spin:
- Allow browser permissions if asked
- Try on different browser
- Check JavaScript console for errors

### Staff can't redeem codes:
- Make sure code is entered exactly (case-sensitive)
- Check code hasn't already been redeemed
- Verify staff is using `staff.html` not `game.html`

### Data not showing in admin:
- Refresh the page
- Check browser localStorage is enabled
- Verify you're testing on same device/browser

---

## 📈 CAMPAIGN LAUNCH CHECKLIST

### Before Launch:
- [ ] Deploy site to hosting (Netlify/Vercel/GitHub)
- [ ] Test entire flow on your phone
- [ ] Create QR codes for all posters
- [ ] Print test poster and scan QR code
- [ ] Train staff on redemption process
- [ ] Bookmark staff.html and admin.html
- [ ] Update Instagram bio with game link

### During Campaign:
- [ ] Check admin dashboard daily
- [ ] Monitor redemption rates
- [ ] Track which locations perform best
- [ ] Export data weekly for backup
- [ ] Respond to any issues quickly

### After Campaign:
- [ ] Export all data (JSON)
- [ ] Analyze performance by location
- [ ] Calculate ROI (scans vs costs)
- [ ] Plan next campaign based on data

---

## 💰 COSTS BREAKDOWN

### FREE Option (Recommended for Start):
- Netlify hosting: **FREE**
- QR code generation: **FREE**
- Poster printing: **£20-50** (your cost)
- **Total: £20-50**

### With Backend (Optional):
- Railway backend: **FREE** (500 hours/month)
- MongoDB Atlas: **FREE** (512MB storage)
- Gmail for emails: **FREE**
- **Total: Still FREE**

### With Custom Domain (Optional):
- Domain name: **£10/year** (e.g., play.yellows.com)
- **Total: £10/year**

---

## 🎉 YOU'RE READY TO LAUNCH!

### Quick Start Summary:
1. ✅ Deploy to Netlify (5 minutes)
2. ✅ Create QR codes with your URL
3. ✅ Add QR codes to your poster designs
4. ✅ Print posters
5. ✅ Launch campaign!

The game works perfectly right now. Backend setup is optional for later.

---

## 📞 SUPPORT

If you need help:
- Check this guide first
- Review the README.md file
- Test on different browsers
- Check browser console for errors

---

**Good luck with your campaign! 🌭🎰🎉**

Made with ❤️ for Yellows Hotdog Shop
