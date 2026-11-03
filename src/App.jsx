import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  CircleArrowRight,
  ClipboardCheck,
  Dna,
  FileText,
  FlaskConical,
  HeartPulse,
  LucideCaseUpper,
  Mail,
  Menu,
  Microscope,
  ShieldCheck,
  UsersRound,
  X,
} from "lucide-react";
import heroImage from "./images/HeroSection.png";
import contactImage from "./images/ConnectCTASection.png";
import labImage from "./images/Medical researcher using laboratory microscope.png";
import researchImage from "./images/Image (Researcher pipetting samples in a laboratory).png";
import neurosynImage from "./images/Container (7).png";
import pantosynImage from "./images/Container (8).png";
import trypsynImage from "./images/Container (9).png";
import cefixaImage from "./images/Container (10).png";
import betasynImage from "./images/Container (11).png";
import pregaImage from "./images/Container (12).png";
import pregaForteImage from "./images/Container (13).png";

const productImages = {
  "neurosyn-m": neurosynImage,
  "pantosyn-20-40": pantosynImage,
  "trypsyn-r": trypsynImage,
  "cefixa-200": cefixaImage,
  "betasyn-8-16": betasynImage,
  pregasyn: pregaImage,
  "pregasyn-forte": pregaForteImage,
};

const initialProducts = [
  { id: "neurosyn-m", name: "Neurosyn-M", description: "Alpha Lipoic Acid 200mg + Benfotimine 100mg + Folic Acid 1.5 mg + Inosital 100mg + Methilcobalamin 1000 mcg + vitamin B6 3mg.", category: "Tablets" },
  { id: "pantosyn-20-40", name: "Pantosyn 20/40", description: "Pantoprazole 20mg/40mg Tablets", category: "Tablets" },
  { id: "trypsyn-r", name: "Trypsyn-R", description: "Bromelin 90mg + Rutoside Trihydrate 100mg + Trypsin 48mg", category: "Tablets" },
  { id: "cefixa-200", name: "Cefixa 200", description: "Cefixime 200mg Tablets", category: "Tablets" },
  { id: "betasyn-8-16", name: "Betasyn 8/16", description: "Betahistine 8mg/16mg Tablets", category: "Tablets" },
  { id: "pregasyn", name: "Pregasyn", description: "Pregabalin 75mg + Methylcobalamin 1500mcg", category: "Capsules" },
  { id: "pregasyn-forte", name: "Pregasyn Forte", description: "Methylcobalamin 750mcg + Pregabalin 50mg", category: "Capsules" },
];

const principles = [
  { icon: CircleArrowRight, title: "Commitment to Quality", text: "Quality guides every product we bring to market." },
  { icon: FileText, title: "Product Information Transparency", text: "Clear, accurate compositions for every formulation." },
  { icon: BadgeCheck, title: "Consistent Brand Standards", text: "A uniform standard of presentation across our range." },
  { icon: UsersRound, title: "Healthcare Professional Support", text: "Responsive help for professionals and partners." },
];

const commitments = [
  "Commitment to quality",
  "Product information transparency",
  "Consistent brand standards",
  "Healthcare professional support",
];

