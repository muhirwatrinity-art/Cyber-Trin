import React from 'react';

interface UgandaFlagProps {
  className?: string;
}

/**
 * Official Republic of Uganda National Flag (3:2 aspect ratio)
 * Six horizontal stripes: Black, Yellow, Red, Black, Yellow, Red
 * Centered white circular disc bearing the Grey Crowned Crane facing left.
 */
export const UgandaFlag: React.FC<UgandaFlagProps> = ({
  className = 'w-9 h-6',
}) => {
  return (
    <svg
      viewBox="0 0 900 600"
      className={`${className} shrink-0 rounded-[2px] border border-slate-300/60 shadow-2xs`}
      role="img"
      aria-label="Official National Flag of Uganda"
    >
      {/* 6 horizontal stripes: Black, Yellow, Red, Black, Yellow, Red */}
      <rect y="0" width="900" height="100" fill="#000000" />
      <rect y="100" width="900" height="100" fill="#FCDC04" />
      <rect y="200" width="900" height="100" fill="#D90000" />
      <rect y="300" width="900" height="100" fill="#000000" />
      <rect y="400" width="900" height="100" fill="#FCDC04" />
      <rect y="500" width="900" height="100" fill="#D90000" />

      {/* Centered white circular emblem */}
      <circle cx="450" cy="300" r="98" fill="#FFFFFF" />

      {/* Grey Crowned Crane emblem facing hoist (left) */}
      <g transform="translate(450 300)">
        {/* Golden crown fan */}
        <path
          d="M-6-76 L-18-92 M-2-77 L-8-95 M3-77 L2-95 M8-76 L12-92 M12-74 L21-88"
          stroke="#FCDC04"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Head & Neck */}
        <circle cx="-4" cy="-64" r="10" fill="#1F2937" />
        <circle cx="-6" cy="-65" r="2.2" fill="#FFFFFF" />
        {/* White cheek patch & red wattle */}
        <ellipse cx="-2" cy="-61" rx="4" ry="2.8" fill="#FFFFFF" />
        <ellipse cx="-9" cy="-54" rx="3.2" ry="4.5" fill="#D90000" />
        {/* Beak */}
        <polygon points="-13,-65 -26,-62 -13,-60" fill="#374151" />
        {/* Neck curve */}
        <path
          d="M-2-55 C-8-38 -2-18 8-8 L18-12 C10-25 5-42 6-57 Z"
          fill="#6B7280"
        />
        {/* Body */}
        <ellipse cx="18" cy="4" rx="30" ry="18" transform="rotate(-10 18 4)" fill="#6B7280" />
        {/* Wing white & red accent */}
        <path d="M2-4 C16-12 36-8 46,6 C34,14 14,12 2,4 Z" fill="#E5E7EB" />
        <path d="M22,2 C32,2 40,6 45,11 C36,15 26,13 20,8 Z" fill="#D90000" />
        {/* Tail feathers */}
        <polygon points="40,4 58,18 44,18 32,10" fill="#1F2937" />
        {/* Standing leg & raised leg */}
        <path
          d="M14,20 L14,68 M8,68 L22,68"
          stroke="#1F2937"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M4,18 L-14,34 L-4,46"
          fill="none"
          stroke="#1F2937"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
