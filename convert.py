import re
import os

def kebab_to_camel(match):
    return match.group(1).upper()

def convert_style_to_jsx(match):
    style_str = match.group(1)
    # Split by semicolon
    rules = [r.strip() for r in style_str.split(';') if r.strip()]
    obj_props = []
    for rule in rules:
        if ':' in rule:
            key, val = rule.split(':', 1)
            key = key.strip()
            val = val.strip()
            # Convert key to camelCase
            key = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), key)
            obj_props.append(f"{key}: '{val}'")
    return "style={{" + ", ".join(obj_props) + "}}"

def html_to_jsx(html):
    # Change class to className
    html = html.replace('class="', 'className="')
    # Change for to htmlFor
    html = html.replace('for="', 'htmlFor="')
    # Close self-closing tags
    tags_to_close = ['img', 'input', 'br', 'hr']
    for tag in tags_to_close:
        # We need to make sure we don't double close if it's already closed
        html = re.sub(r'(<'+tag+r'\b[^>]*?)(?<!/)>', r'\1 />', html)
    
    # SVG attributes
    svg_attrs = ['fill-rule', 'clip-path', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'clip-rule']
    for attr in svg_attrs:
        camel = re.sub(r'-([a-z])', kebab_to_camel, attr)
        html = html.replace(attr + '="', camel + '="')
    
    # Inline styles
    html = re.sub(r'style="([^"]*)"', convert_style_to_jsx, html)
    
    # Comments
    html = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', html, flags=re.DOTALL)
    
    # React specific video attributes
    html = html.replace('autoplay=', 'autoPlay=')
    html = html.replace('playsinline=""', 'playsInline')
    html = html.replace('playsinline="true"', 'playsInline')
    html = html.replace('playsinline=', 'playsInline=')
    html = html.replace('controlslist=', 'controlsList=')
    html = html.replace('muted="true"', 'muted')
    html = html.replace('autoplay="true"', 'autoPlay')
    html = html.replace('loop="true"', 'loop')
    
    # Some other attributes
    html = html.replace('tabindex=', 'tabIndex=')
    html = html.replace('autocomplete=', 'autoComplete=')
    html = html.replace('maxlength=', 'maxLength=')
    
    return html

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract head content
    head_match = re.search(r'<head>(.*?)</head>', content, re.DOTALL)
    head_content = head_match.group(1) if head_match else ""
    
    # We want to remove Google Tag Manager script from head for now or keep it, but it might break in public/index.html if not careful.
    # Actually, we can just put it in public/index.html.

    # Extract body content
    body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL)
    body_content = body_match.group(1) if body_match else ""

    # Clean up <script> tags inside body that might contain unescaped content that breaks JSX
    # There might be inline scripts in the body?
    body_content = re.sub(r'<script.*?>.*?</script>', '', body_content, flags=re.DOTALL)

    # Convert body to JSX
    jsx_content = html_to_jsx(body_content)

    # Wrap in App component
    app_tsx = f"""import React from 'react';

function App() {{
  return (
    <>
      {jsx_content}
    </>
  );
}}

export default App;
"""

    with open('src/App.tsx', 'w', encoding='utf-8') as f:
        f.write(app_tsx)

    # Update public/index.html
    # We'll use the one created by Vite, but add our head content.
    vite_index_path = 'vite_index.html'
    if os.path.exists(vite_index_path):
        with open(vite_index_path, 'r', encoding='utf-8') as f:
            vite_index = f.read()
        
        # Insert head_content before </head>
        vite_index = vite_index.replace('</head>', head_content + '\n  </head>')
        
        # Write back to index.html
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(vite_index)

if __name__ == '__main__':
    main()
