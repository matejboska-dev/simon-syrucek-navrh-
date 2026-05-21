import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('artem-saykin.cz', 'simon-syrucek.cz')
content = content.replace('artem_saykin', 'simon_syrucek')
content = content.replace('Artem Saykin', 'Šimon Syruček')

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced artem in App.tsx")
