import os
import glob
import re

# 1. Replace Artem in all public/css and public/js files
for ext in ['css', 'js']:
    for filepath in glob.glob(f'public/{ext}/**/*.{ext}', recursive=True):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace
        new_content = content.replace('artem-saykin', 'simon-syrucek')
        new_content = new_content.replace('artem_saykin', 'simon_syrucek')
        new_content = new_content.replace('Artem Saykin', 'Šimon Syruček')
        new_content = new_content.replace('Artem', 'Šimon')
        new_content = new_content.replace('artem', 'simon')
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

# 2. Extract scripts from original index.html
original_html = open(r'C:\Users\matej\Desktop\saveweb2zip-com-artem-saykin-cz\index.html', encoding='utf-8').read()

# Extract script src tags
src_scripts = re.findall(r'<script\s+src="([^"]+)"\s*(?:defer=""|defer)?></script>', original_html)

# Extract inline scripts
inline_scripts = re.findall(r"<script>document.addEventListener\('DOMContentLoaded',\s*function\(\)\{\s*(.*?)\s*\}\)\s*</script>", original_html, re.DOTALL)
inline_scripts.extend(re.findall(r'<script>\s*(const textEl.*?)\s*</script>', original_html, re.DOTALL))

# 3. Add src_scripts to Vite index.html
vite_index_path = 'index.html'
with open(vite_index_path, 'r', encoding='utf-8') as f:
    vite_index = f.read()

# Remove old scripts if any (just in case)
# We will just inject them before </body>
scripts_html = '\n'.join([f'<script src="{src}"></script>' for src in src_scripts])
if scripts_html not in vite_index:
    vite_index = vite_index.replace('</body>', f'{scripts_html}\n  </body>')
    # Also add the Google font that was commented out
    font_html = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap">'
    if font_html not in vite_index:
        vite_index = vite_index.replace('</head>', f'  {font_html}\n  </head>')
    
    with open(vite_index_path, 'w', encoding='utf-8') as f:
        f.write(vite_index)

# 4. Add inline scripts to App.tsx useEffect
app_tsx_path = 'src/App.tsx'
with open(app_tsx_path, 'r', encoding='utf-8') as f:
    app_tsx = f.read()

# Create useEffect block
# Since there might be some missing globals (BreakdanceEntrance, BreakdanceSwiper, etc.), we ignore TS errors
use_effect_body = '\n'.join(inline_scripts)
# Wrap in setTimeout to ensure React has fully rendered the DOM before these libraries try to manipulate it
use_effect_code = f"""
  import {{ useEffect }} from 'react';
  
  function App() {{
    useEffect(() => {{
      setTimeout(() => {{
        {use_effect_body}
      }}, 500);
    }}, []);
"""

if 'import { useEffect }' not in app_tsx:
    app_tsx = app_tsx.replace('function App() {', use_effect_code.replace("  import { useEffect } from 'react';\n", ""))
    app_tsx = "import { useEffect } from 'react';\n" + app_tsx
    with open(app_tsx_path, 'w', encoding='utf-8') as f:
        f.write(app_tsx)

print("Done restoring scripts and replacing Artem.")
