/**
 * COLUMN-STYLE INTERACTIVE HALFTONE CANVAS & 3D MOUSE EFFECT
 * Andrew Edward / Branco Dev
 */

// --- 5 Interactive Projects Data ---
const projectsData = [
  {
    name: "InfraForge OS",
    sub: "Autonomous AI Cluster",
    icon: "⚡",
    status: "HEALTHY",
    statusColor: "seafoam",
    bannerLabel: "GLOBAL AI ROUTING & DISPATCH",
    bannerVal: "99.999%",
    bannerUnit: "Uptime",
    bannerBg: "#ec652b",
    file: "api/v1/orchestrator.json",
    json: `{
  "cluster_id": "infra-us-east-01",
  "status": "ACTIVE_ROUTING",
  "telemetry": {
    "avg_latency": 11.4,
    "active_shards": 64,
    "encryption": "TLS_1.3_mTLS"
  }
}`,
    telem1Lbl: "Average Execution Speed",
    telem1Val: "11.4 ms",
    telem2Lbl: "Active Node Infrastructure",
    telem2Val: "64 Multi-Tenant Nodes"
  },
  {
    name: "BillLaunch SaaS",
    sub: "Billing & Invoicing Engine",
    icon: "💳",
    status: "PROCESSED",
    statusColor: "seafoam",
    bannerLabel: "RECURRING MRR & INVOICING",
    bannerVal: "$2.4M+",
    bannerUnit: "Processed",
    bannerBg: "#167e6c",
    file: "billlaunch/invoice-engine.json",
    json: `{
  "invoice_id": "inv_enterprise_9981",
  "gateway": "Stripe_Connect_Pro",
  "settlement": {
    "total_mrr": "$2,410,950",
    "webhook_reliability": "100.0%",
    "concurrency": "50k req/min"
  }
}`,
    telem1Lbl: "Invoice Gen Latency",
    telem1Val: "8.2 ms",
    telem2Lbl: "Delivery Reliability",
    telem2Val: "100.0% Webhooks"
  },
  {
    name: "AeroLogistics AI",
    sub: "Fleet & Telematics Dispatch",
    icon: "🚛",
    status: "ROUTING",
    statusColor: "violet",
    bannerLabel: "AUTONOMOUS FLEET OPTIMIZATION",
    bannerVal: "1.8M",
    bannerUnit: "Events/sec",
    bannerBg: "#1e4199",
    file: "aerologistics/dispatch.json",
    json: `{
  "fleet_matrix": "us_national_transit",
  "active_units": 1250,
  "telematics": {
    "recalc_frequency": "< 4.5ms",
    "transport_stream": "gRPC_Duplex",
    "dynamic_reroutes": 384
  }
}`,
    telem1Lbl: "Dynamic Recalculation",
    telem1Val: "< 4.5 ms",
    telem2Lbl: "Active Fleet Nodes",
    telem2Val: "1,250 Connected Trucks"
  },
  {
    name: "ClientOps Portal",
    sub: "Enterprise High-Traffic Hub",
    icon: "🏢",
    status: "ENCRYPTED",
    statusColor: "orange",
    bannerLabel: "ZERO-KNOWLEDGE VAULT",
    bannerVal: "256-bit",
    bannerUnit: "AES-GCM",
    bannerBg: "#12161e",
    file: "clientops/vault-session.json",
    json: `{
  "session_token": "enc_aes256_k98a2z",
  "compliance": "SOC2_GDPR_TypeII",
  "throughput": {
    "sync_latency": "14.1ms",
    "concurrent_users": "18,400+",
    "storage_tier": "Encrypted_S3"
  }
}`,
    telem1Lbl: "Encrypted Document Sync",
    telem1Val: "14.1 ms",
    telem2Lbl: "Concurrent Enterprise Users",
    telem2Val: "18,400+ Active"
  },
  {
    name: "OmniRoute AI",
    sub: "Multi-LLM Load Balancer",
    icon: "🌐",
    status: "STREAMING",
    statusColor: "seafoam",
    bannerLabel: "AI INFERENCE LOAD BALANCER",
    bannerVal: "500+",
    bannerUnit: "Models Routed",
    bannerBg: "#011821",
    file: "omniroute/model-gateway.json",
    json: `{
  "gateway_protocol": "OpenAI_Claude_Ollama",
  "load_strategy": "Latency_P99_Opt",
  "metrics": {
    "ttft_latency": "18.0ms",
    "cache_hit_ratio": "41.2%",
    "failover_uptime": "99.99%"
  }
}`,
    telem1Lbl: "Time to First Token (TTFT)",
    telem1Val: "18.0 ms",
    telem2Lbl: "Automatic Failover Rate",
    telem2Val: "99.99% Reliability"
  }
];

let currentProjectIndex = 0;

