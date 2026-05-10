"use client";

import { useState } from "react";

const TABS = [
  { id: "dashboard",     label: "Dashboard" },
  { id: "transactions",  label: "Transactions" },
  { id: "nodes",         label: "Regional Nodes" },
  { id: "analytics",     label: "Analytics" },
] as const;

type TabId = typeof TABS[number]["id"];

/* ── SVG mockup screens ───────────────────────────────────────── */

function DashboardScreen() {
  return (
    <svg viewBox="0 0 680 400" className="pss-svg" aria-label="Dashboard screen mockup">
      {/* chrome */}
      <rect width="680" height="400" rx="10" fill="var(--obsidian)" />
      <rect width="680" height="32" rx="10" fill="rgba(255,255,255,0.04)" />
      <circle cx="20" cy="16" r="5" fill="rgba(255,255,255,0.12)" />
      <circle cx="36" cy="16" r="5" fill="rgba(255,255,255,0.12)" />
      <circle cx="52" cy="16" r="5" fill="rgba(255,255,255,0.12)" />
      <text x="340" y="21" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.25)" fontFamily="monospace">KELEL — OPERATIONS DASHBOARD</text>

      {/* KPI row */}
      {[
        { x: 20,  label: "UPTIME",    val: "99.99%", color: "var(--cyan)" },
        { x: 187, label: "LATENCY",   val: "42 ms",  color: "var(--amber)" },
        { x: 354, label: "THROUGHPUT",val: "847/s",  color: "var(--cyan)" },
        { x: 521, label: "NODES",     val: "12",     color: "var(--green)" },
      ].map(({ x, label, val, color }) => (
        <g key={label}>
          <rect x={x} y="48" width="142" height="64" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <text x={x + 10} y="66" fontSize="9" fill="rgba(255,255,255,0.35)" fontFamily="monospace" letterSpacing="1">{label}</text>
          <text x={x + 10} y="94" fontSize="20" fontWeight="700" fill={color} fontFamily="monospace">{val}</text>
        </g>
      ))}

      {/* Chart area */}
      <rect x="20" y="128" width="440" height="200" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="32" y="148" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="monospace" letterSpacing="1">TRANSACTION VOLUME — 30D</text>
      {/* chart line */}
      <polyline
        points="40,304 100,270 160,285 220,240 280,255 340,210 400,225 440,195"
        fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      <polyline
        points="40,304 100,270 160,285 220,240 280,255 340,210 400,225 440,195 440,310 40,310"
        fill="rgba(75,227,214,0.06)" stroke="none"
      />
      {/* grid lines */}
      {[200, 230, 260, 290].map(y => (
        <line key={y} x1="40" y1={y} x2="450" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {/* Side panel */}
      <rect x="476" y="128" width="184" height="200" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="488" y="148" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="monospace" letterSpacing="1">NODE STATUS</text>
      {[
        { label: "AA-01 Addis Ababa", color: "var(--cyan)",  pct: "99.9" },
        { label: "NBI-02 Nairobi",    color: "#3b82f6",      pct: "98.4" },
        { label: "LGS-03 Lagos",      color: "#8b5cf6",      pct: "97.1" },
        { label: "DKR-04 Dakar",      color: "var(--amber)", pct: "95.8" },
      ].map(({ label, color, pct }, i) => (
        <g key={label}>
          <text x="488" y={172 + i * 36} fontSize="9" fill="rgba(255,255,255,0.45)" fontFamily="monospace">{label}</text>
          <rect x="488" y={178 + i * 36} width="148" height="4" rx="2" fill="rgba(255,255,255,0.07)" />
          <rect x="488" y={178 + i * 36} width={148 * parseFloat(pct) / 100} height="4" rx="2" fill={color} />
        </g>
      ))}
    </svg>
  );
}

function TransactionsScreen() {
  const rows = [
    { id: "TXN-00291", type: "TRANSFER",  amount: "+$842,100", status: "SETTLED",  color: "var(--cyan)" },
    { id: "TXN-00290", type: "PAYMENT",   amount: "-$12,450",  status: "SETTLED",  color: "var(--cyan)" },
    { id: "TXN-00289", type: "RECONCILE", amount: "$0",        status: "PENDING",  color: "var(--amber)" },
    { id: "TXN-00288", type: "TRANSFER",  amount: "+$210,000", status: "SETTLED",  color: "var(--cyan)" },
    { id: "TXN-00287", type: "REVERSAL",  amount: "-$5,600",   status: "REVIEW",   color: "#8b5cf6" },
    { id: "TXN-00286", type: "PAYMENT",   amount: "-$88,000",  status: "SETTLED",  color: "var(--cyan)" },
  ];

  return (
    <svg viewBox="0 0 680 400" className="pss-svg" aria-label="Transactions screen mockup">
      <rect width="680" height="400" rx="10" fill="var(--obsidian)" />
      <rect width="680" height="32" rx="10" fill="rgba(255,255,255,0.04)" />
      <circle cx="20" cy="16" r="5" fill="rgba(255,255,255,0.12)" />
      <circle cx="36" cy="16" r="5" fill="rgba(255,255,255,0.12)" />
      <circle cx="52" cy="16" r="5" fill="rgba(255,255,255,0.12)" />
      <text x="340" y="21" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.25)" fontFamily="monospace">KELEL — TRANSACTION LEDGER</text>

      {/* header row */}
      <rect x="20" y="44" width="640" height="24" rx="4" fill="rgba(255,255,255,0.03)" />
      {["TXN ID","TYPE","AMOUNT","NODE","STATUS"].map((h, i) => {
        const xs = [32, 160, 310, 440, 560];
        return <text key={h} x={xs[i]} y="60" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="monospace" letterSpacing="1">{h}</text>;
      })}

      {rows.map(({ id, type, amount, status, color }, i) => (
        <g key={id}>
          <rect x="20" y={74 + i * 44} width="640" height="38" rx="5"
            fill={i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent"}
            stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <text x="32"  y={98 + i * 44} fontSize="10" fill="rgba(75,227,214,0.7)" fontFamily="monospace">{id}</text>
          <text x="160" y={98 + i * 44} fontSize="10" fill="rgba(255,255,255,0.45)" fontFamily="monospace">{type}</text>
          <text x="310" y={98 + i * 44} fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.8)" fontFamily="monospace">{amount}</text>
          <text x="440" y={98 + i * 44} fontSize="9"  fill="rgba(255,255,255,0.3)" fontFamily="monospace">AA-01</text>
          <rect x="556" y={83 + i * 44} width="64" height="18" rx="9" fill={`${color}22`} />
          <text x="588" y={96 + i * 44} fontSize="9" fill={color} fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">{status}</text>
        </g>
      ))}
    </svg>
  );
}

function NodesScreen() {
  const nodes = [
    { id: "AA-01", city: "Addis Ababa", health: 99.9, latency: 42,  tput: 847, color: "var(--cyan)" },
    { id: "NBI-02",city: "Nairobi",     health: 98.4, latency: 38,  tput: 612, color: "#3b82f6" },
    { id: "LGS-03",city: "Lagos",       health: 97.1, latency: 51,  tput: 523, color: "#8b5cf6" },
    { id: "DKR-04",city: "Dakar",       health: 95.8, latency: 67,  tput: 341, color: "var(--amber)" },
  ];

  return (
    <svg viewBox="0 0 680 400" className="pss-svg" aria-label="Regional nodes screen mockup">
      <rect width="680" height="400" rx="10" fill="var(--obsidian)" />
      <rect width="680" height="32" rx="10" fill="rgba(255,255,255,0.04)" />
      <circle cx="20" cy="16" r="5" fill="rgba(255,255,255,0.12)" />
      <circle cx="36" cy="16" r="5" fill="rgba(255,255,255,0.12)" />
      <circle cx="52" cy="16" r="5" fill="rgba(255,255,255,0.12)" />
      <text x="340" y="21" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.25)" fontFamily="monospace">KELEL — REGIONAL NODE MONITOR</text>

      {nodes.map(({ id, city, health, latency, tput, color }, i) => {
        const x = 20 + i * 163;
        const cx2 = x + 72;
        const cy2 = 180;
        const r = 46;
        const circ = 289.03;

        return (
          <g key={id}>
            <rect x={x} y="44" width="150" height="310" rx="8"
              fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {/* ring */}
            <circle cx={cx2} cy={cy2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <circle cx={cx2} cy={cy2} r={r} fill="none" stroke={color} strokeWidth="8"
              strokeDasharray={circ} strokeDashoffset={circ * (1 - health / 100)}
              strokeLinecap="round" transform={`rotate(-90 ${cx2} ${cy2})`} />

            <text x={cx2} y={cy2 - 6} textAnchor="middle" fontSize="14" fontWeight="700" fill={color} fontFamily="monospace">{health}%</text>
            <text x={cx2} y={cy2 + 10} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.3)" fontFamily="monospace" letterSpacing="1">HEALTH</text>

            <text x={cx2} y="246" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)" fontFamily="monospace" letterSpacing="1">{id}</text>
            <text x={cx2} y="262" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="monospace">{city}</text>

            <line x1={x + 10} y1="274" x2={x + 140} y2="274" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

            <text x={x + 30} y="292" textAnchor="middle" fontSize="12" fontWeight="600" fill={color} fontFamily="monospace">{latency}</text>
            <text x={x + 30} y="305" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.3)" fontFamily="monospace">ms</text>
            <text x={x + 120} y="292" textAnchor="middle" fontSize="12" fontWeight="600" fill={color} fontFamily="monospace">{tput}</text>
            <text x={x + 120} y="305" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.3)" fontFamily="monospace">/s</text>
          </g>
        );
      })}
    </svg>
  );
}

