import portfolioData from '../../data/portfolioData.json';
import {
  LandmarkStart,
  LandmarkSkills,
  LandmarkNBE,
  LandmarkTrophy3,
  LandmarkContact
} from './PixelAssets';

const palette = {
  '.': 'transparent',
  'B': '#141824', // Crisp dark outline
  'W': '#ffffff', // Pure white
  'S': '#cbd5e1', // Light silver/steel
  's': '#64748b', // Mid slate shadow
  'd': '#334155', // Dark slate
  // Blues & Cyans (GM / VR / Holo)
  'G': '#0b5cab', // GM Royal Blue
  'g': '#1d74cc', // GM Highlight Blue
  'C': '#22d3ee', // Neon Cyan
  'c': '#0891b2', // Deep Cyan
  // Purples & Magentas (VR / Subject Null)
  'P': '#9333ea', // Vibrant Purple
  'p': '#581c87', // Deep Purple
  'M': '#f472b6', // Neon Magenta/Pink
  // Golds, Yellows & Oranges (Taxi / Arcade / Sparks)
  'Y': '#facc15', // Bright Taxi/Gold Yellow
  'y': '#ca8a04', // Dark Gold
  'O': '#f97316', // Bright Orange
  'R': '#ef4444', // Crimson Red
  'r': '#991b1b', // Dark Red
  // Greens & Wood
  'E': '#4ade80', // Matrix/Radar Green
  'e': '#15803d', // Deep Green
  'N': '#8b5a2b', // Wood/Fuse Brown
  'K': '#1e293b'  // Charcoal Bomb/Cabinet body
};

