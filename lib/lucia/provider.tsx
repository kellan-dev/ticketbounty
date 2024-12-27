"use client";

import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AuthState } from "./core";
import { authAction } from "./action";

const AuthContext = createContext<AuthState | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <AuthProviderContent>{children}</AuthProviderContent>
    </Suspense>
  );
}

function AuthProviderContent({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      const auth = await authAction();
      setAuthState(auth);
    })();
  }, [pathname, searchParams]);

  return <AuthContext value={authState}>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
