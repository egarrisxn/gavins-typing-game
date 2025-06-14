"use client";

import { Button } from "@/components/ui/button";

interface ClearLeaderboardButtonProps {
  onClear: () => void;
}

export function ClearLeaderboardButton({ onClear }: ClearLeaderboardButtonProps) {
  return (
    <Button onClick={onClear} className="text-sm text-red-600 underline" variant="link">
      Clear Leaderboard
    </Button>
  );
}
