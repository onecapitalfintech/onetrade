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
      <path d="M8 15 Q20 3 32 15" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" opacity=".8" />
      {[[11, 16], [18, 16], [25, 16], [14.5, 10.5], [21.5, 10.5]].map(([x, y], i) => <rect key={i} x={x} y={y} width="6" height="5" fill={i % 2 ? "#FFFDF9" : "#F59E0B"} />)}
      <path d="M7 23 H33 L29.5 30 H10.5Z" fill="#F59E0B" />
      <path d="M8 33 q3 -2 6 0 t6 0 t6 0 t6 0" fill="none" stroke="#FFFDF9" strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

/* ---------- B2B trade & logistics illustration ---------- */
function TradeNode() {
  const still = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <svg viewBox="0 0 640 420" className="art" role="img" aria-label="A factory ships goods by truck and container ship while its invoice passes a GSTN, e-Way Bill and EDPMS verified bridge and a bank disburses cash within 24 hours">
      <circle cx="320" cy="215" r="190" fill="#FDE9B8" />
      <g stroke="#F59E0B" strokeWidth="2" opacity=".28">{[...Array(20)].map((_, i) => <line key={i} x1="320" y1="215" x2={320 + 400 * Math.cos((i * Math.PI) / 10)} y2={215 + 400 * Math.sin((i * Math.PI) / 10)} />)}</g>
      {/* quay + sea */}
      <rect x="0" y="340" width="300" height="80" fill="#E9DFC8" />
      <rect x="300" y="340" width="340" height="80" fill="#BFE3D6" />
      <path d="M310 356 q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="#FFFDF9" strokeWidth="2.5" opacity=".8" />
      {/* factory */}
      <g transform="translate(28 190)">
        <rect x="120" y="-14" width="12" height="60" fill="#0F3D3E" /><rect x="136" y="-4" width="10" height="50" fill="#0F3D3E" />
        <path d="M0 50V22L38 44V22L76 44V22L114 44V22L152 44V50Z" fill="#0F3D3E" />
        <rect x="0" y="50" width="152" height="100" fill="#FFFDF9" stroke="#0F3D3E" strokeWidth="4" />
        {[0, 1, 2].map((i) => <g key={i}><rect x={14 + i * 46} y="86" width="36" height="64" fill="#FCD34D" stroke="#0F3D3E" strokeWidth="3" /><path d={`M${14 + i * 46} 100h36M${14 + i * 46} 114h36M${14 + i * 46} 128h36`} stroke="#0F3D3E" strokeOpacity=".45" strokeWidth="2" /></g>)}
        <rect x="44" y="58" width="64" height="18" rx="4" fill="#0F3D3E" /><text x="76" y="71" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FCD34D">MANUFACTURING</text>
        <text x="76" y="182" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F3D3E">Your Factory / Business</text>
      </g>
      {/* freight truck */}
      <g transform="translate(190 298)">
        <rect width="72" height="40" rx="3" fill="#F59E0B" stroke="#0F3D3E" strokeWidth="2.5" />
        <path d="M76 12h16l10 14v14H76z" fill="#0F3D3E" /><rect x="82" y="16" width="10" height="9" fill="#BFE3D6" />
        {[16, 88].map((x) => <circle key={x} cx={x} cy="42" r="7" fill="#0F3D3E" stroke="#FFFDF9" strokeWidth="2" />)}
      </g>
      {/* container ship */}
      <g transform="translate(346 266)">
        {[0, 1, 2, 3, 4].map((i) => <rect key={"a" + i} x={8 + i * 34} y="30" width="32" height="22" fill={["#F59E0B", "#0F766E", "#FFFDF9", "#10B981", "#F59E0B"][i]} stroke="#0F3D3E" strokeWidth="2" />)}
        {[1, 2, 3].map((i) => <rect key={"b" + i} x={8 + i * 34} y="8" width="32" height="22" fill={["#FFFDF9", "#F59E0B", "#0F766E"][i - 1]} stroke="#0F3D3E" strokeWidth="2" />)}
        <rect x="186" y="16" width="26" height="36" fill="#FFFDF9" stroke="#0F3D3E" strokeWidth="2.5" /><rect x="192" y="22" width="14" height="8" fill="#BFE3D6" />
        <path d="M0 52H216L192 84H26Z" fill="#0F3D3E" />
        <text x="108" y="128" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F3D3E">Freight &amp; Cargo</text>
      </g>
      {/* bank */}
      <g transform="translate(515 85)">
        <path d="M0 26L45 0L90 26Z" fill="#F59E0B" stroke="#0F3D3E" strokeWidth="2" />
        <rect y="28" width="90" height="7" fill="#FFFDF9" stroke="#0F3D3E" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={8 + i * 17} y="38" width="9" height="34" fill="#FFFDF9" stroke="#0F3D3E" strokeWidth="1.5" />)}
        <rect y="74" width="90" height="9" fill="#0F3D3E" />
        <text x="45" y="106" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F3D3E">Cash Disbursed in 24h</text>
      </g>
      {/* flow lines */}
      <path id="cash" d="M170 232 Q240 120 325 172 T515 150" fill="none" stroke="#D97706" strokeWidth="3.5" strokeDasharray="9 8" strokeLinecap="round" className="flow" />
      <path d="M430 262 Q400 225 355 205" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="5 8" strokeLinecap="round" className="flow rev" />
      <path d="M262 322 H340" fill="none" stroke="#0F3D3E" strokeWidth="3" strokeDasharray="3 8" strokeLinecap="round" className="flow" />
      {!still && <circle r="8" fill="#F59E0B" stroke="#0F3D3E" strokeWidth="2"><animateMotion dur="4.5s" repeatCount="indefinite"><mpath href="#cash" /></animateMotion></circle>}
      {/* security bridge */}
      <g transform="translate(325 172)">
        <path d="M0 -40L33 -27V6C33 25 16 38 0 44C-16 38 -33 25 -33 6V-27Z" fill="#FFFDF9" stroke="#0F3D3E" strokeWidth="4" />
        <path d="M-14 2l9 10l19 -23" fill="none" stroke="#047857" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="-126" y="54" width="252" height="26" rx="13" fill="#0F3D3E" />
        <text y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFFDF9">GSTN • e-Way Bill • EDPMS Verified</text>
      </g>
      {[["₹", 240, 150], ["$", 400, 120], ["€", 455, 215]].map(([s, x, y], i) => (
        <g key={s} className="bob" style={{ animationDelay: `${i * 0.7}s` }}>
          <circle cx={x} cy={y} r="17" fill="#FFFDF9" stroke="#F59E0B" strokeWidth="2.5" />
          <text x={x} y={y + 7} textAnchor="middle" fontSize="19" fontWeight="800" fill="#0F3D3E">{s}</text>
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
  const [term, setTerm] = useState("60");
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
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => { setTab(k); reset(); }}>{l}</button>
        ))}
      </div>
      <div className="row">
        {tab === "exp" && (
          <label className="cur">Currency
            <select value={cur} onChange={(e) => { setCur(e.target.value); reset(); }}>{["USD", "EUR", "GBP"].map((x) => <option key={x}>{x}</option>)}</select>
          </label>
        )}
        <label className="grow">Invoice value
          <span className="field"><i>{SYM[c]}</i>
            <input inputMode="numeric" placeholder={tab === "dom" ? "25,00,000" : "50,000"} value={val ? (+val).toLocaleString(c === "INR" ? "en-IN" : "en-US") : ""} onChange={(e) => { setVal(e.target.value.replace(/\D/g, "")); reset(); }} />
          </span>
        </label>
        <label className="grow">Payment term
          <select value={term} onChange={(e) => setTerm(e.target.value)}>{["30", "60", "90"].map((d) => <option key={d} value={d}>{d} days</option>)}</select>
        </label>
      </div>
      <button className="btn btn-amber" type="submit">Check Eligible Credit Limit</button>
      <p className="result" aria-live="polite">{out ? <>Indicative limit: <b>{fmt(out, c)}</b> in about 24 hours for a {term}-day term</> : "Up to 95% of invoice value. No collateral."}</p>
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
          <label className="slider"><span>Payment period <b>{days} days</b></span>
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

