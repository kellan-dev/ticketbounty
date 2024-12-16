import { LucideLoader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center self-center">
      <LucideLoader2 className="size-8 animate-spin" />
    </div>
  );
}
