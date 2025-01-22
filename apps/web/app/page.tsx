import DarkModeToggle from "@/components/atoms/dark-mode-toggle";
import { Button } from "@repo/ui/components/ui/button";

export default function Home() {
  return (
    <div>
      <DarkModeToggle />
      <Button>123</Button>
      <p className="text-foreground">Text</p>
    </div>
  );
}
