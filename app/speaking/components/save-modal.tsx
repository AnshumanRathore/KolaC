"use client";

import Link from "next/link";

export default function SaveSuccessModal({
  onPracticeAnother,
  onClose,
}: {
  onPracticeAnother: () => void;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="glass-card save-modal" onClick={(e) => e.stopPropagation()}>
        <div className="save-check-circle">
          <svg viewBox="0 0 52 52" width="52" height="52">
            <circle cx="26" cy="26" r="24" fill="none" stroke="var(--accent)" strokeWidth="3" />
            <path
              d="M14 27l7 7 17-17"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="save-check-path"
            />
          </svg>
        </div>
        <h2 className="save-modal-title">Great job!</h2>
        <p className="save-modal-text">Today&apos;s speaking session has been saved.</p>

        <div className="save-modal-actions">
          <button className="btn-google" disabled title="Coming soon">
            View History
          </button>
          <Link href="/dashboard" className="btn-google" style={{ textDecoration: "none", textAlign: "center" }}>
            Go to Dashboard
          </Link>
          <button className="btn-primary" onClick={onPracticeAnother}>
            Practice Another Topic
          </button>
        </div>
      </div>
    </div>
  );
}
