"use client";

import { useEffect, useState } from "react";
import { auth, AuthResult } from "@/lib/auth";
import { usePathname } from "next/navigation";

export default function useAuth() {
  const [authState, setAuthState] = useState<AuthResult | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      const result = await auth();
      setAuthState(result);
    })();
  }, [pathname]);

  return authState;
}
