"use client";

import { useEffect, useMemo, useState } from "react";

const TOPICS = [
  "Binary Search Trees",
  "Dynamic Programming: Knapsack",
  "Graph Traversal: BFS & DFS",
  "React Hooks Deep Dive",
  "System Design: Rate Limiting",
  "SQL Joins, Explained Visually",
  "Big-O Time Complexity",
  "REST vs GraphQL",
  "Sliding Window Patterns",
  "Concurrency & Race Conditions",
];

const TASKS = [
  { id: "learn", label: "Learn the concept" },
  { id: "practice", label: "Solve practice problems" },
  { id: "quiz", label: "Take the quiz" },
  { id: "review", label: "Review your notes" },
];

const STREAK_DAYS = 30;
const CURRENT_STREAK = 17;

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardClient({ firstName }: { firstName: string }) {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [shuffling, setShuffling] = useState(false);
  const [tasksDone, setTasksDone] = useState<Record<string, boolean>>({});
  const [streakCount, setStreakCount] = useState(0);
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    document.title = "Dashboard · KolaC";
    setGreeting(getGreeting());
  }, []);

  // count the streak number up on mount
  useEffect(() => {
    let n = 0;
    const step = () => {
      n += 1;
      setStreakCount(Math.min(n, CURRENT_STREAK));
      if (n < CURRENT_STREAK) requestAnimationFrame(() => setTimeout(step, 40));
    };
    step();
  }, []);

  const progress = useMemo(() => {
    const done = TASKS.filter((t) => tasksDone[t.id]).length;
    return Math.round((done / TASKS.length) * 100);
  }, [tasksDone]);

  function toggleTask(id: string) {
    setTasksDone((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function generateTopic() {
    if (shuffling) return;
    setShuffling(true);

    let ticks = 0;
    const maxTicks = 10;
    const interval = setInterval(() => {
      const random = TOPICS[Math.floor(Math.random() * TOPICS.length)];
      setTopic(random);
      ticks += 1;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        setShuffling(false);
        // reset today's checklist for the new topic
        setTasksDone({});
      }
    }, 70);
  }

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (progress / 100) * circumference;

  // mock streak history - last N days, most recent CURRENT_STREAK are active
  const streakHistory = Array.from({ length: STREAK_DAYS }, (_, i) =>
    i >= STREAK_DAYS - CURRENT_STREAK
  );

  return (
    <div className="dash-wrap">
      <section className="dash-hero">
        <div>
          <p className="dash-eyebrow mono">
            <span className="status-dot" />
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="dash-greeting">
            {greeting}, {firstName} <span aria-hidden="true">👋</span>
          </h1>
        </div>

        <div className="streak-pill">
          <span className="streak-flame" aria-hidden="true">
            🔥
          </span>
          <span className="mono streak-count">{streakCount}</span>
          <span className="streak-label">Day Streak</span>
        </div>
      </section>

      <section className="dash-grid">
        {/* Today's Topic */}
        <div className="badge-card dash-card dash-card-wide">
          <div className="badge-eyebrow mono">
            <span className="status-dot" />
            Today&apos;s Topic
          </div>

          <h2 className={"dash-topic" + (shuffling ? " shuffling" : "")}>
            {topic}
          </h2>

          <button
            className="btn-primary dash-generate-btn"
            onClick={generateTopic}
            disabled={shuffling}
          >
            {shuffling ? "Shuffling..." : "Generate New Topic"}
          </button>

          <div className="dash-checklist">
            {TASKS.map((task) => (
              <label className="checklist-row" key={task.id}>
                <input
                  type="checkbox"
                  checked={!!tasksDone[task.id]}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="checklist-box" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="10" height="10">
                    <path
                      d="M2 8l4 4 8-8"
                      fill="none"
                      stroke="#06110d"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  className={
                    "checklist-label" +
                    (tasksDone[task.id] ? " done" : "")
                  }
                >
                  {task.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Today's Progress */}
        <div className="badge-card dash-card">
          <div className="badge-eyebrow mono">
            <span className="status-dot" />
            Today&apos;s Progress
          </div>

          <div className="progress-ring-wrap">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r="54"
                fill="none"
                stroke="var(--border)"
                strokeWidth="10"
              />
              <circle
                cx="70"
                cy="70"
                r="54"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 70 70)"
                className="progress-ring-fill"
              />
            </svg>
            <div className="progress-ring-label">
              <span className="mono progress-ring-value">{progress}%</span>
              <span className="progress-ring-sub">complete</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stat cards */}
      <section className="dash-stats">
        <div className="stat-card">
          <span className="stat-icon" aria-hidden="true">
            🔥
          </span>
          <span className="mono stat-value">{CURRENT_STREAK}</span>
          <span className="stat-label">Current Streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon" aria-hidden="true">
            📚
          </span>
          <span className="mono stat-value">42</span>
          <span className="stat-label">Topics Mastered</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon" aria-hidden="true">
            🏆
          </span>
          <span className="mono stat-value">23</span>
          <span className="stat-label">Longest Streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon" aria-hidden="true">
            🎖️
          </span>
          <span className="mono stat-value">5</span>
          <span className="stat-label">Badges Earned</span>
        </div>
      </section>

      {/* Streak history barcode */}
      <section className="badge-card dash-card-full">
        <div className="badge-eyebrow mono">
          <span className="status-dot" />
          Last {STREAK_DAYS} Days
        </div>
        <div className="streak-barcode">
          {streakHistory.map((active, i) => (
            <span
              key={i}
              className={"streak-bar" + (active ? " active" : "")}
              style={{ animationDelay: `${i * 18}ms` }}
            />
          ))}
        </div>
        <div className="barcode-serial mono" style={{ marginTop: 14 }}>
          KEEP SCANNING IN DAILY TO EXTEND YOUR STREAK
        </div>
      </section>
    </div>
  );
}
