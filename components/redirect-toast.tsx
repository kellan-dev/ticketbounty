"use client";

import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";
import { useEffect } from "react";
import { toast } from "sonner";

export default function RedirectToast() {
  useEffect(() => {
    (async () => {
      const message = await getCookieByKey("toast");
      if (message) {
        toast.success(message);
        await deleteCookieByKey("toast");
      }
    })();
  }, []);
  return null;
}
