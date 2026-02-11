# 📦 R1 Arcade Cabinet - Deployment Guide

Complete instructions for deploying your R1 Arcade Cabinet Creation to the Rabbit R1 device.

---

## 🌐 Step 1: Host Your Creation

R1 Creations require web hosting. Choose one of these free options:

### Option A: GitHub Pages (Recommended)

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` / Root
   - Click "Save"

2. **Your URL will be**:
   ```
   https://jjames1992.github.io/r1-arcade-cabinet/
   ```

3. **Wait 2-3 minutes** for deployment to complete

### Option B: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. "New site from Git" → Select this repository
4. Deploy settings:
   - Branch: `main`
   - Publish directory: `/` (root)
5. Click "Deploy site"

### Option C: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import this GitHub repository
3. Framework Preset: "Other"
4. Root Directory: `./`
5. Deploy

---

## 📱 Step 2: Generate QR Code for R1 Installation

### Using Rabbit's Official QR Generator

1. **Visit the Creations SDK QR Tool**:
   ```
   https://github.com/rabbit-hmi-oss/creations-sdk/tree/main/qr
   ```

2. **Clone the QR generator locally** (or use online tool):
   ```bash
   git clone https://github.com/rabbit-hmi-oss/creations-sdk.git
   cd creations-sdk/qr
   ```

3. **Fill in the creation metadata**:
   - **Name**: "R1 Arcade Cabinet"
   - **Description**: "Retro arcade game collection - 10 games with Japanese aesthetic"
   - **URL**: Your hosting URL (e.g., `https://jjames1992.github.io/r1-arcade-cabinet/`)
   - **Icon URL**: (optional) Direct link to a 512x512 icon image

4. **Generate the QR code**

### Alternative: Online QR Generator

If you prefer an online tool:

1. Go to any QR code generator (e.g., qr-code-generator.com)
2. Enter your hosted URL
3. Generate and download the QR code
4. **Note**: Rabbit's official QR tool includes creation metadata for better R1 integration

---

## 🔧 Step 3: Install on Rabbit R1 Device

### Installation Process

1. **On your R1 device**:
   - Navigate to the **Creations card**
   - Tap **"Add via QR code"**

2. **Scan the QR code** you generated

3. **Confirm installation**:
   - Creation name and description will appear
   - Tap "Install"

4. **Access your arcade**:
   - Scroll to bottom of your card stack
   - Your "R1 Arcade Cabinet" card is now available!

---

## 🎮 Step 4: Testing the Creation

### Hardware Controls

| Control | Action |
|---------|--------|
| **Scroll Wheel Up** | Navigate menu up |
| **Scroll Wheel Down** | Navigate menu down |
| **PTT Button Click** | Select/Launch game |
| **PTT Hold (5 sec)** | Exit game, return to menu |

### Browser Testing (Before R1 Deploy)

Test locally in your browser (240x282 window):

```bash
# Serve locally
python -m http.server 8000
# or
npx serve .
```

Open browser at `http://localhost:8000` and resize to 240x282

**Simulate R1 Controls** in Browser Console:
```javascript
// Simulate scroll up
window.dispatchEvent(new Event('scrollUp'));

// Simulate scroll down
window.dispatchEvent(new Event('scrollDown'));

// Simulate PTT click
window.dispatchEvent(new Event('sideClick'));

// Simulate long press start
window.dispatchEvent(new Event('longPressStart'));

// Simulate long press end
window.dispatchEvent(new Event('longPressEnd'));
```

---

## 🐛 Troubleshooting

### QR Code Not Working

- **Verify URL is publicly accessible**
  - Open URL in incognito/private browser
  - Check for HTTPS (GitHub Pages/Netlify/Vercel provide this automatically)

- **Regenerate QR code**
  - Ensure no typos in URL
  - Use Rabbit's official QR generator for metadata

### Creation Not Loading on R1

- **Check browser console** (if testable in browser):
  - Look for JavaScript errors
  - Verify R1 SDK events are being logged

- **Verify viewport meta tag**:
  ```html
  <meta name="viewport" content="width=240, height=282, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  ```

- **Check file size**:
  - R1 Creations have limited storage
  - Keep total assets under 5MB

### Scroll Wheel Not Responding

- Ensure event listeners are registered:
  ```javascript
  window.addEventListener('scrollUp', handler);
  window.addEventListener('scrollDown', handler);
  ```

- Check for JavaScript errors blocking execution

---

## 📊 Deployment Checklist

- [ ] Repository hosted (GitHub Pages/Netlify/Vercel)
- [ ] URL is publicly accessible (HTTPS)
- [ ] QR code generated with creation metadata
- [ ] Tested in browser at 240x282 resolution
- [ ] R1 SDK events working (scroll, PTT)
- [ ] index.html loads without errors
- [ ] Menu navigation functional
- [ ] Game placeholders render correctly
- [ ] 5-second PTT hold exits games
- [ ] QR code scanned on R1 device
- [ ] Creation installed successfully
- [ ] Hardware controls responsive on R1

---

## 🔗 Useful Resources

- **Rabbit R1 Creations Gallery**: https://www.rabbit.tech/creations
- **Official SDK Repository**: https://github.com/rabbit-hmi-oss/creations-sdk
- **Creations Documentation**: https://www.rabbit.tech/support/article/how-to-use-r1-creations
- **GitHub Pages Guide**: https://pages.github.com/
- **Netlify Docs**: https://docs.netlify.com/

---

## 🎯 Next Steps

Once deployed:

1. **Test all menu navigation**
2. **Implement actual game logic** (currently placeholders)
3. **Add high score persistence** using `window.creationStorage` API
4. **Optimize assets** for R1 performance
5. **Share your creation** in Rabbit community!

---

**Made with ❤️ for Rabbit R1** | [View Repository](https://github.com/JJames1992/r1-arcade-cabinet)
