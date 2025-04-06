import ThemeToggle from "@/components/theme-toggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-10 flex w-full flex-row items-center justify-between p-4">
      <div className="text-2xl leading-none font-black tracking-tighter">XO Typing</div>
      <ThemeToggle />
    </nav>
  );
}
