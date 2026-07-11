export const CompassSVG = () => (
  <svg viewBox="0 0 800 800" className="w-full h-full text-white/10">
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    {/* Outer Ring */}
    <circle cx="400" cy="400" r="380" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 8" />
    
    {/* Main Axis */}
    <line x1="400" y1="50" x2="400" y2="750" stroke="currentColor" strokeWidth="0.5" />
    <line x1="50" y1="400" x2="750" y2="400" stroke="currentColor" strokeWidth="0.5" />
    
    {/* Complex Compass Rose (The "Star" geometry) */}
    <path 
      d="M400 120 L420 400 L400 680 L380 400 Z" 
      fill="currentColor" 
      className="opacity-20"
    />
    <path 
      d="M120 400 L400 420 L680 400 L400 380 Z" 
      fill="currentColor" 
      className="opacity-20"
    />
    
    {/* Degree Markers */}
    {[...Array(24)].map((_, i) => (
      <line
        key={i}
        x1="400" y1="40" x2="400" y2="60"
        stroke="currentColor"
        strokeWidth="1"
        transform={`rotate(${i * 15} 400 400)`}
      />
    ))}
  </svg>
);