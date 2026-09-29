import { useEffect, useRef, useState } from "react";
import "./styles.css";

const SYM = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };
const trim = (n) => n.toFixed(2).replace(/\.?0+$/, "");
const fmt = (v, c = "INR") =>
  c === "INR"
    ? v >= 1e7 ? `₹${trim(v / 1e7)} Cr` : v >= 1e5 ? `₹${trim(v / 1e5)} L` : `₹${Math.round(v).toLocaleString("en-IN")}`
    : v >= 1e6 ? `${SYM[c]}${trim(v / 1e6)}M` : v >= 1e3 ? `${SYM[c]}${Math.round(v / 1e3)}K` : `${SYM[c]}${Math.round(v)}`;

/* ---------- Animated trade-node illustration ---------- */
function TradeNode() {
  return (
    <svg viewBox="0 0 640 420" className="art" role="img" aria-label="Invoice from a factory passes an instant verification bridge and reaches a bank account, while goods ship in a cargo container">
      <defs>
        <linearGradient id="gold" x1="0" x2="1"><stop offset="0" stopColor="#F5C542" /><stop offset="1" stopColor="#FDE68A" /></linearGradient>
      </defs>
      <g fill="none" stroke="#fff" strokeOpacity=".14">
        <circle cx="320" cy="210" r="190" /><ellipse cx="320" cy="210" rx="90" ry="190" /><ellipse cx="320" cy="210" rx="190" ry="70" />
      </g>
      {/* lanes */}
      <path id="cash" d="M120 250 Q190 90 320 140 T540 110" fill="none" stroke="url(#gold)" strokeWidth="3" strokeDasharray="8 8" className="flow" />
      <path d="M120 270 Q300 400 500 320" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="4 10" className="flow slow" />
      <circle r="7" fill="#F5C542"><animateMotion dur="4s" repeatCount="indefinite"><mpath href="#cash" /></animateMotion></circle>
      {/* factory */}
      <g transform="translate(50 220)">
        <rect x="0" y="30" width="100" height="60" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
        <path d="M0 30 l25 -22 v22 l25 -22 v22 l25 -22 v22 h25 v-40 h-12 v18" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
        {[12, 40, 68].map((x) => <rect key={x} x={x} y="50" width="18" height="14" fill="#FDE68A" />)}
        <text x="50" y="115" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="600">Your factory</text>
      </g>
      {/* verification bridge */}
      <g transform="translate(320 140)">
        <path d="M0 -42 L34 -28 V6 C34 26 16 40 0 46 C-16 40 -34 26 -34 6 V-28Z" fill="#0F172A" stroke="#F5C542" strokeWidth="3" />
        <path d="M-14 2 l9 10 l19 -22" fill="none" stroke="#F5C542" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="-78" y="56" width="156" height="26" rx="13" fill="#F5C542" />
        <text y="74" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A">GSTN · e-Way Bill verified</text>
      </g>
      {/* bank */}
      <g transform="translate(500 50)">
        <path d="M0 30 L40 4 L80 30Z" fill="#F5C542" /><rect x="8" y="34" width="64" height="8" fill="#F8FAFC" />
        {[12, 30, 48, 62].map((x) => <rect key={x} x={x} y="44" width="8" height="30" fill="#F8FAFC" />)}
        <rect x="0" y="76" width="80" height="8" fill="#F8FAFC" />
        <text x="40" y="106" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="600">Cash in 24h</text>
      </g>
      {/* cargo ship + containers */}
      <g transform="translate(430 290)">
        {["#F5C542", "#38BDF8", "#F8FAFC", "#F5C542"].map((c, i) => <rect key={i} x={10 + (i % 2) * 44} y={-4 - Math.floor(i / 2) * 26} width="40" height="24" fill={c} stroke="#0F172A" strokeWidth="2" />)}
        <path d="M0 24 H120 L104 50 H16Z" fill="#1E293B" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
        <text x="60" y="76" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="600">Buyer abroad</text>
      </g>
      {/* currency badges */}
      {[["₹", 250, 50], ["$", 585, 190], ["€", 30, 140], ["£", 380, 30]].map(([s, x, y], i) => (
        <g key={s} className="bob" style={{ animationDelay: `${i * 0.6}s` }}>
          <circle cx={x} cy={y} r="19" fill="rgba(255,255,255,.1)" stroke="#F5C542" strokeWidth="2" />
          <text x={x} y={y + 7} textAnchor="middle" fontSize="20" fontWeight="700" fill="#F5C542">{s}</text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- Hero quick limit widget ---------- */
function LimitWidget() {
  const [tab, setTab] = useState("dom");
  const [cur, setCur] = useState("USD");
  const [val, setVal] = useState("");
  const [out, setOut] = useState(null);
  const c = tab === "dom" ? "INR" : cur;
  const check = (e) => {
    e.preventDefault();
    const v = +val;
    if (v > 0) setOut(tab === "dom" ? Math.min(v * 0.95, 5e7) : v * 0.95);
  };
  return (
    <form className="widget" onSubmit={check} id="check">
      <div className="tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === "dom"} onClick={() => { setTab("dom"); setOut(null); }}>Domestic Invoice Discounting</button>
        <button type="button" role="tab" aria-selected={tab === "exp"} onClick={() => { setTab("exp"); setOut(null); }}>Export Receivables</button>
      </div>
      <div className="row">
        {tab === "exp" && (
          <label className="cur">Currency
            <select value={cur} onChange={(e) => { setCur(e.target.value); setOut(null); }}>
              {["USD", "EUR", "GBP"].map((x) => <option key={x}>{x}</option>)}
            </select>
          </label>
        )}
        <label className="grow">Invoice value ({SYM[c]})
          <input inputMode="numeric" placeholder={tab === "dom" ? "e.g. 25,00,000" : "e.g. 50,000"} value={val ? (+val).toLocaleString(c === "INR" ? "en-IN" : "en-US") : ""} onChange={(e) => { setVal(e.target.value.replace(/\D/g, "")); setOut(null); }} />
        </label>
      </div>
      <button className="btn btn-gold" type="submit">Check eligible credit limit</button>
      <p className="result" aria-live="polite">{out ? <>Indicative limit: <b>{fmt(out, c)}</b> in ~24 hours</> : "Up to 95% of invoice value. No collateral."}</p>
    </form>
  );
}

/* ---------- ROI calculator ---------- */
function Calculator() {
  const [c, setC] = useState("INR");
  const [v, setV] = useState(2.5e7);
  const [days, setDays] = useState(60);
  const cfg = c === "INR" ? { min: 1e6, max: 1e8, step: 5e5 } : { min: 1e4, max: 1e6, step: 1e4 };
  const val = Math.min(Math.max(v, cfg.min), cfg.max);
  const advance = val * 0.95, fee = val * 0.0075, cost = advance * 0.005 * (days / 30);
  const unlocked = advance - fee;
  return (
    <section className="light" id="calculator">
      <h2>See exactly what you unlock</h2>
      <div className="calc">
        <div>
          <div className="seg" role="group" aria-label="Currency">
            {["INR", "USD"].map((x) => <button key={x} aria-pressed={c === x} onClick={() => { setC(x); setV(x === "INR" ? 2.5e7 : 2.5e5); }}>{x === "INR" ? "₹ Domestic" : "$ Export"}</button>)}
          </div>
          <label className="slider"><span>Invoice value <b>{fmt(val, c)}</b></span>
            <input type="range" min={cfg.min} max={cfg.max} step={cfg.step} value={val} onChange={(e) => setV(+e.target.value)} /></label>
          <div className="slider"><span>Payment delay <b>{days} days</b></span>
            <div className="seg" role="group" aria-label="Payment delay">
              {[30, 60, 90].map((d) => <button key={d} aria-pressed={days === d} onClick={() => setDays(d)}>{d} days</button>)}
            </div>
          </div>
        </div>
        <dl className="out">
          <dt>Upfront cash received (95%)</dt><dd>{fmt(advance, c)}</dd>
          <dt>Flat platform fee (0.75%)</dt><dd>− {fmt(fee, c)}</dd>
          <dt>Discounting cost (0.5%/month × {days / 30})</dt><dd>{fmt(cost, c)} at settlement</dd>
          <dt className="big">Capital unlocked in 24 hours</dt><dd className="big">{fmt(unlocked, c)}</dd>
        </dl>
      </div>
      <p className="fine">Indicative figures. Final pricing depends on buyer credibility and lender terms.</p>
    </section>
  );
}

const PRODUCTS = {
  dom: [["Invoice discounting", "Get paid against approved invoices in 24–48 hours."], ["Reverse factoring", "Anchor buyers extend supplier finance at their own rating."], ["PO financing", "Fund raw material and production before you invoice."], ["Working capital lines", "Revolving credit tied to your receivables cycle."]],
  exp: [["Export factoring", "Recourse and non-recourse options against foreign buyers."], ["Freight & packing credit", "Pre-shipment funding for freight, packing and production."], ["Currency hedging", "Lock in USD, EUR or GBP rates and protect your margin."], ["Post-shipment discounting", "Cash against shipping bills while buyers pay in 30–90 days."]],
};
const STEPS = [["Upload invoice or connect ERP", "GSTN, e-Way Bill and Shipping Bill details are fetched automatically."], ["Automated risk and buyer check", "AI credit evaluation of buyer credibility within 2 hours."], ["Instant disbursal", "Up to 90–95% of invoice value credited to your bank account."]];
const QUOTES = [["We stopped waiting 75 days on European buyers. Cash arrived the next morning.", "Textile Exporter, Tirupur"], ["Reverse factoring let us pay suppliers early without touching our own credit lines.", "Auto Component Supplier, Pune"], ["Approval was based on the buyer, not our balance sheet. That changed our growth plan.", "Engineering Goods Exporter, Rajkot"]];
const TRUST = ["100% GST & e-Way Bill verified", "RBI-regulated partner network", "FEMA & EDPMS compliant", "End-to-end encryption"];

function Counter({ end, pre = "", suf = "", dec = 0, label }) {
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
  return <div ref={ref} className="stat"><strong>{pre}{n.toFixed(dec)}{suf}</strong><span>{label}</span></div>;
}

export default function App() {
  const [ptab, setPtab] = useState("dom");
  return (
    <div className="site">
      <nav className="nav">
        <a className="brand" href="#top"><span className="mark">⇄</span>Trade<b>Lift</b></a>
        <div className="links"><a href="#calculator">Calculator</a><a href="#products">Products</a><a href="#how">How it works</a><a href="#proof">Results</a></div>
        <a className="btn btn-gold sm" href="#check">Get limit</a>
      </nav>

      <header className="hero" id="top">
        <div className="copy">
          <span className="chip">0.5% per month · 24-hour disbursal · No collateral</span>
          <h1>Turn unpaid invoices into instant cash flow at <mark>0.5% a month.</mark></h1>
          <p>Unlock up to ₹5 Crores ($600K) against domestic and export purchase orders in 24 hours. No collateral required.</p>
          <LimitWidget />
        </div>
        <div className="visual"><TradeNode /></div>
      </header>

      <ul className="trust" aria-label="Compliance">{TRUST.map((t) => <li key={t}>✓ {t}</li>)}</ul>

      <Calculator />

      <section className="dark" id="products">
        <h2>Finance for every stage of the trade cycle</h2>
        <div className="seg wide" role="tablist">
          <button role="tab" aria-selected={ptab === "dom"} onClick={() => setPtab("dom")}>Domestic supply chain</button>
          <button role="tab" aria-selected={ptab === "exp"} onClick={() => setPtab("exp")}>Cross-border &amp; export</button>
        </div>
        <div className="cards">{PRODUCTS[ptab].map(([t, d]) => <article key={t} className="glass"><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>

      <section className="light" id="how">
        <h2>Cash in three steps</h2>
        <ol className="steps">{STEPS.map(([t, d], i) => <li key={t}><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
      </section>

      <section className="dark" id="proof">
        <div className="stats">
          <Counter end={500} pre="₹" suf="Cr+" label="Disbursed" />
          <Counter end={24} suf=" hrs" label="Average disbursal" />
          <Counter end={0.5} suf="%" dec={1} label="Starting monthly rate" />
        </div>
        <div className="cards three">{QUOTES.map(([q, w]) => <figure key={w} className="glass"><blockquote>“{q}”</blockquote><figcaption>{w} <em>Verified</em></figcaption></figure>)}</div>
      </section>

      <footer>
        <div className="badges"><span>🧾 GST</span><span>🛃 EDPMS</span><span>🏦 RBI partner banks</span><span>🔒 ISO 27001</span></div>
        <small>© 2026 TradeLift. Financing is provided by regulated partner lenders; rates are indicative.</small>
      </footer>
      <div className="sticky"><a className="btn btn-gold" href="#check">Check eligible credit limit</a></div>
    </div>
  );
}