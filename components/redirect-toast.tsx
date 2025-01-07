"use client";

import { deleteCookieByKey, getCookieByKey } from "@/lib/actions/cookies";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function RedirectToast() {
  // Todo: Needed because of template.tsx issues with nested routes
  // https://github.com/vercel/next.js/issues/60032
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      const message = await getCookieByKey("toast");
      if (message) {
        toast.success(message);
        await deleteCookieByKey("toast");
      }
    })();
  }, [pathname]);

  return null;
}
