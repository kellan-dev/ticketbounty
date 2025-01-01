import { lucia } from "@/lib/lucia";
import AccountDropdown from "./account-dropdown";

export default async function ProtectedNav() {
  const { user } = await lucia.auth();
  if (!user) return null;

  return <AccountDropdown user={user} />;
}
