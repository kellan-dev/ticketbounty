import RedirectToast from "@/components/redirect-toast";
import React from "react";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <RedirectToast />
    </>
  );
}
