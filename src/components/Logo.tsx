import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function LogoIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 540 280"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Sun Gradient */}
        <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="100%" stopColor="#FFAE19" />
        </linearGradient>
        {/* Sky/Clouds Gradient */}
        <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2F4FA" />
        </linearGradient>
        {/* Rainbow Gradients */}
        <linearGradient id="rainRed" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFA18D" />
          <stop offset="100%" stopColor="#F66B54" />
        </linearGradient>
        <linearGradient id="rainOrange" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFCE85" />
          <stop offset="100%" stopColor="#FCB235" />
        </linearGradient>
        <linearGradient id="rainYellow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF4B3" />
          <stop offset="100%" stopColor="#FEE76D" />
        </linearGradient>
        <linearGradient id="rainGreen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#BFF3DA" />
          <stop offset="100%" stopColor="#80D0AD" />
        </linearGradient>
        {/* House Gradient */}
        <linearGradient id="houseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BCE3F1" />
          <stop offset="100%" stopColor="#88D1E6" />
        </linearGradient>
        <linearGradient id="houseRoof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFA58F" />
          <stop offset="100%" stopColor="#EE6E51" />
        </linearGradient>
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4F3D3" />
          <stop offset="100%" stopColor="#A8E4A7" />
        </linearGradient>
        {/* Filter for sticker drop-shadow */}
        <filter id="gentleShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#F66B54" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* BACKGROUND FLOATING ACCENT CIRCLES & STARS (Whimsical Watercolor look) */}
      <circle cx="45" cy="45" r="9" fill="#FFC9C3" opacity="0.8" />
      <circle cx="120" cy="35" r="6" fill="#CBEFD8" opacity="0.8" />
      <circle cx="35" cy="110" r="7" fill="#FEE998" opacity="0.8" />
      <circle cx="85" cy="100" r="5" fill="#E4EFF2" opacity="0.9" />
      <circle cx="500" cy="180" r="8" fill="#FFEAA5" opacity="0.7" />
      <circle cx="480" cy="220" r="5" fill="#FBC533" opacity="0.6" />

      {/* Four point sparkles */}
      <g fill="#FFAF10" opacity="0.8">
        <path d="M 50 155 Q 50 160 55 160 Q 50 160 50 165 Q 50 160 45 160 Q 50 160 50 155 Z" />
        <path d="M 148 102 Q 148 105 151 105 Q 148 105 148 108 Q 148 105 145 105 Q 148 105 148 102 Z" />
        <path d="M 235 150 Q 235 154 239 154 Q 235 154 235 158 Q 235 154 231 154 Q 235 154 235 150 Z" />
      </g>

      {/* STICKER BACKGROUND PANEL (Very faint soft cloud boundary base to ground the watercolor arts) */}
      <path
        d="M 60 210 C 40 180, 50 120, 100 110 C 120 70, 240 60, 310 80 C 370 70, 480 80, 500 130 C 510 170, 480 230, 430 240 C 350 250, 150 250, 60 210 Z"
        fill="#FFFFFF"
        opacity="0.5"
      />

      {/* RAINBOW ARC (Curving beautifully from house left to sun right) */}
      <g strokeLinecap="round" opacity="0.9">
        {/* Red Arch */}
        <path
          d="M 160 210 A 130 130 0 0 1 400 210"
          stroke="url(#rainRed)"
          strokeWidth="11.5"
          fill="none"
        />
        {/* Orange Arch */}
        <path
          d="M 173 210 A 117 117 0 0 1 387 210"
          stroke="url(#rainOrange)"
          strokeWidth="11.5"
          fill="none"
        />
        {/* Yellow Arch */}
        <path
          d="M 186 210 A 104 104 0 0 1 374 210"
          stroke="url(#rainYellow)"
          strokeWidth="11.5"
          fill="none"
        />
        {/* Green Arch */}
        <path
          d="M 199 210 A 91 91 0 0 1 361 210"
          stroke="url(#rainGreen)"
          strokeWidth="11.5"
          fill="none"
        />
      </g>

      {/* CLOUDS FOR SUN PILLOW (Soft organic layers) */}
      <path d="M 330 210 C 330 195, 350 185, 365 185 C 375 170, 400 170, 410 180 C 425 175, 440 185, 440 200 C 450 205, 450 220, 435 225 L 330 225 Z" fill="url(#cloudGrad)" opacity="0.9" />

      {/* THE HAPPY SMILING SUN */}
      <g id="Sun">
        {/* Radiating Sun Rays */}
        <g stroke="#FFAE19" strokeWidth="4.5" strokeLinecap="round">
          <line x1="400" y1="112" x2="400" y2="100" />
          <line x1="434" y1="126" x2="444" y2="116" />
          <line x1="448" y1="160" x2="460" y2="160" />
          <line x1="434" y1="194" x2="444" y2="204" />
          <line x1="400" y1="208" x2="400" y2="220" />
          <line x1="366" y1="194" x2="356" y2="204" />
          <line x1="352" y1="160" x2="340" y2="160" />
          <line x1="366" y1="126" x2="356" y2="116" />
        </g>

        {/* Sun Circle */}
        <circle cx="400" cy="160" r="34" fill="url(#sunGrad)" />

        {/* Closed happy eyes */}
        <path d="M 386 156 Q 390 151 394 156" stroke="#4A3B2C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 406 156 Q 410 151 414 156" stroke="#4A3B2C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        
        {/* Soft, blushing rose cheeks */}
        <circle cx="382" cy="164" r="4.5" fill="#FF8D85" opacity="0.7" />
        <circle cx="418" cy="164" r="4.5" fill="#FF8D85" opacity="0.7" />
        
        {/* Open happy smile mouth */}
        <path d="M 394 167 C 394 174, 406 174, 406 167" stroke="#4A3B2C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>

      {/* HOUSE GROUND/HILL */}
      <path
        d="M 90 225 C 110 215, 170 215, 190 225 C 195 228, 195 235, 190 238 C 170 242, 110 242, 90 238 C 85 235, 85 228, 90 225 Z"
        fill="url(#groundGrad)"
      />

      {/* THE CUTE PLAYHOUSE */}
      <g id="Playhouse">
        {/* Base Walls (soft light blue) */}
        <path
          d="M 115 175 L 115 225 Q 115 228, 118 228 L 167 228 Q 170 228, 170 225 L 170 175 Z"
          fill="url(#houseGrad)"
        />

        {/* Roof Base */}
        <path
          d="M 108 178 L 142 143 Q 143 142, 144 143 L 178 178 Q 180 180, 177 180 L 110 180 Q 107 180, 108 178 Z"
          fill="url(#houseRoof)"
        />
        
        {/* Roof outer thick dark brown board line */}
        <path
          d="M 106 182 C 106 182, 142 140, 143 140 C 144 140, 180 182, 180 182"
          stroke="#5D4336"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Chimney structure with dark brown color */}
        <rect x="158" y="146" width="9" height="18" fill="#5D4336" rx="1" />
        <rect x="156" y="144" width="13" height="3" fill="#4B352A" rx="0.5" />
        
        {/* Heart floating over chimney */}
        <path
          d="M 162.5 136 C 161 134, 159.5 131.5, 161.5 129.5 C 162.5 128.5, 163.5 130, 163.5 130 C 163.5 130, 164.5 128.5, 165.5 129.5 C 167.5 131.5, 166 134, 164.5 136 L 163.5 137 Z"
          fill="#F66B54"
        />

        {/* Arched Orange Doorway */}
        <path
          d="M 144 228 L 144 206 C 144 200, 158 200, 158 206 L 158 228 Z"
          fill="#F66B54"
        />
        
        {/* Grid window on the main wall */}
        <rect x="123" y="193" width="14" height="14" rx="2.5" fill="#FFF8CD" stroke="#5D4336" strokeWidth="1.5" />
        <line x1="130" y1="193" x2="130" y2="207" stroke="#5D4336" strokeWidth="1.2" />
        <line x1="123" y1="200" x2="137" y2="200" stroke="#5D4336" strokeWidth="1.2" />

        {/* Attic Window on front gable */}
        <rect x="136" y="160" width="13" height="13" rx="2.5" fill="#FFF8CD" stroke="#5D4336" strokeWidth="1.5" />
        <line x1="142.5" y1="160" x2="142.5" y2="173" stroke="#5D4336" strokeWidth="1.2" />
        <line x1="136" y1="166.5" x2="149" y2="166.5" stroke="#5D4336" strokeWidth="1.2" />

        {/* White heart above door */}
        <path
          d="M 151 184 C 150 182.5, 149 181, 150 179.5 C 150.5 178.5, 151.2 179.5, 151.2 179.5 C 151.2 179.5, 151.0 178.5, 152.0 179.5 C 153.0 181, 152.4 182.5, 151.4 184 Z"
          fill="#FFFFFF"
        />
      </g>

      {/* CLOUDS PILLOW FOREGROUNDS (gives an organic overlapping effect) */}
      <path d="M 80 230 C 80 220, 95 210, 110 210 C 120 195, 145 195, 155 210 C 165 205, 180 210, 180 225 C 190 230, 190 245, 175 250 L 80 250 Z" fill="url(#cloudGrad)" opacity="0.95" />
      <path d="M 360 215 C 360 205, 375 195, 390 195 C 400 180, 425 180, 435 190 C 445 185, 460 190, 460 205 C 470 210, 470 225, 455 230 L 360 230 Z" fill="url(#cloudGrad)" opacity="0.95" />
    </svg>
  );
}

