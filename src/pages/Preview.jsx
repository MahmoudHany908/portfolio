import React from 'react';
import { 
  TerrainGrassTile, 
  PathTile, 
  LandmarkStart, 
  LandmarkSkills, 
  LandmarkProjects, 
  LandmarkContact, 
  LockIcon 
} from '../components/Overworld/PixelAssets';

export default function Preview() {
  return (
    <div className="min-h-screen bg-retro-dark p-8 md:p-16 flex flex-col gap-16 text-white font-pixel">
      <h1 className="text-3xl text-retro-yellow tracking-widest border-b-4 border-retro-yellow pb-4">Asset Preview (Full Set)</h1>
      
      {/* Background Section */}
      <div>
        <h2 className="text-2xl text-retro-yellow mb-8 border-b border-slate-700 pb-2">Background & Pathing</h2>
        <div className="flex flex-col md:flex-row gap-12">
          <div>
            <h3 className="mb-4 text-lg">Terrain Tile (16x16 tiled + scaled)</h3>
            <div 
              className="w-full max-w-sm h-64 border-4 border-white pixel-border" 
              style={{ 
                backgroundImage: `url("${TerrainGrassTile}")`, 
                backgroundSize: '64px 64px',
                imageRendering: 'pixelated' 
              }}
            ></div>
            <p className="mt-2 text-slate-400 text-sm">Replaces the flat green background.</p>
          </div>

          <div>
            <h3 className="mb-4 text-lg">Dirt Path Tile (16x16 tiled + scaled)</h3>
            <div 
              className="w-full max-w-sm h-64 border-4 border-white pixel-border" 
              style={{ 
                backgroundImage: `url("${PathTile}")`, 
                backgroundSize: '64px 64px',
                imageRendering: 'pixelated' 
              }}
            ></div>
            <p className="mt-2 text-slate-400 text-sm">Will be used as an SVG pattern for the dashed lines.</p>
          </div>
        </div>
      </div>

      {/* Landmarks Section */}
      <div>
        <h2 className="text-2xl text-retro-yellow mb-8 border-b border-slate-700 pb-2">Landmark Nodes (Option B Style)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center">
            <span className="mb-4 text-lg">Start (Signpost)</span>
            <div className="bg-retro-green p-12 border-4 border-white pixel-border relative">
              <div className="w-32 h-32 relative mt-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#d95763] opacity-80 shadow-[0_0_20px_#d95763]"></div>
                <img src={LandmarkStart} className="w-full h-full relative z-10" style={{ imageRendering: 'pixelated' }} alt="Start" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="mb-4 text-lg">Skills (Tower)</span>
            <div className="bg-retro-green p-12 border-4 border-white pixel-border relative">
              <div className="w-32 h-32 relative mt-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#f4b41b] opacity-80 shadow-[0_0_20px_#f4b41b]"></div>
                <img src={LandmarkSkills} className="w-full h-full relative z-10" style={{ imageRendering: 'pixelated' }} alt="Skills" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="mb-4 text-lg">Projects (Chest)</span>
            <div className="bg-retro-green p-12 border-4 border-white pixel-border relative">
              <div className="w-32 h-32 relative mt-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#569ceb] opacity-80 shadow-[0_0_20px_#569ceb]"></div>
                <img src={LandmarkProjects} className="w-full h-full relative z-10" style={{ imageRendering: 'pixelated' }} alt="Projects" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="mb-4 text-lg">Contact (Mailbox)</span>
            <div className="bg-retro-green p-12 border-4 border-white pixel-border relative">
              <div className="w-32 h-32 relative mt-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#83eb72] opacity-80 shadow-[0_0_20px_#83eb72]"></div>
                <img src={LandmarkContact} className="w-full h-full relative z-10" style={{ imageRendering: 'pixelated' }} alt="Contact" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* UI Elements */}
      <div>
        <h2 className="text-2xl text-retro-yellow mb-8 border-b border-slate-700 pb-2">UI Overlays</h2>
        <div className="flex flex-col items-start">
          <span className="mb-4 text-lg">Locked Node Example</span>
          <div className="bg-retro-green p-12 border-4 border-white pixel-border relative">
            <div className="w-32 h-32 relative mt-4 flex items-center justify-center opacity-40 grayscale">
              <div className="absolute inset-0 rounded-full bg-[#569ceb] opacity-80 shadow-[0_0_20px_#569ceb]"></div>
              <img src={LandmarkProjects} className="w-full h-full relative z-10" style={{ imageRendering: 'pixelated' }} alt="Projects" />
            </div>
            {/* The 16x16 Lock Icon scaled up */}
            <img 
              src={LockIcon} 
              className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-xl" 
              style={{ imageRendering: 'pixelated' }} 
              alt="Locked" 
            />
          </div>
          <p className="mt-4 text-slate-400 text-sm max-w-xs text-center">Shows how the lock overlays a dimmed node.</p>
        </div>
      </div>

    </div>
  );
}
