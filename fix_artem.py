import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Replace animated text
new_animated = '<h1 id="animated-text" className="bde-heading-16-931 bde-heading">'
name = "Šimon Syruček"
delay = 0.0
for char in name:
    if char == ' ':
        new_animated += '<span style={{animationDelay: \'0.5s\'}}>\u00A0</span>'
    else:
        new_animated += f'<span style={{{{animationDelay: \'{delay:.1f}s\'.replace(\'.0s\', \'s\')}}}}>{{char}}</span>'
    delay += 0.1
new_animated += '</h1>'

text = re.sub(r'<h1 id="animated-text".*?</h1>', new_animated, text, flags=re.DOTALL)

# 2. Replace Artem's photo
text = text.replace('images/P1412157-768x1152.jpg', 'images/simon-syrucek-2.jpg')
text = text.replace('images/P1412157.jpg', 'images/simon-syrucek-2.jpg')

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replacement complete.")
