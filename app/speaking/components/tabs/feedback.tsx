"use client";

import { FeedbackResult } from "../../mock-analysis";

function scoreColor(score: number) {
  if (score >= 80) return "var(--accent)";
  if (score >= 65) return "var(--amber)";
  return "var(--danger)";
}

export default function FeedbackTab({ feedback }: { feedback: FeedbackResult }) {
  const circumference = 2 * Math.PI * 64;
  const offset = circumference - (feedback.overall / 100) * circumference;

  return (
    <div className="tab-panel">
      <div className="glass-card overall-score-card">
        <div className="badge-eyebrow mono">
          <span className="status-dot" />
          Overall Communication Score
        </div>
        <div className="overall-score-row">
          <div className="progress-ring-wrap">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="64" fill="none" stroke="var(--border)" strokeWidth="11" />
              <circle
                cx="80"
                cy="80"
                r="64"
                fill="none"
                stroke={scoreColor(feedback.overall)}
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 80 80)"
                className="progress-ring-fill"
              />
            </svg>
            <div className="progress-ring-label">
              <span className="mono progress-ring-value" style={{ fontSize: 32 }}>
                {feedback.overall}
              </span>
              <span className="progress-ring-sub">out of 100</span>
            </div>
          </div>
          <p className="overall-score-note">
            {feedback.overall >= 80
              ? "Strong session — you communicated clearly with good control."
              : feedback.overall >= 65
              ? "Solid session with a few clear areas to sharpen."
              : "Good effort — a few focused tweaks will move this a lot."}
          </p>
        </div>
      </div>

      <div className="feedback-grid">
        {feedback.categories.map((c) => (
          <div className="feedback-card" key={c.key}>
            <div className="feedback-card-top">
              <span className="feedback-card-label">{c.label}</span>
              <span className="mono feedback-card-score" style={{ color: scoreColor(c.score) }}>
                {c.score}
              </span>
            </div>
            <div className="feedback-bar-track">
              <div
                className="feedback-bar-fill"
                style={{ width: `${c.score}%`, background: scoreColor(c.score) }}
              />
            </div>
            <p className="feedback-explanation">{c.explanation}</p>
            <p className="feedback-suggestion">💡 {c.suggestion}</p>
          </div>
        ))}

        <div className="feedback-card feedback-card-locked">
          <div className="feedback-card-top">
            <span className="feedback-card-label">Pronunciation</span>
            <span className="lock-badge">🔒 Soon</span>
          </div>
          <p className="feedback-explanation">Sound-level accuracy scoring is coming soon.</p>
        </div>
        <div className="feedback-card feedback-card-locked">
          <div className="feedback-card-top">
            <span className="feedback-card-label">Body Language</span>
            <span className="lock-badge">🔒 Soon</span>
          </div>
          <p className="feedback-explanation">Video-based posture and gesture feedback is coming soon.</p>
        </div>
      </div>
    </div>
  );
}
