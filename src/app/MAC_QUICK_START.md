# 🍎 Mac Quick Start - Fix Ollama CORS

## You're getting CORS errors? Here's the instant fix:

### ⚡ Fastest Fix (1 command)

Open **Terminal** and run this EXACT command (copy-paste it):

```bash
OLLAMA_ORIGINS=* ollama serve
```

⚠️ **IMPORTANT**: 
- Must be `OLLAMA_ORIGINS` (ALL CAPS - case sensitive!)
- Not `Ollama_ORIGINS` or `ollama_origins`
- No spaces around the `=` sign

✅ **That's it!** Keep Terminal open and refresh your browser.

---

## 🔒 Make it Permanent (30 seconds)

So you don't have to do this every time:

1. **Open Terminal**

2. **Run these 3 commands** (copy-paste all at once):

```bash
echo 'export OLLAMA_ORIGINS=*' >> ~/.zshrc
source ~/.zshrc
ollama serve
```

3. **Done!** Refresh your browser.

From now on, just run `ollama serve` and CORS will work automatically.

---

## ✅ Verify It's Working

After starting Ollama with CORS:

1. Refresh your browser
2. Open Console (Cmd+Option+J)
3. You should see: `✅ Ollama is available and CORS is enabled!`

---

## 🆘 Still Having Issues?

### Check if Ollama is running:
```bash
curl http://localhost:11434/api/tags
```

Should show your models (including `deepseek-r1:8b`).

### Check if environment variable is set:
```bash
echo $OLLAMA_ORIGINS
```

Should output: `*`

### If using bash instead of zsh:
```bash
echo 'export OLLAMA_ORIGINS=*' >> ~/.bash_profile
source ~/.bash_profile
ollama serve
```

---

## 📱 What This Does

- `OLLAMA_ORIGINS=*` tells Ollama to accept requests from your web browser
- Without it, browsers block the connection for security reasons
- Setting it in `~/.zshrc` makes it permanent

---

## 🚀 Next Steps

Once CORS is fixed, make sure you have DeepSeek R1 model:

```bash
ollama pull deepseek-r1:8b
```

Then you're ready to use StudyCopilot with local AI! 🎉
