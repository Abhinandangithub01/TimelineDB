'use client';

// RAG Testing Icon - Four quadrants with tiger eye
export function RAGIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="#FFE5DB" stroke="#FF6B35" strokeWidth="3" />
      <line x1="50" y1="10" x2="50" y2="90" stroke="#FF6B35" strokeWidth="2" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="#FF6B35" strokeWidth="2" />
      {/* Tiger eye in center */}
      <ellipse cx="50" cy="50" rx="12" ry="18" fill="#FF6B35" />
      <ellipse cx="50" cy="50" rx="6" ry="14" fill="#1A1D23" />
      <ellipse cx="50" cy="45" rx="3" ry="6" fill="#FFFFFF" />
    </svg>
  );
}

// Security Shield Icon - Shield with fort battlements and tiger stripes
export function SecurityIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 10 L20 25 L20 55 C20 70 35 85 50 90 C65 85 80 70 80 55 L80 25 Z"
        fill="#FFE5DB"
        stroke="#FF6B35"
        strokeWidth="3"
      />
      {/* Battlements */}
      <rect x="20" y="20" width="6" height="6" fill="#FF6B35" />
      <rect x="34" y="20" width="6" height="6" fill="#FF6B35" />
      <rect x="48" y="20" width="6" height="6" fill="#FF6B35" />
      <rect x="62" y="20" width="6" height="6" fill="#FF6B35" />
      <rect x="74" y="20" width="6" height="6" fill="#FF6B35" />
      {/* Tiger stripes */}
      <path d="M35 45 L65 45" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 55 L70 55" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 65 L65 65" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// SOC2 Compliance Icon - Checkmark in fortress tower
export function SOC2Icon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tower */}
      <rect x="30" y="20" width="40" height="70" rx="4" fill="#FFE5DB" stroke="#FF6B35" strokeWidth="3" />
      {/* Battlements */}
      <rect x="30" y="15" width="8" height="8" fill="#FF6B35" />
      <rect x="46" y="15" width="8" height="8" fill="#FF6B35" />
      <rect x="62" y="15" width="8" height="8" fill="#FF6B35" />
      {/* Checkmark */}
      <path
        d="M40 50 L47 60 L65 35"
        stroke="#10B981"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// Certifications Icon - Certificate scroll with tiger paw stamp
export function CertIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Scroll */}
      <rect x="20" y="25" width="60" height="50" rx="4" fill="#FFE5DB" stroke="#FF6B35" strokeWidth="3" />
      <circle cx="20" cy="50" r="8" fill="#FFE5DB" stroke="#FF6B35" strokeWidth="2" />
      <circle cx="80" cy="50" r="8" fill="#FFE5DB" stroke="#FF6B35" strokeWidth="2" />
      {/* Text lines */}
      <line x1="30" y1="40" x2="70" y2="40" stroke="#4A5568" strokeWidth="2" />
      <line x1="30" y1="50" x2="70" y2="50" stroke="#4A5568" strokeWidth="2" />
      <line x1="30" y1="60" x2="55" y2="60" stroke="#4A5568" strokeWidth="2" />
      {/* Tiger paw stamp */}
      <circle cx="65" cy="60" r="8" fill="#FF6B35" opacity="0.7" />
      <circle cx="65" cy="55" r="2" fill="#C44D2C" />
      <circle cx="62" cy="58" r="1.5" fill="#C44D2C" />
      <circle cx="68" cy="58" r="1.5" fill="#C44D2C" />
      <circle cx="65" cy="62" r="1.5" fill="#C44D2C" />
    </svg>
  );
}

// Zero-Copy Fork Icon - Flame/Fire with fort elements
export function ForkIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flame shape */}
      <path
        d="M50 20 C45 30, 40 40, 40 55 C40 70, 45 80, 50 85 C55 80, 60 70, 60 55 C60 40, 55 30, 50 20 Z"
        fill="#FF6B35"
      />
      <path
        d="M50 30 C47 37, 45 45, 45 55 C45 65, 47 72, 50 77 C53 72, 55 65, 55 55 C55 45, 53 37, 50 30 Z"
        fill="#FFE5DB"
      />
      {/* Fort elements at base */}
      <rect x="35" y="75" width="8" height="8" fill="#C44D2C" />
      <rect x="48" y="75" width="4" height="8" fill="#C44D2C" />
      <rect x="57" y="75" width="8" height="8" fill="#C44D2C" />
    </svg>
  );
}

// Hybrid Search Icon - Magnifying glass with tiger stripes
export function HybridSearchIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Magnifying glass */}
      <circle cx="40" cy="40" r="25" fill="#FFE5DB" stroke="#FF6B35" strokeWidth="4" />
      <line x1="58" y1="58" x2="80" y2="80" stroke="#FF6B35" strokeWidth="6" strokeLinecap="round" />
      {/* Tiger stripes inside */}
      <path d="M30 35 L50 35" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 42 L52 42" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 49 L50 49" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Tiger MCP Icon - Robot with tiger ears
export function MCPIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Robot head */}
      <rect x="30" y="35" width="40" height="40" rx="8" fill="#FFE5DB" stroke="#FF6B35" strokeWidth="3" />
      {/* Tiger ears */}
      <path d="M30 35 L25 25 L35 30 Z" fill="#FF6B35" />
      <path d="M70 35 L75 25 L65 30 Z" fill="#FF6B35" />
      {/* Eyes */}
      <circle cx="42" cy="50" r="5" fill="#FF6B35" />
      <circle cx="58" cy="50" r="5" fill="#FF6B35" />
      {/* Antenna */}
      <line x1="50" y1="35" x2="50" y2="25" stroke="#FF6B35" strokeWidth="2" />
      <circle cx="50" cy="23" r="3" fill="#FF6B35" />
      {/* Mouth/interface */}
      <rect x="40" y="62" width="20" height="6" rx="2" fill="#FF6B35" />
    </svg>
  );
}

// Fluid Storage Icon - Lightning bolt with fort elements
export function FluidStorageIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lightning bolt */}
      <path
        d="M55 15 L35 50 L48 50 L40 85 L70 45 L55 45 Z"
        fill="#FF6B35"
        stroke="#C44D2C"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Fort base elements */}
      <rect x="25" y="75" width="6" height="6" fill="#C44D2C" />
      <rect x="39" y="75" width="6" height="6" fill="#C44D2C" />
      <rect x="53" y="75" width="6" height="6" fill="#C44D2C" />
      <rect x="67" y="75" width="6" height="6" fill="#C44D2C" />
    </svg>
  );
}

// Number badges for "How It Works"
export function NumberBadge({ number, className = "w-16 h-16" }: { number: number; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fort-shaped badge */}
      <rect x="10" y="20" width="80" height="60" rx="8" fill="#FF6B35" />
      {/* Battlements */}
      <rect x="10" y="15" width="12" height="8" fill="#C44D2C" />
      <rect x="32" y="15" width="12" height="8" fill="#C44D2C" />
      <rect x="54" y="15" width="12" height="8" fill="#C44D2C" />
      <rect x="76" y="15" width="12" height="8" fill="#C44D2C" />
      {/* Number */}
      <text
        x="50"
        y="65"
        fontSize="48"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
      >
        {number}
      </text>
    </svg>
  );
}
