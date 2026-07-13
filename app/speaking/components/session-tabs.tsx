"use client";

export type TabId = "read" | "record" | "transcript" | "feedback" | "reflection";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "read", label: "Read Topic", icon: "📖" },
  { id: "record", label: "Record", icon: "🎙️" },
  { id: "transcript", label: "Transcript", icon: "📝" },
  { id: "feedback", label: "AI Feedback", icon: "📊" },
  { id: "reflection", label: "Reflection", icon: "🪞" },
];

export default function SessionTabs({
  active,
  onChange,
  unlocked,
}: {
  active: TabId;
  onChange: (t: TabId) => void;
  unlocked: Record<TabId, boolean>;
}) {
  return (
    <div className="session-tabs" role="tablist">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          disabled={!unlocked[tab.id]}
          className={
            "session-tab" +
            (active === tab.id ? " active" : "") +
            (!unlocked[tab.id] ? " locked" : "")
          }
          onClick={() => unlocked[tab.id] && onChange(tab.id)}
        >
          <span aria-hidden="true">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
