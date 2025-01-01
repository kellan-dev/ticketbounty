"use client";

import { AuthState } from "@/lib/lucia/core";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth } from "./actions";

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [isFetched, setIsFetched] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      const authState = await getAuth();
      setAuthState(authState);
      setIsFetched(true);
    })();
  }, [pathname]);

  return { auth: authState, isFetched };
}
