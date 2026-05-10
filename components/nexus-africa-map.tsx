const ETHIOPIA_PATH =
  "M267.6,82.0 L290.3,100.7 L312.3,91.0 L321.4,99.7 L347.0,100.1 L379.7,116.7 L389.4,130.9 L406.0,144.2 L421.4,168.4 L434.2,181.7 L421.0,200.0 L408.3,219.3 L411.3,230.7 L411.9,243.3 L432.8,243.9 L441.8,241.0 L450.1,248.4 L442.0,263.0 L455.8,285.7 L469.6,305.6 L483.9,320.3 L606.5,369.3 L638.0,369.0 L532.1,492.8 L483.3,494.6 L449.9,523.7 L425.8,524.5 L415.6,537.5 L390.0,537.5 L374.9,523.6 L340.6,540.8 L329.6,558.0 L304.6,554.8 L296.3,550.0 L287.5,551.1 L275.6,550.7 L228.2,515.7 L202.1,515.7 L189.3,502.1 L189.3,478.9 L169.8,472.0 L147.7,427.1 L130.6,417.6 L124.0,401.1 L105.0,381.0 L82.0,378.0 L94.8,354.5 L114.7,353.5 L120.3,340.9 L119.8,303.8 L130.8,260.6 L148.6,249.1 L152.4,232.2 L168.4,200.7 L191.0,180.2 L206.3,139.6 L212.2,104.2 L255.9,112.8 L267.6,82.0 Z";

const addis = { x: 299.5, y: 326.6 };

const ethiopianHubs = [
  { name: "Mekelle", x: 326.4, y: 142.3, path: `M${addis.x},${addis.y} C304,260 315,200 326.4,142.3`, tone: "cyan" },
  { name: "Bahir Dar", x: 248.3, y: 220.9, path: `M${addis.x},${addis.y} C282,284 266,246 248.3,220.9`, tone: "amber" },
  { name: "Dire Dawa", x: 416.0, y: 303.1, path: `M${addis.x},${addis.y} C340,300 378,296 416,303.1`, tone: "cyan" },
  { name: "Adama", x: 318.7, y: 346.8, path: `M${addis.x},${addis.y} C306,334 313,341 318.7,346.8`, tone: "cyan" },
  { name: "Hawassa", x: 288.9, y: 407.8, path: `M${addis.x},${addis.y} C302,356 297,386 288.9,407.8`, tone: "amber" },
  { name: "Jimma", x: 227.4, y: 382.9, path: `M${addis.x},${addis.y} C270,350 246,370 227.4,382.9`, tone: "cyan" },
  { name: "Gambella", x: 143.1, y: 358.8, path: `M${addis.x},${addis.y} C244,338 186,350 143.1,358.8`, tone: "amber" },
];

