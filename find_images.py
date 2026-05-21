import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

images = re.findall(r'<img[^>]*src=[\'"]([^\'"]+)[\'"]', text)
print(images)

