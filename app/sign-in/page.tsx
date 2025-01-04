import CardCompact from "@/components/card-compact";
import SignInForm from "@/features/auth/components/sign-in-form";
import { paths } from "@/lib/paths";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        className="w-full max-w-md animate-fade-in-from-top"
        title="Sign In"
        description="Sign in to your account"
        content={<SignInForm />}
        footer={
          <div className="flex w-full justify-between">
            <Link
              href={paths.signUp()}
              className="text-sm text-muted-foreground hover:underline"
            >
              Create a new account
            </Link>
            <Link
              href={paths.forgotPassword()}
              className="text-sm text-muted-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        }
      />
    </div>
  );
}
