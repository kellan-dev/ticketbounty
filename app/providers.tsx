import React from "react";
import ThemeProvider from "@/components/theme/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <NuqsAdapter>
      <ThemeProvider>{children}</ThemeProvider>
    </NuqsAdapter>
  );
}