function makeSprite(rows) {
  const h = rows.length;
  const w = rows[0].length;
  let rects = '';
  for (let y = 0; y < h; y++) {
    const row = rows[y];
    let x = 0;
    while (x < w) {
      const ch = row[x];
      const fill = palette[ch];
      let run = 1;
      while (x + run < w && row[x + run] === ch) run++;
      if (fill && fill !== 'transparent') {
        rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${fill}"/>`;
      }
      x += run;
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" shape-rendering="crispEdges">${rects}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ═══════════════════════════════════════════════════════════════════════
// 1. CATEGORY HUB MONUMENTS (24x24 crisp pixel sprites — zero chests!)
// ═══════════════════════════════════════════════════════════════════════

// Hub 1: Industry & Client Simulations -> Gleaming Tech HQ & Holo-Core Spire
const hubSimsGrid = [
  "...........BB...........",
  "..........BYYB..........",
  "..........BYYB..........",
  ".........BSSSSB.........",
  ".......BBSSSSSSBB.......",
  "......BSsGGGGGGsSB......",
  ".....BSsGCCCCCCGsSB.....",
  ".....BSsGCWWWWCGsSB.....",
  ".....BSsGCCCCCCGsSB.....",
  ".....BSsGGGGGGGGsSB.....",
  "....BBSSSSSSSSSSSSBB....",
  "...BSsGGGssGGGssGGGsB...",
  "...BSsGGGssGGGssGGGsB...",
  "...BSsSSSSSSSSSSSSssB...",
  "...BSsGGGssGGGssGGGsB...",
  "...BSsGGGssGGGssGGGsB...",
  "...BSsSSSSSSSSSSSSssB...",
  "...BSsddddBBBBddddssB...",
  "...BSsddddBYYBddddssB...",
  "...BSsddddBYYBddddssB...",
  "..BBSSSSSSSSSSSSSSSSBB..",
  ".BssssssssssssssssssssB.",
  ".BBBBBBBBBBBBBBBBBBBBBB.",
  "........................"
];

// Hub 2: VR Action & Puzzle -> Iconic Neon Dual-Lens VR Headset on Pedestal
const hubVrGrid = [
  "........................",
  ".........BBBBBB.........",
  ".......BBCCCCCCBB.......",
  "......BCcPPPPPPcCB......",
  "....BBBBBBBBBBBBBBBB....",
  "...BSSSSSSSSSSSSSSSSB...",
  "..BSddddddddddddddddSB..",
  "..BSdBBBBBBddBBBBBBdSB..",
  "..BSdBCCCCBddBMMMMBdSB..",
  "..BSdBCWWCBddBMWWMBdSB..",
  "..BSdBCCCCBddBMMMMBdSB..",
  "..BSdBBBBBBddBBBBBBdSB..",
  "..BSdddddddBBdddddddSB..",
  "...BSSSSSSBBBBSSSSSSB...",
  "....BBBBBB....BBBBBB....",
  ".........BssssB.........",
  ".........BSCCSB.........",
  "........BBSSSSBB........",
  "......BBsCCCCCCsBB......",
  ".....BSssssssssssSB.....",
  ".....BBBBBBBBBBBBBB.....",
  "........................",
  "........................",
  "........................"
];

// Hub 3: 2D Jam Arcade -> Classic Retro Neon Arcade Cabinet
const hubJamsGrid = [
  "........................",
  ".....BBBBBBBBBBBBBB.....",
  "....BRRRRRRRRRRRRRRB....",
  "...BRYYYYYYYYYYYYYYRB...",
  "...BRBBBBBBBBBBBBBBRB...",
  "....BKKKKKKKKKKKKKKB....",
  "....BKBBBBBBBBBBBBKB....",
  "....BKBCCCCCCCCCCBKB....",
  "....BKBCWWCCCCYYCBKB....",
  "....BKBCCCCRRCCCCBKB....",
  "....BKBCCCCCCCCCCBKB....",
  "....BKBBBBBBBBBBBBKB....",
  "...BBKKKKKKKKKKKKKKBB...",
  "..BRRKKYBKKRRKKYYKKRRB..",
  "..BRRBBBBBBBBBBBBBBBRB..",
  "...BRKKKKKKKKKKKKKKRB...",
  "...BRKKKKBBBBBBKKKKRB...",
  "...BRKKKKBYYYYBKKKKRB...",
  "...BRKKKKBYYYYBKKKKRB...",
  "...BRKKKKBBBBBBKKKKRB...",
  "...BRRRRRRRRRRRRRRRRB...",
  "...BBBBBBBBBBBBBBBBBB...",
  "........................",
  "........................"
];

// ═══════════════════════════════════════════════════════════════════════
// 2. BESPOKE PER-GAME LOGOS (24x24 crisp pixel art — every game unique!)
// ═══════════════════════════════════════════════════════════════════════

// proj_gm: General Motors Quality Week VR -> Iconic GM Blue Rounded Badge + QA Star
const gmGameGrid = [
  "........................",
  "....BBBBBBBBBBBBBBBB....",
  "...BggggggggggggggggB...",
  "..BgGGGGGGGGGGGGGGGGgB..",
  ".BgGGGGGGGGGGGGGGYYGGgB.",
  ".BgGGGGGGGGGGGGGYYYYGgB.",
  ".BgGGGGGGGGGGGGGGYYGGgB.",
  ".BgGGWWWWGGGGWWWWWWWGgB.",
  ".BgGWGGGGWGGGWGGWGGWGgB.",
  ".BgGWGGGGWGGGWGGWGGWGgB.",
  ".BgGWGGGGWGGGWGGWGGWGgB.",
  ".BgGGWWWWGGGGWGGWGGWGgB.",
  ".BgGGGGGGWGGGGGGGGGGgB..",
  ".BgGGWWWWGGGGWWWWWWWGgB.",
  ".BgGGGGGGGGGGWWWWWWWGgB.",
  ".BgGGGGGGGGGGGGGGGGGGgB.",
  "..BgGGGGGGGGGGGGGGGGgB..",
  "...BggggggggggggggggB...",
  "....BBBBBBBBBBBBBBBB....",
  "........................",
  "........................",
  "........................",
  "........................",
  "........................"
];

// proj1: The Learning Lens -> Glowing Cyan AR/XR Spatial Visor + Holo Cube
const learningLensGrid = [
  "..........BBBB..........",
  ".........BCCCCB.........",
  "........BCWWWWCB........",
  "........BCCCCCCB........",
  ".........BBBBBB.........",
  "........................",
  "...BBBBBBBBBBBBBBBBBB...",
  "..BSSSSSSSSSSSSSSSSSSB..",
  ".BSddddddddddddddddddSB.",
  ".BSdCCCCCCCCCCCCCCCCdSB.",
  ".BSdCWWCCCCCCCCCCWWCdSB.",
  ".BSdCCCCCCCCCCCCCCCCdSB.",
  ".BSdCCCCCCBBBBCCCCCCdSB.",
  ".BSdddddddB..BdddddddSB.",
  "..BSSSSSSSB..BSSSSSSSB..",
  "...BBBBBBBB..BBBBBBBB...",
  "........................",
  "........BYY..YYB........",
  ".........BYYYYB.........",
  "..........BBBB..........",
  "........................",
  "........................",
  "........................",
  "........................"
];

// proj4: Subject Null -> Diagonal Laser-Sliced Neon Violet Cube (Mesh Slicing!)
const subjectNullGrid = [
  "........................",
  ".........BBBBBB.........",
  ".......BBPPPPPPBB.......",
  ".....BBPPPPPPPPPPBB.....",
  "....BPPPPWWWWPPPPPPB....",
  "....BppppPPPPPPPPppB....",
  ".....BBpppPPPPPPpBB..BB.",
  "......BBppPPPPBB..BBCB..",
  "....BBCBBpPPBB..BBCCCB..",
  "..BBCCCBBBB...BBCCCCB...",
  ".BCCCCBB....BBCCCCBB....",
  ".BCCBB....BBCCCCBB......",
  "..BB....BBCCCCBB.BBBB...",
  "......BBCCCCBB..BMpppB..",
  ".....BCCCCBB...BMMppppB.",
  "....BCCBB.....BMMMppppB.",
  "....BBB......BMMMMppppB.",
  ".............BppppppppB.",
  "..............BBBBBBBB..",
  "........................",
  "........................",
  "........................",
  "........................",
  "........................"
];

// proj3: VR Wave Shooter -> Sci-Fi Plasma Blaster + Crimson Crosshair
const waveShooterGrid = [
  "..............BBBB......",
  "............BBRRRRB.....",
  "...........BRR....RRB...",
  "...........BR..RR..RB...",
  "..........BBRR.RR.RRBB..",
  "...........BR..RR..RB...",
  "...........BRR....RRB...",
  "............BBRRRRB.....",
  "..............BBBB......",
  "..BBBBBBBBBBBB..........",
  ".BSSSSSSSSSSSSBB........",
  ".BSCCCCCCCCCCCCSB.......",
  ".BSSSSSSSSSSSSSSSB......",
  ".BBBBBBBBSSSSSSSSB......",
  ".....BddddBBBBBBBB......",
  "....BdddddB.............",
  "....BddYYdB.............",
  "...BdddddB..............",
  "...BdddddB..............",
  "...BBBBBBB..............",
  "........................",
  "........................",
  "........................",
  "........................"
];

// proj7: Night Shift Taxi -> Bright Yellow Checkered Cab with Glowing Headlights
const nightShiftTaxiGrid = [
  "........................",
  ".........BBBBBB.........",
  "........BYYYYYYB........",
  "........BYBBBBYB........",
  "......BBBBYYYYBBBB......",
  ".....BYYYYYYYYYYYYB.....",
  "....BYddddddddddddYB....",
  "...BYdCCCCCCCCCCCCdYB...",
  "...BYdCWWCCCCCCWWCdYB...",
  "..BBYdCCCCCCCCCCCCdYBB..",
  ".BYYYYBBBBBBBBBBBBYYYYB.",
  ".BYBYBYYYYBYYBYYYYBYBYB.",
  ".BYYYYBYYBYYYYBYYBYYYYB.",
  ".BWWWWYYYYYYYYYYYYRRRRB.",
  ".BWWWWYYYYBBBBYYYYRRRRB.",
  ".BYYYYYYYYBBBBYYYYYYYYB.",
  ".BBBBBBBBBBBBBBBBBBBBBB.",
  "...BKKKKB......BKKKKB...",
  "...BKSSKB......BKSSKB...",
  "....BBBB........BBBB....",
  "........................",
  "........................",
  "........................",
  "........................"
];

// proj8: LoadNExplode -> Lit Cartoon Bomb with Burning Fuse & Bright Spark!
const loadNExplodeGrid = [
  "................B..B....",
  "..............BBYBBYB...",
  ".............BYYOOOOYB..",
  "..............BOOWWOOB..",
  ".............BYYOOOOYB..",
  "............BNNBBYBB....",
  "...........BNNB.........",
  ".........BBBBBB.........",
  ".......BBsSSSSsBB.......",
  ".....BBKKKKKKKKKKBB.....",
  "....BKKKKKKKKKKKKKKB....",
  "...BKKKWWKKKKKKKKKKKB...",
  "...BKKWWWWKKKKKKKKKKB...",
  "..BKKKWKKKKKKKKKKKKKKB..",
  "..BKKKKKKKKKKKKKKKKKKB..",
  "..BKKKKKKKKKKKKKKKKKKB..",
  "..BKKKKKKKKKKKKKKKKKKB..",
  "...BKKKKKKKKKKKKKKKKB...",
  "...BKKKKKKKKKKKKKKKKB...",
  "....BKKKKKKKKKKKKKKB....",
  ".....BBKKKKKKKKKKBB.....",
  ".......BBBBBBBBBB.......",
  "........................",
  "........................"
];

// proj5: ESCCTRL -> Mechanical [ESC] Keycap with Atmospheric Rain Streaks
const escctrlGrid = [
  "..C......C.......C......",
  "..C......C.......C......",
  "................C.......",
  "...BBBBBBBBBBBBBBBBBB...",
  "..BSSSSSSSSSSSSSSSSSSB..",
  ".BSWWWWWWWWWWWWWWWWWWsB.",
  ".BSWddddddddddddddddssB.",
  ".BSWdWWWWdWWWWdWWWWdssB.",
  ".BSWdWddddWddddWddddssB.",
  ".BSWdWWWddWWWWdWddddssB.",
  ".BSWdWdddddddWdWddddssB.",
  ".BSWdWWWWdWWWWdWWWWdssB.",
  ".BSWddddddddddddddddssB.",
  ".BSWssssssssssssssssssB.",
  ".BssssssssssssssssssssB.",
  "..BddddddddddddddddddB..",
  "..BddddddddddddddddddB..",
  "...BBBBBBBBBBBBBBBBBB...",
  ".....C.......C..........",
  ".....C.......C.....C....",
  "...................C....",
  "........................",
  "........................",
  "........................"
];

export const HubIconSims = makeSprite(hubSimsGrid);
export const HubIconVR = makeSprite(hubVrGrid);
export const HubIconJams = makeSprite(hubJamsGrid);

export const GAME_SPRITES = {
  about: LandmarkStart,
  skills: LandmarkSkills,
  contact: LandmarkContact,
  proj_gm: makeSprite(gmGameGrid),
  proj2: LandmarkNBE,
  proj1: makeSprite(learningLensGrid),
  proj4: makeSprite(subjectNullGrid),
  proj3: makeSprite(waveShooterGrid),
  proj6: LandmarkTrophy3,
  proj7: makeSprite(nightShiftTaxiGrid),
  proj8: makeSprite(loadNExplodeGrid),
  proj5: makeSprite(escctrlGrid)
};

export const HUB_MONUMENT_SPRITES = {
  hub_sims: HubIconSims,
  hub_vr: HubIconVR,
  hub_jams: HubIconJams
};

const nodeById = Object.fromEntries(portfolioData.nodes.map((n) => [n.id, n]));

// Clean, spacious 1680x900 single-screen open floor (3 cols: 310, 840, 1370 x 2 rows: 270, 650).
// Mobile: 600px wide open vertical path, 340px spacing per station.
const mobileY = (i) => 220 + i * 330;

export const FLOOR_BOUNDS = {
  desktop: { width: 1680, height: 900, minX: 90, maxX: 1590, minY: 110, maxY: 825 },
  mobile:  { width: 600,  height: 2140, minX: 70, maxX: 530,  minY: 110, maxY: 2040 }
};

export const INTERACT_RADIUS = 165;

export const PROJECT_CARD_META = {
  proj_gm: {
    hook: '2-module factory VR QA suite: Vehicle Defect Inspector & optical Gap-Gun simulator.',
    badges: ['🎥 2 VIDEOS', 'UNITY 6 · OPENXR', 'CLIENT: GM']
  },
  proj2: {
    hook: 'Commissioned arena-survival + financial market economy sim teaching smart investing.',
    badges: ['🎥 GAMEPLAY VIDEO', 'DI · C# · UGUI', 'CLIENT: NBE']
  },
  proj1: {
    hook: 'Interactive AR/VR classroom syncing live .NET + Python backend data with Unity XR.',
    badges: ['🎥 3 VIDEOS', 'UNITY · .NET · ARCORE', 'GITHUB REPO']
  },
  proj4: {
    hook: 'Narrative standalone VR puzzle game built around runtime mesh slicing & vision states.',
    badges: ['🎥 GAMEPLAY VIDEO', 'META XR · OPENXR', 'PLAYABLE DEMO']
  },
  proj3: {
    hook: 'High-FPS standalone VR wave shooter with object pooling & strict ammo-economy combat.',
    badges: ['🎥 GAMEPLAY VIDEO', 'XRIT · POOLING', 'GITHUB REPO']
  },
  proj6: {
    hook: '2D stealth-platformer leaping across 3 living paintings with unique traversal powers.',
    badges: ['🏆 #3 & INNOVATION', '🎥 VIDEO', 'PLAYABLE ON ITCH']
  },
  proj7: {
    hook: 'No-map comedic night taxi game—spot which passengers are lying to survive until dawn.',
    badges: ['🕹️ PLAYABLE ON ITCH', 'BRACKEYS JAM', 'LEADERBOARDS']
  },
  proj8: {
    hook: 'Fast arcade crowd-herding score chaser—pack NPCs into your blast radius before zero.',
    badges: ['🕹️ PLAYABLE ON ITCH', 'GMTK JAM', 'SCORE ATTACK']
  },
  proj5: {
    hook: 'Custom C++ & SFML shape-shifting platformer with dynamic rain and multi-layer parallax.',
    badges: ['🎥 GAMEPLAY VIDEO', 'C++ · SFML ENGINE', 'GITHUB + DEMO']
  }
};

export const PORTFOLIO_CAMP_HUBS = [
  {
    id: 'hub_about',
    step: '01',
    title: 'About Me',
    subtitle: 'BIO & EXPERIENCE',
    room: '01 · ABOUT ME',
    accent: '#f87171',
    isSingle: true,
    node: nodeById.about,
    children: [nodeById.about],
    studio: { x: 310,  y: 270, pX: 300, pY: mobileY(0) }
  },
  {
    id: 'hub_skills',
    step: '02',
    title: 'Skills',
    subtitle: 'UNITY · C# · C++ · XR',
    room: '02 · SKILLS',
    accent: '#facc15',
    isSingle: true,
    node: nodeById.skills,
    children: [nodeById.skills],
    studio: { x: 840,  y: 270, pX: 300, pY: mobileY(1) }
  },
  {
    id: 'hub_sims',
    step: '03',
    title: 'Industry Sims',
    subtitle: '3 PROJECTS · GM & NBE',
    room: '03 · INDUSTRY SIMS',
    accent: '#38bdf8',
    isSingle: false,
    sprite: HubIconSims,
    children: [nodeById.proj_gm, nodeById.proj2, nodeById.proj1].filter(Boolean),
    studio: { x: 1370, y: 270, pX: 300, pY: mobileY(2) }
  },
  {
    id: 'hub_vr',
    step: '04',
    title: 'VR Games',
    subtitle: '2 GAMES · META QUEST',
    room: '04 · VR GAMES',
    accent: '#c084fc',
    isSingle: false,
    sprite: HubIconVR,
    children: [nodeById.proj4, nodeById.proj3].filter(Boolean),
    studio: { x: 310,  y: 650, pX: 300, pY: mobileY(3) }
  },
  {
    id: 'hub_jams',
    step: '05',
    title: 'Game Jams',
    subtitle: '4 GAMES · #3 AWARD',
    room: '05 · GAME JAMS',
    accent: '#fb923c',
    isSingle: false,
    sprite: HubIconJams,
    children: [nodeById.proj6, nodeById.proj7, nodeById.proj8, nodeById.proj5].filter(Boolean),
    studio: { x: 840,  y: 650, pX: 300, pY: mobileY(4) }
  },
  {
    id: 'hub_contact',
    step: '06',
    title: 'Contact & CV',
    subtitle: 'HIRE ME & LINKS',
    room: '06 · CONTACT & CV',
    accent: '#4ade80',
    isSingle: true,
    node: nodeById.contact,
    children: [nodeById.contact],
    studio: { x: 1370, y: 650, pX: 300, pY: mobileY(5) }
  }
];

export function getStationPos(hub, isMobile) {
  return isMobile
    ? { x: hub.studio.pX, y: hub.studio.pY }
    : { x: hub.studio.x, y: hub.studio.y };
}

export function getSpawnPos(isMobile) {
  const first = PORTFOLIO_CAMP_HUBS[0];
  return isMobile
    ? { x: first.studio.pX - 125, y: first.studio.pY + 10 }
    : { x: first.studio.x - 125, y: first.studio.y + 15 };
}

export const hubOfNode = (nodeId) =>
  PORTFOLIO_CAMP_HUBS.find((h) => h.children.some((c) => c.id === nodeId));
