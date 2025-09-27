"use client";

import { useEffect, useState } from "react";

interface ConfettiAnimationProps {
  show: boolean;
  onComplete: () => void;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  velocity: { x: number; y: number; rotation: number };
}

const CONFETTI_COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", 
  "#DDA0DD", "#FFB347", "#FF69B4", "#20B2AA", "#87CEEB"
];

export default function ConfettiAnimation({ show, onComplete }: ConfettiAnimationProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (show && !isAnimating) {
      createConfetti();
      setIsAnimating(true);
      
      // Stop animation after 3 seconds
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPieces([]);
        onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  const createConfetti = () => {
    const newPieces: ConfettiPiece[] = [];
    
    for (let i = 0; i < 50; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        velocity: {
          x: (Math.random() - 0.5) * 4,
          y: Math.random() * 3 + 2,
          rotation: (Math.random() - 0.5) * 10
        }
      });
    }
    
    setPieces(newPieces);
    animateConfetti(newPieces);
  };

  const animateConfetti = (initialPieces: ConfettiPiece[]) => {
    let currentPieces = [...initialPieces];
    let animationId: number;

    const animate = () => {
      currentPieces = currentPieces.map(piece => ({
        ...piece,
        x: piece.x + piece.velocity.x,
        y: piece.y + piece.velocity.y,
        rotation: piece.rotation + piece.velocity.rotation,
        velocity: {
          ...piece.velocity,
          y: piece.velocity.y + 0.1 // gravity
        }
      })).filter(piece => piece.y < window.innerHeight + 50);

      setPieces([...currentPieces]);

      if (currentPieces.length > 0 && isAnimating) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
  };

  if (!show || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: piece.x,
            top: piece.y,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            boxShadow: `0 0 6px ${piece.color}`,
          }}
        />
      ))}
    </div>
  );
}
