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
            <stop offset="0%"   stopColor="#4be3d6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4be3d6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nmHubMainGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#4be3d6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4be3d6" stopOpacity="0" />
          </radialGradient>
          <filter id="nmHubGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nmPacketGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="nmLineGradCyan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#4be3d6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4be3d6" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="nmLineGradAmber" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#f0a868" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f0a868" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="nmScanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#4be3d6" stopOpacity="0" />
            <stop offset="30%"  stopColor="#4be3d6" stopOpacity="0.55" />
            <stop offset="70%"  stopColor="#4be3d6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4be3d6" stopOpacity="0" />
          </linearGradient>
          {/* Clip to Africa continent */}
          <clipPath id="africaClip">
            <path d="M268,82 C330,72 380,72 440,82 L495,100 L525,148 L540,198 L555,252 L545,292 L520,340 C505,368 490,400 470,440 C455,468 440,500 420,516 C405,530 385,550 368,565 C352,572 335,570 320,558 C295,538 278,505 265,465 C252,425 242,388 248,345 C252,320 258,308 268,305 L275,298 L258,292 L228,298 C215,288 208,278 208,268 C210,250 215,240 225,245 C235,225 248,205 255,188 C260,158 265,130 268,110 Z" />
          </clipPath>
        </defs>

        {/* ── Lat / lon grid ── */}
        {[148, 225, 298, 375, 452].map(y => (
          <line key={`gy${y}`} className="nexus-grid-line" x1="185" y1={y} x2="575" y2={y} />
        ))}
        {[268, 358, 424, 495, 545].map(x => (
          <line key={`gx${x}`} className="nexus-grid-line" x1={x} y1="65" x2={x} y2="585" />
        ))}

        {/* ── Africa continent fill ── */}
        <path
          className="nexus-africa-bg"
          d="M268,82 C330,72 380,72 440,82 L495,100 L525,148 L540,198 L555,252 L545,292 L520,340 C505,368 490,400 470,440 C455,468 440,500 420,516 C405,530 385,550 368,565 C352,572 335,570 320,558 C295,538 278,505 265,465 C252,425 242,388 248,345 C252,320 258,308 268,305 L275,298 L258,292 L228,298 C215,288 208,278 208,268 C210,250 215,240 225,245 C235,225 248,205 255,188 C260,158 265,130 268,110 Z"
        />

        {/* ── Africa continent outline ── */}
        <path
          className="nexus-africa-outline"
          d="M268,82 C330,72 380,72 440,82 L495,100 L525,148 L540,198 L555,252 L545,292 L520,340 C505,368 490,400 470,440 C455,468 440,500 420,516 C405,530 385,550 368,565 C352,572 335,570 320,558 C295,538 278,505 265,465 C252,425 242,388 248,345 C252,320 258,308 268,305 L275,298 L258,292 L228,298 C215,288 208,278 208,268 C210,250 215,240 225,245 C235,225 248,205 255,188 C260,158 265,130 268,110 Z"
        />

        {/* ── Ethiopia glow halo ── */}
        <ellipse cx="428" cy="290" rx="56" ry="46" fill="url(#nmEthGlow)" className="nexus-eth-halo" />

        {/* ── Ethiopia highlighted region (improved shape) ── */}
        <path
          className="nexus-ethiopia"
          d="M406,255 L425,250 L450,258 L462,272 L460,288 L454,308 L444,322 L428,326 L413,320 L400,308 L396,292 L400,272 Z"
        />

        {/* ── Addis Ababa label in Ethiopia ── */}
        <text className="nexus-eth-label" x="386" y="345">ETHIOPIA</text>

        {/* ── Signal / connection paths from Addis ── */}
        {/* Addis → Djibouti / Horn */}
        <path className="nexus-signal nm-line-0" d="M424,298 C465,278 505,268 545,255" />
        {/* Addis → Cairo */}
        <path className="nexus-signal nm-line-1" d="M424,298 C448,248 468,205 492,118" />
        {/* Addis → Lagos */}
        <path className="nexus-signal nm-line-2" d="M424,298 C385,295 330,300 272,305" />
        {/* Addis → Nairobi */}
        <path className="nexus-signal nm-line-3" d="M424,298 C436,320 444,338 452,355" />
        {/* Addis → Johannesburg */}
        <path className="nexus-signal nm-line-4" d="M424,298 C410,390 394,465 378,535" />
        {/* Addis → Dakar */}
        <path className="nexus-signal nm-line-5" d="M424,298 C355,278 285,262 215,248" />

        {/* ── Traveling data packets ── */}
        <circle className="nexus-packet nm-packet-cyan" r="3" filter="url(#nmPacketGlow)">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="2.2s"
            path="M424,298 C465,278 505,268 545,255" />
        </circle>
        <circle className="nexus-packet nm-packet-amber" r="2.5" filter="url(#nmPacketGlow)">
          <animateMotion dur="3.8s" repeatCount="indefinite" begin="2.6s"
            path="M424,298 C448,248 468,205 492,118" />
        </circle>
        <circle className="nexus-packet nm-packet-amber" r="2.5" filter="url(#nmPacketGlow)">
          <animateMotion dur="3.2s" repeatCount="indefinite" begin="3.1s"
            path="M424,298 C385,295 330,300 272,305" />
        </circle>
        <circle className="nexus-packet nm-packet-cyan" r="2.5" filter="url(#nmPacketGlow)">
          <animateMotion dur="2.4s" repeatCount="indefinite" begin="2.5s"
            path="M424,298 C436,320 444,338 452,355" />
        </circle>
        <circle className="nexus-packet nm-packet-amber" r="2.5" filter="url(#nmPacketGlow)">
          <animateMotion dur="4.8s" repeatCount="indefinite" begin="3.6s"
            path="M424,298 C410,390 394,465 378,535" />
        </circle>
        <circle className="nexus-packet nm-packet-cyan" r="2.5" filter="url(#nmPacketGlow)">
          <animateMotion dur="4.2s" repeatCount="indefinite" begin="3.9s"
            path="M424,298 C355,278 285,262 215,248" />
        </circle>

        {/* ── Addis Ababa hub pulse rings ── */}
        <circle className="nexus-hub-ring nm-ring-0" cx="424" cy="298" r="14" />
        <circle className="nexus-hub-ring nm-ring-1" cx="424" cy="298" r="30" />
        <circle className="nexus-hub-ring nm-ring-2" cx="424" cy="298" r="50" />

        {/* ── City hub dots ── */}
        {/* Addis Ababa — main hub */}
        <circle cx="424" cy="298" r="10" fill="url(#nmHubMainGlow)" opacity="0.6" className="nexus-eth-halo" />
        <circle className="nexus-hub-dot nexus-hub-main" cx="424" cy="298" r="6" filter="url(#nmHubGlow)" />

        {/* Secondary hubs */}
        <circle className="nexus-hub-dot nm-hub-d0" cx="545" cy="255" r="4" />  {/* Djibouti */}
        <circle className="nexus-hub-dot nm-hub-d1" cx="492" cy="118" r="4" />  {/* Cairo */}
        <circle className="nexus-hub-dot nm-hub-d2" cx="272" cy="305" r="4" />  {/* Lagos */}
        <circle className="nexus-hub-dot nm-hub-d3" cx="452" cy="355" r="4" />  {/* Nairobi */}
        <circle className="nexus-hub-dot nm-hub-d4" cx="378" cy="535" r="4" />  {/* Johannesburg */}
        <circle className="nexus-hub-dot nm-hub-d5" cx="215" cy="248" r="3.5" /> {/* Dakar */}

        {/* ── City labels ── */}
        <text className="nexus-city-label nexus-city-main" x="434" y="294">Addis Ababa</text>
        <text className="nexus-city-label nm-label-d0" x="552" y="253">Djibouti</text>
        <text className="nexus-city-label nm-label-d1" x="498" y="113">Cairo</text>
        <text className="nexus-city-label nm-label-d2" x="236" y="303">Lagos</text>
        <text className="nexus-city-label nm-label-d3" x="460" y="353">Nairobi</text>
        <text className="nexus-city-label nm-label-d4" x="386" y="533">Johannesburg</text>
        <text className="nexus-city-label nm-label-d5" x="182" y="246">Dakar</text>

        {/* ── Horizontal scan line ── */}
        <rect className="nexus-scan-line-rect" x="185" y="0" width="390" height="1.5" fill="url(#nmScanGrad)" />
      </svg>

      {/* ── Status badges ── */}
      <div className="nexus-map-badge nexus-map-badge-system">
        <i className="nexus-map-live-dot" />
        <span>All Systems Live</span>
      </div>

      <div className="nexus-map-badge nexus-map-badge-nodes">
        <span className="nexus-map-badge-val">12</span>
        <span className="nexus-map-badge-lbl">Active Nodes</span>
      </div>

      <div className="nexus-map-badge nexus-map-badge-latency">
        <span className="nexus-map-badge-val">&lt;45ms</span>
        <span className="nexus-map-badge-lbl">Avg Latency</span>
      </div>

      {/* ── Footer bar ── */}
      <div className="nexus-map-footer">
        <span className="nexus-map-footer-dot" />
        <span>KELEL INFRASTRUCTURE NETWORK</span>
        <span className="nexus-map-footer-sep">·</span>
        <span>ADDIS ABABA, ETHIOPIA</span>
      </div>
    </div>
  );
}
