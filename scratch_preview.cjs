const fs = require('fs');
const path = require('path');

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
  "........BWwBwwBwwBwwwWWB........",
  "........BWWBwwBwwBwwwWWB........",
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

function generateSVG(asciiArr, width, height, scale = 1, showBg = false) {
  let rects = '';
  if (showBg) {
    rects += `<circle cx="${width/2}" cy="${height/2 + 2}" r="${width/2 - 2}" fill="#f4b41b" opacity="0.5"/>\n`;
  }
  
  for (let y = 0; y < asciiArr.length; y++) {
    for (let x = 0; x < asciiArr[y].length; x++) {
      const char = asciiArr[y][x];
      const color = colors[char];
      if (color && color !== 'transparent') {
        rects += `    <rect x="${x}" y="${y}" width="1" height="1" fill="${color}" />\n`;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width * scale}" height="${height * scale}" style="image-rendering: pixelated; background: #2a2a2a;">\n${rects}</svg>`;
}

const outDir = 'C:\\Users\\mahmo\\.gemini\\antigravity-ide\\brain\\ebd8e068-ea34-4775-91bb-6ba20058605b';

fs.writeFileSync(path.join(outDir, 'terrain_grass.svg'), generateSVG(grassTile, 16, 16, 8));
fs.writeFileSync(path.join(outDir, 'landmark_start.svg'), generateSVG(startSign, 32, 32, 8));
fs.writeFileSync(path.join(outDir, 'landmark_skills.svg'), generateSVG(skillsTower, 32, 32, 8));
fs.writeFileSync(path.join(outDir, 'landmark_skills_bg.svg'), generateSVG(skillsTower, 32, 32, 8, true));

console.log("SVGs generated.");