export function NexusAfricaMap() {
  return (
    <div className="nexus-africa-map-wrap" aria-hidden="true">
      <div className="nexus-map-bg-grid" />

      <svg
        className="nexus-map-svg"
        viewBox="0 0 720 640"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <defs>
          <radialGradient id="nmEthGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4be3d6" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#4be3d6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nmHubGlowR" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4be3d6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4be3d6" stopOpacity="0" />
          </radialGradient>
          <filter id="nmHubGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nmPktGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="nmScanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4be3d6" stopOpacity="0" />
            <stop offset="35%" stopColor="#4be3d6" stopOpacity="0.55" />
            <stop offset="65%" stopColor="#4be3d6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4be3d6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[148, 222, 298, 374, 450, 524].map((y) => (
          <line key={`gy${y}`} className="nexus-grid-line" x1="74" y1={y} x2="650" y2={y} />
        ))}
        {[150, 226, 302, 378, 454, 530, 606].map((x) => (
          <line key={`gx${x}`} className="nexus-grid-line" x1={x} y1="68" x2={x} y2="582" />
        ))}

        <ellipse cx={addis.x} cy={addis.y} rx="112" ry="92" fill="url(#nmEthGlow)" className="nexus-eth-halo" />

        <path className="nexus-africa-bg" d={ETHIOPIA_PATH} />
        <path className="nexus-africa-outline" d={ETHIOPIA_PATH} />
        <path className="nexus-ethiopia" d={ETHIOPIA_PATH} />

        <text className="nexus-eth-label" x="250" y="604">ETHIOPIA OPERATIONS MAP</text>

        {ethiopianHubs.map((hub, index) => (
          <path
            key={hub.name}
            className={`nexus-signal nm-line-${index} ${hub.tone === "amber" ? "nexus-signal--amber" : ""}`}
            d={hub.path}
          />
        ))}

        {ethiopianHubs.map((hub, index) => (
          <circle
            key={`${hub.name}-packet`}
            className={`nexus-packet ${hub.tone === "amber" ? "nm-packet-amber" : "nm-packet-cyan"}`}
            r="2.7"
            filter="url(#nmPktGlow)"
          >
            <animateMotion dur={`${2.8 + index * 0.22}s`} repeatCount="indefinite" begin={`${1.8 + index * 0.18}s`} path={hub.path} />
          </circle>
        ))}

        <circle className="nexus-hub-ring nm-ring-0" cx={addis.x} cy={addis.y} r="14" />
        <circle className="nexus-hub-ring nm-ring-1" cx={addis.x} cy={addis.y} r="30" />
        <circle className="nexus-hub-ring nm-ring-2" cx={addis.x} cy={addis.y} r="50" />

        <circle cx={addis.x} cy={addis.y} r="10" fill="url(#nmHubGlowR)" opacity="0.55" className="nexus-eth-halo" />
        <circle className="nexus-hub-dot nexus-hub-main" cx={addis.x} cy={addis.y} r="6" filter="url(#nmHubGlow)" />

        {ethiopianHubs.map((hub, index) => (
          <circle
            key={`${hub.name}-hub`}
            className={`nexus-hub-dot nm-hub-d${index}`}
            cx={hub.x}
            cy={hub.y}
            r={hub.name === "Adama" ? 3 : 4}
          />
        ))}

        <text className="nexus-city-label nexus-city-main" x="309" y="321">Addis Ababa</text>
        <text className="nexus-city-label nm-label-d0" x="334" y="140">Mekelle</text>
        <text className="nexus-city-label nm-label-d1" x="194" y="220">Bahir Dar</text>
        <text className="nexus-city-label nm-label-d2" x="424" y="300">Dire Dawa</text>
        <text className="nexus-city-label nm-label-d3" x="326" y="348">Adama</text>
        <text className="nexus-city-label nm-label-d4" x="296" y="410">Hawassa</text>
        <text className="nexus-city-label nm-label-d5" x="182" y="385">Jimma</text>
        <text className="nexus-city-label nm-label-d6" x="92" y="358">Gambella</text>

        <rect className="nexus-scan-line-rect" x="74" y="0" width="576" height="1.5" fill="url(#nmScanGrad)" />
      </svg>

      <div className="nexus-map-badge nexus-map-badge-system">
        <i className="nexus-map-live-dot" />
        <span>All Systems Live</span>
      </div>

      <div className="nexus-map-badge nexus-map-badge-nodes">
        <span className="nexus-map-badge-val">8</span>
        <span className="nexus-map-badge-lbl">Key Hubs</span>
      </div>

      <div className="nexus-map-badge nexus-map-badge-latency">
        <span className="nexus-map-badge-val">&lt;45ms</span>
        <span className="nexus-map-badge-lbl">Avg Latency</span>
      </div>

      <div className="nexus-map-footer">
        <span className="nexus-map-footer-dot" />
        <span>KELEL ETHIOPIA NETWORK</span>
        <span className="nexus-map-footer-sep">·</span>
        <span>ADDIS ABABA, ETHIOPIA</span>
      </div>
    </div>
  );
}
