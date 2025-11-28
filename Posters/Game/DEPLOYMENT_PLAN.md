# 🌭 YELLOWS HOTDOG JACKPOT - LIVE DEPLOYMENT PLAN

## 📋 CAMPAIGN OVERVIEW
**Campaign Name**: Yellows Hotdog Jackpot
**Objective**: Drive foot traffic to Yellows with QR code gamification
**Platform**: Interactive web game accessible via QR code on posters
**Launch Date**: [INSERT DATE]

---

## 🚀 DEPLOYMENT OPTIONS

### **OPTION 1: GitHub Pages (FREE & EASIEST) ⭐ RECOMMENDED**

#### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign up/login
2. Click "New Repository"
3. Name it: `yellows-jackpot` (or any name)
4. Select: ✅ Public
5. Click "Create Repository"

#### Step 2: Upload Files
1. On your repository page, click "uploading an existing file"
2. Upload ALL these files:
   - `game-ultra.html`
   - `game-ultra.css`
   - `game-ultra.js`
   - `elevenlabs-config.js`
   - `logo.jpg`
   - All image files (hotdog images, backgrounds, etc.)
   - All video files
3. Write commit message: "Initial deployment"
4. Click "Commit changes"

#### Step 3: Enable GitHub Pages
1. Go to repository "Settings"
2. Click "Pages" in left sidebar
3. Under "Branch", select: `main` (or `master`)
4. Click "Save"
5. Wait 2-5 minutes
6. Your site will be live at: `https://[your-username].github.io/yellows-jackpot/game-ultra.html`

