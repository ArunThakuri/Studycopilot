# 🔍 Check Ollama Environment Variable

## Quick Diagnostic

Open a **NEW Terminal tab** (keep Ollama running in the other tab) and run:

```bash
ps aux | grep ollama
```

This will show the running Ollama process and its environment.

---

## The Problem in Your Screenshot

I can see you ran:
```bash
Ollama_ORIGINS=* ollama serve
```

❌ **Wrong!** - Mixed case `Ollama_ORIGINS`

✅ **Correct** - All caps `OLLAMA_ORIGINS`

---

## Fix It Now

1. **Stop Ollama** (Ctrl+C in your current terminal)

2. **Run this EXACT command** (copy-paste it):

```bash
OLLAMA_ORIGINS=* ollama serve
```

Make sure:
- It's `OLLAMA_ORIGINS` (all uppercase)
- There's no space around the `=` sign
- The `*` is there

3. **Refresh your browser**

You should now see requests succeeding instead of 403 errors!

---

## Verify It's Working

In the Ollama terminal, you should see:
- `200` status codes (success) instead of `403` (forbidden)
- Requests completing successfully

In your browser console:
- `✅ Ollama is available and CORS is enabled!`

---

## Make It Permanent

Once it's working, make it permanent:

```bash
echo 'export OLLAMA_ORIGINS=*' >> ~/.zshrc
source ~/.zshrc
```

Then you can just run `ollama serve` and it will always work! 🎉
