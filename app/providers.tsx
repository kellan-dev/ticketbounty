import React from "react";
import ThemeProvider from "@/components/theme/theme-provider";
import AuthProvider from "@/lib/lucia/provider";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
}
