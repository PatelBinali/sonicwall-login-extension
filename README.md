# sonicwall-login-extension# 🔐 One-Click SonicWall Auto Login Extension

This Chrome Extension allows you to **automatically log in** to your **SonicWall network login page** (`https://192.168.11.254:4333/...`) with saved credentials.

No need to manually enter your username and password each time you open Chrome — the extension does it all for you!

---

## 🚀 Features

* ✅ **One-click login** from extension icon
* ♻ **Auto-login on Chrome startup**
* 🧠 **Remembers credentials** in local storage
* 🔐 **Only runs on your internal IP URL**
* 💡 **Manual entry via popup** (in case you want to set or change credentials)

---

## 🗖 Installation Instructions

### 1. Clone or Download the Extension

Download the folder or clone it:

```bash
git clone https://your-repo-url.git
```

Or manually unzip the files into a local directory.

---

### 2. Load the Extension in Chrome

1. Open Chrome and go to: `chrome://extensions`
2. Enable **Developer Mode** (top right)
3. Click **"Load unpacked"**
4. Select the folder containing:

   * `manifest.json`
   * `background.js`
   * `content.js`
   * `popup.html`
   * `popup.js`
   * `icon.png`

---

## 🔧 How It Works

### ✅ On Clicking the Extension Icon:

* Opens SonicWall tab (if not already open)
* Auto-fills saved username/password
* If not saved, prompts for input and stores credentials

### ⚙️ On Chrome Startup:

* Checks if SonicWall tab is open
* If not, **automatically opens it**
* If credentials are saved, it **logs in automatically**
* If not, prompts for them

---

## 📋 Files Overview

| File            | Purpose                              |
| --------------- | ------------------------------------ |
| `manifest.json` | Extension configuration              |
| `background.js` | Core logic to control tab/login flow |
| `content.js`    | Fills login form and clicks login    |
| `popup.html`    | Simple form to save credentials      |
| `popup.js`      | Logic to save username/password      |
| `icon.png`      | Extension icon                       |

---

## 🧪 Test It

1. Click the extension icon — it should open (or switch to) your SonicWall login page.
2. If credentials are saved → auto-login happens.
3. If not → you're prompted to enter them → they’re saved and login continues.
4. Next time you open Chrome — login will happen automatically!

---

## 🔐 Security Note

* Credentials are stored **only locally** using `chrome.storage.local`.
* This extension **only works** on your local SonicWall login URL (`192.168.11.254`).
* You can clear or update credentials using the popup anytime.

---

## 👩‍💻 Developed by

**Binali Patel**

---
