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
      <rect x="2" y="2" width="36" height="36" rx="10" fill="#0F172A" stroke="#F59E0B" strokeWidth="2.5" />
      <path d="M17 14 L22 11 V29" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 26 h9 M13 22.5 l3.5 3.5 -3.5 3.5" fill="none" stroke="#F59E0B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33 15 h-8 M28.5 11.5 l-3.5 3.5 3.5 3.5" fill="none" stroke="#F59E0B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Animated trade-node illustration ---------- */
function TradeNode() {
  const still = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const orbit = "M-120 0 a120 48 0 1 0 240 0 a120 48 0 1 0 -240 0";
  const pos = [[-120, 0], [0, 48], [120, 0], [0, -48]];
  return (
    <svg viewBox="0 0 640 420" className="art" role="img" aria-label="OneTrade: an invoice from your business passes the GSTN, e-Way Bill and EDPMS verified trust bridge, cash reaches your bank in 24 hours while goods travel to the buyer by ship and air">
      <defs>
        <linearGradient id="gold" x1="0" x2="1"><stop offset="0" stopColor="#F59E0B" /><stop offset="1" stopColor="#FCD34D" /></linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <radialGradient id="halo"><stop offset="0" stopColor="#10B981" stopOpacity=".35" /><stop offset="1" stopColor="#10B981" stopOpacity="0" /></radialGradient>
      </defs>
      <g fill="none" stroke="#fff" strokeOpacity=".12"><circle cx="320" cy="210" r="195" /><ellipse cx="320" cy="210" rx="95" ry="195" /><ellipse cx="320" cy="210" rx="195" ry="75" /></g>
      <circle cx="320" cy="150" r="110" fill="url(#halo)" />
      {/* cash, goods and repayment lanes */}
      <path id="cash" d="M120 245 Q200 130 320 150 T505 112" fill="none" stroke="url(#gold)" strokeWidth="3.5" strokeDasharray="9 8" strokeLinecap="round" className="flow" />
      <path d="M120 280 Q300 405 470 322" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="4 10" strokeLinecap="round" className="flow slow" />
      <path d="M485 282 Q430 200 360 185" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round" className="flow rev" />
      {!still && <circle r="7" fill="#F59E0B" filter="url(#glow)"><animateMotion dur="4s" repeatCount="indefinite"><mpath href="#cash" /></animateMotion></circle>}
      {/* Your Business */}
      <g transform="translate(50 225)">
        <rect x="0" y="30" width="104" height="62" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
        <path d="M0 30 l26 -22 v22 l26 -22 v22 l26 -22 v22 h26 v-42 h-13 v20" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
        {[12, 42, 72].map((x) => <rect key={x} x={x} y="50" width="18" height="14" fill="#FCD34D" />)}
        <rect x="40" y="70" width="24" height="22" fill="#0F172A" />
        <text x="52" y="116" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="600">Your Business</text>
      </g>
      {/* Central trust bridge */}
      <g transform="translate(320 150)">
        <g fill="none" stroke="#F59E0B" strokeOpacity=".4"><ellipse rx="120" ry="48" transform="rotate(-12)" /></g>
        <path filter="url(#glow)" d="M0 -44 L36 -30 V6 C36 27 17 42 0 48 C-17 42 -36 27 -36 6 V-30Z" fill="#0F172A" stroke="#10B981" strokeWidth="3.5" />
        <path d="M-15 3 l10 11 l21 -25" fill="none" stroke="#10B981" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="-122" y="60" width="244" height="26" rx="13" fill="#10B981" />
        <text y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F172A">GSTN • e-Way Bill • EDPMS Verified</text>
        <g transform="rotate(-12)">
          {["₹", "$", "€", "£"].map((s, i) => (
            <g key={s} transform={still ? `translate(${pos[i][0]} ${pos[i][1]})` : undefined}>
              {!still && <animateMotion dur="14s" begin={`${-i * 3.5}s`} repeatCount="indefinite" path={orbit} />}
              <g transform="rotate(12)"><circle r="17" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" filter="url(#glow)" /><text y="7" textAnchor="middle" fontSize="19" fontWeight="700" fill="#F59E0B">{s}</text></g>
            </g>
          ))}
        </g>
      </g>
      {/* Bank */}
      <g transform="translate(505 40)">
        <path d="M0 32 L40 6 L80 32Z" fill="#F59E0B" /><rect x="8" y="36" width="64" height="8" fill="#F8FAFC" />
        {[12, 30, 48, 62].map((x) => <rect key={x} x={x} y="46" width="8" height="30" fill="#F8FAFC" />)}
        <rect x="0" y="78" width="80" height="8" fill="#F8FAFC" />
        <text x="35" y="108" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="600">Cash Disbursed in 24h</text>
      </g>
      {/* Container ship + air freight */}
      <g transform="translate(430 292)">
        {["#F59E0B", "#38BDF8", "#F8FAFC", "#10B981"].map((c, i) => <rect key={i} x={12 + (i % 2) * 44} y={-4 - Math.floor(i / 2) * 26} width="40" height="24" fill={c} stroke="#0F172A" strokeWidth="2" />)}
        <path d="M0 24 H124 L106 52 H18Z" fill="#1E293B" stroke="#fff" strokeOpacity=".55" strokeWidth="2" />
        <text x="62" y="80" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="600">Global / Domestic Buyer</text>
      </g>
      <g transform="translate(548 205) rotate(-20)" fill="#F8FAFC"><path d="M0 0 h26 l10 -9 h6 l-5 9 h10 v4 h-10 l5 9 h-6 l-10 -9 h-26z" /></g>
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
        <label className="grow">Invoice value
          <span className="field"><i>{SYM[c]}</i>
            <input inputMode="numeric" placeholder={tab === "dom" ? "25,00,000" : "50,000"} value={val ? (+val).toLocaleString(c === "INR" ? "en-IN" : "en-US") : ""} onChange={(e) => { setVal(e.target.value.replace(/\D/g, "")); setOut(null); }} />
          </span>
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
  const unlocked = advance - fee, save = advance * 0.01 * (days / 30);
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
          <dt>You save vs. typical 1.5%/month credit</dt><dd className="mint">{fmt(save, c)}</dd>
          <dt className="big">Capital unlocked in 24 hours</dt><dd className="big">{fmt(unlocked, c)}</dd>
        </dl>
      </div>
      <p className="fine">Indicative figures; savings assume a 1.5%/month market rate. Final pricing depends on buyer credibility and lender terms.</p>
    </section>
  );
}

const PRODUCTS = [["Invoice discounting", "Get paid against approved invoices in 24–48 hours.", "Domestic"], ["PO financing", "Fund raw material and production before you invoice.", "Domestic"], ["Export factoring", "Recourse and non-recourse cover on foreign buyers, in USD, EUR or GBP.", "Export"], ["Reverse factoring", "Anchor buyers extend early-payment finance to their suppliers.", "Domestic"]];
const STEPS = [["Connect GST / ERP", "GSTN, e-Way Bill and Shipping Bill details are fetched automatically."], ["Instant credit assessment", "AI evaluates buyer credibility within 2 hours."], ["Receive funds in 24h", "Up to 90–95% of invoice value lands in your bank account."]];
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
  return (
    <div className="site">
      <nav className="nav">
        <a className="brand" href="#top"><Logo />One<b>Trade</b></a>
        <div className="links"><a href="#calculator">Calculator</a><a href="#products">Products</a><a href="#how">How it works</a><a href="#proof">Results</a></div>
        <a className="btn btn-gold sm" href="#check">Get limit</a>
      </nav>

      <header className="hero" id="top">
        <div className="copy">
          <span className="chip">0.5% per month • 24-hour disbursal • Zero collateral required</span>
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
        <div className="cards">{PRODUCTS.map(([t, d, g]) => <article key={t} className="glass"><span className="tag">{g}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>

      <section className="light" id="how">
        <h2>Cash in three steps</h2>
        <ol className="steps">{STEPS.map(([t, d], i) => <li key={t}><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
      </section>

      <section className="dark" id="proof">
        <div className="stats">
          <Counter end={500} pre="₹" suf="Cr+" label="Funded" />
          <Counter end={24} suf="hr" label="Disbursal average" />
          <Counter end={40} suf="+" label="RBI regulated partners" />
        </div>
        <div className="cards three">{QUOTES.map(([q, w]) => <figure key={w} className="glass"><blockquote>“{q}”</blockquote><figcaption>{w} <em>Verified</em></figcaption></figure>)}</div>
      </section>

      <footer>
        <div className="badges"><span>🧾 GST</span><span>🛃 EDPMS</span><span>🏦 RBI partner banks</span><span>🔒 ISO 27001</span></div>
        <small>© 2026 OneTrade. Financing is provided by regulated partner lenders; rates are indicative.</small>
      </footer>
      <div className="sticky"><a className="btn btn-gold" href="#check">Check eligible credit limit</a></div>
    </div>
  );
}