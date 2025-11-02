'use client';

export function FortifyLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield/Fort base */}
      <path
        d="M50 10 L20 25 L20 55 C20 70 35 85 50 90 C65 85 80 70 80 55 L80 25 Z"
        fill="#FF6B35"
        stroke="#C44D2C"
        strokeWidth="2"
      />
      {/* Fort battlements */}
      <rect x="20" y="20" width="8" height="8" fill="#C44D2C" />
      <rect x="36" y="20" width="8" height="8" fill="#C44D2C" />
      <rect x="52" y="20" width="8" height="8" fill="#C44D2C" />
      <rect x="68" y="20" width="8" height="8" fill="#C44D2C" />
      {/* Tiger stripes */}
      <path d="M40 45 L60 45" stroke="#1A1D23" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 55 L65 55" stroke="#1A1D23" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 65 L60 65" stroke="#1A1D23" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
