"use client";

import { Button, Spinner, Card, Text, Heading } from "@whop/react/components";

interface LotteryControlsProps {
  isSpinning: boolean;
  onSpin: () => void;
  totalUsers: number;
  wheelSlices: number;
}

export default function LotteryControls({ 
  isSpinning, 
  onSpin, 
  totalUsers, 
  wheelSlices 
}: LotteryControlsProps) {
  return (
    <div className="text-center space-y-6">
      {/* Spin Button */}
      <Button
        onClick={onSpin}
        disabled={isSpinning}
        size="lg"
        className="px-12 py-6 text-3xl font-bold rounded-2xl transition-all duration-300 transform shadow-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 hover:scale-110 active:scale-95 text-white shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-95"
      >
        {isSpinning ? (
          <div className="flex items-center gap-3">
            <Spinner size="sm" />
            <span>Spinning...</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-4xl">🎡</span>
            <span>Spin the Wheel</span>
          </div>
        )}
      </Button>
      
      {/* User Count Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 p-4">
        <div className="flex items-center justify-center gap-4 text-sm font-semibold text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-lg">👥</span>
            <Text size="3" weight="semibold">{totalUsers} total users</Text>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <Text size="3" weight="semibold">{wheelSlices} wheel positions</Text>
          </div>
        </div>
        <Text size="1" className="text-gray-600 mt-2">
          All users are included in the draw and distributed evenly across wheel positions
        </Text>
      </Card>
    </div>
  );
}
