import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add classes to body
content = content.replace('<body>', '<body class="home wp-singular page-template-default page page-id-16 wp-theme-breakdance-zero breakdance">')

# Make sure all local css and js paths start with a slash
# CSS
content = re.sub(r'href="css/', 'href="/css/', content)
# JS
content = re.sub(r'src="js/', 'src="/js/', content)
# Images (favicon, etc)
content = re.sub(r'href="images/', 'href="/images/', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html")
