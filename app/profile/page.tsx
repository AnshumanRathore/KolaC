import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/navbar";
import LogoutButton from "./logout-button";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const name =
    user.user_metadata?.full_name || user.user_metadata?.name || "Member";
  const avatarUrl = user.user_metadata?.avatar_url;
  const initial = name.charAt(0).toUpperCase();
  const provider = user.app_metadata?.provider || "email";
  const shortId = user.id.slice(0, 8).toUpperCase();

  return (
    <div className="app-shell">
      <Navbar />
      <main className="auth-page auth-page--in-shell">
      <div className="badge-card">
        <div className="badge-eyebrow mono">
          <span className="status-dot" />
          Active Session
        </div>

        <div className="profile-photo-wrap">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={name} className="profile-photo" />
          ) : (
            <div className="profile-photo-fallback">{initial}</div>
          )}
        </div>

        <h1 className="profile-name">{name}</h1>
        <div className="profile-status mono">
          <span className="status-dot" />
          Access Granted
        </div>

        <div className="profile-fields">
          <div className="profile-field-row">
            <span className="profile-field-label">Email</span>
            <span className="profile-field-value">{user.email}</span>
          </div>
          <div className="profile-field-row">
            <span className="profile-field-label">Badge ID</span>
            <span className="profile-field-value mono">{shortId}</span>
          </div>
          <div className="profile-field-row">
            <span className="profile-field-label">Issued via</span>
            <span className="profile-field-value" style={{ textTransform: "capitalize" }}>
              {provider}
            </span>
          </div>
          <div className="profile-field-row">
            <span className="profile-field-label">Member since</span>
            <span className="profile-field-value">
              {new Date(user.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <LogoutButton />

        <div className="barcode">
          <div className="barcode-bars" />
          <div className="barcode-serial mono">NO. 003-{shortId}</div>
        </div>
      </div>
      </main>
    </div>
  );
}
