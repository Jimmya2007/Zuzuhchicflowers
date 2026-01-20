interface ZuzuhLogoProps {
  className?: string;
  textColor?: string;
}

export function ZuzuhLogo({ className = "h-16 w-auto", textColor = "white" }: ZuzuhLogoProps) {
  return (
    <svg 
      viewBox="0 0 300 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Z Letter with elegant curves */}
      <path 
        d="M30 25 L100 25 C105 25 105 30 100 35 L50 60 L100 60 C105 60 105 65 100 70 L30 95" 
        stroke={textColor}
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Decorative elements on Z */}
      <path 
        d="M30 25 L35 20 M95 30 L100 25 M30 95 L35 100 M95 90 L100 95" 
        stroke={textColor}
        strokeWidth="4" 
        strokeLinecap="round"
      />
      
      {/* Floral arrangement */}
      {/* Orange/Peach Rose - top right */}
      <g transform="translate(200, 20)">
        <ellipse cx="0" cy="0" rx="12" ry="10" fill="#FFD4B3" opacity="0.9"/>
        <path d="M-6,-2 Q0,-5 6,-2 Q8,0 6,4 Q0,7 -6,4 Q-8,0 -6,-2" fill="#FFB380" opacity="0.85"/>
        <ellipse cx="0" cy="1" rx="5" ry="4" fill="#FFA366" opacity="0.9"/>
        <path d="M-2,-1 Q0,-2 2,-1 Q2,0 2,2 Q0,3 -2,2 Q-2,0 -2,-1" fill="#FF9966"/>
      </g>
      
      {/* Pink Rose - right middle */}
      <g transform="translate(245, 50)">
        <ellipse cx="0" cy="0" rx="11" ry="9" fill="#FFE4ED" opacity="0.9"/>
        <path d="M-5,-2 Q0,-4 5,-2 Q7,0 5,3 Q0,6 -5,3 Q-7,0 -5,-2" fill="#FFB3C1" opacity="0.85"/>
        <ellipse cx="0" cy="0" rx="4" ry="3" fill="#FF93A9" opacity="0.9"/>
        <circle cx="0" cy="0" r="1.5" fill="#FF7799"/>
      </g>
      
      {/* Blue/Grey Rose - bottom center */}
      <g transform="translate(215, 70)">
        <ellipse cx="0" cy="0" rx="10" ry="8" fill="#D4E4F0" opacity="0.9"/>
        <path d="M-5,-1 Q0,-4 5,-1 Q6,0 5,3 Q0,5 -5,3 Q-6,0 -5,-1" fill="#A3C1D9" opacity="0.85"/>
        <ellipse cx="0" cy="0" rx="4" ry="3" fill="#83A1B9" opacity="0.9"/>
        <circle cx="0" cy="0" r="1.5" fill="#6391A9"/>
      </g>
      
      {/* Leaves and stems */}
      <g opacity="0.7">
        <path d="M200,30 Q205,40 210,50" stroke="#7CAF7C" strokeWidth="2" fill="none"/>
        <path d="M245,55 Q235,65 225,75" stroke="#8BC08B" strokeWidth="2" fill="none"/>
        <path d="M215,75 Q218,65 222,55" stroke="#7CAF7C" strokeWidth="1.5" fill="none"/>
        
        {/* Leaf shapes */}
        <ellipse cx="207" cy="43" rx="6" ry="3" fill="#90C090" opacity="0.8" transform="rotate(30 207 43)"/>
        <ellipse cx="232" cy="62" rx="5" ry="2.5" fill="#80B080" opacity="0.8" transform="rotate(-25 232 62)"/>
        <ellipse cx="220" cy="65" rx="5" ry="2.5" fill="#90C090" opacity="0.8" transform="rotate(45 220 65)"/>
        <ellipse cx="240" cy="58" rx="4" ry="2" fill="#7CAF7C" opacity="0.8" transform="rotate(-10 240 58)"/>
      </g>
      
      {/* Text: ZUZUH CHIC */}
      <text x="120" y="105" fontFamily="serif" fontSize="16" fontWeight="300" letterSpacing="2" fill={textColor} opacity="0.95">
        ZUZUH CHIC
      </text>
    </svg>
  );
}
