import { User } from "./mock-users";

export class LotteryEngine {
  private users: User[];
  private wheelPositions: number = 10;
  
  constructor(users: User[]) {
    this.users = users;
  }
  
  selectWinner(): User {
    // Random selection from all users
    return this.users[Math.floor(Math.random() * this.users.length)];
  }
  
  calculateWinnerAngle(winner: User): number {
    // Find the winner's position in the wheel
    const wheelUsers = this.getWheelUsers();
    const winnerIndex = wheelUsers.findIndex(user => user.id === winner.id);
    
    if (winnerIndex === -1) return 0;
    
    // Calculate the angle for the winner's position
    const baseAngle = winnerIndex * 36; // 36 degrees per position
    const randomOffset = Math.random() * 18 - 9; // Random offset within the slice
    const finalAngle = baseAngle + randomOffset;
    
    // Add multiple rotations for spinning effect
    const rotations = 5 + Math.random() * 5; // 5-10 rotations
    return rotations * 360 + finalAngle;
  }
  
  getWheelUsers(): User[] {
    // Create balanced distribution of users across 10 positions
    if (this.users.length === 0) return [];
    
    const wheelPositions = new Array(10);
    const usersCopy = [...this.users];
    
    // Fill positions starting from 0, then alternating sides for balance
    let currentIndex = 0;
    let fillFromStart = true;
    
    for (let i = 0; i < 10; i++) {
      if (usersCopy.length === 0) break;
      
      if (fillFromStart) {
        wheelPositions[currentIndex] = usersCopy.shift();
        currentIndex++;
      } else {
        wheelPositions[9 - currentIndex + 1] = usersCopy.shift();
      }
      
      // Switch sides when we've used all unique users or at strategic points
      if (usersCopy.length === 0 && this.users.length < 10) {
        usersCopy.push(...this.users); // Refill with duplicates
      }
      
      // Alternate filling pattern for better distribution
      if (i % 2 === 1) fillFromStart = !fillFromStart;
    }
    
    // Fill any remaining empty positions with users
    for (let i = 0; i < 10; i++) {
      if (!wheelPositions[i]) {
        wheelPositions[i] = this.users[i % this.users.length];
      }
    }
    
    return wheelPositions;
  }
  
  getAllUsers(): User[] {
    return this.users;
  }
  
  getTotalUsers(): number {
    return this.users.length;
  }
  
  getWheelPositions(): number {
    return this.wheelPositions;
  }
}

// Improved wheel colors - more balanced and visually appealing
export const WHEEL_COLORS = [
  "#FF6B6B", // Coral Red
  "#4ECDC4", // Turquoise
  "#45B7D1", // Sky Blue
  "#96CEB4", // Mint Green
  "#FFEAA7", // Soft Yellow
  "#DDA0DD", // Lavender
  "#FFB347", // Peach
  "#FF69B4", // Hot Pink
  "#20B2AA", // Light Sea Green
  "#87CEEB", // Light Sky Blue
  "#F0E68C", // Khaki
  "#FFA07A", // Light Salmon
];
