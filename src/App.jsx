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
import brandLogo from "./images/logo.png";

const productImages = {
  "neurosyn-m": neurosynImage,
  "pantosyn-20-40": pantosynImage,
  "trypsyn-r": trypsynImage,
  "cefixa-200": cefixaImage,
  "betasyn-8-16": betasynImage,
  pregasyn: pregaImage,
  "pregasyn-forte": pregaForteImage,
};

const neurosynDetails = {
  category: "Neurological Health",
  formulation: "RX PRESCRIPTION FORMULATION",
  name: "NEUROSYN-M™",
  composition: "Alpha Lipoic Acid 200 mg + Benfotiamine 100 mg + Folic Acid 1.5 mg + Inositol 100 mg + Methylcobalamin 1000 mcg + Vitamin B6 5 mg",
  facts: [
    ["Form & Pack", "Tablets • 10×10 Alu-Alu"],
    ["Indication Segment", "Neuropathy & Neuroprotection"],
    ["Shelf Life & Storage", "24 Mos • Below 25°C"],
    ["Compliance", "WHO-GMP Certified"],
  ],
  indications: [
    "Diabetic Peripheral Neuropathy",
    "Axon & Myelin Sheath Regeneration",
    "Neuronal Vascular & Metabolic Care",
    "Paresthesia & Hyperalgesia Relief",
  ],
  actives: [
    ["200 mg", "Alpha Lipoic Acid"],
    ["1000 mcg", "Methylcobalamin"],
    ["100 mg", "Benfotiamine"],
  ],
};

const initialProducts = [
  { id: "neurosyn-m", name: "Neurosyn-M", description: "Alpha Lipoic Acid 200 mg + Benfotiamine 100 mg + Folic Acid 1.5 mg + Inositol 100 mg + Methylcobalamin 1000 mcg + Vitamin B6 3 mg", category: "Neurological Health" },
  { id: "pantosyn-20-40", name: "Pantosyn 20/40", description: "Pantoprazole 20 mg / 40 mg Tablets", category: "Gastrointestinal Health" },
  { id: "trypsyn-r", name: "Trypsyn-R", description: "Bromelain 90 mg + Rutoside Trihydrate 100 mg + Trypsin 48 mg", category: "Musculoskeletal Support" },
  { id: "cefixa-200", name: "Cefixa 200", description: "Cefixime 200 mg Tablets", category: "Other Formulations" },
  { id: "betasyn-8-16", name: "Betasyn 8/16", description: "Betahistine 8 mg / 16 mg Tablets", category: "Other Formulations" },
  { id: "pregasyn", name: "Pregasyn", description: "Pregabalin 75 mg + Methylcobalamin 1500 mcg", category: "Neurological Health" },
  { id: "pregasyn-forte", name: "Pregasyn Forte", description: "Methylcobalamin 750 mcg + Pregabalin 50 mg", category: "Neurological Health" },
];

