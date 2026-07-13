"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/logo";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"
      />
    </svg>
  );
}

export default function SignupPage() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  }

  async function handleGoogleSignup() {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  }

  if (success) {
    return (
      <main className="auth-page">
        <div className="badge-card">
          <div className="dash-card-logo">
            <Logo size="md" />
          </div>
          <div className="badge-eyebrow mono">
            <span className="status-dot" />
            Badge Pending
          </div>
          <h1 className="badge-title">Check your email</h1>
          <p className="badge-subtitle">
            We sent a confirmation link to <strong>{email}</strong>. Open it
            to activate your badge and finish creating your account.
          </p>
          <Link href="/login" className="btn-primary" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
            Back to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="badge-card">
        <div className="dash-card-logo">
          <Logo size="md" />
        </div>
        <div className="badge-eyebrow mono">
          <span className="status-dot" />
          New Badge
        </div>
        <h1 className="badge-title">Create your account</h1>
        <p className="badge-subtitle">
          A minute to set up, and you&apos;re issued a badge for every visit.
        </p>

        <form onSubmit={handleSignup}>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Issuing badge..." : "Create Account"}
          </button>
        </form>

        <div className="divider">Or continue with</div>

        <button className="btn-google" onClick={handleGoogleSignup}>
          <GoogleIcon />
          Google
        </button>

        <p className="footer-note">
          Already have a badge? <Link href="/login">Log in</Link>
        </p>

        <div className="barcode">
          <div className="barcode-bars" />
          <div className="barcode-serial mono">NO. 002-SIGNUP-2026</div>
        </div>
      </div>
    </main>
  );
}
