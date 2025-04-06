import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <section className="flex flex-auto flex-col items-center justify-center px-4 text-center">
      <div className="flex w-full flex-row items-center justify-center space-x-2 py-6">
        <Loader2 className="text-primary size-8 animate-spin" />
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    </section>
  );
}
