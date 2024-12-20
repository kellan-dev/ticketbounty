import CardCompact from "@/components/card-compact";
import SignUpForm from "@/features/auth/components/sign-up-form";
import { paths } from "@/lib/paths";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        className="w-full max-w-[420px] animate-fade-in-from-top"
        title="Sign Up"
        description="Create a new account to get started"
        content={<SignUpForm />}
        footer={
          <Link
            href={paths.signIn()}
            className="text-sm text-muted-foreground hover:underline"
          >
            Already have an account? Log in here!
          </Link>
        }
      />
    </div>
  );
}
