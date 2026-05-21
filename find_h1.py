import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('src/App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()
start = text.find('<h1 id="animated-text"')
print(text[start:start+500])