export function LogoFull({ className = "max-w-md w-full h-auto" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* 1. Brand Icon (Our custom new vector illustration sticker!) */}
      <LogoIcon className="w-56 h-36 md:w-64 md:h-44 filter drop-shadow-[0_4px_16px_rgba(246,107,84,0.06)] animate-float-slow" />
      
      {/* 2. Brand Main Text side by side precisely as on logo */}
      <h2 
        className="text-[40px] md:text-[54px] tracking-tight leading-none mt-5 font-bold flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1" 
        style={{ fontFamily: "'Fredoka', sans-serif" }}
      >
        <span className="text-[#EB5A3C]">PeekaBoo</span>
        <span className="text-[#1CA1BF]">Corner</span>
      </h2>
      
      {/* 3. Secondary Text (Saskatchewan Provider details) in clean serif typography */}
      <p 
        className="text-lg md:text-2xl font-medium text-slate-800 tracking-wide mt-3" 
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Regina Childcare Inc.
      </p>

      {/* 4. Thin decorative line with tiny solid heart centered */}
      <div className="flex items-center justify-center gap-4 w-72 my-4">
        <div className="h-[1.5px] bg-[#EB5A3C]/40 flex-1"></div>
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#EB5A3C]" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <div className="h-[1.5px] bg-[#EB5A3C]/40 flex-1"></div>
      </div>

      {/* 5. Custom handwritten calligraphy tagline stacked beautifully with right inline-heart */}
      <div className="flex flex-col items-center leading-none mt-1 select-none">
        <span className="text-[34px] md:text-[42px] text-[#EB5A3C] font-medium" style={{ fontFamily: "'Caveat', cursive" }}>
          Where Little Ones
        </span>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-[34px] md:text-[42px] text-[#1CA1BF] font-medium" style={{ fontFamily: "'Caveat', cursive" }}>
            Grow & Thrive
          </span>
          {/* Outlined heart in calligraphy style */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[#EB5A3C] fill-none stroke-[2.5] align-bottom self-end -mb-0.5" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Logo({ className, showText = true }: LogoProps) {
  if (showText) {
    return <LogoFull className={className} />;
  }
  return <LogoIcon className={className} />;
}
