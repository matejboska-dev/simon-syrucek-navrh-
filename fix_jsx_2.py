import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix <source> tags
content = re.sub(r'(<source[^>]*?)(?<!/)>', r'\1 />', content)

# Fix <style>...</style> by wrapping the inner content with {"..."}
def fix_style(match):
    inner = match.group(1)
    # We must properly escape backticks or quotes if we use string literals inside {}
    # Easiest way: use dangerouslySetInnerHTML
    # return f"<style dangerouslySetInnerHTML={{{{__html: `{inner}`}}}} />"
    # Actually, replacing it with a string literal in JSX works too, but dangerouslySetInnerHTML is safer.
    # To avoid React warnings or TS errors, dangerouslySetInnerHTML is best.
    
    # Wait, backticks inside inner? usually not. But let's just escape backticks and $
    inner_escaped = inner.replace('`', '\\`').replace('$', '\\$')
    return f"<style>{{`{inner_escaped}`}}</style>"

content = re.sub(r'<style>(.*?)</style>', fix_style, content, flags=re.DOTALL)

# Also fix the data-options which was garbled
# Original garbled data-options in line 1095:
# data-options="{" slug":"custom","name":"contact="" form","ajaxurl":"https:\="" \="" simon-syrucek.cz\="" wp-admin\="" admin-ajax.php", ...
# Let's just strip the data-options attribute altogether, or replace it with a valid string. It's just a WordPress form plugin artifact. Since this is a static react export, the form won't work out of the box anyway without a backend.
content = re.sub(r'data-options="\{".*?\}"=""', '', content)
content = re.sub(r'data-options=.*? data-steps="0"', 'data-steps="0"', content)

# Also there might be some other data-* attributes that got garbled like data-action="{" type":"popup" ... 
# if they are still there
content = re.sub(r'data-action="\{" type.*?\}"=""', '', content)

# Write back
with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