function Brand({ light = false }) {
  return (
    <a className={`brand${light ? " brand-light" : ""}`} href="#home" aria-label="Synexta Pharma home">
      <span className="brand-mark" aria-hidden="true">
        {light ? <>S<span className="brand-mark-dot">.</span></> : <Dna size={20} strokeWidth={2.2} />}
      </span>
      <span className="brand-name">{light ? <>Synexta<span>PHARMA</span></> : <>synexta<span>pharma</span></>}</span>
    </a>
  );
}

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", topic: "", message: "" });
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/products/", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Catalogue is currently unavailable");
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.products) && data.products.length > 0) setProducts(data.products);
      })
      .catch((error) => {
        if (error.name !== "AbortError") console.info("Showing the local product catalogue.");
      });
    return () => controller.abort();
  }, []);

  function chooseProduct(name) {
    setFormState((current) => ({ ...current, topic: `Product enquiry: ${name}` }));
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }

  function updateField(event) {
    setFormState((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (submitState.status !== "idle") setSubmitState({ status: "idle", message: "" });
  }

  async function submitInquiry(event) {
    event.preventDefault();
    setSubmitState({ status: "sending", message: "Sending your message..." });
    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await response.json();
      if (!response.ok) {
        const detail = data.errors ? Object.values(data.errors).flat().join(" ") : data.error;
        throw new Error(detail || "We could not submit your message.");
      }
      setSubmitState({ status: "success", message: data.message });
      setFormState({ name: "", email: "", phone: "", topic: "", message: "" });
    } catch (error) {
      setSubmitState({ status: "error", message: error.message || "Unable to reach the server. Please try again." });
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About us</a>
            <a href="#products" onClick={closeMenu}>products</a>
            <a href="#why-synexta" onClick={closeMenu}>Why Choose Us</a>
            <a href="#quality" onClick={closeMenu}>Quality Assurance</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <a className="nav-contact" href="#products" onClick={closeMenu}>Explore Products <ArrowUpRight size={15} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home" style={{ "--hero-image": `url("${heroImage}")` }}>
          <div className="hero-inner page-width">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-dot" /> TRUSTED PHARMACEUTICAL SOLUTIONS</span>
              <h1>Quality medicines.<br /><span>Trusted care.</span></h1>
              <p>Commited to delivering quality-driven pharmaceutical formulations that support healthcare proffessionals and better patient care.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#products">Explore our products <ArrowRight size={16} /></a>
                <a className="button button-quiet" href="#contact">Contact our team</a>
              </div>
              <div className="hero-note"><CheckCircle2 size={16} /> Quality-minded at every stage</div>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">01 <span /> 04</div>
        </section>

        <section className="intro-section section-pad" id="about">
          <div className="intro-grid page-width">
            <div className="intro-image-wrap">
              <img src={labImage} alt="Researcher working with a laboratory microscope" />
              <div className="image-caption"><span className="caption-icon"><Microscope size={17} /></span><span>Curiosity drives better science.</span></div>
            </div>
            <div className="intro-copy">
              <span className="eyebrow">ABOUT SYNEXTA PHARMA</span>
              <h2>Committed to quality.<br /><span>Focused on care.</span></h2>
              <p className="body-lead">Synexta Pharma offers a range of pharmaceutical formulations designed to support diverse healthcare needs. Our approach is built on quality, transparency and a genuine commitment to trusted healthcare solutions.</p>
            
            <div className="difference-points">
                {[
                  [HeartPulse, "Quality first", "Formulation selevted and presented with a focus on quality."],
                  [ClipboardCheck, "Product Clarity", "Exact names, strengths and compositions- nothing hidden."],
                  [Dna, "Responsible communication", "Accurate informationwithout exaggerated claims"],
                ].map(([Icon, title, text]) => (
                  <div className="difference-point" key={title}>
                    <span className="difference-icon"><Icon size={18} /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </div>
                ))}
              </div>
              </div>
          </div>
        </section>

        <section className="products-section section-pad" id="products">
          <div className="page-width">
            <div className="section-heading">
              <span className="eyebrow">Our portfolio</span>
              <h2>Our pharmaceutical products</h2>
              <p>Explore our range of pharmaceutical formulations developed to support diverse healthcare needs.</p>
            </div>
            <div className="product-grid">
              {products.map((product, index) => (
                <article className="product-card" key={product.id} style={{ "--card-index": index }}>
                  <div className="product-art">
                    {productImages[product.id] ? <img src={productImages[product.id]} alt={`${product.name} product pack`} /> : <div className="product-placeholder"><FlaskConical size={36} /></div>}
                    <span className="product-number">0{index + 1}</span>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category || "Pharmaceuticals"}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <button className="product-link" type="button" onClick={() => chooseProduct(product.name)}>View Product <ArrowUpRight size={14} /></button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="quality-section section-pad" id="quality">
          <div className="page-width">
            <div className="section-heading section-heading-light">
              <span className="eyebrow">Quality Assurance</span>
              <h2>Quality at the Heart of Every Formulation</h2>
            </div>
            <h3 className="commitments-heading">Our Commitments</h3>
            <div className="principle-grid">
              {principles.map(({ icon: Icon, title, text }) => (
                <article className="principle" key={title} tabIndex={0}>
                  <span className="principle-icon"><Icon size={23} strokeWidth={2} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="difference-section section-pad" id="why-synexta">
          <div className="difference-grid page-width">
            <div className="difference-copy">
              <span className="eyebrow">WHY CHOOSE US</span>
              <h2>Why choose Synexta Pharma?</h2>
              <p className="body-lead">We keep things simple: dependable products, clear information and a people-first approach.</p>
              <div className="difference-points">
                {[
                  [HeartPulse, "Quality first", "Formulation selevted and presented with a focus on quality."],
                  [ClipboardCheck, "Product Clarity", "Exact names, strengths and compositions- nothing hidden."],
                  [Dna, "Responsible communication", "Accurate informationwithout exaggerated claims"],
                  [Dna, "Proffessional Engagement", "A team that listens to healthcare proffessionals and partners"],                
                ].map(([Icon, title, text]) => (
                  <div className="difference-point" key={title}>
                    <span className="difference-icon"><Icon size={18} /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="difference-image">
              <img src={researchImage} alt="Scientist carefully pipetting a sample in a laboratory" />
              <div className="image-stamp"><span>Science</span><strong>with care</strong><span>at every step</span></div>
            </div>
          </div>
        </section>

        <section className="contact-banner" style={{ "--contact-image": `url("${contactImage}")` }}>
          <div className="contact-banner-inner page-width">
            <span className="eyebrow">LET'S CONNECT</span>
            <h2><span>Let's connect for better healthcare<br></br> solutions.</span></h2>
            <p>Connect with our team to learn more about our pharmaceutical product<br></br> portfolio and business enquiries.</p>
            <div className="contact-banner-actions">
              <a className="button button-primary" href="#contact">Contact Us <ArrowRight size={16} /></a>
              <a className="button button-primary" href="#product">Explore Us </a>
            </div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-grid page-width">
            <div className="contact-copy">
              <span className="eyebrow">CONTACT</span>
              <h2>Get in touch.</h2>
              <p className="body-lead">Have a question about our products or a business enquiry? Send us a message and our team will get back to you.</p>
              <div className="contact-details">
                <div><span className="contact-detail-icon"><Mail size={17} /></span>Product Information request</div>
                <div><span className="contact-detail-icon"><Mail size={17} /></span>Distribution and business partnerships</div>
                <div><span className="contact-detail-icon"><Mail size={17} /></span>Healthcare proffessional support</div>
              </div>
            </div>
            <form className="contact-form" onSubmit={submitInquiry}>
              <div className="form-row">
                <label>Name<input name="name" autoComplete="name" placeholder="Your name" value={formState.name} onChange={updateField} required maxLength={120} /></label>
                <label>Business Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" value={formState.email} onChange={updateField} required maxLength={254} /></label>
              </div>
              <div className="form-row">
                <label>Phone Number <input name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" value={formState.phone} onChange={updateField} maxLength={30} /></label>
                <label>Company/Organization<input name="name" autoComplete="name" placeholder="Company name" value={formState.name} onChange={updateField} required maxLength={120} /></label>
              </div>
              <label>Enquiry Type
                <select name="topic" value={formState.topic} onChange={updateField} required>
                  <option value="" disabled>Select an option</option>
                  {formState.topic.startsWith("Product enquiry:") && <option value={formState.topic}>{formState.topic}</option>}
                  <option value="Product Information request">Product Information request</option>
                  <option value="Distribution and business partnerships">Distribution and business partnerships</option>
                  <option value="Healthcare professional support">Healthcare professional support</option>
                  <option value="Other enquiry">Other enquiry</option>
                </select>
              </label>
              <label>Message<textarea name="message" placeholder="How can we help?" rows="4" value={formState.message} onChange={updateField} required minLength={10} maxLength={5000} /></label>
              <div className="form-submit-row">
                <p className={`form-feedback ${submitState.status}`} aria-live="polite">{submitState.message}</p>
                <button className="button button-primary submit-button" type="submit" disabled={submitState.status === "sending"}>
                  {submitState.status === "sending" ? "Sending..." : "Submit Enquiry"}<ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main page-width">
          <div className="footer-brand"><Brand light /><p>Quality Medicines. Trusted Care.</p></div>
          <div className="footer-column"><span>Quick Links</span><a href="#home">Home</a><a href="#about">About Us</a><a href="#products">Products</a><a href="#explore">Our Expertise</a><a href="#quality">Quality Assurance</a><a href="#contact">Contact</a></div>
          <div className="footer-products">
            <span>Products</span>
            <div className="footer-products-links">
              <a href="#contact">NEUROSYN-M™</a><a href="#about">TRYPSYN-R™</a><a href="#about">BETASYN™ 8/16</a><a href="#about">PREGASYN™</a><a href="#contact">PANTOSYN™ 20/40</a><a href="#about">CEFIXA™ 200</a><a href="#about">PREGASYN™ FORTE</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom page-width" aria-hidden="true" />
      </footer>
    </>
  );
}

export default App;