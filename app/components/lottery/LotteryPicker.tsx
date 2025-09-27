"use client";

import { useState, useEffect } from "react";
import { User } from "@/lib/mock-users";
import { LotteryEngine } from "@/lib/lottery-logic";
import { Card, Heading, Text, Avatar, Badge } from "@whop/react/components";
import SpinningWheel from "./SpinningWheel";
import ConfettiAnimation from "./ConfettiAnimation";
import WinnerOverlay from "./WinnerOverlay";
import LotteryControls from "./LotteryControls";

export default function LotteryPicker() {
  const [lotteryEngine] = useState(() => {
    const { MOCK_USERS } = require("@/lib/mock-users");
    return new LotteryEngine(MOCK_USERS);
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<User | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWinnerOverlay, setShowWinnerOverlay] = useState(false);

  const totalUsers = lotteryEngine.getTotalUsers();
  const wheelPositions = lotteryEngine.getWheelPositions();

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    setShowConfetti(false);
    setShowWinnerOverlay(false);
  };

  const handleSpinComplete = (selectedWinner: User) => {
    setWinner(selectedWinner);
    setIsSpinning(false);
    setShowConfetti(true);
    
    // Show winner overlay after confetti starts
    setTimeout(() => {
      setShowWinnerOverlay(true);
    }, 500);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  const handleCloseWinner = () => {
    setShowWinnerOverlay(false);
    setWinner(null);
  };

  const handlePlayAgain = () => {
    setShowWinnerOverlay(false);
    setWinner(null);
    // Ready for next spin
  };

  return (
    <div className="space-y-12">
      {/* Lottery Controls */}
      <div className="flex justify-center">
        <Card className="p-8">
          <LotteryControls
            isSpinning={isSpinning}
            onSpin={handleSpin}
            totalUsers={totalUsers}
            wheelSlices={wheelPositions}
          />
        </Card>
      </div>

      {/* Spinning Wheel */}
      <div className="flex justify-center">
        <Card className="p-8">
          <SpinningWheel
            users={lotteryEngine.getAllUsers()}
            isSpinning={isSpinning}
            onSpinComplete={handleSpinComplete}
            winner={winner}
            lotteryEngine={lotteryEngine}
          />
        </Card>
      </div>

      {/* User List Preview */}
      <Card className="p-8">
        <Heading size="6" className="text-center mb-6">
          🎯 All Participants ({totalUsers} total)
        </Heading>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {lotteryEngine.getAllUsers().map((user, index) => (
            <Card
              key={user.id}
              className={`
                flex items-center space-x-3 p-4 transition-all duration-300 hover:scale-105
                ${winner && winner.id === user.id
                  ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-xl scale-110'
                  : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-50'
                }
              `}
            >
              <Avatar className="text-2xl">
                <span>{user.avatar}</span>
              </Avatar>
              <div className="flex-1 min-w-0">
                <Text size="3" weight="semibold" className="text-gray-800 truncate">
                  {user.name}
                </Text>
                <Text size="1" className="text-gray-500 truncate">
                  @{user.username}
                </Text>
              </div>
              {winner && winner.id === user.id && (
                <Badge className="text-lg">👑</Badge>
              )}
            </Card>
          ))}
        </div>
        <Card className="mt-6 p-4 bg-blue-50">
          <Text size="3" className="text-blue-700 text-center">
            💡 All {totalUsers} users are included in the draw and distributed across {wheelPositions} wheel positions for a balanced appearance!
          </Text>
        </Card>
      </Card>

      {/* Confetti Animation */}
      <ConfettiAnimation
        show={showConfetti}
        onComplete={handleConfettiComplete}
      />

      {/* Winner Overlay */}
      <WinnerOverlay
        winner={winner}
        show={showWinnerOverlay}
        onClose={handleCloseWinner}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );
}
