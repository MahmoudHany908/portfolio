const colors = {
  '.': 'transparent',
  'G': '#4a752c', // Grass base
  'g': '#5a8c36', // Grass highlight
  'd': '#3b5e23', // Grass shadow
  'W': '#8b5a2b', // Wood base
  'w': '#a06a38', // Wood highlight
  'B': '#1a1c2c', // Black outline / deep shadow
  'R': '#d95763', // Red accent
  'Y': '#f4b41b', // Yellow accent / Gold
  'O': '#d48b15', // Dark Gold
  'S': '#94b0c2', // Light stone
  's': '#566c86', // Dark stone
  'D': '#1e2337', // Deep chest interior / shadow
  'C': '#ffffff', // White highlight
  'E': '#006738', // NBE Forest Green
  'e': '#009a52', // NBE Bright Green
  'b': '#569ceb'  // Blue gem / sapphire
};

function generateDataURI(asciiArr, width, height) {
  let rects = '';
  for (let y = 0; y < asciiArr.length; y++) {
    for (let x = 0; x < asciiArr[y].length; x++) {
      const char = asciiArr[y][x];
      const color = colors[char];
      if (color && color !== 'transparent') {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}" />`;
      }
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${rects}</svg>`;
  // encodeURIComponent is safe for data URIs
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const grassTile = [
  "GGGGGGGGGGGGGGGG",
  "GgGGGGGGgGGGGGGG",
  "GGGGGGGGGGGGdGGG",
  "GGGGgGGGGGGGGGGG",
  "GGGGGGGGGGgGGGGG",
  "GGdGGGGGGGGGGGGG",
  "GGGGGGGGGGGGGGGG",
  "GGGGGGgGGGGGGdGG",
  "GGGGGGGGGGGGGGGG",
  "GgGGGGGGGGGGgGGG",
  "GGGGGGdGGGGGGGGG",
  "GGGGGGGGGGGGGGGG",
  "GGGGgGGGGGGdGGGG",
  "GGGGGGGGGGGGGGGG",
  "GGdGGGGgGGGGGGGG",
  "GGGGGGGGGGGGGGGG"
];

const startSign = [
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "..........BBBBBBBBBBBB..........",
  ".........BWwwwwwwwwwwWB.........",
  "........BWWWWWWWWWWWWWWB........",
  "........BWwRRRRRRRRRRwWB........",
  "........BWWRRRRRRRRRRWWB........",
  "........BWWWWWWWWWWWWWWB........",
  "........BwWWwWWWwWWWwWWB........",
  "........BWBBWBBBWBBBWwwB........",
  "........BWWWWWWWWWWWWWWB........",
  ".........BBBBBBWBBBBBBB.........",
  "..............BWB...............",
  "..............BwB...............",
  "..............BWB...............",
  "..............BwB...............",
  "..............BWB...............",
  "..............BwB...............",
  "..............BWB...............",
  "..............BwB...............",
  "..............BWB...............",
  "..............BwB...............",
  ".............BBWBB..............",
  "............BBwwwBB.............",
  "...........BBwwwwwBB............",
  "...........BBBBBBBBB............",
  "................................",
  "................................"
];

const skillsTower = [
  "................................",
  ".............BBBB...............",
  "............BYYYYB..............",
  "...........BYYYYYYB.............",
  "...........BBBBBBBB.............",
  "..........BssssssssB............",
  "..........BSSSSSSSSB............",
  "..........BsSSssSSsB............",
  "..........BSSSSSSSSB............",
  "..........BSSSSSSSSB............",
  "..........BsSSssSSsB............",
  "..........BBBBBBBBBB............",
  ".........BssssssssssB...........",
  ".........BSSSSSSSSSSB...........",
  ".........BSSSSSSSSSSB...........",
  ".........BsSSssSSssSB...........",
  ".........BSSSSSSSSSSB...........",
  ".........BSSSSSSSSSSB...........",
  ".........BsSSssSSssSB...........",
  ".........BSSSSSSSSSSB...........",
  ".........BSSSSBBSSSSB...........",
  ".........BsSSSBBSSSsB...........",
  ".........BSSSSDDSSSSB...........",
  ".........BSSSSDDSSSSB...........",
  ".........BsSSSDDSSSsB...........",
  ".........BSSSSDDSSSSB...........",
  ".........BBBBBBBBBBBB...........",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................"
];

const projectsChest = [
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  ".........BBBBBBBBBBBBBB.........",
  "........BSSSSSSSSSSSSSSB........",
  ".......BSSwwwwwwwwwwwwSSB.......",
  "......BSSwwwwwwwwwwwwwwSSB......",
  "......BSSWwwwwwwwwwwwwWSSB......",
  "......BSSWwwBBBBwwBBBBWSSB......",
  "......BSSWwwBBBBwwBBBBWSSB......",
  "......BSSWwwwwwwwwwwwwWSSB......",
  "......BSSSSSSSSSSSSSSSSSSB......",
  "......BBBBBBBBSSBBBBBBBBBB......",
  "......BSSWwwwBYYBwwwWwWSSB......",
  "......BSSWWWWBYYBWWWWWwSSB......",
  "......BSSWwwwBYYBwwwWwWSSB......",
  "......BSSWWWWBBBBWWWWWwSSB......",
  "......BSSWwwwwwwwwwwWwWSSB......",
  "......BSSWWWWWWWWWWWWWwSSB......",
  "......BSSSSSSSSSSSSSSSSSSB......",
  "......BBBBBBBBBBBBBBBBBBBB......",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................"
];

const projectsChestOpen = [
  "................................",
  "................................",
  ".........BBBBBBBBBBBBBB.........",
  "........BSSSSSSSSSSSSSSB........",
  ".......BSSwwwwwwwwwwwwSSB.......",
  "......BSSWwwwwwwwwwwwwWSSB......",
  "......BSSWwwBBBBwwBBBBWSSB......",
  "......BSSWwwwwwwwwwwwwWSSB......",
  "......BSSSSSSSSSSSSSSSSSSB......",
  "......BBBBBBBBBBBBBBBBBBBB......",
  "......BDDDDDDDDDDDDDDDDDDB......",
  "......BDDYCCYDDDYbCYDDDYDB......",
  "......BDYYYYYYDYbYbYYYYDDB......",
  "......BDYYRYYYYYYYYYYYRYDB......",
  "......BDYYYYCYYYYYbYYYYYDB......",
  "......BSSYYYYYYYYYYYYYYSSB......",
  "......BBBBBBBBSSBBBBBBBBBB......",
  "......BSSWwwwwB..BwwwwWwSSB.....",
  "......BSSWWWWWB..BWWWWWwSSB.....",
  "......BSSWwwwwBYYBwwwwWwSSB.....",
  "......BSSWWWWWBBBBWWWWwWSSB.....",
  "......BSSWwwwwwwwwwwWwWSSB......",
  "......BSSWWWWWWWWWWWWWwSSB......",
  "......BSSSSSSSSSSSSSSSSSSB......",
  "......BBBBBBBBBBBBBBBBBBBB......",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................"
];

const nbeLogo = [
  "................................",
  "................................",
  "...........BBBBBBBBBB...........",
  ".........BBEEEEEEEEEEBB.........",
  "........BEEEEEEEEEEEEEEB........",
  ".......BEEEEEEEEEEEEEEEEB.......",
  "......BEECCCCCCCCCCCCCCEEB......",
  ".....BEECCCCCCCCCCCCCCCCEEB.....",
  ".....BEECBBBBBBBBBBBBCCEERB.....",
  "....BEECCBYYYYYYYYYYBCCCEEB.....",
  "....BEECCBYYYYYYYYYYBCCCEEB.....",
  "....BEECCBBYYYYYYYYBCCCCEEB.....",
  "....BEECCCBBYYYYYYBBCCCCEEB.....",
  "....BEECCCCBBBBBBBBCCCCCEEB.....",
  "....BEECCCCCCCCCCCCCCCCCEEB.....",
  "....BEECCBYYBBYYBBYYBCCCEEB.....",
  "....BEECCBYYBBYYBBYYBCCCEEB.....",
  "....BEECCBYYBBYYBBYYBCCCEEB.....",
  "....BEECCBYYBBYYBBYYBCCCEEB.....",
  "....BEECCBYYBBYYBBYYBCCCEEB.....",
  "....BEECCBYYBBYYBBYYBCCCEEB.....",
  "....BEECCBYYBBYYBBYYBCCCEEB.....",
  "....BEECCBBBBBBBBBBBBCCCEEB.....",
  "....BEECCCCCCCCCCCCCCCCCEEB.....",
  ".....BEECCCCCCCCCCCCCCCCEEB.....",
  ".....BEEEEEEEEEEEEEEEEEEEEB.....",
  "......BBEEEEEEEEEEEEEEEEBB......",
  "........BBBBBBBBBBBBBBBB........",
  "................................",
  "................................",
  "................................",
  "................................"
];

const trophy3 = [
  "................................",
  "................................",
  "..........BBBBBBBBBBBB..........",
  ".........BYYYYYYYYYYYYB.........",
  "..BBBB...BYYYYYYYYYYYYB...BBBB..",
  ".BYYYB..BYYYYYYYYYYYYYYB..BYYYB.",
  ".BYYYB..BYYYYYYYYYYYYYYB..BYYYB.",
  ".BYYYB..BYYYYBBBBBBBBYYB..BYYYB.",
  ".BYYYB..BYYYYYYYYYYYBYYB..BYYYB.",
  "..BBBB..BYYYYYYBBBBBBYYB..BBBB..",
  ".........BYYYYYYYYYYBYB.........",
  ".........BYYYBBBBBBBBYB.........",
  ".........BYYYYYYYYYYYYB.........",
  "..........BYYYYYYYYYYB..........",
  "...........BYYYYYYYYB...........",
  "............BYYYYYYB............",
  ".............BYYYYB.............",
  "..............BYYB..............",
  "..............BYYB..............",
  ".............BYYYYB.............",
  "............BYYYYYYB............",
  "...........BYYYYYYYYB...........",
  "..........BBBBBBBBBBBB..........",
  ".........BWWWWWWWWWWWWB.........",
  ".........BWwBBBBBBBBwWB.........",
  ".........BWwSSSSSSSSwWB.........",
  ".........BWwSssssssSwWB.........",
  ".........BWwSSSSSSSSwWB.........",
  ".........BWWWWWWWWWWWWB.........",
  "..........BBBBBBBBBBBB..........",
  "................................",
  "................................"
];

const contactMailbox = [
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "................................",
  "...........BBBBBBBB.............",
  "..........BSSSSSSSSB............",
  ".........BSSSSSSSSSSB...........",
  "........BSSSSSSSSSSSSB..........",
  "........BsSSSssSSSSSsB...BBB....",
  "........BSSSSSSSSSSSSB..BCCCB...",
  "........BsSSSssSSSSSsB..BCRRCB..",
  "........BSSSSSSSSSSSSB.BCRRCB...",
  "........BsSSSssSSSSSsB.BCRRCB...",
  "........BSSSSSSSSSSSSB.BBBB.....",
  "........BssssssssssssB.B........",
  "........BBBBBBBBBBBBBB.B........",
  "............BWWWWWB..BBB........",
  "............BwWWwWB.............",
  "............BWWWWWB.............",
  "............BwWWwWB.............",
  "............BWWWWWB.............",
  "............BwWWwWB.............",
  "............BWWWWWB.............",
  "............BwWWwWB.............",
  "...........BBWBBWBB.............",
  "..........BBWWWWWWBB............",
  ".........BBWWWWWWWWBB...........",
  ".........BBBBBBBBBBBB...........",
  "................................",
  "................................"
];

const lockIcon = [
  "................",
  "................",
  ".....BBBBBB.....",
  "....BSssssSB....",
  "...BSsBBBBsSB...",
  "...BSsB..BsSB...",
  "...BSsB..BsSB...",
  "...BBBBBBBBBB...",
  "...BYYYYYYYYB...",
  "...BYYYBBYYYB...",
  "...BYYYBBYYYB...",
  "...BYYBBBYYYB...",
  "...BYYYYYYYYB...",
  "...BBBBBBBBBB...",
  "................",
  "................"
];

const pathTile = [
  "WwwwwWWWWWWwWWww",
  "wwWWWwWwWWwwwWwW",
  "wWWWwWwWWWWwWWWW",
  "WWWwWwWWWwWWwwWw",
  "wwWWwWWwWwWwWWWw",
  "WwWWWwWWwwWWWwWW",
  "WWwWWwWWwWWwWWwW",
  "WwwWWwWWWWwWwWwW",
  "wWwWWWWwWWWwWWww",
  "WWwWWwWWwwWWwwWw",
  "WwWWwWwWWwWwwWWW",
  "WwwWWwwWWWwWWWwW",
  "wWWwwWWwwWWwWwWW",
  "WWwWWWwWWwwWwwWw",
  "wwWWwWWwWWWwWWWw",
  "WwWWWwwWwwWWwWwW"
];

export const TerrainGrassTile = generateDataURI(grassTile, 16, 16);
export const PathTile = generateDataURI(pathTile, 16, 16);
export const LandmarkStart = generateDataURI(startSign, 32, 32);
export const LandmarkSkills = generateDataURI(skillsTower, 32, 32);
export const LandmarkProjects = generateDataURI(projectsChest, 32, 32);
export const LandmarkProjectsOpen = generateDataURI(projectsChestOpen, 32, 32);
export const LandmarkNBE = generateDataURI(nbeLogo, 32, 32);
export const LandmarkTrophy3 = generateDataURI(trophy3, 32, 32);
export const LandmarkContact = generateDataURI(contactMailbox, 32, 32);
export const LockIcon = generateDataURI(lockIcon, 16, 16);
