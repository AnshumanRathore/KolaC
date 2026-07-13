import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/navbar";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName =
    user.user_metadata?.full_name || user.user_metadata?.name || "there";
  const firstName = fullName.split(" ")[0];

  return (
    <div className="app-shell">
      <Navbar />
      <DashboardClient firstName={firstName} />
    </div>
  );
}
