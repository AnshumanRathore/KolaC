import Link from "next/link";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <main className="landing">
      <Logo size="lg" />
      <span className="landing-eyebrow mono">Secure Access Terminal</span>
      <h1>Identity, verified.</h1>
      <p>
        One badge for your whole app. Sign in with email or Google, and
        we&apos;ll keep your session ready wherever you go.
      </p>
      <div className="landing-actions">
        <Link href="/login" className="primary">
          Log In
        </Link>
        <Link href="/signup" className="secondary">
          Sign Up
        </Link>
      </div>
    </main>
  );
}
