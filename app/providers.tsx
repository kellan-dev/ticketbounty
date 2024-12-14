import React from "react";
import ThemeProvider from "@/components/theme/theme-provider";

export default function Providers({ children }: React.PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
