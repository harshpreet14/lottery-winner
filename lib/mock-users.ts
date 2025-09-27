export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

export const MOCK_USERS: User[] = [
  { id: "1", name: "Alice Johnson", username: "alice_j", avatar: "👩‍💼" },
  { id: "2", name: "Bob Smith", username: "bob_smith", avatar: "👨‍💻" },
  { id: "3", name: "Charlie Brown", username: "charlie_b", avatar: "👨‍🎨" },
  { id: "4", name: "Diana Prince", username: "diana_p", avatar: "👩‍🚀" },
  { id: "5", name: "Ethan Hunt", username: "ethan_h", avatar: "👨‍🔬" },
  { id: "6", name: "Fiona Green", username: "fiona_g", avatar: "👩‍🎓" },
  { id: "7", name: "George Wilson", username: "george_w", avatar: "👨‍🏫" },
  { id: "8", name: "Hannah Lee", username: "hannah_l", avatar: "👩‍⚕️" },
  { id: "9", name: "Ivan Petrov", username: "ivan_p", avatar: "👨‍🎭" },
  { id: "10", name: "Julia Roberts", username: "julia_r", avatar: "👩‍💻" },
  { id: "11", name: "Kevin Hart", username: "kevin_h", avatar: "👨‍🍳" },
  { id: "12", name: "Luna Lovegood", username: "luna_l", avatar: "👩‍🔬" },
  { id: "13", name: "Mike Tyson", username: "mike_t", avatar: "👨‍💼" },
  { id: "14", name: "Nina Dobrev", username: "nina_d", avatar: "👩‍🎨" },
  { id: "15", name: "Oscar Wilde", username: "oscar_w", avatar: "👨‍🎓" },
  { id: "16", name: "Penelope Cruz", username: "penelope_c", avatar: "👩‍🚀" },
  { id: "17", name: "Quentin Tarantino", username: "quentin_t", avatar: "👨‍🔬" },
  { id: "18", name: "Rachel Green", username: "rachel_g", avatar: "👩‍⚕️" },
  { id: "19", name: "Steve Jobs", username: "steve_j", avatar: "👨‍💻" },
  { id: "20", name: "Taylor Swift", username: "taylor_s", avatar: "👩‍🎤" },
];
