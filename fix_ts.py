import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix ifill to fill
content = content.replace('ifill="', 'fill="')

# Fix required="" to required
content = content.replace('required=""', 'required')

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Add lite-youtube to global types
global_types = """declare namespace JSX {
  interface IntrinsicElements {
    "lite-youtube": any;
  }
}
"""
with open('src/global.d.ts', 'w', encoding='utf-8') as f:
    f.write(global_types)
