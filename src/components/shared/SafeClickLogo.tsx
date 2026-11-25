import React from 'react';

interface SafeClickLogoProps {
  compact?: boolean;
}

export const SafeClickLogo: React.FC<SafeClickLogoProps> = ({
  compact = false,
}) => {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <svg
        viewBox="0 0 44 44"
        className="w-9 h-9 shrink-0"
        role="img"
        aria-label="SafeClick UG Shield Logo"
      >
        <path
          d="M22 3L6 9.5v11.8c0 10.2 6.8 19.2 16 21.7 9.2-2.5 16-11.5 16-21.7V9.5L22 3z"
          fill="#0B3B8C"
          stroke="#0A0A0A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M14 21.5l5 5 10-10.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27.5 25.5l10 3.8-3.8 2.1 4.1 4.1-2.3 2.3-4.1-4.1-2.1 3.8-1.8-12z"
          fill="#EA580C"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      {!compact && (
        <span className="text-lg font-bold tracking-tight text-[#0A0A0A] whitespace-nowrap shrink-0">
          SafeClick <span className="text-[#0B3B8C]">UG</span>
        </span>
      )}
    </div>
  );
};
