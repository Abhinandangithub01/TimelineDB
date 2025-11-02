'use client';

// Upload Icon - Arrow through fortress gate with tiger claw marks
export function UploadIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fortress gate */}
      <rect x="20" y="40" width="60" height="50" rx="4" fill="currentColor" opacity="0.3" />
      {/* Battlements */}
      <rect x="20" y="35" width="10" height="8" fill="currentColor" />
      <rect x="40" y="35" width="10" height="8" fill="currentColor" />
      <rect x="60" y="35" width="10" height="8" fill="currentColor" />
      {/* Upload arrow */}
      <path
        d="M50 70 L50 20 M35 35 L50 20 L65 35"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Tiger claw marks */}
      <path d="M25 55 L30 60" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M25 65 L30 70" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M70 55 L75 60" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

// Results Icon - Bar chart with tiger stripes
export function ResultsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bar chart bars */}
      <rect x="15" y="50" width="15" height="40" rx="3" fill="currentColor" opacity="0.6" />
      <rect x="40" y="30" width="15" height="60" rx="3" fill="currentColor" opacity="0.8" />
      <rect x="65" y="20" width="15" height="70" rx="3" fill="currentColor" />
      {/* Tiger stripes on tallest bar */}
      <line x1="67" y1="30" x2="78" y2="30" stroke="#1A1D23" strokeWidth="2" opacity="0.3" />
      <line x1="67" y1="45" x2="78" y2="45" stroke="#1A1D23" strokeWidth="2" opacity="0.3" />
      <line x1="67" y1="60" x2="78" y2="60" stroke="#1A1D23" strokeWidth="2" opacity="0.3" />
      <line x1="67" y1="75" x2="78" y2="75" stroke="#1A1D23" strokeWidth="2" opacity="0.3" />
    </svg>
  );
}
