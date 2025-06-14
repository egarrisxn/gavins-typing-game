import { useState, useEffect } from "react";
import { LeaderboardEntry } from "@/types";

const STORAGE_KEY = "typing-leaderboard";

function getLeaderboardFromStorage(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    console.error("Failed to parse leaderboard from localStorage.");
    return [];
  }
}

function saveLeaderboardToStorage(entries: LeaderboardEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Failed to save leaderboard to localStorage:", error);
  }
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLeaderboard(getLeaderboardFromStorage());
    }
  }, []);

  const addEntryToLeaderboard = (newEntry: Omit<LeaderboardEntry, "timestamp">) => {
    const entry: LeaderboardEntry = {
      ...newEntry,
      timestamp: Date.now(),
    };
    const updated = [entry, ...getLeaderboardFromStorage()]
      .sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy || b.timestamp - a.timestamp)
      .slice(0, 10);
    saveLeaderboardToStorage(updated);
    setLeaderboard(updated);
    setSubmitted(true);
  };

  const clearLeaderboard = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      setLeaderboard([]);
    }
  };

  const resetSubmissionStatus = () => {
    setSubmitted(false);
  };

  return {
    leaderboard,
    submitted,
    addEntryToLeaderboard,
    resetSubmissionStatus,
    refreshLeaderboard: () => setLeaderboard(getLeaderboardFromStorage()),
    clearLeaderboard,
  };
}
