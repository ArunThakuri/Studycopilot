# 🔧 Fix Ollama CORS Error - Mac Guide

## Problem
You're getting `TypeError: Failed to fetch` when trying to use Ollama locally because CORS (Cross-Origin Resource Sharing) is not enabled.

## What is CORS?
CORS is a security feature that browsers use to prevent websites from making requests to different domains. Since your web app runs in the browser and tries to connect to Ollama (running on localhost:11434), you need to enable CORS on Ollama.

---

## ✅ Solution for Mac (YOU ARE HERE)

### Option 1: Quick Test (Temporary - Current Terminal Session Only)

1. **Open Terminal**

2. **Stop Ollama if running** (Ctrl+C)

3. **Set environment variable and start Ollama**:
   ```bash
   OLLAMA_ORIGINS=* ollama serve
   ```

4. **Keep this Terminal window open** while using StudyCopilot

5. **Open a new Terminal tab** (Cmd+T) to continue working

6. **Refresh your browser** and try StudyCopilot again

### Option 2: Permanent (Recommended - Survives Restarts)

1. **Determine your shell** (run this in Terminal):
   ```bash
   echo $SHELL
   ```
   - If it says `/bin/zsh` → you're using **zsh** (default on modern Macs)
   - If it says `/bin/bash` → you're using **bash**

2. **Edit your shell profile**:
   
   **For zsh** (most common):
   ```bash
   nano ~/.zshrc
   ```
   
   **For bash**:
   ```bash
   nano ~/.bash_profile
   ```

3. **Add this line at the end**:
   ```bash
   export OLLAMA_ORIGINS=*
   ```

4. **Save and exit**:
   - Press `Ctrl+X`
   - Press `Y` to confirm
   - Press `Enter` to save

5. **Reload your profile**:
   
   **For zsh**:
   ```bash
   source ~/.zshrc
   ```
   
   **For bash**:
   ```bash
   source ~/.bash_profile
   ```

6. **Verify it's set**:
   ```bash
   echo $OLLAMA_ORIGINS
   ```
   Should output: `*`

7. **Restart Ollama**:
   ```bash
   ollama serve
   ```

8. **Refresh your browser**

---

## ✅ Solution (Windows)

### Option 1: Temporary (For Current Session Only)

1. **Stop Ollama** if it's running (Ctrl+C in CMD/PowerShell)

2. **Open Command Prompt (CMD)** or PowerShell

3. **Set the environment variable**:
   ```cmd
   set OLLAMA_ORIGINS=*
   ```

4. **Start Ollama**:
   ```cmd
   ollama serve
   ```

5. **Keep this window open** while using StudyCopilot

6. **Refresh your browser** and try again

### Option 2: Permanent (Recommended)

1. **Open System Environment Variables**:
   - Press `Win + R`
   - Type `sysdm.cpl` and press Enter
   - Go to "Advanced" tab
   - Click "Environment Variables"

2. **Add New System Variable**:
   - Under "System variables", click "New"
   - Variable name: `OLLAMA_ORIGINS`
   - Variable value: `*`
   - Click OK

3. **Restart Ollama**:
   - Close all Ollama processes
   - Open a **new** Command Prompt
   - Run: `ollama serve`

4. **Refresh your browser**

---

## ✅ Alternative: Run Ollama as Background Service (Mac)

If you want Ollama to start automatically and always have CORS enabled:

1. **Create a LaunchAgent**:
   ```bash
   nano ~/Library/LaunchAgents/com.ollama.serve.plist
   ```

2. **Paste this content**:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>Label</key>
       <string>com.ollama.serve</string>
       <key>ProgramArguments</key>
       <array>
           <string>/usr/local/bin/ollama</string>
           <string>serve</string>
       </array>
       <key>EnvironmentVariables</key>
       <dict>
           <key>OLLAMA_ORIGINS</key>
           <string>*</string>
       </dict>
       <key>RunAtLoad</key>
       <true/>
       <key>KeepAlive</key>
       <true/>
   </dict>
   </plist>
   ```

3. **Save** (Ctrl+X, Y, Enter)

4. **Load the service**:
   ```bash
   launchctl load ~/Library/LaunchAgents/com.ollama.serve.plist
   ```

5. **Ollama now runs in background** with CORS enabled!

---

## 🧪 Verify It's Working

After enabling CORS and starting Ollama:

1. **Open browser console** (F12)
2. **Check for this message**:
   ```
   ✅ Ollama is available and CORS is enabled!
   ```

3. **Try uploading a textbook image** in StudyCopilot

---

## ⚠️ Security Note

Setting `OLLAMA_ORIGINS=*` allows **any website** to access your local Ollama instance. 

For production or public networks, use:
```
OLLAMA_ORIGINS=http://localhost:3000,https://yourdomain.com
```

But for local development, `*` is fine and most convenient.

---

## 📋 Quick Checklist

- [ ] Stop Ollama
- [ ] Set `OLLAMA_ORIGINS=*` environment variable
- [ ] Start Ollama with `ollama serve`
- [ ] Refresh browser
- [ ] Check console for "✅ Ollama is available and CORS is enabled!"
- [ ] Test with image upload

---

## 🆘 Still Not Working?

### Check if Ollama is running:
```bash
curl http://localhost:11434/api/tags
```

Should return a list of models.

### Check environment variable:
```cmd
echo %OLLAMA_ORIGINS%     (Windows CMD)
echo $OLLAMA_ORIGINS      (Mac/Linux)
```

Should output: `*`

### Try restarting your computer
Sometimes environment variables need a full restart to take effect.

### Check firewall
Make sure Windows Firewall isn't blocking Ollama on port 11434.

---

## ✨ Next Steps

Once CORS is fixed, make sure you have the DeepSeek R1 model installed:

```bash
ollama pull deepseek-r1:8b
```

Then refresh your browser and you're ready to go! 🚀
