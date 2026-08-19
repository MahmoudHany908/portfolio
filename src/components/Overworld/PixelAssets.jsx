const colors = {
  '.': 'transparent',
  'G': '#4a752c', // Grass base
  'g': '#5a8c36', // Grass highlight
  'd': '#3b5e23', // Grass shadow
  'W': '#8b5a2b', // Wood base
  'w': '#a06a38', // Wood highlight
  'B': '#1a1c2c', // Black outline / deep shadow
  'R': '#d95763', // Red accent
  'Y': '#f4b41b', // Yellow accent
  'S': '#94b0c2', // Light stone
  's': '#566c86', // Dark stone
  'D': '#333c57', // Door/Dark hole
  'C': '#ffffff'  // White highlight
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

export const TerrainGrassTile = generateDataURI(grassTile, 16, 16);
export const LandmarkStart = generateDataURI(startSign, 32, 32);
export const LandmarkSkills = generateDataURI(skillsTower, 32, 32);
