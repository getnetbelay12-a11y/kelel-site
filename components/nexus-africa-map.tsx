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
            <stop offset="0%"   stopColor="#4be3d6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4be3d6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nmHubGlowR" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#4be3d6" stopOpacity="0.9" />
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
            <stop offset="0%"   stopColor="#4be3d6" stopOpacity="0" />
            <stop offset="35%"  stopColor="#4be3d6" stopOpacity="0.55" />
            <stop offset="65%"  stopColor="#4be3d6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4be3d6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Lat/lon grid ── */}
        {[148, 222, 298, 374, 450].map(y => (
          <line key={`gy${y}`} className="nexus-grid-line" x1="188" y1={y} x2="572" y2={y} />
        ))}
        {[272, 360, 424, 498, 548].map(x => (
          <line key={`gx${x}`} className="nexus-grid-line" x1={x} y1="68" x2={x} y2="582" />
        ))}

        {/*
          ── Africa continental outline ──
          Drawn clockwise starting from Morocco (NW corner).
          Key features: flat north coast, NE Red-Sea shoulder,
          Horn of Africa pointing east, smooth east coast,
          Cape taper, west coast rising with Gulf-of-Guinea
          "bay" correctly represented as a westward bulge.
        */}
        <path
          className="nexus-africa-bg"
          d="
            M275,85
            C348,77 400,77 455,88
            L515,106
            C525,132 534,162 542,188
            C548,214 552,238 556,254
            C552,276 544,296 530,328
            C516,360 498,400 476,442
            C460,468 442,502 422,520
            C406,534 388,554 372,570
            C354,578 336,572 320,560
            C296,542 278,510 264,470
            C252,430 246,392 252,360
            C256,338 265,320 272,310
            C266,308 252,304 238,302
            C222,300 208,286 204,272
            C200,258 208,244 222,246
            C228,234 242,218 252,196
            C258,175 266,140 272,112
            Z
          "
        />
        <path
          className="nexus-africa-outline"
          d="
            M275,85
            C348,77 400,77 455,88
            L515,106
            C525,132 534,162 542,188
            C548,214 552,238 556,254
            C552,276 544,296 530,328
            C516,360 498,400 476,442
            C460,468 442,502 422,520
            C406,534 388,554 372,570
            C354,578 336,572 320,560
            C296,542 278,510 264,470
            C252,430 246,392 252,360
            C256,338 265,320 272,310
            C266,308 252,304 238,302
            C222,300 208,286 204,272
            C200,258 208,244 222,246
            C228,234 242,218 252,196
            C258,175 266,140 272,112
            Z
          "
        />

        {/* ── Ethiopia glow halo ── */}
        <ellipse cx="428" cy="292" rx="54" ry="44" fill="url(#nmEthGlow)" className="nexus-eth-halo" />

        {/* ── Ethiopia region highlight (improved shape) ── */}
        <path
          className="nexus-ethiopia"
          d="M408,256 L426,250 L448,258 L460,272 L458,290 L452,310 L442,322 L426,326 L412,320 L400,308 L396,292 L402,272 Z"
        />

        {/* Ethiopia region label */}
        <text className="nexus-eth-label" x="384" y="348">ETHIOPIA</text>

        {/* ── Signal lines from Addis Ababa ── */}
        <path className="nexus-signal nm-line-0" d="M424,298 C462,278 502,265 545,252" />  {/* → Djibouti */}
        <path className="nexus-signal nm-line-1" d="M424,298 C448,248 468,205 492,118" />  {/* → Cairo */}
        <path className="nexus-signal nm-line-2" d="M424,298 C385,296 330,302 272,308" />  {/* → Lagos */}
        <path className="nexus-signal nm-line-3" d="M424,298 C436,320 444,338 452,355" />  {/* → Nairobi */}
        <path className="nexus-signal nm-line-4" d="M424,298 C410,390 394,465 378,535" />  {/* → Joburg */}
        <path className="nexus-signal nm-line-5" d="M424,298 C356,280 288,262 218,252" />  {/* → Dakar */}

        {/* ── Traveling data packets ── */}
        <circle className="nexus-packet nm-packet-cyan" r="3" filter="url(#nmPktGlow)">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="2.2s"
            path="M424,298 C462,278 502,265 545,252" />
        </circle>
        <circle className="nexus-packet nm-packet-amber" r="2.5" filter="url(#nmPktGlow)">
          <animateMotion dur="3.8s" repeatCount="indefinite" begin="2.6s"
            path="M424,298 C448,248 468,205 492,118" />
        </circle>
        <circle className="nexus-packet nm-packet-amber" r="2.5" filter="url(#nmPktGlow)">
          <animateMotion dur="3.2s" repeatCount="indefinite" begin="3.1s"
            path="M424,298 C385,296 330,302 272,308" />
        </circle>
        <circle className="nexus-packet nm-packet-cyan" r="2.5" filter="url(#nmPktGlow)">
          <animateMotion dur="2.4s" repeatCount="indefinite" begin="2.5s"
            path="M424,298 C436,320 444,338 452,355" />
        </circle>
        <circle className="nexus-packet nm-packet-amber" r="2.5" filter="url(#nmPktGlow)">
          <animateMotion dur="4.8s" repeatCount="indefinite" begin="3.6s"
            path="M424,298 C410,390 394,465 378,535" />
        </circle>
        <circle className="nexus-packet nm-packet-cyan" r="2.5" filter="url(#nmPktGlow)">
          <animateMotion dur="4.2s" repeatCount="indefinite" begin="3.9s"
            path="M424,298 C356,280 288,262 218,252" />
        </circle>

        {/* ── Addis Ababa pulse rings ── */}
        <circle className="nexus-hub-ring nm-ring-0" cx="424" cy="298" r="14" />
        <circle className="nexus-hub-ring nm-ring-1" cx="424" cy="298" r="30" />
        <circle className="nexus-hub-ring nm-ring-2" cx="424" cy="298" r="50" />

        {/* ── City dots ── */}
        <circle cx="424" cy="298" r="10" fill="url(#nmHubGlowR)" opacity="0.55" className="nexus-eth-halo" />
        <circle className="nexus-hub-dot nexus-hub-main" cx="424" cy="298" r="6" filter="url(#nmHubGlow)" />

        <circle className="nexus-hub-dot nm-hub-d0" cx="545" cy="252" r="4" />   {/* Djibouti */}
        <circle className="nexus-hub-dot nm-hub-d1" cx="492" cy="118" r="4" />   {/* Cairo */}
        <circle className="nexus-hub-dot nm-hub-d2" cx="272" cy="308" r="4" />   {/* Lagos */}
        <circle className="nexus-hub-dot nm-hub-d3" cx="452" cy="355" r="4" />   {/* Nairobi */}
        <circle className="nexus-hub-dot nm-hub-d4" cx="378" cy="535" r="4" />   {/* Johannesburg */}
        <circle className="nexus-hub-dot nm-hub-d5" cx="218" cy="252" r="3.5" /> {/* Dakar */}

        {/* ── City labels ── */}
        <text className="nexus-city-label nexus-city-main" x="434" y="294">Addis Ababa</text>
        <text className="nexus-city-label nm-label-d0" x="552" y="250">Djibouti</text>
        <text className="nexus-city-label nm-label-d1" x="498" y="113">Cairo</text>
        <text className="nexus-city-label nm-label-d2" x="238" y="308">Lagos</text>
        <text className="nexus-city-label nm-label-d3" x="460" y="353">Nairobi</text>
        <text className="nexus-city-label nm-label-d4" x="386" y="533">Johannesburg</text>
        <text className="nexus-city-label nm-label-d5" x="185" y="250">Dakar</text>

        {/* ── Horizontal scan line ── */}
        <rect className="nexus-scan-line-rect" x="188" y="0" width="384" height="1.5" fill="url(#nmScanGrad)" />
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

      {/* ── Footer ── */}
      <div className="nexus-map-footer">
        <span className="nexus-map-footer-dot" />
        <span>KELEL INFRASTRUCTURE NETWORK</span>
        <span className="nexus-map-footer-sep">·</span>
        <span>ADDIS ABABA, ETHIOPIA</span>
      </div>
    </div>
  );
}
