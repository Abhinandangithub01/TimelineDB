export function TimelineDBLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Timeline circles */}
      <circle cx="20" cy="50" r="8" fill="#6366F1" />
      <circle cx="50" cy="50" r="8" fill="#8B5CF6" />
      <circle cx="80" cy="50" r="8" fill="#06B6D4" />
      
      {/* Connecting lines */}
      <line x1="28" y1="50" x2="42" y2="50" stroke="#6366F1" strokeWidth="3" />
      <line x1="58" y1="50" x2="72" y2="50" stroke="#8B5CF6" strokeWidth="3" />
      
      {/* Fork branches */}
      <path
        d="M 50 50 L 50 30 L 65 30"
        stroke="#8B5CF6"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 2"
      />
      <circle cx="65" cy="30" r="5" fill="#8B5CF6" opacity="0.6" />
      
      <path
        d="M 50 50 L 50 70 L 35 70"
        stroke="#8B5CF6"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 2"
      />
      <circle cx="35" cy="70" r="5" fill="#8B5CF6" opacity="0.6" />
      
      {/* Time arrow */}
      <path
        d="M 10 15 L 90 15"
        stroke="#6366F1"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#6366F1" />
        </marker>
      </defs>
    </svg>
  );
}
