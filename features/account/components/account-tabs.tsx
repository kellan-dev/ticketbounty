"use client";

import { paths } from "@/lib/paths";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountTabs() {
  const pathname = usePathname();
  return (
    <Tabs value={pathname.split("/").at(-1)}>
      <TabsList>
        <TabsTrigger value="profile" asChild>
          <Link href={paths.accountProfile()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger value="password" asChild>
          <Link href={paths.accountPassword()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
