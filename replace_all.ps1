$content = Get-Content -Path "index.html" -Encoding UTF8 -Raw

$content = $content -replace 'Artem Saykin', 'Šimon Syruček'
$content = $content -replace 'Artem', 'Šimon'
$content = $content -replace 'Saykin', 'Syruček'
$content = $content -replace 'artem-saykin', 'simon-syrucek'
$content = $content -replace 'artem\.saykin', 'simon.syrucek'
$content = $content -replace 'Šimon-Syruček', 'simon-syrucek'
$content = $content -replace 'Simon-Syrucek', 'simon-syrucek'
$content = $content -replace 'https://Šimon-Syruček\.cz', 'https://simon-syrucek.cz'

$content = $content -replace '\+420\s*778\s*022\s*272', '+420 724 786 789'
$content = $content -replace 'IČ 09383611', 'IČ 23033797'
$content = $content -replace 'REMAX G8 Reality', 'REMAX 4 You II'
$content = $content -replace 'Pekařská 695/10, 155 00 Praha 5 – Jinonice', 'Antala Staška 511/40 14000 Praha 4 - Krč'

$p1_old = @"
Jsem realitní makléř, zakladatel edukační platformy pro realitní makléře SellingHub a strategický poradce. Za více než sedm let praxe jsem úspěšně uzavřel přes 300 obchodů a dnes patřím mezi nejúspěšnější makléře v České republice.
"@
$p1_new = @"
Jmenuji se Šimon Syruček a působím jako realitní makléř ve společnosti RE/MAX. I když jsem v oboru teprve na začátku, dávám do své práce maximum a kladu důraz na zodpovědnost, otevřenou komunikaci a individuální přístup ke každému klientovi. Věřím, že právě důvěra a férové jednání jsou základem každého úspěšného obchodu.
"@
$content = $content.Replace($p1_old.Trim(), $p1_new.Trim())

$p2_old = @"
Nejsem tu proto, abych to zkusil. Jsem tu proto, abych zvítězil.
"@
$p2_new = @"
Realitní služby s lidským přístupem
"@
$content = $content.Replace($p2_old.Trim(), $p2_new.Trim())

$p3_old = @"
Mé začátky nebyly vůbec jednoduché. Nadšení bylo, zkušenosti žádné. Měl jsem sotva odmaturováno a druhý semestr na VŠE jsem už tak trochu věděl, že nedokončím. Ale pořád jsem cítil, že obchod mě baví a že realitní prostředí má něco, co stojí za to zkusit.<br><br>Životopis jsem poslal do několika kanceláří, ale nejvíc jsem doufal ve značku RE/MAX – konkrétně <strong>pobočku v Řeporyjích</strong>, jen pár minut od domova. Na pohovoru jsem rozhodně nezazářil. Ale <strong>Jirka Chudoba s Davidem Matouchem, dva zkušení franšízanti</strong>, ve mně přesto viděli potenciál a dali mi šanci.<br><br>Dodnes si vážím toho, že to zkusili. První měsíce nebyly jednoduché, ale věděl jsem, že tohle je přesně to „něco víc“, co jsem hledal.
"@
$p3_new = @"
Pocházím z Úval, takže dobře znám nejen místní prostředí, ale i to, jak důležité je mít kolem sebe lidi, na které je spoleh. A přesně tak ke své práci přistupuji. Jsem mladý, energický a hladový po výsledcích – ne proto, abych „rychle prodal“, ale abych odvedl kvalitní práci, za kterou se můžu kdykoliv postavit. Možná nemám za sebou dvacet let praxe, ale mám chuť, disciplínu a odhodlání udělat pro své klienty maximum.<br><br>Každý prodej nebo koupě nemovitosti je velké životní rozhodnutí. Není to jen o ceně a podpisu smlouvy, ale o pocitu jistoty, že je vše v pořádku. Postarám se o profesionální prezentaci nemovitosti, komunikaci se zájemci, organizaci prohlídek i bezpečný průběh celého obchodu. Vy se tak můžete soustředit na to důležité – a já pohlídám zbytek.<br><br>Pokud hledáte někoho, kdo bude pracovat s nasazením, férově a s osobním přístupem, budu rád, když se na mě obrátíte. Vaše důvěra je pro mě závazek – a zároveň ta nejlepší motivace.
"@
$content = $content.Replace($p3_old.Trim(), $p3_new.Trim())

$content = $content -replace '(?s)<video class="ee-video".*?</video>', '<img class="ee-video" src="images/simon-syrucek-1.png" style="width:100%; height:100%; object-fit:cover;">'

$content = $content -replace 'images/simon-syrucek_10(-[0-9]+x[0-9]+)?\.jpg', 'images/simon-syrucek-2.jpg'
$content = $content -replace 'images/simon-syrucek_02(-[0-9]+x[0-9]+)?\.jpg', 'images/simon-syrucek-1.png'
$content = $content -replace 'images/simon-syrucek_06(-[0-9]+x[0-9]+)?\.jpg', 'images/simon-syrucek-2.jpg'

$content = $content -replace 'v centru Kladna', 'v centru Prahy'
$content = $content -replace 'výhledem na Beskydy', 'výhledem na Prahu'
$content = $content -replace '– Litvínov', '– Úvaly'
$content = $content -replace 'v Loučné pod Klínovcem', 'u Úval'
$content = $content -replace 'v Liberci', 'v Praze'
$content = $content -replace 'v obci Chocerady', 'v obci Úvaly'

Set-Content -Path "index.html" -Value $content -Encoding UTF8
