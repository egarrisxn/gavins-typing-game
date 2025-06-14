import Image from "next/image";
import { quotes } from "@/utils/quotes";
import ThemeToggle from "@/components/theme-toggle";
import TypingTest from "@/components/typing-test";

export default function GamePage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-24 md:px-8 lg:px-24">
      <nav className="fixed top-0 z-10 flex w-full flex-row items-center justify-between border-b border-black bg-slate-100 p-4 dark:border-white dark:bg-slate-950">
        <div className="flex flex-row items-center gap-3">
          {/* <p className="font-black text-pink-500">GTG</p> */}
          <Image src="/face-icon.png" alt="face-icon" height={50} width={50} />
          <p className="hidden leading-none font-light tracking-tighter text-black sm:flex sm:text-base md:text-lg lg:text-xl xl:text-2xl dark:text-white">
            | Gavin&apos;s Typing Game: Thus Spoke Rohan Kishibe Edition
          </p>
        </div>
        <ThemeToggle />
      </nav>
      <div className="mx-auto flex w-full max-w-6xl">
        <TypingTest quotes={quotes} />
      </div>
    </main>
  );
}
