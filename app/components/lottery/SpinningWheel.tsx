"use client";

import { useRef } from "react";
import { User } from "@/lib/mock-users";
import { LotteryEngine } from "@/lib/lottery-logic";
import { Button, Avatar, Spinner } from "@whop/react/components";

interface SpinningWheelProps {
  users: User[];
  isSpinning: boolean;
  onSpinComplete: (winner: User) => void;
  winner: User | null;
  lotteryEngine: LotteryEngine;
}

export default function SpinningWheel({ 
  users, 
  isSpinning, 
  onSpinComplete, 
  winner,
  lotteryEngine
}: SpinningWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  
  const handleSpin = () => {
    if (isSpinning || users.length === 0) return;
    
    // Select winner
    const selectedWinner = lotteryEngine.selectWinner();
    if (!selectedWinner) return;
    
    // Calculate rotation angle
    const winnerAngle = lotteryEngine.calculateWinnerAngle(selectedWinner);
    
    // Apply CSS custom property for the final rotation
    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--final-rotation', `${winnerAngle}deg`);
      wheelRef.current.classList.add('spin-wheel');
    }
    
    // Stop spinning after animation completes
    setTimeout(() => {
      onSpinComplete(selectedWinner);
      
      // Remove the spin class to reset for next spin
      if (wheelRef.current) {
        wheelRef.current.classList.remove('spin-wheel');
      }
      
      // Trigger haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }, 3000); // Match CSS animation duration
  };
  
  const displayUsers = lotteryEngine.getWheelUsers();
  
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500 drop-shadow-lg"></div>
        </div>
        
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-80 h-80 rounded-full relative overflow-hidden border-8 border-white shadow-2xl"
          style={{
            background: 'var(--gradient-wheel)'
          }}
        >
          {/* User segments */}
          {displayUsers.map((user, index) => {
            const angle = (index * 36) - 18; // Center each segment
            const radius = 120; // Distance from center
            
            return (
              <div
                key={`${user.id}-${index}`}
                className="absolute flex flex-col items-center"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                  transformOrigin: 'center'
                }}
              >
                <div
                  style={{
                    transform: `rotate(-${angle}deg)` // Counter-rotate to keep text readable
                  }}
                  className="flex flex-col items-center gap-1"
                >
                  <Avatar className="w-8 h-8 border-2 border-white shadow-md">
                    <span className="text-sm">{user.avatar}</span>
                  </Avatar>
                  <span className="text-xs font-semibold text-white drop-shadow-md max-w-16 truncate text-center">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
              </div>
            );
          })}
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center shadow-lg">
            <span className="text-2xl">🎡</span>
          </div>
        </div>
      </div>
      
      {/* Spin Button */}
      <Button
        onClick={handleSpin}
        disabled={isSpinning || users.length === 0}
        size="lg"
        className="lottery-button text-white font-bold py-4 px-8 rounded-full text-lg"
      >
        {isSpinning ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            <span>Spinning...</span>
          </div>
        ) : (
          <span className="flex items-center gap-2">
            <span>🎡</span>
            <span>Spin the Wheel</span>
          </span>
        )}
      </Button>
      
      {users.length === 0 && (
        <p className="text-gray-500 text-center">
          No users available for the lottery
        </p>
      )}
    </div>
  );
}
