import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HeartProps {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    // Generate random hearts
    const generateHearts = () => {
      const newHearts: HeartProps[] = [];
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 8 + Math.random() * 4,
          size: 20 + Math.random() * 20,
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up opacity-0"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <Heart
            className="text-[#F48FB1] fill-[#F48FB1]"
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              filter: 'drop-shadow(0 0 8px rgba(244, 143, 177, 0.6))',
            }}
          />
        </div>
      ))}
    </div>
  );
}
