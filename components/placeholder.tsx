import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type Props = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement<{ className?: string }>;
};

export default function Placeholder({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-4 self-center">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}
      <h2 className="text-center text-lg">{label}</h2>
      {/* h-10 matches the shadcn Button height */}
      {/* This properly aligns adjacent Placeholder components */}
      {cloneElement(button, {
        className: "h-10",
      })}
    </div>
  );
}
