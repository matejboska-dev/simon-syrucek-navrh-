import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix data-action="{" type":"slider" ... }"="" issues.
# Find instances where JSON in data-action is messed up.
# e.g., data-action="{" type":"slider","slideroptions":{"elementid":"bde-advancedslider-16-845","actiontype":"previous"}}"=""
# Or even simpler: we just replace anything that looks like that string literally, or use a broad regex:
content = re.sub(r'data-action="\{" type":"([^"]+)","([^"]+)options":\{"([^"]+)":"([^"]+)","([^"]+)":"([^"]+)"\}\}"=""',
                 r"data-action='{\"type\":\"\1\",\"\2options\":{\"\3\":\"\4\",\"\5\":\"\6\"}}'",
                 content)

# Fix style={{}} for empty styles (which might be in <span data-style={{}}...>)
content = content.replace('data-style={{}}', 'data-style="{}"')
content = content.replace('data-action="{" type":"slider","slideroptions":{"elementid":"bde-advancedslider-16-845","actiontype":"previous"}}"=""', r"data-action='{\"type\":\"slider\",\"slideroptions\":{\"elementid\":\"bde-advancedslider-16-845\",\"actiontype\":\"previous\"}}'")
content = content.replace('data-action="{" type":"slider","slideroptions":{"elementid":"bde-advancedslider-16-845","actiontype":"next"}}"=""', r"data-action='{\"type\":\"slider\",\"slideroptions\":{\"elementid\":\"bde-advancedslider-16-845\",\"actiontype\":\"next\"}}'")
content = content.replace('data-action="{" type":"popup","popupoptions":{"popupid":"525","popupaction":"open"}}"=""', r"data-action='{\"type\":\"popup\",\"popupoptions\":{\"popupid\":\"525\",\"popupaction\":\"open\"}}'")

# Also fix attributes that do not have values like `allowfullscreen=""` -> `allowFullscreen`
content = content.replace('allowfullscreen=""', 'allowFullScreen')
content = content.replace('frameborder="0"', 'frameBorder="0"')

# Write back
with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
