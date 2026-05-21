import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove unused React import
content = content.replace("import React from 'react';\n", '')

# Fix playsInline on div
content = re.sub(r'(<div[^>]*?) playsInline([^>]*?>)', r'\1\2', content)

# Add lite-youtube declaration
decl = """
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lite-youtube': any;
    }
  }
}

"""
content = decl + content

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