const PRODUCTS = [["Domestic Invoice Discounting", "Get paid against approved invoices in 24–48 hours.", "Domestic"], ["Export Receivables", "Cash against export invoices while your buyer takes 30–90 days.", "Export"], ["Purchase Order (PO) Financing", "Fund raw material and production before you invoice.", "Domestic"], ["Vendor Financing", "Anchor buyers offer early payment to their suppliers.", "Domestic"]];
const STEPS = [["Connect GST / Shipping Bills", "Invoice, e-Way Bill and Shipping Bill details are fetched automatically."], ["AI credit check", "We assess your buyer's credibility, usually within 2 hours."], ["Funds credited in 24 hours", "Up to 95% of the invoice value is credited to your bank account."]];
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
          <span className="chip">Free to compare • 0.5% starting rate • Zero collateral</span>
          <h1>Turn unpaid invoices into instant cash flow at <mark>0.5% a month</mark></h1>
          <p>Unlock up to ₹5 Crores ($600K) against domestic and export invoices in 24 hours. No collateral required.</p>
          <LimitWidget />
        </div>
        <div className="visual">
          <TradeNode />
          <div className="badge b1"><span className="ico gold">₹</span><div><b>Working Capital Disbursed</b><small>95% Cash Upfront</small></div></div>
          <div className="badge b2"><span className="ico green">✓</span><div><b>Export Bill Discounted</b><small>Direct Bank Transfer</small></div></div>
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
        <div className="badges"><span>🏦 RBI Regulated Partner Network</span><span>✓ FEMA Compliant</span><span>🛃 EDPMS Verified</span><span>🧾 GST Verified</span></div>
        <small>© 2026 OneTrade. Financing is provided by regulated partner lenders; rates are indicative.</small>
      </footer>
      <div className="sticky"><a className="btn btn-amber" href="#check">Check Eligible Limit</a></div>
    </div>
  );
}