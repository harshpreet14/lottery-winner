"use client";

import { User } from "@/lib/mock-users";
import { Card, Heading, Text, Button, Avatar, Badge } from "@whop/react/components";

interface WinnerOverlayProps {
  winner: User | null;
  show: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
}

export default function WinnerOverlay({ winner, show, onClose, onPlayAgain }: WinnerOverlayProps) {
  if (!show || !winner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="p-8 max-w-md w-full text-center shadow-2xl animate-bounce">
        {/* Confetti Emoji */}
        <div className="text-6xl mb-4">🎉</div>
        
        {/* Winner Message */}
        <Heading size="7" className="text-gray-800 mb-2">
          {winner.name} Wins!
        </Heading>
        
        {/* Winner Details */}
        <div className="flex items-center justify-center mb-6">
          <Avatar className="text-4xl mr-3">
            <span>{winner.avatar}</span>
          </Avatar>
          <div>
            <Text size="4" weight="semibold" className="text-gray-700">@{winner.username}</Text>
            <Text size="3" className="text-gray-500">Congratulations! 🎊</Text>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🎡 Spin Again
          </Button>
          <Button
            onClick={onClose}
            variant="secondary"
            className="bg-gray-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Close
          </Button>
        </div>
      </Card>
    </div>
  );
}