function formatProductCardName(product) {
  const name = product.name.toUpperCase();
  const trademarkPlacements = {
    "neurosyn-m": [/-M$/, "-M™"],
    "pantosyn-20-40": [/ 20\/40$/, "™ 20/40"],
    "trypsyn-r": [/-R$/, "-R™"],
    "cefixa-200": [/ 200$/, "™ 200"],
    "betasyn-8-16": [/ 8\/16$/, "™ 8/16"],
    pregasyn: [/$/, "™"],
    "pregasyn-forte": [/ FORTE$/, "™ FORTE"],
  };
  const placement = trademarkPlacements[product.id];
  return placement ? name.replace(placement[0], placement[1]) : `${name}™`;
}

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
      <img className="brand-logo" src={brandLogo} alt="Synexta Pharma" />
    </a>
  );
}

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", topic: "", message: "" });
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });

  useEffect(() => {
    if (!selectedProduct) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedProduct(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProduct]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/products/", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Catalogue is currently unavailable");
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.products)) setProducts(data.products);
      })
      .catch((error) => {
        if (error.name !== "AbortError") console.info("Showing the local product catalogue.");
      });
    return () => controller.abort();
  }, []);

  function chooseProduct(product) {
    setFormState((current) => ({ ...current, topic: `Product enquiry: ${product.name}` }));
    setSelectedProduct(null);
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
              <span className="eyebrow hero-eyebrow"> TRUSTED PHARMACEUTICAL SOLUTIONS</span>
              <h1><span className="hero-heading-line">Quality medicines.</span><span>Trusted care.</span></h1>
              <p>Commited to delivering quality-driven pharmaceutical formulations that support healthcare proffessionals and better patient care.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#products">Explore our products <ArrowRight size={16} /></a>
                <a className="button button-quiet" href="#contact">Contact our team</a>
              </div>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">01 <span /> 04</div>
        </section>

        <section className="intro-section section-pad" id="about">
          <div className="intro-grid page-width">
            <div className="intro-image-wrap">
              <img src={labImage} alt="Researcher working with a laboratory microscope" />
            </div>
            <div className="intro-copy">
              <span className="eyebrow">ABOUT SYNEXTA PHARMA</span>
              <h2>Committed to quality. Focused on care.</h2>
              <p className="body-lead">Synexta Pharma offers a range of pharmaceutical formulations designed to support diverse healthcare needs. Our approach is built on quality, transparency and a genuine commitment to trusted healthcare solutions.</p>
            
            <div className="difference-points">
                {[
                  [HeartPulse, "Quality-Focused Approach", "Every Formulation is presented with care, clarity and consistency."],
                  [ClipboardCheck, "Reliable Pharmaceutical solutions", "A focused portfolio built around everyday healthcare needs."],
                  [Dna, "Healthcare-Centered Commitment", "We work along side healthcare proffessionals for better patient care."],
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
              <span className="aqua">OUR PORTFOLIO</span>
              <h2>Our pharmaceutical products</h2>
              <p className="portfolio-description">Explore our range of pharmaceutical formulations developed to support diverse healthcare needs.</p>
            </div>
            <div className="product-grid">
              {products.map((product, index) => (
                <article className="product-card" key={product.id} style={{ "--card-index": index }}>
                  <div className="product-art">
                    {productImages[product.id] ? <img src={productImages[product.id]} alt={`${product.name} product pack`} /> : <div className="product-placeholder"><FlaskConical size={36} /></div>}
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category || "Pharmaceuticals"}</span>
                    <h3>{formatProductCardName(product)}</h3>
                    <span className="product-accent-line" aria-hidden="true" />
                    <p>{product.description}</p>
                    <button className="product-link" type="button" onClick={() => setSelectedProduct(product)}>View Product <ArrowRight size={18} /></button>
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
            </div>
            <div className="principle-grid">
              {commitments.map((commitment, index) => {
                const { icon: Icon, text } = principles[index];
                return (
                  <article className="principle" key={commitment} tabIndex={0}>
                    <span className="principle-icon"><Icon size={18} strokeWidth={2} /></span>
                    <h3>{commitment}</h3>
                    <p>{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="commitments-section section-pad" aria-labelledby="commitments-heading">
          <div className="page-width">
            <h2 className="commitments-heading" id="commitments-heading">OUR COMMITMENTS</h2>
            <h2 className="commitments-subheading">Quality at the Heart of Every Formulation</h2>
              <div className="principle-grid">
                {commitments.map((commitment, index) => {
                  const { icon: Icon, text } = principles[index];
                  return (
                    <article className="principle" key={commitment} tabIndex={0}>
                      <span className="principle-icon"><Icon size={18} strokeWidth={2} /></span>
                      <h3>{commitment}</h3>
                      <p>{text}</p>
                    </article>
                  );
                })}
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
            </div>
          </div>
        </section>

        <section className="contact-banner" style={{ "--contact-image": `url("${contactImage}")` }}>
          <div className="contact-banner-inner page-width">
            <span className="eyebrow">LET'S CONNECT</span>
            <h2>Let's Connect for Better Healthcare Solutions</h2>
            <p>Connect with our team to learn more about our pharmaceutical product portfolio and business enquiries.</p>
            <div className="contact-banner-actions">
              <a className="button button-primary" href="#contact">Contact Us <ArrowRight size={16} /></a>
              <a className="button button-quiet" href="#products">Explore Products</a>
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
        <div className="footer-bottom">
          <p>© 2026 Synexta Pharma. All rights reserved.</p>
          <div className="footer-legal">
            <span>Privacy Policy</span>
            <span>Terms and Conditions</span>
          </div>
        </div>
      </footer>
      {selectedProduct && (
        <div className="product-dialog-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedProduct(null);
        }}>
          <section className="product-dialog" role="dialog" aria-modal="true" aria-labelledby="product-dialog-title">
            {selectedProduct.id === "neurosyn-m" ? (
              <>
                <header className="product-dialog-header">
                  <div className="product-dialog-tags">
                    <span>{neurosynDetails.category}</span>
                    <span>{neurosynDetails.formulation}</span>
                  </div>
                  <button className="product-dialog-close" type="button" aria-label="Close product details" autoFocus onClick={() => setSelectedProduct(null)}>
                    <X size={21} />
                  </button>
                  <h2 id="product-dialog-title">{neurosynDetails.name}</h2>
                  <p>{neurosynDetails.composition}</p>
                </header>
                <div className="product-dialog-content neurosyn-dialog-content">
                  <div className="product-dialog-overview">
                    <div className="product-dialog-image">
                      <img src={productImages[selectedProduct.id]} alt={`${neurosynDetails.name} product pack`} />
                    </div>
                    <div className="product-dialog-facts">
                      {neurosynDetails.facts.map(([label, value]) => (
                        <div key={label}><span>{label}</span><strong>{value}</strong></div>
                      ))}
                    </div>
                  </div>
                  <section className="neurosyn-indications">
                    <h3>KEY THERAPEUTIC INDICATIONS</h3>
                    <ul>
                      {neurosynDetails.indications.map((indication) => (
                        <li key={indication}><FileText size={16} aria-hidden="true" />{indication}</li>
                      ))}
                    </ul>
                  </section>
                  <section className="neurosyn-actives">
                    <div className="neurosyn-actives-heading">
                      <h3>KEY ACTIVE ACTIVES</h3>
                      <span>Standardized Pharmacopoeial Grade</span>
                    </div>
                    <div className="neurosyn-actives-grid">
                      {neurosynDetails.actives.map(([amount, active]) => (
                        <div key={active}><strong>{amount}</strong><span>{active}</span></div>
                      ))}
                    </div>
                  </section>
                  <button className="button button-primary product-dialog-action" type="button" onClick={() => chooseProduct(selectedProduct)}>
                    Buy Now <ArrowRight size={16} />
                  </button>
                </div>
              </>
            ) : (
              <>
            <header className="product-dialog-header">
              <div className="product-dialog-tags">
                <span>{selectedProduct.category || "Pharmaceuticals"}</span>
                <span>Product information</span>
              </div>
              <button className="product-dialog-close" type="button" aria-label="Close product details" autoFocus onClick={() => setSelectedProduct(null)}>
                <X size={21} />
              </button>
              <h2 id="product-dialog-title">{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
            </header>
            <div className="product-dialog-content">
              <div className="product-dialog-overview">
                <div className="product-dialog-image">
                  {productImages[selectedProduct.id]
                    ? <img src={productImages[selectedProduct.id]} alt={`${selectedProduct.name} product pack`} />
                    : <FlaskConical size={54} aria-hidden="true" />}
                </div>
                <div className="product-dialog-facts">
                  <div><span>Category</span><strong>{selectedProduct.category || "Pharmaceuticals"}</strong></div>
                  <div><span>Product</span><strong>{selectedProduct.name}</strong></div>
                  <div><span>Product information</span><strong>Contact our team for details</strong></div>
                  <div><span>Use</span><strong>Refer to the product packaging and healthcare professional guidance</strong></div>
                </div>
              </div>
              <div className="product-dialog-description">
                <h3>PRODUCT DESCRIPTION</h3>
                <p>{selectedProduct.description}</p>
              </div>
              <button className="button button-primary product-dialog-action" type="button" onClick={() => chooseProduct(selectedProduct)}>
                Enquire About This Product <ArrowRight size={16} />
              </button>
            </div>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default App;