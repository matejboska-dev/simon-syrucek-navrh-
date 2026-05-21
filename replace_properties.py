import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

property_listing = """<article className="bde-loop-item ee-post swiper-slide">
<a className="bde-container-link-141-100-8577-141-1 bde-container-link cursor-zone bde-container-link-141-100 breakdance-link" href="#" target="_self" data-type="url" data-cursor="arrow">
<img className="bde-image2-141-101-8577-141-1 bde-image2 bde-image2-141-101" src="images/pozemek.jpg" loading="lazy" /><div className="bde-div-141-102-8577-141-1 bde-div bde-div-141-102">
<h3 className="bde-heading-141-121-8577-141-1 bde-heading bde-heading-141-121">
7 090 000 Kč
</h3><div className="bde-text-141-107-8577-141-1 bde-text bde-text-141-107">
Prodej pozemku 658 m², Kozojedy (ID 061-NP03220)
</div>
</div>
</a>    </article>"""

# Find the start of the wrapper
start_loop = text.find('<div className="bde-loop bde-loop-slider ee-posts ee-posts-slider swiper-wrapper">')
if start_loop != -1:
    # Find the closing tag of the wrapper, which is before the <div className="swiper-pagination"></div>
    # Actually, we can just find the end of the swiper wrapper loop
    end_loop = text.find('</div></div></div><div className="swiper-pagination"></div>', start_loop)
    if end_loop != -1:
        wrapper_open_end = text.find('>', start_loop) + 1
        text = text[:wrapper_open_end] + '\n' + property_listing + '\n' + text[end_loop:]

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Properties replaced successfully.")
