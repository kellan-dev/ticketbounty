import Heading from "@/components/heading";
import AccountTabs from "@/app/(protected)/account/_components/account-tabs";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Profile"
        description="Manage your profile"
        tabs={<AccountTabs />}
      />
    </div>
  );
}
