# 📸 VISUAL DEPLOYMENT GUIDE - STEP BY STEP

## 🎯 OPTION 1: NETLIFY (EASIEST - 5 MINUTES)

---

### STEP 1: GO TO NETLIFY
```
🌐 Open browser → Type: netlify.com
📍 Click: "Sign Up" (top right corner)
```

**What you'll see:**
- Big green "Sign Up" button
- Options: GitHub, GitLab, Bitbucket, or Email

**What to do:**
- Click "Sign up with email"
- Enter your email address
- Create a password
- Verify email (check inbox)

---

### STEP 2: DEPLOY YOUR SITE

**What you'll see after login:**
- Big box in the middle of screen
- Text: "Want to deploy a new site without connecting to Git? Drag and drop your site folder here"

**What to do:**
1. Open File Explorer
2. Navigate to: `Desktop → Yellows → Posters → Game`
3. Click on the "Game" folder (don't open it)
4. Drag the entire folder to your browser
5. Drop it on the Netlify box

**What happens:**
- Upload progress bar appears
- "Deploying site..." message
- Wait 30-60 seconds
- Success! Green checkmark appears

---

### STEP 3: GET YOUR URL

**What you'll see:**
- Your new site URL at the top
- Example: `https://cosmic-hotdog-abc123.netlify.app`

**What to do:**
1. Click the URL to test it
2. Your game should open!
3. Copy the full URL (you'll need it for QR codes)

**Test it:**
- Click the URL
- You should see: "Ready to Reveal the HOTTEST BITE IN TOWN?"
- Your poster background should be visible
- ✅ SUCCESS!

---

### STEP 4: CHANGE SITE NAME (OPTIONAL)

**What you'll see:**
- Random site name like "cosmic-hotdog-abc123"

**What to do:**
1. Click "Site settings"
2. Click "Change site name"
3. Type: `yellows-jackpot` (or any name you want)
4. Click "Save"
5. New URL: `https://yellows-jackpot.netlify.app`

---

## 📱 STEP 5: CREATE QR CODES

---

### GO TO QR GENERATOR

```
🌐 Open new tab → Type: qr-code-generator.com
```

**What you'll see:**
- QR code generator interface
- Dropdown menu: "URL"

---

### CREATE POSTER 1 QR CODE

**What to do:**
1. Make sure "URL" is selected
2. In the text box, paste:
```
https://yellows-jackpot.netlify.app/game.html?loc=poster1&campaign=launch2025
```
3. Click "Create QR Code"

**Download settings:**
- Format: PNG
- Size: 1000 x 1000 pixels (or higher)
- Click "Download"

**File name:**
- Save as: `yellows-qr-poster1.png`

---

### CREATE POSTER 2 QR CODE

**Repeat the process:**
1. Clear the previous URL
2. Paste:
```
https://yellows-jackpot.netlify.app/game.html?loc=poster2&campaign=launch2025
```
3. Create QR Code
4. Download
5. Save as: `yellows-qr-poster2.png`

---

### CREATE LOCATION-SPECIFIC QR CODES

**For Arndale Food Hall:**
```
https://yellows-jackpot.netlify.app/game.html?loc=arndale&campaign=launch2025
```
Save as: `yellows-qr-arndale.png`

**For Instagram:**
```
https://yellows-jackpot.netlify.app/game.html?loc=instagram&campaign=launch2025
```
Save as: `yellows-qr-instagram.png`

**For Table Tents:**
```
https://yellows-jackpot.netlify.app/game.html?loc=tabletent&campaign=launch2025
```
Save as: `yellows-qr-table.png`

---

## 🎨 STEP 6: ADD QR CODES TO POSTERS

---

### IN PHOTOSHOP/CANVA:

1. Open your poster design file
2. File → Place → Select your QR code PNG
3. Position QR code (recommended: top center)
4. Size: At least 5cm x 5cm for printed posters
5. Add text near QR: "SCAN TO PLAY & WIN!"

**QR Code Placement Tips:**
- Keep it visible and prominent
- Don't cover it with other design elements
- Leave white space around it (for scanning)
- Test scan with your phone BEFORE printing

---

## ✅ STEP 7: TEST EVERYTHING

---

### TEST ON YOUR PHONE:

1. **Open camera app**
2. **Point at QR code on screen** (or printed test)
3. **Notification appears** - "Open in Safari/Chrome"
4. **Tap notification**

**What should happen:**
1. Game loads (poster background visible)
2. "Ready to Reveal the HOTTEST BITE IN TOWN?" appears
3. Form with Name and Email fields
4. "Play & Spin" button

5. **Enter test info:**
   - Name: Test User
   - Email: test@test.com
6. **Click "Play & Spin"**

**What should happen:**
1. Screen transitions to wheel
2. "Ready to Win, Test User?" appears
3. Colorful spin wheel shows
4. "TAP TO SPIN!" button pulses

7. **Click "TAP TO SPIN!"**

**What should happen:**
1. Wheel spins (4 seconds)
2. Confetti falls
3. "CONGRATULATIONS! 🎉" appears
4. Prize shows (e.g., "🧀 Free Topping")
5. Prize code shows (e.g., "YLW-ABC123")
6. Buttons: "Show to Staff", "Follow Instagram", "Share"

✅ **IF ALL THIS WORKS → YOU'RE READY TO LAUNCH!**

---

## 👥 STEP 8: SETUP STAFF PORTAL

---

### SHOW YOUR STAFF:

1. Go to: `https://yellows-jackpot.netlify.app/staff.html`

**What they'll see:**
- Black background
- "🌭 YELLOWS Staff Portal" header
- "Prize Redemption" section
- Text input: "Enter Prize Code"
- "✓ Redeem Prize" button

### STAFF TRAINING (5 MINUTES):

**When customer comes with prize:**

1. Customer shows phone with prize code
2. Staff types code exactly (e.g., `YLW-ABC123`)
3. Staff clicks "Redeem Prize"

**If code is valid:**
- ✅ Green message: "Success! Redeemed: Free Topping for John Doe"
- Give customer their prize

**If code is invalid:**
- ❌ Red message: "Invalid prize code"

**If code already used:**
- ❌ Red message: "Already redeemed on [date]"

---

## 📊 STEP 9: SETUP ADMIN DASHBOARD

---

### ACCESS YOUR DASHBOARD:

Go to: `https://yellows-jackpot.netlify.app/admin.html`

**What you'll see:**
- Real-time statistics cards
- Prize distribution chart
- Scans over time chart
- User database table
- Prize configuration section

### DAILY MONITORING:

**Check these stats:**
- Total Users (how many people played)
- Prizes Won (total prizes given)
- Redeemed Prizes (how many claimed)
- QR Scans (total scans from posters)
- Instagram Follows (social engagement)

**Track performance:**
- Which locations get most scans?
- What time of day is busiest?
- Which devices are people using?
- What's the redemption rate?

### EXPORT DATA:

1. Click "📊 Export Data" button (top right)
2. JSON file downloads
3. Save weekly for backup

---

## 🎉 LAUNCH CHECKLIST

---

### BEFORE YOU PRINT:

- [ ] Tested game on your phone
- [ ] All screens work (landing → spin → prize)
- [ ] Wheel spins smoothly
- [ ] Prize codes generate correctly
- [ ] QR code scans and opens game
- [ ] Staff portal tested
- [ ] Admin dashboard accessible

### BEFORE YOU GO LIVE:

- [ ] QR codes added to poster designs
- [ ] Posters printed (test one first!)
- [ ] Staff trained on redemption
- [ ] Staff have access to staff.html
- [ ] You have admin.html bookmarked
- [ ] Instagram link updated in bio
- [ ] Social media posts ready

### LAUNCH DAY:

- [ ] Hang posters in high-traffic areas
- [ ] Post on Instagram/TikTok/Facebook
- [ ] Tell staff campaign is live
- [ ] Monitor admin dashboard
- [ ] Be ready for questions

---

## 📍 RECOMMENDED QR CODE LOCATIONS

---

### PHYSICAL LOCATIONS:
1. **Window Display** - Main poster with QR
2. **Arndale Food Hall** - A-frame sign with QR
3. **Counter** - Table tent with QR
4. **Receipts** - Print QR on receipts
5. **Takeaway Bags** - Sticker with QR

### DIGITAL LOCATIONS:
1. **Instagram Bio** - Link to game
2. **Instagram Stories** - "Swipe up" to game
3. **Facebook Page** - Pinned post with QR
4. **TikTok Bio** - Link to game
5. **Google Business** - Add link to profile

---

## 💡 PRO TIPS

---

### MAXIMIZE SCANS:

1. **Call to Action**: "SCAN TO WIN FREE FOOD!"
2. **Visual Arrow**: Point to QR code
3. **Urgency**: "Limited time only!"
4. **Social Proof**: "1,000+ prizes won!"

### TRACK PERFORMANCE:

1. Use different `?loc=` parameters for each poster
2. Check admin daily to see top performers
3. Move low-performing posters to better spots
4. Update prizes mid-campaign if needed

### BOOST ENGAGEMENT:

1. Post winners on Instagram Stories
2. Create hashtag #YellowsHotdogJackpot
3. Repost customer prize photos
4. Offer extra prize for Instagram follow

---

## 🚨 COMMON ISSUES & FIXES

---

### QR CODE WON'T SCAN:

**Fix:**
- Make QR at least 2cm x 2cm
- Ensure high contrast (black on white)
- Don't distort or compress
- Leave white border around it
- Test before printing all copies

### GAME LOADS SLOWLY:

**Fix:**
- Images are large (poster1.jpg, poster2.jpg)
- Compress images (use tinypng.com)
- Re-upload to Netlify

### WHEEL DOESN'T SPIN:

**Fix:**
- Clear browser cache
- Try different browser
- Check JavaScript console for errors
- Ensure game.js uploaded correctly

### PRIZE CODE NOT WORKING IN STAFF PORTAL:

**Fix:**
- Code is case-sensitive (must match exactly)
- Check for typos
- Ensure code hasn't been redeemed already
- Refresh staff portal page

---

## 📞 GETTING HELP

---

### SELF-HELP:

1. Read DEPLOYMENT-GUIDE.md (detailed guide)
2. Read README.md (technical docs)
3. Check browser console (F12 → Console tab)
4. Test on different devices

### DEBUGGING:

**Open browser console:**
- Chrome: F12 or Right-click → Inspect → Console
- Safari: Develop → Show JavaScript Console
- Look for red error messages

---

## ✅ YOU'RE DONE!

---

**Your campaign is ready to launch! 🎉**

1. ✅ Site deployed to Netlify
2. ✅ QR codes created
3. ✅ Staff trained
4. ✅ Admin dashboard setup
5. ✅ Everything tested

**Next steps:**
1. Add QR codes to poster designs
2. Print posters (test one first!)
3. Launch campaign
4. Monitor performance
5. Celebrate success! 🌭🎰

---

**Made with ❤️ for Yellows Hotdog Shop**
**Good luck with your campaign!**
