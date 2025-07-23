export interface CapsuleData {
  id: number;
  message: string;
  created_at: string;
  reveal_date: string;
  location?: string;
  privacy: string;
  surprise_mode: boolean;
  isRevealed?: boolean;
  capsuleMedia?: Array<{ id: number; type: string; content: string }>;
  user?: { id: number; name: string; email: string };
  tags?: Array<{ id: number; name: string }>;
}
