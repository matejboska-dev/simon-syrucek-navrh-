import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Replace animated text
old_animated = r'<h1 id="animated-text" className="bde-heading-16-931 bde-heading"><span style=\{\{animationDelay: \'0s\'\}\}>A</span><span style=\{\{animationDelay: \'0\.1s\'\}\}>r</span><span style=\{\{animationDelay: \'0\.2s\'\}\}>t</span><span style=\{\{animationDelay: \'0\.3s\'\}\}>e</span><span style=\{\{animationDelay: \'0\.4s\'\}\}>m</span><span style=\{\{animationDelay: \'0\.5s\'\}\}>A</span><span style=\{\{animationDelay: \'0\.6s\'\}\}>S</span><span style=\{\{animationDelay: \'0\.7s\'\}\}>a</span><span style=\{\{animationDelay: \'0\.8s\'\}\}>y</span><span style=\{\{animationDelay: \'0\.9s\'\}\}>k</span><span style=\{\{animationDelay: \'1s\'\}\}>i</span><span style=\{\{animationDelay: \'1\.1s\'\}\}>n</span></h1>'

new_animated = '<h1 id="animated-text" className="bde-heading-16-931 bde-heading">'
name = "Šimon Syruček"
delay = 0.0
for char in name:
    if char == ' ':
        new_animated += ' '
    else:
        new_animated += f'<span style={{{{animationDelay: \'{delay:.1f}s\'.replace(\'.0s\', \'s\')}}}}>{{char}}</span>'
        delay += 0.1
new_animated += '</h1>'

# 2. Replace Bio
bio_pattern = r'Jmenuji se Šimon Syruček a působím jako realitní makléř ve společnosti RE/MAX.*?každého úspěšného obchodu\.'
new_bio = "Jmenuji se Šimon Syruček a působím jako realitní makléř ve společnosti RE/MAX. I když jsem v oboru teprve na začátku, dávám do své práce maximum a kladu důraz na zodpovědnost, otevřenou komunikaci a individuální přístup ke každému klientovi. Věřím, že právě důvěra a férové jednání jsou základem každého úspěšného obchodu.<br/><br/>Pocházím z Úval, takže dobře znám nejen místní prostředí, ale i to, jak důležité je mít kolem sebe lidi, na které je spoleh. A přesně tak ke své práci přistupuji. Jsem mladý, energický a hladový po výsledcích – ne proto, abych „rychle prodal“, ale abych odvedl kvalitní práci, za kterou se můžu kdykoliv postavit. Možná nemám za sebou dvacet let praxe, ale mám chuť, disciplínu a odhodlání udělat pro své klienty maximum.<br/><br/>Každý prodej nebo koupě nemovitosti je velké životní rozhodnutí. Není to jen o ceně a podpisu smlouvy, ale o pocitu jistoty, že je vše v pořádku. Postarám se o profesionální prezentaci nemovitosti, komunikaci se zájemci, organizaci prohlídek i bezpečný průběh celého obchodu. Vy se tak můžete soustředit na to důležité – a já pohlídám zbytek.<br/><br/>Pokud hledáte někoho, kdo bude pracovat s nasazením, férově a s osobním přístupem, budu rád, když se na mě obrátíte. Vaše důvěra je pro mě závazek – a zároveň ta nejlepší motivace."

# 3. Property Listings
# Look for the swiper-wrapper containing the properties
# We will use regex to find `<div className="swiper-wrapper">` followed by `<article...`
# And replace the entire contents of the wrapper with the single Kozojedy listing.
property_listing = """<article className="bde-loop-item ee-post swiper-slide">
<a className="bde-container-link-141-100-8577-141-1 bde-container-link cursor-zone bde-container-link--hover-scale bde-container-link-141-100" href="#" target="_self" data-type="url">
<img className="bde-image2-141-101-8577-141-1 bde-image2 bde-image2-141-101" src="images/pozemek.jpg" loading="lazy" />
<h3 className="bde-heading-141-121-8577-141-1 bde-heading bde-heading-141-121">
7 090 000 Kč
</h3><div className="bde-text-141-107-8577-141-1 bde-text bde-text-141-107">
Prodej pozemku 658 m², Kozojedy (ID 061-NP03220)
</div>
</a>    </article>"""

# Read the file and replace string by string
import re
text = re.sub(old_animated, new_animated, text)
text = re.sub(bio_pattern, new_bio, text, flags=re.DOTALL)

# For properties, let's find the swiper-wrapper div and its closing tag.
# It starts at <div className="bde-post-loop-16-1294 bde-post-loop"><div className="swiper-wrapper">
start_loop = text.find('<div className="bde-post-loop-16-1294 bde-post-loop"><div className="swiper-wrapper">')
if start_loop != -1:
    end_loop = text.find('</div></div><div className="swiper-pagination"></div>', start_loop)
    if end_loop != -1:
        text = text[:start_loop] + '<div className="bde-post-loop-16-1294 bde-post-loop"><div className="swiper-wrapper">\n' + property_listing + '\n' + text[end_loop:]

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replacement complete.")
