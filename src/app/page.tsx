import { ThemeToggleButton } from "@/components/shared/theme-toggle-button";
import { ClientGreeting } from "@/components/shared/trpc-test";

export default async function Home() {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-between">
      {/* content */}
      <ClientGreeting />
      <ThemeToggleButton />
    </main>
  );
}
