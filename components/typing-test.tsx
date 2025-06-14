"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type LeaderboardEntry = {
  name: string;
  wpm: number;
  accuracy: number;
  timestamp: number;
};

const STORAGE_KEY = "typing-leaderboard";

function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLeaderboard(entries: LeaderboardEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function Typing({ quotes }: { quotes: string[] }) {
  const [currentQuote, setCurrentQuote] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  // const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [liveWpm, setLiveWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [cursorStyle, setCursorStyle] = useState({ left: 0, top: 0, height: 0 });
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const wpmIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setLeaderboard(getLeaderboard());
    }
  }, []);

  useEffect(() => {
    if (textContainerRef.current) {
      const textContainer = textContainerRef.current;
      const chars = textContainer.querySelectorAll("span[data-char]");
      if (chars.length > 0 && currentPosition < chars.length) {
        const currentChar = chars[currentPosition];
        const rect = currentChar.getBoundingClientRect();
        const containerRect = textContainer.getBoundingClientRect();
        setCursorStyle({
          left: rect.left - containerRect.left,
          top: rect.top - containerRect.top,
          height: rect.height,
        });
      }
    }
  }, [currentPosition, currentQuote, userInput]);

  const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)] || "";

  const initGame = () => {
    setCurrentQuote(getRandomQuote());
    setUserInput("");
    setStartTime(null);
    setWpm(0);
    setLiveWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setIsStarted(false);
    setCurrentPosition(0);
    setCursorStyle({ left: 0, top: 0, height: 0 });
    setName("");
    setSubmitted(false);
    if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
  };

  useEffect(() => {
    initGame();
    return () => {
      if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    };
  }, []);

  const calculateWPM = () => {
    if (!startTime || !isStarted) return 0;
    const timeInMinutes = (Date.now() - startTime) / 60000;
    const wordCount = userInput.length / 5;
    return timeInMinutes ? Math.round(wordCount / timeInMinutes) : 0;
  };

  useEffect(() => {
    if (isStarted && !isFinished) {
      if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
      wpmIntervalRef.current = setInterval(() => setLiveWpm(calculateWPM()), 1000);
      setLiveWpm(calculateWPM());
    }
    return () => {
      if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    };
  }, [isStarted, isFinished, userInput]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (["Shift", "Control", "Alt", "Meta", "Tab", "CapsLock", "Escape"].includes(e.key)) return;
    if (e.key !== "Backspace") e.preventDefault();

    if (!isStarted && !startTime) {
      setStartTime(Date.now());
      setIsStarted(true);
    }

    if (e.key === "Backspace" && currentPosition > 0) {
      e.preventDefault();
      setCurrentPosition((prev) => prev - 1);
      setUserInput((prev) => prev.slice(0, -1));
      return;
    }

    if (currentPosition >= currentQuote.length) return;

    if (e.key.length === 1) {
      const newUserInput = userInput + e.key;
      setUserInput(newUserInput);
      setCurrentPosition(currentPosition + 1);

      let correctChars = 0;
      for (let i = 0; i < newUserInput.length; i++) {
        if (i < currentQuote.length && newUserInput[i] === currentQuote[i]) {
          correctChars++;
        }
      }
      const acc =
        newUserInput.length > 0 ? Math.floor((correctChars / newUserInput.length) * 100) : 100;
      setAccuracy(acc);

      if (newUserInput === currentQuote || currentPosition + 1 >= currentQuote.length) {
        // setEndTime(Date.now());
        setIsFinished(true);
        setWpm(calculateWPM());
        if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
      }
    }
  };

  const resetGame = () => {
    initGame();
    setLeaderboard(getLeaderboard());
  };

  const handleSubmitScore = () => {
    const entry: LeaderboardEntry = {
      name: name || "Anonymous",
      wpm,
      accuracy,
      timestamp: Date.now(),
    };
    const updated = [entry, ...getLeaderboard()].slice(0, 10);
    saveLeaderboard(updated);
    setLeaderboard(updated);
    setSubmitted(true);
  };

  if (!mounted) return null;

  if (isFinished) {
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
            {leaderboard.length > 0 && (
              <div className="w-full max-w-xs">
                <ul className="space-y-1">
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
                </ul>
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
                <Button onClick={handleSubmitScore} className="w-full tracking-wide uppercase">
                  Submit Score
                </Button>
              </div>
            ) : (
              <div className="mt-2 text-sm text-green-600">Score submitted!</div>
            )}
          </div>
        </div>
        <div className="mt-16 flex w-full flex-col items-center justify-center">
          <Button onClick={resetGame} className="tracking-wider uppercase">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-3 px-4 py-8">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="max-h-80 w-full max-w-3xl overflow-y-auto focus:outline-none"
      >
        <div ref={textContainerRef} className="relative text-lg leading-relaxed md:text-xl">
          <span
            className={cn(
              "absolute w-0.5 bg-blue-400 will-change-transform",
              isStarted ? "" : "animate-cursor",
            )}
            style={{
              left: `${cursorStyle.left}px`,
              top: `${cursorStyle.top}px`,
              height: `${cursorStyle.height}px`,
              transition: "all 30ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
            }}
          />
          {currentQuote.split("").map((char, index) => {
            let style = "opacity-40";
            if (index < userInput.length) {
              style = userInput[index] === char ? "opacity-100" : "text-red-500 opacity-100";
            }
            return (
              <span key={index} data-char={char} className={style}>
                {char}
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex h-6 items-center gap-2">
        {isStarted && !isFinished ? (
          <>
            <span className="font-medium">{liveWpm}</span>
            <span className="text-xs tracking-wider uppercase">wpm</span>
          </>
        ) : (
          <span className="text-xs tracking-wider uppercase">
            {!isStarted ? "Click and start typing" : ""}
          </span>
        )}
      </div>

      <Button onClick={resetGame} className="mt-2 text-xs tracking-wider uppercase">
        Reset
      </Button>
    </div>
  );
}
