$content = Get-Content -Path "index.html" -Encoding UTF8 -Raw

$content = $content -replace 'Simon Syrucek', 'Šimon Syruček'
$content = $content -replace 'Simon', 'Šimon'
$content = $content -replace 'Syrucek', 'Syruček'
$content = $content -replace 'simon-syruček', 'simon-syrucek'
$content = $content -replace 'simon\.syruček', 'simon.syrucek'

$p1_old = @"
Jmenuji se Simon Syrucek a působím jako realitní makléř ve společnosti RE/MAX. I když jsem v oboru teprve na začátku, dávám do své práce maximum a kladu důraz na zodpovednost, otevřenou komunikaci a individuální přístup ke každému klientovi. Věřím, že právě důvěra a férové jednání jsou základem každého úspěšného obchodu.
"@
$p1_new = @"
Jmenuji se Šimon Syruček a působím jako realitní makléř ve společnosti RE/MAX. I když jsem v oboru teprve na začátku, dávám do své práce maximum a kladu důraz na zodpovědnost, otevřenou komunikaci a individuální přístup ke každému klientovi. Věřím, že právě důvěra a férové jednání jsou základem každého úspěšného obchodu.
"@
$content = $content.Replace($p1_old.Trim(), $p1_new.Trim())

$p3_old = @"
Pocházím z Úval, takže dobře znám nejen místní prostředí, ale i to, jak důležité je mít kolem sebe lidi, na které je spoleh. A přesně tak ke své práci přistupuji. Jsem mladý, energický a hladový po výsledcích – ne proto, abych „rychle prodal“, ale abych odvedl kvalitní práci, za kterou se můžu kdykoliv postavit. Možná nemám za sebou dvacet let praxe, ale mám chut, disciplínu a odhodlání udělat pro své klienty maximum.<br><br>Každý prodej nebo koupě nemovitosti je velké životní rozhodnutí. Není to jen o ceně a podpisu smlouvy, ale o pocitu jistoty, že je vše v pořádku. Postarám se o profesionální prezentaci nemovitosti, komunikaci se zájemci, organizaci prohlídek i bezpečný průběh celého obchodu. Vy se tak můžete soustředit na to důležité – a já pohlídám zbytek.<br><br>Pokud hledáte někoho, kdo bude pracovat s nasazením, férově a s osobním přístupem, budu rád, když se na mě obrátíte. Vaše důvěra je pro mě závazek – a zároveň ta nejlepší motivace.
"@
$p3_new = @"
Pocházím z Úval, takže dobře znám nejen místní prostředí, ale i to, jak důležité je mít kolem sebe lidi, na které je spoleh. A přesně tak ke své práci přistupuji. Jsem mladý, energický a hladový po výsledcích – ne proto, abych „rychle prodal“, ale abych odvedl kvalitní práci, za kterou se můžu kdykoliv postavit. Možná nemám za sebou dvacet let praxe, ale mám chuť, disciplínu a odhodlání udělat pro své klienty maximum.<br><br>Každý prodej nebo koupě nemovitosti je velké životní rozhodnutí. Není to jen o ceně a podpisu smlouvy, ale o pocitu jistoty, že je vše v pořádku. Postarám se o profesionální prezentaci nemovitosti, komunikaci se zájemci, organizaci prohlídek i bezpečný průběh celého obchodu. Vy se tak můžete soustředit na to důležité – a já pohlídám zbytek.<br><br>Pokud hledáte někoho, kdo bude pracovat s nasazením, férově a s osobním přístupem, budu rád, když se na mě obrátíte. Vaše důvěra je pro mě závazek – a zároveň ta nejlepší motivace.
"@
$content = $content.Replace($p3_old.Trim(), $p3_new.Trim())

Set-Content -Path "index.html" -Value $content -Encoding UTF8
