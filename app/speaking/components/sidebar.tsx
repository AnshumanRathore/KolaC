"use client";

import { MOTIVATIONAL_QUOTES } from "../data";

export type Checklist = {
  topicSelected: boolean;
  recordingCompleted: boolean;
  transcriptGenerated: boolean;
  feedbackReviewed: boolean;
  reflectionWritten: boolean;
  sessionSaved: boolean;
};

const CHECKLIST_LABELS: { key: keyof Checklist; label: string }[] = [
  { key: "topicSelected", label: "Topic Selected" },
  { key: "recordingCompleted", label: "Recording Completed" },
  { key: "transcriptGenerated", label: "Transcript Generated" },
  { key: "feedbackReviewed", label: "Feedback Reviewed" },
  { key: "reflectionWritten", label: "Reflection Written" },
  { key: "sessionSaved", label: "Session Saved" },
];

const WEEKLY = [40, 65, 30, 80, 55, 90, 20]; // mock minutes, last index = today

export default function SessionSidebar({
  checklist,
  liveTimer,
  quoteIndex,
}: {
  checklist: Checklist;
  liveTimer: string | null;
  quoteIndex: number;
}) {
  const completedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <aside className="session-sidebar">
      <div className="glass-card sidebar-card">
        <div className="badge-eyebrow mono">
          <span className="status-dot" />
          Today&apos;s Checklist
        </div>
        <ul className="sidebar-checklist">
          {CHECKLIST_LABELS.map((item) => (
            <li
              key={item.key}
              className={"sidebar-checklist-item" + (checklist[item.key] ? " done" : "")}
            >
              <span className="sidebar-check-icon">{checklist[item.key] ? "✓" : "○"}</span>
              {item.label}
            </li>
          ))}
        </ul>
        <div className="sidebar-progress-track">
          <div
            className="sidebar-progress-fill"
            style={{ width: `${(completedCount / CHECKLIST_LABELS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="glass-card sidebar-card">
        <div className="badge-eyebrow mono">
          <span className="status-dot" />
          Speaking Timer
        </div>
        <div className="sidebar-timer mono">{liveTimer ?? "--:--"}</div>
        <p className="sidebar-timer-sub">
          {liveTimer ? "Recording in progress" : "Not currently recording"}
        </p>
      </div>

      <div className="glass-card sidebar-card">
        <div className="badge-eyebrow mono">
          <span className="status-dot" />
          Communication Streak
        </div>
        <div className="sidebar-stat-row">
          <div>
            <span className="mono sidebar-stat-value">🔥 17</span>
            <span className="sidebar-stat-label">Current</span>
          </div>
          <div>
            <span className="mono sidebar-stat-value">23</span>
            <span className="sidebar-stat-label">Longest</span>
          </div>
          <div>
            <span className="mono sidebar-stat-value">64</span>
            <span className="sidebar-stat-label">Sessions</span>
          </div>
          <div>
            <span className="mono sidebar-stat-value">4:12</span>
            <span className="sidebar-stat-label">Avg Time</span>
          </div>
        </div>
      </div>

      <div className="glass-card sidebar-card">
        <div className="badge-eyebrow mono">
          <span className="status-dot" />
          Weekly Progress
        </div>
        <div className="weekly-chart">
          {WEEKLY.map((v, i) => (
            <div className="weekly-bar-col" key={i}>
              <div
                className={"weekly-bar" + (i === WEEKLY.length - 1 ? " today" : "")}
                style={{ height: `${v}%`, animationDelay: `${i * 60}ms` }}
              />
              <span className="weekly-bar-label">
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="quote-box mono">&ldquo;{MOTIVATIONAL_QUOTES[quoteIndex]}&rdquo;</div>
    </aside>
  );
}
