import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix srcset -> srcSet
content = content.replace('srcset="', 'srcSet="')

# Fix xmlns:xlink -> xmlnsXlink
content = content.replace('xmlns:xlink="', 'xmlnsXlink="')

# Fix enable-background -> enableBackground
content = content.replace('enable-background="', 'enableBackground="')

# Fix xml:space -> xmlSpace
content = content.replace('xml:space="', 'xmlSpace="')

# Fix autoPlay="" muted="" loop=""
content = content.replace('autoPlay=""', 'autoPlay')
content = content.replace('muted=""', 'muted')
content = content.replace('loop=""', 'loop')

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Add reference to global.d.ts in App.tsx or tsconfig.json
# Wait, Vite's vite-env.d.ts is automatically included. I can append the declaration there.
with open('src/vite-env.d.ts', 'a', encoding='utf-8') as f:
    f.write('\n\ndeclare namespace JSX {\n  interface IntrinsicElements {\n    "lite-youtube": any;\n  }\n}\n')
