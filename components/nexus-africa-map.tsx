export function NexusAfricaMap() {
  return (
    <div className="nexus-africa-map-wrap" aria-hidden="true">
      {/* Dot-grid background */}
      <div className="nexus-map-bg-grid" />

      {/* Main SVG — 720×640 viewbox matches original HeroMotionVisual coordinates */}
      <svg
        className="nexus-map-svg"
        viewBox="0 0 720 640"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <defs>
          {/* Ethiopia glow */}
          <radialGradient id="nmEthGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4edea3" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#4edea3" stopOpacity="0" />
          </radialGradient>
          {/* Hub glow filter */}
          <filter id="nmHubGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Scan gradient */}
          <linearGradient id="nmScanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4edea3" stopOpacity="0" />
            <stop offset="30%" stopColor="#4edea3" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#4edea3" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4edea3" stopOpacity="0" />
          </linearGradient>
          {/* Signal line gradient */}
          <linearGradient id="nmLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4edea3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#adc6ff" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* ── Africa continent ── */}
        <path
          className="nexus-africa-bg"
          d="M335 42l77 49 33 74 48 35 14 64-36 44 16 65-38 53-18 101-62 55-29 77-55 22-37-44-44-23-33-72-59-35-20-72 29-62-30-54 40-76 51-33 40-93 113-55z"
        />
        <path
          className="nexus-africa-outline"
          d="M335 42l77 49 33 74 48 35 14 64-36 44 16 65-38 53-18 101-62 55-29 77-55 22-37-44-44-23-33-72-59-35-20-72 29-62-30-54 40-76 51-33 40-93 113-55z"
        />

        {/* ── Ethiopia glow halo ── */}
        <ellipse
          cx="424" cy="278" rx="52" ry="44"
          fill="url(#nmEthGlow)"
          className="nexus-eth-halo"
        />

        {/* ── Ethiopia fill ── */}
        <path
          className="nexus-ethiopia"
          d="M407 246l20 10 10 20-4 26-22 16-24-8-9-24 8-22 21-18z"
        />

        {/* ── Signal / connection paths ── */}
        {/* Addis → East Africa */}
        <path className="nexus-signal nm-line-0" d="M424 298C462 280 500 268 538 254" />
        {/* Addis → Cairo */}
        <path className="nexus-signal nm-line-1" d="M424 298C445 255 458 218 468 178" />
        {/* Addis → Lagos */}
        <path className="nexus-signal nm-line-2" d="M424 298C388 292 326 289 278 292" />
        {/* Addis → Nairobi */}
        <path className="nexus-signal nm-line-3" d="M424 298C441 332 446 348 454 366" />
        {/* Addis → Johannesburg */}
        <path className="nexus-signal nm-line-4" d="M424 298C410 396 390 470 372 522" />

        {/* ── Traveling data packets ── */}
        <circle className="nexus-packet nm-packet-0" r="3">
          <animateMotion dur="3s" repeatCount="indefinite" begin="2.2s"
            path="M424 298C462 280 500 268 538 254" />
        </circle>
        <circle className="nexus-packet nm-packet-1" r="3">
          <animateMotion dur="4s" repeatCount="indefinite" begin="2.8s"
            path="M424 298C445 255 458 218 468 178" />
        </circle>
        <circle className="nexus-packet nm-packet-2" r="3">
          <animateMotion dur="3.5s" repeatCount="indefinite" begin="3.4s"
            path="M424 298C388 292 326 289 278 292" />
        </circle>
        <circle className="nexus-packet nm-packet-3" r="3">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="2.6s"
            path="M424 298C441 332 446 348 454 366" />
        </circle>
        <circle className="nexus-packet nm-packet-4" r="3">
          <animateMotion dur="5s" repeatCount="indefinite" begin="3.8s"
            path="M424 298C410 396 390 470 372 522" />
        </circle>

        {/* ── Hub pulse rings (Addis Ababa) ── */}
        <circle className="nexus-hub-ring nm-ring-0" cx="424" cy="298" r="14" />
        <circle className="nexus-hub-ring nm-ring-1" cx="424" cy="298" r="28" />
        <circle className="nexus-hub-ring nm-ring-2" cx="424" cy="298" r="46" />

        {/* ── City hub dots ── */}
        <circle className="nexus-hub-dot nexus-hub-main" cx="424" cy="298" r="7"
          filter="url(#nmHubGlow)" />
        <circle className="nexus-hub-dot nm-hub-d0" cx="538" cy="254" r="4" />
        <circle className="nexus-hub-dot nm-hub-d1" cx="468" cy="178" r="4" />
        <circle className="nexus-hub-dot nm-hub-d2" cx="278" cy="292" r="4" />
        <circle className="nexus-hub-dot nm-hub-d3" cx="454" cy="366" r="4" />
        <circle className="nexus-hub-dot nm-hub-d4" cx="372" cy="522" r="4" />

        {/* ── City labels ── */}
        <text className="nexus-city-label nexus-city-main" x="436" y="293">Addis Ababa</text>
        <text className="nexus-city-label nm-label-d0" x="548" y="252">Djibouti</text>
        <text className="nexus-city-label nm-label-d1" x="474" y="173">Cairo</text>
        <text className="nexus-city-label nm-label-d2" x="244" y="290">Lagos</text>
        <text className="nexus-city-label nm-label-d3" x="462" y="370">Nairobi</text>
        <text className="nexus-city-label nm-label-d4" x="378" y="538">Johannesburg</text>

        {/* ── Horizontal scan line ── */}
        <rect
          className="nexus-scan-line-rect"
          x="190" y="0" width="360" height="1.5"
          fill="url(#nmScanGrad)"
        />

        {/* ── Lat/lon grid hints ── */}
        <line className="nexus-grid-line" x1="190" y1="178" x2="560" y2="178" />
        <line className="nexus-grid-line" x1="190" y1="298" x2="560" y2="298" />
        <line className="nexus-grid-line" x1="190" y1="420" x2="560" y2="420" />
        <line className="nexus-grid-line" x1="310" y1="50" x2="310" y2="570" />
        <line className="nexus-grid-line" x1="424" y1="50" x2="424" y2="570" />
        <line className="nexus-grid-line" x1="540" y1="50" x2="540" y2="570" />
      </svg>

      {/* ── Status badges overlaid on the map ── */}
      <div className="nexus-map-badge nexus-map-badge-system">
        <i className="nexus-map-live-dot" />
        <span>All Systems Live</span>
      </div>

      <div className="nexus-map-badge nexus-map-badge-nodes">
        <span className="nexus-map-badge-val">1,248</span>
        <span className="nexus-map-badge-lbl">Active Nodes</span>
      </div>

      <div className="nexus-map-badge nexus-map-badge-latency">
        <span className="nexus-map-badge-val">12ms</span>
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