function AnalyticsScreen() {
  const bars = [62, 78, 55, 91, 84, 69, 95, 72, 88, 76, 93, 81];
  const months = ["Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"];

  return (
    <svg viewBox="0 0 680 400" className="pss-svg" aria-label="Analytics screen mockup">
      <rect width="680" height="400" rx="10" fill="var(--obsidian)" />
      <rect width="680" height="32" rx="10" fill="rgba(255,255,255,0.04)" />
      <circle cx="20" cy="16" r="5" fill="rgba(255,255,255,0.12)" />
      <circle cx="36" cy="16" r="5" fill="rgba(255,255,255,0.12)" />
      <circle cx="52" cy="16" r="5" fill="rgba(255,255,255,0.12)" />
      <text x="340" y="21" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.25)" fontFamily="monospace">KELEL — OPERATIONS ANALYTICS</text>

      {/* summary cards */}
      {[
        { x: 20,  label: "TOTAL VOL.",  val: "$4.2B",  sub: "+18% YoY", color: "var(--cyan)" },
        { x: 195, label: "AVG HEALTH",  val: "97.8%",  sub: "All nodes", color: "var(--green)" },
        { x: 370, label: "INCIDENTS",   val: "3",      sub: "Last 90d",  color: "var(--amber)" },
        { x: 545, label: "SLA MET",     val: "100%",   sub: "This quarter", color: "var(--cyan)" },
      ].map(({ x, label, val, sub, color }) => (
        <g key={label}>
          <rect x={x} y="48" width="160" height="70" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <text x={x + 10} y="66" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="monospace" letterSpacing="1">{label}</text>
          <text x={x + 10} y="95" fontSize="22" fontWeight="700" fill={color} fontFamily="monospace">{val}</text>
          <text x={x + 10} y="110" fontSize="9" fill="rgba(255,255,255,0.25)" fontFamily="monospace">{sub}</text>
        </g>
      ))}

      {/* bar chart */}
      <rect x="20" y="136" width="640" height="220" rx="8" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <text x="32" y="156" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="monospace" letterSpacing="1">MONTHLY THROUGHPUT INDEX</text>

      {[0, 25, 50, 75, 100].map(pct => {
        const y = 326 - pct * 1.5;
        return (
          <g key={pct}>
            <line x1="48" y1={y} x2="646" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <text x="36" y={y + 4} fontSize="8" fill="rgba(255,255,255,0.2)" fontFamily="monospace" textAnchor="end">{pct}</text>
          </g>
        );
      })}

      {bars.map((h, i) => {
        const bx = 56 + i * 50;
        const bh = h * 1.5;
        const by = 326 - bh;
        const isCurrent = i === bars.length - 1;
        return (
          <g key={i}>
            <rect x={bx} y={by} width="30" height={bh} rx="3"
              fill={isCurrent ? "var(--cyan)" : "rgba(75,227,214,0.25)"} />
            <text x={bx + 15} y="344" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.25)" fontFamily="monospace">{months[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

const SCREENS: Record<TabId, React.ReactNode> = {
  dashboard:    <DashboardScreen />,
  transactions: <TransactionsScreen />,
  nodes:        <NodesScreen />,
  analytics:    <AnalyticsScreen />,
};

export function PlatformScreenSwitcher() {
  const [active, setActive] = useState<TabId>("dashboard");

  return (
    <div className="pss-wrap">
      <nav className="pss-tabs" role="tablist" aria-label="Platform screen tabs">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={active === id}
            className={`pss-tab${active === id ? " pss-tab--active" : ""}`}
            onClick={() => setActive(id)}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="pss-screen stitch-glass" role="tabpanel">
        {SCREENS[active]}
      </div>
    </div>
  );
}
