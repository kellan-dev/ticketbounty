import React from "react";
import ThemeProvider from "@/components/theme/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ReactQueryProvider from "./react-query/react-query-provider";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <NuqsAdapter>
      <ReactQueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ReactQueryProvider>
    </NuqsAdapter>
  );
}