#### Step 4: Create Short URL for QR Code
1. Go to [Bitly.com](https://bitly.com) or [TinyURL.com](https://tinyurl.com)
2. Paste your GitHub Pages URL
3. Create custom short link: `bit.ly/yellows-win` or `bit.ly/yellowsjackpot`
4. Use this short URL for your QR codes!

**✅ PROS:**
- 100% FREE
- No coding required
- SSL/HTTPS included
- Reliable hosting
- Easy updates (just upload new files)

**❌ CONS:**
- Public repository (anyone can see code)
- Limited to static content only

---

### **OPTION 2: Netlify (FREE, MORE PROFESSIONAL)**

#### Step 1: Sign Up
1. Go to [Netlify.com](https://netlify.com)
2. Sign up with email or GitHub

#### Step 2: Deploy
1. Click "Add new site" → "Deploy manually"
2. Drag and drop your entire project folder
3. Wait for deployment (30 seconds)
4. Get live URL: `https://[random-name].netlify.app`

#### Step 3: Custom Domain (Optional)
1. Buy domain: `yellowsjackpot.com` (£10-15/year)
2. In Netlify, go to "Domain settings"
3. Add custom domain
4. Follow DNS setup instructions

#### Step 4: Set Main Page
1. In Netlify, rename `game-ultra.html` to `index.html` (OR)
2. Create a `_redirects` file with: `/ /game-ultra.html 200`

**✅ PROS:**
- FREE plan is generous
- Auto HTTPS
- Form submissions work
- Faster than GitHub Pages
- Easy drag-and-drop updates

**❌ CONS:**
- Requires account setup
- Free tier has bandwidth limits

---

### **OPTION 3: Vercel (FREE, SUPER FAST)**

#### Similar to Netlify:
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub/Email
3. Click "Add New" → "Project"
4. Import your repository OR drag-drop files
5. Get instant live URL

---

## 📱 QR CODE GENERATION

### Step 1: Generate QR Code
Use one of these FREE tools:
- [QR Code Generator](https://www.qr-code-generator.com)
- [QRCode Monkey](https://www.qrcode-monkey.com)
- [Canva QR Code](https://www.canva.com/qr-code-generator/)

### Step 2: QR Code Best Practices
1. **Size**: Minimum 2cm x 2cm on A4 poster, 5cm x 5cm on A3
2. **Error Correction**: Set to "HIGH" (30%) - works even if damaged
3. **Color**: Use Yellow/Gold (#FFD700) with Black background for brand consistency
4. **Test**: Scan from 1 meter away before printing

### Step 3: Add Branding to QR Code
1. Add Yellows logo in center (most QR generators support this)
2. Add text: "SCAN TO WIN!" above QR code
3. Add text: "Instant Prizes!" below QR code

---

## 🖨️ POSTER DESIGN TIPS

### Poster Layout Recommendation:
```
┌─────────────────────────┐
│   [YELLOWS LOGO]        │
│                         │
│   SPIN & WIN!           │
│   INSTANT PRIZES        │
│                         │
│   ┌─────────────┐       │
│   │             │       │
│   │   QR CODE   │       │
│   │             │       │
│   └─────────────┘       │
│                         │
│   SCAN NOW!             │
│   FREE HOTDOG • £2 OFF  │
│   SECRET MENU ACCESS    │
└─────────────────────────┘
```

### Recommended Text:
**Headline**: "🌭 YELLOWS JACKPOT 🎰"
**Subheadline**: "Scan. Spin. Win Instantly!"
**Prizes List**:
- 🌭 Free Hotdog
- 💰 £2 Off Your Order
- 🍟 Bonus Fries
- 🤫 Secret Menu Access
- 🧀 Free Toppings

**Call to Action**: "👇 SCAN THIS QR CODE TO PLAY 👇"

---

## 🎯 TRACKING & ANALYTICS

### Google Analytics Setup (Optional but Recommended)
1. Go to [Google Analytics](https://analytics.google.com)
2. Create account for "Yellows Jackpot"
3. Get tracking ID (looks like: `G-XXXXXXXXXX`)
4. Add this code to `game-ultra.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Track These Metrics:
- Total page visits
- Form submissions (email captures)
- Spin button clicks
- Prize distribution
- Average session time
- Mobile vs Desktop usage

---

## 📍 QR CODE LOCATIONS

### HIGH TRAFFIC SPOTS (Priority):
1. ✅ **Storefront Window** - Eye level, 5cm QR code
2. ✅ **Counter/Till Area** - While customers wait
3. ✅ **Menu Board** - Next to prices
4. ✅ **Bathroom** - People have time to scan
5. ✅ **Table Tents** - On every table

### EXTERNAL MARKETING:
6. ✅ **Street Posters** - Within 500m radius of shop
7. ✅ **Instagram Stories** - Swipe up link
8. ✅ **Facebook Posts** - Pinned post
9. ✅ **TikTok Bio** - Link in bio
10. ✅ **Business Cards** - Hand out with orders

### DIGITAL MARKETING:
- Instagram Story with QR code
- Facebook post: "Spin to win!"
- TikTok video showing someone winning
- Email newsletter to existing customers
- WhatsApp Business status

---

## 🔒 SECURITY & BEST PRACTICES

### Prevent Abuse:
1. **Email Validation**: Already implemented ✅
2. **LocalStorage Check**: Prevents multiple spins from same device ✅
3. **Consider Adding**:
   - Daily spin limit per IP address
   - Prize code expiration (7 days)
   - Staff verification at redemption

### Privacy Compliance (GDPR/UK):
Add this text to form:
"By playing, you agree to receive promotional emails from Yellows. We'll never share your data. [Privacy Policy]"

Create simple privacy policy:
1. What data you collect: Name, Email
2. Why: To send prize codes and promotions
3. How long: 1 year
4. How to opt-out: Email [your-email]

---

## 📊 PRIZE CODE MANAGEMENT

### How to Track & Redeem:
1. Customer shows prize code on phone
2. Staff checks `localStorage` data OR
3. Use simple spreadsheet:
   - Column A: Prize Code
   - Column B: Prize Name
   - Column C: Redeemed? (Yes/No)
   - Column D: Date Redeemed

### Export Prize Data:
Open browser console (F12) on game page and run:
```javascript
console.log(localStorage.getItem('yellows_jackpot_data'));
```
Copy data to spreadsheet for tracking.

---

## 🛠️ ONGOING MAINTENANCE

### Weekly Tasks:
- [ ] Check QR codes aren't damaged/faded
- [ ] Review analytics (how many scans?)
- [ ] Check prize redemption rate
- [ ] Update social media with winners

### Monthly Tasks:
- [ ] Replace worn posters
- [ ] Adjust prize weights if needed
- [ ] Send email to all players with special offer
- [ ] Create "winner of the month" social post

### Update Prize Weights (in `game-ultra.js`):
```javascript
const PRIZES = [
    { name: "Free Topping", weight: 25 },  // ← Change these numbers
    { name: "£1 Off", weight: 20 },        // Higher = more common
    { name: "Free Hotdog", weight: 5 },    // Lower = more rare
];
```

---

## 📞 TECHNICAL SUPPORT

### Common Issues & Fixes:

**Issue**: QR code doesn't work
- **Fix**: Check URL is correct, test on multiple phones

**Issue**: Game won't load
- **Fix**: Check all files uploaded, check browser console for errors

**Issue**: Spinning doesn't work
- **Fix**: Clear browser cache, check JavaScript console

**Issue**: Too many people winning expensive prizes
- **Fix**: Reduce weight values for expensive prizes in `game-ultra.js`

**Issue**: Images not showing
- **Fix**: Check image filenames match exactly (case-sensitive)

---

## 🎉 LAUNCH CHECKLIST

### Pre-Launch (1 Week Before):
- [ ] Test game on iPhone
- [ ] Test game on Android
- [ ] Test game on desktop
- [ ] Print test QR code and scan from 1 meter
- [ ] Brief all staff on how to redeem prizes
- [ ] Set up analytics tracking
- [ ] Create social media posts
- [ ] Test all links work

### Launch Day:
- [ ] Post QR codes in all locations
- [ ] Post on Instagram/Facebook/TikTok
- [ ] Email existing customers
- [ ] Train staff to mention game to customers
- [ ] Monitor analytics hourly

### Day 2-7:
- [ ] Check analytics daily
- [ ] Post winner testimonials
- [ ] Adjust prize weights if needed
- [ ] Replace damaged QR codes
- [ ] Respond to customer questions

---

## 💰 BUDGET BREAKDOWN

### FREE Option (GitHub Pages):
- Hosting: **£0**
- Domain (optional): **£10/year**
- QR Code printing: **£5-20** (local print shop)
- **TOTAL: £0-30**

### Professional Option:
- Hosting (Netlify/Vercel): **£0**
- Custom domain: **£10-15/year**
- Professional posters (A3): **£30-50** (5-10 posters)
- Business cards with QR: **£20**
- Instagram ads: **£50-100/month** (optional)
- **TOTAL: £60-185** (first month)

---

## 📈 SUCCESS METRICS

### Track These KPIs:
1. **QR Code Scans**: Target 50-100/day
2. **Email Captures**: Target 30-50/day
3. **Conversion Rate**: Scan → Spin = 80%+
4. **Redemption Rate**: Spin → Claim = 60%+
5. **Social Shares**: Target 10-20/week
6. **New Customers**: Track increase in foot traffic

### Adjust Campaign If:
- Scans < 20/day → Make QR codes bigger, add more posters
- Redemption < 40% → Simplify redemption process
- Expensive prizes > 15% → Reduce their weight values

---

## 🔄 SCALING THE CAMPAIGN

### After 1 Month Success:
1. Add leaderboard: "Top winners this week"
2. Seasonal prizes: "Summer special items"
3. Referral system: "Invite friend, get bonus spin"
4. Daily challenges: "Spin between 12-2pm for 2x chances"
5. VIP tier: "Spin 5 times, unlock VIP wheel"

---

## 📧 SUPPORT CONTACTS

**Web Hosting Issues**:
- GitHub Pages: [GitHub Support](https://support.github.com)
- Netlify: [Netlify Support](https://netlify.com/support)

**Game Technical Issues**:
- Check browser console (F12)
- Test in incognito mode
- Clear cache and cookies

**Design Updates**:
- Edit CSS file for styling changes
- Edit HTML for content changes
- Re-upload to host

---

## ✅ FINAL NOTES

### This Campaign Will:
✅ Capture customer emails for marketing
✅ Increase foot traffic with prizes
✅ Create social media buzz
✅ Build customer loyalty
✅ Track customer behavior
✅ Generate excitement around your brand

### Remember:
- Keep QR codes clean and visible
- Monitor analytics weekly
- Respond to customer feedback
- Update prizes seasonally
- Have fun with it! 🌭🎰

---

**Questions?** Test everything first, then launch with confidence!

**Good luck with your campaign! 🚀🌭**
