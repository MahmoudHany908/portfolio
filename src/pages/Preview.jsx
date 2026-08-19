import React from 'react';
import { TerrainGrassTile, LandmarkStart, LandmarkSkills } from '../components/Overworld/PixelAssets';

export default function Preview() {
  return (
    <div className="min-h-screen bg-retro-dark p-8 md:p-16 flex flex-col gap-12 text-white font-pixel">
      <h1 className="text-3xl text-retro-yellow tracking-widest border-b-4 border-retro-yellow pb-4">Asset Preview</h1>
      
      <div>
        <h2 className="mb-4 text-xl">1. Terrain Tile (16x16 tiled + scaled 4x)</h2>
        <div 
          className="w-full max-w-2xl h-64 border-4 border-white pixel-border" 
          style={{ 
            backgroundImage: `url("${TerrainGrassTile}")`, 
            backgroundSize: '64px 64px',
            imageRendering: 'pixelated' 
          }}
        ></div>
        <p className="mt-2 text-slate-400 text-sm">This replaces the flat green background.</p>
      </div>

      <div>
        <h2 className="mb-4 text-xl">2. Start Landmark (Wooden Signpost)</h2>
        <div className="bg-retro-green inline-block p-8 border-4 border-white pixel-border">
          <img src={LandmarkStart} className="w-32 h-32" style={{ imageRendering: 'pixelated' }} alt="Start Signpost" />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl text-retro-yellow">3. Skills Tower (Option A vs Option B)</h2>
        <p className="mb-8 max-w-xl leading-relaxed text-sm">
          You brought up a great point about color-coding visibility. A small yellow trim (A) might be hard to read from a distance compared to a big colored circle (B). Here is a side-by-side comparison of the Skills Tower (32x32 scaled up) so you can decide which direction is better:
        </p>

        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex flex-col items-center">
            <span className="mb-4 text-lg">Option A (Trim Only)</span>
            <div className="bg-retro-green p-12 border-4 border-white pixel-border">
              <div className="w-32 h-32 relative mt-4">
                <img src={LandmarkSkills} className="w-full h-full relative z-10" style={{ imageRendering: 'pixelated' }} alt="Trim Only" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="mb-4 text-lg">Option B (With BG Circle)</span>
            <div className="bg-retro-green p-12 border-4 border-white pixel-border relative">
              <div className="w-32 h-32 relative mt-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#f4b41b] opacity-80 shadow-[0_0_20px_#f4b41b]"></div>
                <img src={LandmarkSkills} className="w-full h-full relative z-10" style={{ imageRendering: 'pixelated' }} alt="With BG Circle" />
              </div>
            </div>
            <p className="mt-4 text-retro-yellow text-sm max-w-xs text-center">My recommendation: Option B maintains the instant readability of the original design.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