function switchProject(index) {
  currentProjectIndex = index;
  const p = projectsData[index];

  // Update DOM elements
  document.getElementById('widgetAvatar').innerHTML = `<span class="avatar-icon">${p.icon}</span>`;
  document.getElementById('widgetTitle').textContent = p.name;
  document.getElementById('widgetSub').textContent = p.sub;
  document.getElementById('widgetStatusText').textContent = p.status;
  document.getElementById('widgetBannerLabel').textContent = p.bannerLabel;
  document.getElementById('widgetBannerValue').innerHTML = `${p.bannerVal} <span class="banner-unit">${p.bannerUnit}</span>`;
  document.getElementById('widgetBanner').style.background = p.bannerBg;
  document.getElementById('widgetCodeFile').textContent = p.file;

  // Format syntax highlight for json
  const formattedJson = p.json
    .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span class="json-str">"$1"</span>')
    .replace(/: ([0-9.]+)/g, ': <span class="json-num">$1</span>');
  
  document.getElementById('widgetCodeBody').innerHTML = `<code>${formattedJson}</code>`;
  document.getElementById('telemLabel1').textContent = p.telem1Lbl;
  document.getElementById('telemVal1').textContent = p.telem1Val;
  document.getElementById('telemLabel2').textContent = p.telem2Lbl;
  document.getElementById('telemVal2').textContent = p.telem2Val;

  // Update chips active state
  const chips = document.querySelectorAll('.project-chips .chip');
  chips.forEach((chip, i) => {
    if (i === index) chip.classList.add('active');
    else chip.classList.remove('active');
  });
}

function copyCodeSnippet() {
  const code = projectsData[currentProjectIndex].json;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.querySelector('.copy-btn');
    btn.textContent = "Copied ✓";
    setTimeout(() => btn.textContent = "Copy JSON", 2000);
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// --- 3D Card Tilt Mouse Effect ---
const card = document.getElementById('interactiveCard');
if (card) {
  window.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distX = mouseX - cardCenterX;
    const distY = mouseY - cardCenterY;

    // Only tilt if reasonably close to screen center
    const maxTilt = 10;
    const tiltX = -(distY / window.innerHeight) * maxTilt;
    const tiltY = (distX / window.innerWidth) * maxTilt;

    card.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  });
}

// ==========================================================================
// INTERACTIVE HALFTONE CANVAS WITH MOUSE RIPPLE & PARTICLE SPECTRUM
// ==========================================================================

