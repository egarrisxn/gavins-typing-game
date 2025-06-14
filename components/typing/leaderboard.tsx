"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClearLeaderboardButton } from "./clear-leaderboard";
import { LeaderboardEntry } from "@/types";

interface LeaderboardProps {
  wpm: number;
  accuracy: number;
  leaderboard: LeaderboardEntry[];
  submitted: boolean;
  onSubmitScore: (name: string) => void;
  onResetGame: () => void;
  onClearLeaderboard: () => void;
}

export function Leaderboard({
  wpm,
  accuracy,
  leaderboard,
  submitted,
  onSubmitScore,
  onResetGame,
  onClearLeaderboard,
}: LeaderboardProps) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onSubmitScore(name);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-center text-lg font-semibold">“Good game, kid.”</h1>
          <Image src="/book-icon.png" alt="book" width={180} height={180} />
          <div>
            <div className="text-lg font-semibold">Game Stats:</div>
            <div className="text-muted-foreground mt-2 text-xl">wpm</div>
            <div className="text-6xl font-bold">{wpm}</div>
            <div className="text-muted-foreground mt-4 text-xl">accuracy</div>
            <div className="text-6xl font-bold">{accuracy}%</div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-6 text-center md:mt-0">
          <h3 className="text-center text-lg font-semibold">🏆 Leaderboard</h3>
          <hr className="mx-auto h-1 w-3/4" />
          {leaderboard.length > 0 && (
            <div className="w-full max-w-xs">
              <ol className="space-y-1">
                {leaderboard.map((entry, i) => (
                  <li
                    key={i}
                    className="bg-background/40 flex justify-between rounded border p-2 text-sm"
                  >
                    <span className="max-w-40 truncate font-medium">{entry.name}</span>
                    <span>
                      {entry.wpm} wpm · {entry.accuracy}%
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {!submitted ? (
            <div className="w-full max-w-72 space-y-2">
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center"
              />
              <Button onClick={handleSubmit} className="w-full tracking-wide uppercase">
                Submit Score
              </Button>
            </div>
          ) : (
            <div className="mt-2 text-sm text-green-600">Score submitted!</div>
          )}
          {leaderboard.length > 0 && (
            <div className="mt-4">
              <ClearLeaderboardButton onClear={onClearLeaderboard} />
            </div>
          )}
        </div>
      </div>
      <div className="mt-16 flex w-full flex-col items-center justify-center">
        <Button onClick={onResetGame} className="tracking-wider uppercase">
          Try Again
        </Button>
      </div>
    </div>
  );
}
