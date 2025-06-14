interface GameStatsProps {
  liveWpm: number;
  isStarted: boolean;
  isFinished: boolean;
}

export function GameStats({ liveWpm, isStarted, isFinished }: GameStatsProps) {
  return (
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
  );
}