const canvas = document.getElementById('halftoneCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let dots = [];
let mouse = { x: -1000, y: -1000, targetRadius: 180, active: false };

// Spectrum colors for Halftone Map (Column reference)
// Orange -> Violet -> Blue -> Sky Cyan -> Seafoam -> Yellow
const spectrumColors = [
  { r: 214, g: 86, b: 32 },  // #d65620
  { r: 236, g: 101, b: 43 }, // #ec652b
  { r: 159, g: 122, b: 238 },// #9f7aee
  { r: 69, g: 117, b: 205 }, // #4575cd
  { r: 113, g: 210, b: 240 },// #71d2f0
  { r: 68, g: 180, b: 139 }, // #44b48b
  { r: 244, g: 223, b: 105 }  // #f4df69
];

function getSpectrumColor(t, opacity = 1) {
  t = Math.max(0, Math.min(1, t));
  const segment = t * (spectrumColors.length - 1);
  const index = Math.floor(segment);
  const frac = segment - index;

  if (index >= spectrumColors.length - 1) {
    const c = spectrumColors[spectrumColors.length - 1];
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`;
  }

  const c1 = spectrumColors[index];
  const c2 = spectrumColors[index + 1];

  const r = Math.round(c1.r + frac * (c2.r - c1.r));
  const g = Math.round(c1.g + frac * (c2.g - c1.g));
  const b = Math.round(c1.b + frac * (c2.b - c1.b));

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// World Map Silhouette Bitmap (Normalized coordinates 0 to 1)
function isLandMass(normX, normY) {
  // North America
  if (normX > 0.12 && normX < 0.32 && normY > 0.20 && normY < 0.45) return true;
  // South America
  if (normX > 0.22 && normX < 0.34 && normY > 0.48 && normY < 0.80) return true;
  // Europe
  if (normX > 0.44 && normX < 0.58 && normY > 0.18 && normY < 0.38) return true;
  // Africa
  if (normX > 0.44 && normX < 0.58 && normY > 0.38 && normY < 0.72) return true;
  // Asia
  if (normX > 0.56 && normX < 0.86 && normY > 0.18 && normY < 0.55) return true;
  // Australia
  if (normX > 0.74 && normX < 0.88 && normY > 0.62 && normY < 0.82) return true;
  return false;
}

function initCanvas() {
  const dpr = window.devicePixelRatio || 1;
  width = canvas.parentElement.offsetWidth;
  height = canvas.parentElement.offsetHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  dots = [];
  const spacing = 18; // Dot matrix spacing

  for (let x = spacing; x < width; x += spacing) {
    for (let y = spacing; y < height; y += spacing) {
      const normX = x / width;
      const normY = y / height;
      const isLand = isLandMass(normX, normY);

      dots.push({
        baseX: x,
        baseY: y,
        x: x,
        y: y,
        normX: normX,
        normY: normY,
        isLand: isLand,
        baseRadius: isLand ? 2.8 : 1.2,
        currentRadius: isLand ? 2.8 : 1.2,
        colorT: normX,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
}

window.addEventListener('resize', initCanvas);
initCanvas();

// Track mouse position on canvas
window.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
  mouse.active = true;
});

window.addEventListener('mouseleave', () => {
  mouse.active = false;
  mouse.x = -1000;
  mouse.y = -1000;
});

// Data Flow Lines & Nodes (SF -> NY -> Zurich -> Tokyo)
let packetProgress = 0;

function animate() {
  ctx.clearRect(0, 0, width, height);

  const time = performance.now() * 0.002;
  packetProgress = (packetProgress + 0.005) % 1;

  // 1. Draw Halftone Dotted Grid with Mouse Wave Scaling
  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];

    // Distance to cursor
    const dx = mouse.x - d.baseX;
    const dy = mouse.y - d.baseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let hoverEffect = 0;
    if (dist < mouse.targetRadius) {
      hoverEffect = (1 - dist / mouse.targetRadius);
    }

    // Dynamic wave oscillation
    const wave = Math.sin(time + d.phase) * 0.5;
    const targetRadius = d.baseRadius + (hoverEffect * 4.5) + (d.isLand ? wave : 0);
    d.currentRadius += (targetRadius - d.currentRadius) * 0.2;

    // Slight magnetic repulsion from cursor
    if (dist < 100 && dist > 0) {
      const angle = Math.atan2(dy, dx);
      const force = (1 - dist / 100) * 6;
      d.x = d.baseX - Math.cos(angle) * force;
      d.y = d.baseY - Math.sin(angle) * force;
    } else {
      d.x += (d.baseX - d.x) * 0.1;
      d.y += (d.baseY - d.y) * 0.1;
    }

    // Draw dot
    ctx.beginPath();
    ctx.arc(d.x, d.y, Math.max(0.5, d.currentRadius), 0, Math.PI * 2);

    if (d.isLand) {
      // Land masses render in Column gradient spectrum
      const opacity = 0.35 + hoverEffect * 0.65;
      ctx.fillStyle = getSpectrumColor(d.colorT, opacity);
    } else {
      // Subtle background grid
      const opacity = 0.06 + hoverEffect * 0.25;
      ctx.fillStyle = `rgba(17, 26, 74, ${opacity})`;
    }
    ctx.fill();
  }

  // 2. Draw Connected Transatlantic & Global Data Lines
  const nyX = width * 0.28;
  const nyY = height * 0.36;
  const zurichX = width * 0.52;
  const zurichY = height * 0.32;
  const sfX = width * 0.16;
  const sfY = height * 0.40;

  // Arc 1: SF to NY
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(sfX, sfY);
  ctx.quadraticCurveTo((sfX + nyX) / 2, sfY - 40, nyX, nyY);
  ctx.strokeStyle = "rgba(236, 101, 43, 0.4)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Arc 2: NY to Zurich
  ctx.beginPath();
  ctx.moveTo(nyX, nyY);
  ctx.quadraticCurveTo((nyX + zurichX) / 2, nyY - 80, zurichX, zurichY);
  ctx.strokeStyle = "rgba(68, 180, 139, 0.5)";
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.setLineDash([]);

  // Moving Data Packet on NY -> Zurich Arc
  const t = packetProgress;
  const ctrlX = (nyX + zurichX) / 2;
  const ctrlY = nyY - 80;
  const packetX = (1 - t) * (1 - t) * nyX + 2 * (1 - t) * t * ctrlX + t * t * zurichX;
  const packetY = (1 - t) * (1 - t) * nyY + 2 * (1 - t) * t * ctrlY + t * t * zurichY;

  ctx.beginPath();
  ctx.arc(packetX, packetY, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#ec652b";
  ctx.shadowColor = "#ec652b";
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.shadowBlur = 0; // reset

  // Hub pulse indicators
  drawHub(sfX, sfY, "#ec652b", time);
  drawHub(nyX, nyY, "#44b48b", time + 1);
  drawHub(zurichX, zurichY, "#9f7aee", time + 2);

  requestAnimationFrame(animate);
}

function drawHub(x, y, color, time) {
  const pulse = (Math.sin(time * 3) + 1) * 4;
  ctx.beginPath();
  ctx.arc(x, y, 4 + pulse, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

requestAnimationFrame(animate);
