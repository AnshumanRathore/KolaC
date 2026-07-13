"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "./logo";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <header className="navbar">
      <Link href="/dashboard" className="navbar-logo-link">
        <Logo size="sm" />
      </Link>

      <nav className="navbar-links">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              "navbar-link" + (pathname === link.href ? " active" : "")
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button className="navbar-logout" onClick={handleLogout}>
        Log Out
      </button>
    </header>
  );
}
