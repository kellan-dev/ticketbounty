"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthState } from "./auth-core";
import { usePathname, useSearchParams } from "next/navigation";
import { authAction } from "./auth-action";

const AuthContext = createContext<AuthState | null>(null);

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const refresh = async () => {
    const auth = await authAction();
    setAuthState(auth);
  };

  useEffect(() => {
    refresh();
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
