import { useEffect, useRef, useState } from "react";
import "./styles.css";

const SYM = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };
const trim = (n) => n.toFixed(2).replace(/\.?0+$/, "");
const fmt = (v, c = "INR") =>
  c === "INR"
    ? v >= 1e7 ? `₹${trim(v / 1e7)} Cr` : v >= 1e5 ? `₹${trim(v / 1e5)} L` : `₹${Math.round(v).toLocaleString("en-IN")}`
    : v >= 1e6 ? `${SYM[c]}${trim(v / 1e6)}M` : v >= 1e3 ? `${SYM[c]}${Math.round(v / 1e3)}K` : `${SYM[c]}${Math.round(v)}`;

function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#0F3D3E" />
      <ellipse cx="20" cy="20" rx="7" ry="18" fill="none" stroke="#F59E0B" strokeWidth="1.6" opacity=".7" />
      <path d="M2 20h36" stroke="#F59E0B" strokeWidth="1.6" opacity=".7" />
      <text x="20" y="27.5" textAnchor="middle" fontSize="21" fontWeight="800" fill="#F59E0B" stroke="#0F3D3E" strokeWidth="3" paintOrder="stroke" fontFamily="Bricolage Grotesque, sans-serif">₹</text>
    </svg>
  );
}

/* ---------- Warm trade-node illustration ---------- */
function TradeNode() {
  const still = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pend = [...Array(13)].map((_, i) => {
    const t = (i + 0.5) / 13, x = -10 + 660 * t, y = 8 + 104 * t * (1 - t);
    return <path key={i} d={`M${x - 7} ${y} h14 l-7 24z`} fill={i % 2 ? "#0F766E" : "#F59E0B"} />;
  });
  return (
    <svg viewBox="0 0 640 420" className="art" role="img" aria-label="Your factory sends an invoice through a GSTN and e-Way Bill verified bridge to a buyer's office and cargo ship; cash returns in 24 hours">
      <circle cx="320" cy="220" r="185" fill="#FDE9B8" />
      <g stroke="#F59E0B" strokeWidth="2" opacity=".4">{[...Array(20)].map((_, i) => <line key={i} x1="320" y1="220" x2={320 + 400 * Math.cos((i * Math.PI) / 10)} y2={220 + 400 * Math.sin((i * Math.PI) / 10)} />)}</g>
      {/* toran */}
      <path d="M-10 8 Q320 112 650 8" fill="none" stroke="#0F766E" strokeWidth="3" />
      {pend}
      <rect x="0" y="372" width="640" height="48" fill="#E9DFC8" />
      <rect x="350" y="366" width="136" height="54" fill="#BFE3D6" />
      {/* Factory / store */}
      <g transform="translate(36 200)">
        <rect x="112" y="-2" width="14" height="44" fill="#0F3D3E" />
        <path d="M0 50V20L30 40V20L60 40V20L90 40V20L120 40V50Z" fill="#0F3D3E" />
        <rect x="0" y="50" width="134" height="122" fill="#FFFDF9" stroke="#0F3D3E" strokeWidth="4" />
        {[...Array(6)].map((_, i) => <path key={i} d={`M${i * 22.3} 56h22.3v14a11 11 0 0 1 -22.3 0z`} fill={i % 2 ? "#FFFDF9" : "#F59E0B"} stroke="#0F3D3E" strokeWidth="1.5" />)}
        {[12, 52].map((x) => <rect key={x} x={x} y="88" width="30" height="24" fill="#FCD34D" stroke="#0F3D3E" strokeWidth="3" />)}
        <rect x="92" y="118" width="32" height="54" fill="#0F3D3E" />
        <circle cx="42" cy="142" r="17" fill="#F59E0B" stroke="#0F3D3E" strokeWidth="3" />
        <text x="42" y="149" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0F3D3E">₹</text>
        <text x="67" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F3D3E">Your Factory / Store</text>
      </g>
      {/* Buyer office + ship */}
      <g transform="translate(486 140)">
        <path d="M55 0V-18" stroke="#0F3D3E" strokeWidth="3" />
        <rect width="110" height="232" rx="4" fill="#0F3D3E" />
        {[...Array(8)].map((_, r) => [0, 1, 2, 3].map((k) => <rect key={r + "" + k} x={12 + k * 24} y={16 + r * 26} width="16" height="16" fill={(r * 3 + k) % 3 === 0 ? "#FCD34D" : "#2F6F70"} />))}
        <rect x="42" y="208" width="26" height="24" fill="#FFFDF9" />
      </g>
      <g transform="translate(372 330)">
        {["#F59E0B", "#10B981", "#FFFDF9", "#F59E0B", "#FFFDF9"].map((c, i) => <rect key={i} x={10 + (i % 3) * 30} y={i < 3 ? -2 : -26} width="28" height="24" fill={c} stroke="#0F3D3E" strokeWidth="2" transform={i < 3 ? "" : "translate(15 0)"} />)}
        <path d="M0 22H108L92 46H16Z" fill="#0F3D3E" />
      </g>
      <text x="418" y="408" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F3D3E">Buyer in India / Abroad</text>
      {/* flows */}
      <path id="cash" d="M172 250 C232 130 412 130 482 240" fill="none" stroke="#D97706" strokeWidth="3.5" strokeDasharray="9 8" strokeLinecap="round" className="flow" />
      <path d="M482 300 C420 350 240 350 172 300" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="4 9" strokeLinecap="round" className="flow rev" />
      {!still && <circle r="8" fill="#F59E0B" stroke="#0F3D3E" strokeWidth="2"><animateMotion dur="4s" repeatCount="indefinite"><mpath href="#cash" /></animateMotion></circle>}
      {/* trust bridge */}
      <g transform="translate(325 168)">
        <path d="M0 -40 L33 -27 V6 C33 25 16 38 0 44 C-16 38 -33 25 -33 6 V-27Z" fill="#FFFDF9" stroke="#0F3D3E" strokeWidth="4" />
        <path d="M-14 2 l9 10 l19 -23" fill="none" stroke="#059669" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="-104" y="54" width="208" height="26" rx="13" fill="#0F3D3E" />
        <text y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFFDF9">GSTN &amp; e-Way Bill Verified</text>
      </g>
      {[["₹", 250, 205], ["$", 400, 205]].map(([s, x, y], i) => (
        <g key={s} className="bob" style={{ animationDelay: `${i * 0.8}s` }}>
          <circle cx={x} cy={y} r="17" fill="#FFFDF9" stroke="#F59E0B" strokeWidth="2.5" />
          <text x={x} y={y + 7} textAnchor="middle" fontSize="19" fontWeight="800" fill="#0F3D3E">{s}</text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- Hero quick limit widget ---------- */
const BUYERS = { dom: ["Large corporate", "MNC / listed company", "Government / PSU", "Other business"], exp: ["USA", "Europe", "United Kingdom", "Middle East / Other"] };
function LimitWidget() {
  const [tab, setTab] = useState("dom");
  const [cur, setCur] = useState("USD");
  const [val, setVal] = useState("");
  const [buyer, setBuyer] = useState("");
  const [out, setOut] = useState(null);
  const c = tab === "dom" ? "INR" : cur;
  const reset = () => setOut(null);
  const check = (e) => {
    e.preventDefault();
    const v = +val;
    if (v > 0) setOut(tab === "dom" ? Math.min(v * 0.95, 5e7) : v * 0.95);
  };
  return (
    <form className="widget" onSubmit={check} id="check">
      <div className="tabs" role="tablist">
        {[["dom", "Domestic Discounting"], ["exp", "Export Receivables"]].map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => { setTab(k); setBuyer(""); reset(); }}>{l}</button>
        ))}
      </div>
      <div className="row">
        {tab === "exp" && (
          <label className="cur">Currency
            <select value={cur} onChange={(e) => { setCur(e.target.value); reset(); }}>{["USD", "EUR", "GBP"].map((x) => <option key={x}>{x}</option>)}</select>
          </label>
        )}
        <label className="grow">Invoice amount
          <span className="field"><i>{SYM[c]}</i>
            <input inputMode="numeric" placeholder={tab === "dom" ? "25,00,000" : "50,000"} value={val ? (+val).toLocaleString(c === "INR" ? "en-IN" : "en-US") : ""} onChange={(e) => { setVal(e.target.value.replace(/\D/g, "")); reset(); }} />
          </span>
        </label>
        <label className="grow">Target buyer / business type
          <select value={buyer} onChange={(e) => setBuyer(e.target.value)}>
            <option value="">Select…</option>{BUYERS[tab].map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
      </div>
      <button className="btn btn-amber" type="submit">Check Eligible Limit</button>
      <p className="result" aria-live="polite">{out ? <>Indicative limit: <b>{fmt(out, c)}</b> in about 24 hours</> : "Up to 95% of invoice value. No collateral."}</p>
    </form>
  );
}

/* ---------- Calculator ---------- */
function Calculator() {
  const [v, setV] = useState(2.5e7);
  const [days, setDays] = useState(60);
  const advance = v * 0.95, fee = v * 0.0075, cost = advance * 0.005 * (days / 30), save = advance * 0.01 * (days / 30);
  return (
    <section className="sand" id="calculator">
      <h2>See exactly what you unlock</h2>
      <div className="calc">
        <div>
          <label className="slider"><span>Invoice value <b>{fmt(v)}</b></span>
            <input type="range" min={5e5} max={5e7} step={5e5} value={v} onChange={(e) => setV(+e.target.value)} /></label>
          <label className="slider"><span>Credit period <b>{days} days</b></span>
            <input type="range" min={30} max={90} step={15} value={days} onChange={(e) => setDays(+e.target.value)} /></label>
        </div>
        <dl className="out">
          <dt>Upfront cash payout (95%)</dt><dd>{fmt(advance)}</dd>
          <dt>Flat platform fee (0.75%)</dt><dd>− {fmt(fee)}</dd>
          <dt>Discounting cost at 0.5%/month</dt><dd>{fmt(cost)} at settlement</dd>
          <dt>You save vs. typical 1.5%/month credit</dt><dd className="green">{fmt(save)}</dd>
          <dt className="big">Cash in your account</dt><dd className="big">{fmt(advance - fee)}</dd>
        </dl>
      </div>
      <p className="fine">Indicative figures; savings assume a 1.5%/month market rate. Final pricing depends on buyer credibility.</p>
    </section>
  );
}

const PRODUCTS = [["Domestic Invoice Discounting", "Get paid against approved invoices in 24–48 hours.", "Domestic"], ["Export Receivables", "Cash against export invoices while your buyer takes 30–90 days.", "Export"], ["PO Financing", "Fund raw material and production before you invoice.", "Domestic"], ["Vendor Financing", "Anchor buyers offer early payment to their suppliers.", "Domestic"]];
const STEPS = [["Upload invoice", "Connect GST or your ERP. Invoice, e-Way Bill and Shipping Bill details are fetched automatically."], ["Instant automated credit check", "We assess your buyer's credibility, usually within 2 hours."], ["Disbursal in 24 hours", "Up to 95% of the invoice value is credited to your bank account."]];
const QUOTES = [["We stopped waiting 75 days on European buyers. Cash arrived the next morning.", "Textile Exporter, Tirupur"], ["Vendor financing let us pay our suppliers early without touching our own credit lines.", "Auto Component Supplier, Pune"], ["Approval was based on the buyer, not our balance sheet. That changed our growth plan.", "Engineering Goods Exporter, Rajkot"]];
const TRUST = ["100% GST & e-Way Bill verified", "RBI-regulated partner network", "FEMA & EDPMS compliant", "End-to-end encryption"];

function Counter({ end, pre = "", suf = "", label }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => { const p = Math.min((t - t0) / 1200, 1); setN(end * p); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [end]);
  return <div ref={ref} className="stat"><strong>{pre}{Math.round(n)}{suf}</strong><span>{label}</span></div>;
}

export default function App() {
  return (
    <div className="site">
      <nav className="nav">
        <a className="brand" href="#top"><Logo />One<b>Trade</b></a>
        <div className="links"><a href="#calculator">Calculator</a><a href="#products">Products</a><a href="#how">How it works</a><a href="#proof">Results</a></div>
        <a className="btn btn-amber sm" href="#check">Get my limit</a>
      </nav>

      <header className="hero" id="top">
        <div className="copy">
          <span className="chip">Free to compare • 0.5% starting rate • Zero hidden fees</span>
          <h1>Turn unpaid invoices into instant cash flow at <mark>0.5% a month</mark></h1>
          <p>Unlock up to ₹5 Crores ($600K) against domestic and export invoices in 24 hours. No collateral required.</p>
          <LimitWidget />
        </div>
        <div className="visual">
          <TradeNode />
          <div className="badge b1"><span className="ico gold">₹</span><div><b>Inventory Stocked</b><small>Working Capital Disbursed</small></div></div>
          <div className="badge b2"><span className="ico green">✓</span><div><b>Export Invoice Cleared</b><small>Cash in 24h</small></div></div>
        </div>
      </header>

      <ul className="trust" aria-label="Compliance">{TRUST.map((t) => <li key={t}>✓ {t}</li>)}</ul>
      <Calculator />

      <section id="products">
        <h2>Finance for every stage of your trade cycle</h2>
        <div className="cards">{PRODUCTS.map(([t, d, g]) => <article key={t} className="card"><span className="tag">{g}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>

      <section className="sand" id="how">
        <h2>Cash in three simple steps</h2>
        <ol className="steps">{STEPS.map(([t, d], i) => <li key={t} className="card"><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
      </section>

      <section id="proof">
        <div className="stats">
          <Counter end={500} pre="₹" suf="Cr+" label="Funded" />
          <Counter end={24} suf="hr" label="Disbursal average" />
          <Counter end={40} suf="+" label="RBI regulated partners" />
        </div>
        <div className="cards three">{QUOTES.map(([q, w]) => <figure key={w} className="card"><blockquote>“{q}”</blockquote><figcaption>{w} <em>Verified</em></figcaption></figure>)}</div>
      </section>

      <footer>
        <div className="badges"><span>🧾 GST</span><span>🛃 EDPMS</span><span>🏦 RBI partner banks</span><span>🔒 ISO 27001</span></div>
        <small>© 2026 OneTrade. Financing is provided by regulated partner lenders; rates are indicative.</small>
      </footer>
      <div className="sticky"><a className="btn btn-amber" href="#check">Check Eligible Limit</a></div>
    </div>
  );
}