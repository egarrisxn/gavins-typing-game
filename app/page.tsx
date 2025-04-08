import { quotes } from "@/utils/quotes";
import ThemeToggle from "@/components/theme-toggle";
import TypingTest from "@/components/typing-test";

export default function GamePage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-24 md:px-8 lg:px-24">
   <nav className="fixed top-0 z-10 flex w-full flex-row items-center justify-between text-2xl border-b bg-slate-100 p-4 dark:border-white border-black dark:bg-slate-950">
       <div className="flex flex-row items-center gap-3 "> 
          <p className="text-pink-500 font-black">3T</p>
          <p className="font-light text-black dark:text-white tracking-tighter leading-none hidden sm:flex">Tiny.Type.Test</p>
        </div>
        <ThemeToggle />
      </nav>
      <div className="mx-auto flex w-full max-w-6xl">
        <TypingTest quotes={quotes} />
      </div>
    </main>
  );
}
