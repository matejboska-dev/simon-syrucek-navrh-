import { useEffect, useState, useRef } from 'react';
import type { MouseEvent, ReactNode, CSSProperties } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Home, Key, Search, Maximize, ArrowRight, Camera, MoveHorizontal, CheckCircle2 } from 'lucide-react';
import modernMarketingImg from './assets/moderni marketing.png';
import transparentniProcesImg from './assets/transparentniproces.png';
import rychlaReakceImg from './assets/rychla reakce.png';
import beforeHomestagingImg from './assets/beforehomestaging.png';
import afterHomestagingImg from './assets/afterhomestaging.png';

// Magnetic Button Component (GPU-accelerated, no React re-renders)
const MagneticButton = ({ children, className, href, style }: { children: ReactNode, className?: string, href?: string, style?: CSSProperties }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const middleX = e.clientX - (rect.left + rect.width / 2);
    const middleY = e.clientY - (rect.top + rect.height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );

  return href ? <a href={href}>{content}</a> : content;
};

// Fade In Component
const FadeIn = ({ children, delay = 0, className = "", style }: { children: ReactNode, delay?: number, className?: string, style?: CSSProperties }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

// 3D Tilt Card
const TiltCard = ({ children, delay = 0, className = "", bgImage }: { children: ReactNode, delay?: number, className?: string, bgImage?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  function handleMouse(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((event.clientY - rect.top - rect.height / 2) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
      style={{ height: '100%' }}
      className={className}
    >
      <motion.div
        className="bg-card"
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          height: '100%',
          ...(bgImage ? { 
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.1) 100%), url("${bgImage}")`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center 30%',
            backgroundColor: 'transparent'
          } : {})
        }}
      >
        <motion.div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Before/After Slider
const BeforeAfterSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(50); // percentage 0 to 100

  const clipPath = useTransform(dragX, (val) => `inset(0 ${100 - val}% 0 0)`);
  const leftPos = useTransform(dragX, (val) => `${val}%`);

  const handleDrag = (e: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const position = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    dragX.set(position);
  };

  return (
    <div 
      className="slider-container" 
      ref={containerRef}
      onMouseMove={(e) => {
        if (e.buttons === 1) handleDrag(e);
      }}
      onTouchMove={handleDrag}
      onClick={handleDrag}
    >
      <img src={beforeHomestagingImg} alt="Před úpravou" className="slider-image" />
      
      <motion.div style={{ position: 'absolute', inset: 0, clipPath }}>
        <img src={afterHomestagingImg} alt="Po stagingu" className="slider-image" />
      </motion.div>

      <motion.div className="slider-handle" style={{ left: leftPos }}>
        <div className="slider-button">
          <MoveHorizontal size={24} />
        </div>
      </motion.div>
      
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '100px', fontWeight: 500, zIndex: 11 }}>Po úpravě</div>
      <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '100px', fontWeight: 500, zIndex: 11 }}>Před úpravou</div>
    </div>
  );
};


function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [scrolled, setScrolled] = useState(false);
  
  const processRef = useRef<HTMLElement>(null);
  const { scrollYProgress: processScroll } = useScroll({ target: processRef, offset: ["start end", "end center"] });
  const lineWidth = useSpring(useTransform(processScroll, [0, 1], ["0%", "100%"]), { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Film Grain removed for performance - SVG feTurbulence on fixed 100vw element was causing composite lag */}
      
      {/* Blueprint lines for whole site context */}
      <div className="blueprint-line vertical" style={{ left: '10%' }}></div>
      <div className="blueprint-line vertical" style={{ right: '10%' }}></div>

      {/* Ambient Orbs - using CSS radial-gradient, NO filter:blur */}
      <div className="ambient-orb orb-blue" style={{ width: '800px', height: '800px', top: '-200px', right: '-200px', opacity: 0.15 }}></div>
      <div className="ambient-orb orb-blue" style={{ width: '1200px', height: '1200px', top: '30%', left: '-400px', opacity: 0.1 }}></div>

      <div className="content-wrapper">
        <div className="nav-wrapper">
          <motion.nav 
            className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="logo" style={{ zIndex: 101 }}>
              <span className="logo-accent">RE</span><span className="logo-blue">/</span><span className="logo-accent">MAX</span> Šimon Syruček
            </div>
            <div className="desktop-nav">
              <a href="#o-mne" style={{ color: 'var(--text-color)' }}>O mně</a>
              <a href="#proc-ja" style={{ color: 'var(--text-color)' }}>Proč já</a>
              <a href="#sluzby" style={{ color: 'var(--text-color)' }}>Služby</a>
              <a href="#lokality" style={{ color: 'var(--text-color)' }}>Lokality</a>
              <a href="#postup" style={{ color: 'var(--text-color)' }}>Postup</a>
              <a href="#nabidky" style={{ color: 'var(--text-color)' }}>Nabídky</a>
              <a href="#reference" style={{ color: 'var(--text-color)' }}>Reference</a>
              <a href="#kontakt" style={{ color: 'var(--accent-blue)' }}>Kontakt</a>
            </div>
            <div 
              className="hamburger-menu" 
              style={{ flexDirection: 'column', gap: '6px', cursor: 'pointer', zIndex: 101, padding: '0.5rem' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }} style={{ width: '30px', height: '2px', background: 'var(--text-color)' }} />
              <motion.div animate={{ opacity: mobileMenuOpen ? 0 : 1 }} style={{ width: '30px', height: '2px', background: 'var(--text-color)' }} />
              <motion.div animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }} style={{ width: '30px', height: '2px', background: 'var(--text-color)' }} />
            </div>
          </motion.nav>
        </div>

        {/* Mobile Menu Overlay */}
        <motion.div 
          initial={{ opacity: 0, pointerEvents: 'none' }}
          animate={{ opacity: mobileMenuOpen ? 1 : 0, pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(247,247,245,0.95)', backdropFilter: 'blur(30px)', zIndex: 99, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(0.75rem, 2.5vh, 2rem)', padding: '2rem' }}
        >
          <a href="#o-mne" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)', fontWeight: 600, color: 'var(--text-color)', textDecoration: 'none' }}>O mně</a>
          <a href="#proc-ja" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)', fontWeight: 600, color: 'var(--text-color)', textDecoration: 'none' }}>Proč já</a>
          <a href="#sluzby" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)', fontWeight: 600, color: 'var(--text-color)', textDecoration: 'none' }}>Služby</a>
          <a href="#lokality" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)', fontWeight: 600, color: 'var(--text-color)', textDecoration: 'none' }}>Lokality</a>
          <a href="#postup" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)', fontWeight: 600, color: 'var(--text-color)', textDecoration: 'none' }}>Postup</a>
          <a href="#nabidky" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)', fontWeight: 600, color: 'var(--text-color)', textDecoration: 'none' }}>Nabídky</a>
          <a href="#reference" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)', fontWeight: 600, color: 'var(--text-color)', textDecoration: 'none' }}>Reference</a>
          <a href="#kontakt" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)', fontWeight: 600, color: 'var(--accent-blue)', textDecoration: 'none' }}>Kontakt</a>
        </motion.div>

        {/* Hero Section */}
        {isMobile ? (
          <section style={{ display: 'flex', flexDirection: 'column', paddingTop: '140px', paddingBottom: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', gap: '2.5rem', position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center' }}
            >
              <h1 className="heading-1">Reality s lidským přístupem.</h1>
              <p className="body-large" style={{ maxWidth: '100%' }}>Pomáhám klientům prodávat a kupovat nemovitosti moderně, bezpečně a bez zbytečného stresu.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                <a href="#kontakt" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Nezávazná konzultace</a>
                <a href="#nabidky" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Nabídky nemovitostí</a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderRadius: '24px', overflow: 'hidden', width: '100%', height: '70vw', boxShadow: 'var(--shadow-hover)', flexShrink: 0 }}
            >
              <img
                src="/images/simon-syrucek-2.jpg"
                alt="Šimon Syruček"
                fetchPriority="high"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </motion.div>
          </section>
        ) : (
        <section className="hero container" style={{ position: 'relative' }}>
          <div className="blueprint-line horizontal" style={{ top: '60%' }}></div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <h1 className="heading-1">Reality s lidským přístupem.</h1>
            <p className="body-large" style={{ maxWidth: '500px' }}>Pomáhám klientům prodávat a kupovat nemovitosti moderně, bezpečně a bez zbytečného stresu.</p>
            <div className="hero-cta" style={{ display: 'flex', gap: '2rem', marginTop: '4rem' }}>
              <MagneticButton href="#kontakt" className="btn btn-primary">Nezávazná konzultace</MagneticButton>
              <MagneticButton href="#nabidky" className="btn btn-outline">Nabídky nemovitostí</MagneticButton>
            </div>
          </motion.div>
          <div className="hero-image-wrapper" style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <div className="hero-image-frame" style={{ width: '80%', height: '110%', background: 'rgba(255,255,255,0.4)', position: 'absolute', right: '10%', top: '-5%', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.8)' }}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', zIndex: 2, borderRadius: 'var(--radius-lg)', overflow: 'hidden', width: '90%', height: '80vh', boxShadow: 'var(--shadow-hover)' }}
            >
              <img
                src="/images/simon-syrucek-2.jpg"
                alt="Šimon Syruček"
                className="hero-image"
                fetchPriority="high"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </motion.div>
          </div>
        </section>
        )}

        {/* Trust Bar */}
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <FadeIn className="trust-bar">
            <div className="trust-item">
              <div className="trust-number">RE/MAX</div>
              <div className="text-label" style={{ margin: 0 }}>Silné zázemí</div>
            </div>
            <div className="trust-item">
              <div className="trust-number">Praha & Úvaly</div>
              <div className="text-label" style={{ margin: 0 }}>Lokální expertíza</div>
            </div>
            <div className="trust-item">
              <div className="trust-number">100%</div>
              <div className="text-label" style={{ margin: 0 }}>Osobní přístup</div>
            </div>
          </FadeIn>
        </div>

        {/* About Section */}
        <section id="o-mne" className="section container">
          <div className="about-preview">
            <FadeIn>
              <div style={{ position: 'relative' }}>
                <div className="arch-line-v"></div>
                <img src="/images/simon-syrucek-1.png" alt="O mně" className="about-image" loading="lazy" decoding="async" />
              </div>
            </FadeIn>
            <div>
              <FadeIn delay={0.2}>
                <span className="text-label">Příběh a filozofie</span>
                <h2 className="heading-2" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>Transparentnost<br/>& Důvěra</h2>
                <div className="arch-line-h"></div>
                <p className="body-large">
                  Působím jako realitní makléř ve společnosti RE/MAX. Pocházím z Úval, takže dobře znám nejen místní prostředí, ale i to, jak důležité je mít kolem sebe lidi, na které je spoleh.
                </p>
                <p className="body-large">
                  Můj přístup je postavený na naprosté transparentnosti a disciplíně. Neuznávám skryté poplatky ani sliby, které nelze splnit. Věřím v lidský přístup a v to, že kvalitní prezentace prodává nejlépe.
                </p>
                <MagneticButton href="#kontakt" className="btn btn-outline" style={{ marginTop: '2rem' }}>Můj příběh</MagneticButton>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Why Choose Me (Asymmetric Layout) */}
        <section id="proc-ja" className="section container">
          <FadeIn>
            <span className="text-label">Rozdíl je v detailech</span>
            <h2 className="heading-2">Proč si vybrat mě</h2>
          </FadeIn>
          <div className="grid-asymmetric">
            {/* Massive Left Card */}
            <TiltCard delay={0.1} bgImage={modernMarketingImg}>
              <div className="service-icon" style={{ background: 'var(--white)', color: 'var(--text-color)' }}><Camera size={32} /></div>
              <h3 className="heading-2" style={{ marginBottom: '1rem' }}>Moderní marketing</h3>
              <p className="body-large" style={{ maxWidth: '400px', margin: 0 }}>Drony, videoprohlídky a profesionální home staging. Dělám vše pro to, aby vaše nemovitost zazářila a prodala se za maximum.</p>
            </TiltCard>
            
            {/* Stacked Right Cards */}
            <div className="card-stack">
              <TiltCard delay={0.2} className="card-stack" bgImage={transparentniProcesImg}>
                <h3 className="heading-3">Transparentní proces</h3>
                <p>O každém kroku víte. Pravidelné reporty a neustálá komunikace je u mě samozřejmostí.</p>
              </TiltCard>
              <TiltCard delay={0.3} className="card-stack" bgImage={rychlaReakceImg}>
                <h3 className="heading-3">Rychlá reakce</h3>
                <p>Zájemci nečekají. Odpovídám rychle, prohlídky řeším obratem a obchod plynule směřuji k cíli.</p>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* Before / After Slider Section */}
        <section className="section container">
          <FadeIn>
            <span className="text-label">Kouzlo prezentace</span>
            <h2 className="heading-2">Profesionální příprava</h2>
            <p className="body-large">Kvalitní fotografie a home staging dokáží zvýšit prodejní cenu nemovitosti až o 15 %. Podívejte se na rozdíl před a po mém zásahu.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <BeforeAfterSlider />
          </FadeIn>
        </section>

        {/* Services Section */}
        <section id="sluzby" className="section container" style={{ paddingBottom: '12rem' }}>
          <div className="arch-line-h"></div>
          <FadeIn>
            <span className="text-label">Služby</span>
            <h2 className="heading-2">Komplexní realitní servis</h2>
          </FadeIn>
          
          <div className="services-grid">
            {[
              { icon: <Home size={32} strokeWidth={1.5} />, title: 'Prodej nemovitostí', desc: 'Komplexní prodej od A do Z s maximálním výnosem.' },
              { icon: <Key size={32} strokeWidth={1.5} />, title: 'Pronájmy', desc: 'Výběr spolehlivých nájemníků a právní ochrana.' },
              { icon: <Search size={32} strokeWidth={1.5} />, title: 'Odhad ceny', desc: 'Precizní analýza trhu a určení optimální prodejní ceny.' },
              { icon: <Maximize size={32} strokeWidth={1.5} />, title: 'Home Staging', desc: 'Příprava nemovitosti na focení a prohlídky pro wow efekt.' }
            ].map((service, i) => (
              <FadeIn key={i} delay={i * 0.1} className="service-card">
                <div style={{ marginBottom: '2rem', color: 'var(--accent-blue)' }}>{service.icon}</div>
                <h3 className="heading-3">{service.title}</h3>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>{service.desc}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Local Expertise (Dark Section - Overlaps previous section) */}
        <section id="lokality" className="section dark-section overlap-top" style={{ padding: '12rem 0' }}>
          {/* animated-noise removed - 300% x 300% SVG feTurbulence with infinite animation was a massive GPU drain */}
          <div className="architectural-grid"></div>
          <div className="blueprint-line horizontal" style={{ top: '10%' }}></div>
          <div className="ambient-orb orb-blue" style={{ width: '800px', height: '800px', top: '20%', left: '20%', opacity: 0.3 }}></div>
          
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <FadeIn>
              <span className="text-label">Lokální expertíza</span>
              <h2 className="heading-1">Specialista na Úvaly a Prahu</h2>
            </FadeIn>
            <div className="grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center', marginTop: '6rem' }}>
              <FadeIn delay={0.2}>
                <h3 className="heading-2" style={{ marginBottom: '2rem', fontSize: '3rem' }}>Znalost trhu,<br/>která se vyplatí</h3>
                <p className="body-large" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Znalost lokality není jen o mapě. Je to o pochopení toho, co lidé v dané oblasti hledají, jaká je občanská vybavenost a jak se vyvíjí ceny. V Úvalech jsem doma a Prahu znám jako své boty.
                </p>
                <ul style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
                  <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}><CheckCircle2 color="var(--accent-blue)" /> Detailní cenové mapy oblasti</li>
                  <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}><CheckCircle2 color="var(--accent-blue)" /> Skrytý potenciál lokalit</li>
                  <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}><CheckCircle2 color="var(--accent-blue)" /> Rychlejší oslovení správné cílovky</li>
                </ul>
              </FadeIn>
              <FadeIn delay={0.4} style={{ position: 'relative' }}>
                <div className="map-pin-glow" style={{ top: '30%', left: '40%' }}></div>
                <div className="map-pin-glow" style={{ top: '60%', left: '70%', animationDelay: '1s' }}></div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d655741.8195558321!2d13.806718568759415!3d50.058356646351335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xca639b7f039f8ed%3A0x73ef3a2619b4aae7!2s%C5%A0imon%20Syru%C4%8Dek%20RE%2FMAX%204%20You%20II!5e0!3m2!1sen!2scz!4v1779371255168!5m2!1sen!2scz" width="100%" height="600" style={{border:0, borderRadius: 'var(--radius-lg)', opacity: 0.8}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="postup" className="section container" ref={processRef} style={{ marginTop: '4rem' }}>
          <FadeIn>
            <span className="text-label">Jak to funguje</span>
            <h2 className="heading-2">Cesta k úspěšnému prodeji</h2>
          </FadeIn>
          
          <div className="timeline">
            <div className="timeline-line-bg"></div>
            <motion.div className="timeline-line-progress" style={{ width: isMobile ? '2px' : lineWidth, height: isMobile ? lineWidth : '2px' }}></motion.div>
            
            {['Konzultace', 'Ocenění', 'Příprava', 'Marketing', 'Prohlídky', 'Vyjednání', 'Převod'].map((step, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -20, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="timeline-step"
                style={{ padding: '0 1rem', cursor: 'pointer' }}
              >
                <div className="timeline-number" style={{ transition: 'var(--transition)' }}>0{i+1}</div>
                <h3 className="heading-3">{step}</h3>
                <p style={{ color: '#666', marginTop: '1rem' }}>Detailní zaměření na preciznost v každém kroku procesu.</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Properties (Edge to Edge Cinematic Feature) */}
        <section id="nabidky" className="section container" style={{ padding: '4rem 0' }}>
          <FadeIn>
            <span className="text-label">Vybraná nabídka</span>
          </FadeIn>
          <FadeIn delay={0.2} className="edge-to-edge">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 15, ease: "linear" }}
              src="/images/pozemek.jpg" 
              alt="Prodej pozemku Kozojedy" 
              className="property-image" 
              loading="lazy" 
              decoding="async"
            />
            {/* Cinematic Floating Glass Card */}
            <motion.div 
              className="floating-glass-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              style={{ position: 'absolute', bottom: '4rem', left: '4rem', background: 'rgba(20,20,20,0.92)', border: '1px solid rgba(255,255,255,0.1)', padding: '3rem', borderRadius: 'var(--radius-lg)', color: 'white', maxWidth: '600px' }}
            >
              <span className="text-label" style={{ color: 'white', marginBottom: '1rem' }}>Aktivní nabídka</span>
              <div className="property-price" style={{ margin: '1rem 0' }}>7 090 000 Kč</div>
              <h3 className="heading-2" style={{ margin: 0, fontWeight: 300, fontSize: '2.5rem' }}>Pozemek 658 m²<br/>Kozojedy</h3>
              <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', opacity: 0.9 }}>
                Exkluzivní stavební pozemek s vyřízeným povolením na prémiovou vilu. Zasíťováno, připraveno ke stavbě.
              </p>
            </motion.div>
          </FadeIn>
        </section>

        {/* Blog / Insights */}
        <section id="blog" className="section container">
          <FadeIn>
            <span className="text-label">Realitní magazín</span>
            <h2 className="heading-2">Znalosti z trhu</h2>
          </FadeIn>
          
          <div className="grid-asymmetric">
            <FadeIn delay={0.1}>
              <div style={{ position: 'relative', height: '600px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer' }}>
                <img src="/images/p1302339-768x431.jpg" alt="Blog" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '4rem', color: 'white' }}>
                  <span className="text-label" style={{ color: 'white' }}>Průvodce</span>
                  <h3 className="heading-2" style={{ color: 'white', margin: 0, fontSize: '3rem' }}>Jak připravit dům na prodej a zvýšit jeho hodnotu o 15 %</h3>
                </div>
              </div>
            </FadeIn>
            <div className="card-stack">
              <FadeIn delay={0.3}>
                <div style={{ position: 'relative', height: '284px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer' }}>
                  <img src="/images/dji-20260427175452-0923-d-768x432.jpg" alt="Blog" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem', color: 'white' }}>
                    <span className="text-label" style={{ color: 'white', marginBottom: '0.5rem' }}>Trh</span>
                    <h3 className="heading-3" style={{ color: 'white', margin: 0 }}>Vývoj cen nemovitostí v Praze pro rok 2024</h3>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div style={{ position: 'relative', height: '284px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer' }}>
                  <img src="/images/dji-20260409155242-0425-d-768x432.jpg" alt="Blog" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem', color: 'white' }}>
                    <span className="text-label" style={{ color: 'white', marginBottom: '0.5rem' }}>Hypotéky</span>
                    <h3 className="heading-3" style={{ color: 'white', margin: 0 }}>Na co si dát pozor při žádosti o úvěr</h3>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="reference" className="section container" style={{ paddingBottom: '12rem' }}>
          <FadeIn>
            <span className="text-label">Reference</span>
            <h2 className="heading-2">Důvěra klientů</h2>
          </FadeIn>
          
          <div className="testimonials-grid" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
            <FadeIn delay={0.1} className="testimonial-card-dark" style={{ background: 'linear-gradient(135deg, rgba(20,20,20,0.9), rgba(0,0,0,0.9))' }}>
              <div className="quote-mark-huge">"</div>
              <div className="ambient-orb orb-blue" style={{ width: '300px', height: '300px', bottom: '-50px', right: '-50px', opacity: 0.2 }}></div>
              <p className="body-large" style={{ color: 'white', position: 'relative', zIndex: 1, fontSize: '1.5rem' }}>
                Šimon Syruček nás překvapil svým neuvěřitelně rychlým a lidským přístupem. Všechno zařídil, vysvětlil a prodej proběhl naprosto hladce. Zvláště oceňuji skvělé fotografie a video, které naši chalupu prodaly za první víkend.
              </p>
              <div className="arch-line-h" style={{ margin: '2rem 0', background: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>RN</div>
                <div>
                  <div style={{ fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Rodina Novotná</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.6 }}>Prodej chalupy</div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="testimonial-card-dark">
              <div className="quote-mark-huge">"</div>
              <p className="body-large" style={{ color: 'white', position: 'relative', zIndex: 1, fontSize: '1.25rem' }}>
                Oceňuji obrovskou profesionalitu a transparentnost. Žádné plané sliby, jen tvrdá práce a perfektní výsledek. Pan Syruček je ukázkou moderního realitního makléře, kterému můžete absolutně věřit.
              </p>
              <div className="arch-line-h" style={{ margin: '2rem 0', background: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>PD</div>
                <div>
                  <div style={{ fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Petr Dvořák</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.6 }}>Prodej bytu Praha</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Final CTA / Contact Section (Dark overlap) */}
        <section id="kontakt" className="section dark-section overlap-top" style={{ padding: '12rem 0' }}>
          {/* animated-noise removed for performance */}
          <div className="architectural-grid"></div>
          <div className="blueprint-line horizontal" style={{ top: '50%' }}></div>
          <div className="ambient-orb orb-blue" style={{ width: '1000px', height: '1000px', top: '10%', right: '10%', opacity: 0.25 }}></div>
          
          <div className="footer-massive-text" style={{ bottom: '10%', opacity: 0.04, userSelect: 'none' }}>SYRUČEK</div>

          <div className="container grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center', position: 'relative', zIndex: 5 }}>
            <FadeIn>
              <h2 className="heading-1" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>Prodáváte<br/>nemovitost?</h2>
              <p className="body-large" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '4rem' }}>
                Domluvme si nezávaznou konzultaci a proberme nejlepší postup pro váš prodej. Nečekejte na zázrak, svěřte to profesionálovi.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div>
                  <div className="text-label" style={{ color: 'var(--accent-blue)', margin: 0 }}>Zavolejte mi</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 300 }}>+420 724 786 789</div>
                </div>
                <div>
                  <div className="text-label" style={{ color: 'var(--accent-blue)', margin: 0 }}>Napište mi e-mail</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 300 }}>simon.syrucek@re-max.cz</div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{ position: 'relative' }}>
                {/* Ambient glow directly behind the form */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(0,84,166,0.3), transparent 70%)', opacity: 0.5, borderRadius: 'var(--radius-lg)' }}></div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '5rem 4rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 1 }}>
                  <h3 className="heading-3" style={{ marginBottom: '4rem', fontSize: '2rem' }}>Napište mi zprávu</h3>
                  <form>
                    <div className="form-group">
                      <input type="text" className="form-input" placeholder="Vaše jméno" />
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-input" placeholder="Váš e-mail nebo telefon" />
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-input" placeholder="S čím vám mohu pomoci?" />
                    </div>
                    <MagneticButton className="btn btn-outline" style={{ marginTop: '3rem', width: '100%', borderColor: 'var(--white)', color: 'var(--white)', padding: '1.5rem' }}>
                      Odeslat zprávu <ArrowRight style={{ marginLeft: '1rem' }} />
                    </MagneticButton>
                  </form>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer className="container footer" style={{ paddingTop: '8rem', position: 'relative', border: 'none' }}>
          <div className="blueprint-line horizontal" style={{ top: '0', opacity: 0.1 }}></div>
          <div className="blueprint-line vertical" style={{ left: '33%', opacity: 0.05 }}></div>
          <div className="blueprint-line vertical" style={{ left: '66%', opacity: 0.05 }}></div>
          
          <div className="footer-grid">
            <div>
              <div className="logo" style={{ marginBottom: '2rem' }}>
                <span className="logo-accent">RE</span><span className="logo-blue">/</span><span className="logo-accent">MAX</span> Šimon Syruček
              </div>
              <p style={{ maxWidth: '400px', fontSize: '1.1rem' }}>Nezávislý podnikatel podnikající na základě živnostenského listu, IČ 23033797. Adresa: Antala Staška 511/40, Praha 4 - Krč.</p>
            </div>
            <div>
              <div className="text-label" style={{ color: 'var(--text-color)' }}>Služby</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem' }}>
                <li>Prodej nemovitostí</li>
                <li>Pronájmy</li>
                <li>Odhad ceny</li>
              </ul>
            </div>
            <div>
              <div className="text-label" style={{ color: 'var(--text-color)' }}>Odkazy</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem' }}>
                <li>Ochrana osobních údajů</li>
                <li>Zpracování cookies</li>
                <li>Etický kodex</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div>© {new Date().getFullYear()} Šimon Syruček. Všechna práva vyhrazena.</div>
            <div>Design by <a href="https://matejboska.cz" rel="dofollow" target="_blank" style={{ color: 'inherit', textDecoration: 'underline' }}>Matěj Boška</a></div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
