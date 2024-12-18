import { Button } from "@/components/ui/button";
import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ label }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <LucideLoaderCircle className="h-4 w-4 animate-spin" />}
      {label || "Submit"}
    </Button>
  );
}
