import { useState, useEffect, useRef, useCallback } from "react";

interface UseTypingGameProps {
  quotes: string[];
}

export function useTypingGame({ quotes }: UseTypingGameProps) {
  const [currentQuote, setCurrentQuote] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [liveWpm, setLiveWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);

  const wpmIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomQuote = useCallback(
    () => quotes[Math.floor(Math.random() * quotes.length)] || "",
    [quotes],
  );

  const initGame = useCallback(() => {
    setCurrentQuote(getRandomQuote());
    setUserInput("");
    setStartTime(null);
    setWpm(0);
    setLiveWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setIsStarted(false);
    setCurrentPosition(0);
    if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    wpmIntervalRef.current = null;
  }, [getRandomQuote]);

  useEffect(() => {
    initGame();
    return () => {
      if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    };
  }, [initGame]);

  const calculateWPM = useCallback(() => {
    if (!startTime || !isStarted) return 0;
    const timeInMinutes = (Date.now() - startTime) / 60000;
    const wordCount = userInput.length / 5;
    return timeInMinutes ? Math.round(wordCount / timeInMinutes) : 0;
  }, [startTime, isStarted, userInput]);

  useEffect(() => {
    if (isStarted && !isFinished) {
      if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
      wpmIntervalRef.current = setInterval(() => {
        setLiveWpm(calculateWPM());
      }, 1000);
      setLiveWpm(calculateWPM());
    } else if (wpmIntervalRef.current) {
      clearInterval(wpmIntervalRef.current);
      wpmIntervalRef.current = null;
    }
    return () => {
      if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    };
  }, [isStarted, isFinished, userInput, calculateWPM]);

  const handleUserInput = useCallback(
    (key: string) => {
      if (isFinished) return;

      if (!isStarted && !startTime) {
        setStartTime(Date.now());
        setIsStarted(true);
      }

      if (key === "Backspace") {
        if (currentPosition > 0) {
          setCurrentPosition((prev) => prev - 1);
          setUserInput((prev) => prev.slice(0, -1));
        }
        return;
      }

      if (currentPosition >= currentQuote.length) return;

      if (key.length === 1) {
        const newUserInput = userInput + key;
        setUserInput(newUserInput);
        setCurrentPosition((prev) => prev + 1);

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
          setIsFinished(true);
          setWpm(calculateWPM());
          if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
        }
      }
    },
    [isFinished, isStarted, startTime, currentPosition, userInput, currentQuote, calculateWPM],
  );

  return {
    currentQuote,
    userInput,
    wpm,
    liveWpm,
    accuracy,
    isFinished,
    isStarted,
    currentPosition,
    handleUserInput,
    resetGame: initGame,
  };
}
