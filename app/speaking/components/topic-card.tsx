"use client";

import { Topic } from "../data";

export default function TopicCard({
  topic,
  favorite,
  onChangeTopic,
  onRandomTopic,
  onToggleFavorite,
}: {
  topic: Topic;
  favorite: boolean;
  onChangeTopic: () => void;
  onRandomTopic: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <div className="glass-card topic-card">
      <div className="badge-eyebrow mono">
        <span className="status-dot" />
        Today&apos;s Topic
      </div>

      <h1 className="topic-title">{topic.title}</h1>

      <div className="topic-meta-row">
        {topic.categories.map((c) => (
          <span key={c} className="chip">
            {c}
          </span>
        ))}
        <span className={`difficulty-badge difficulty-${topic.difficulty.toLowerCase()}`}>
          {topic.difficulty}
        </span>
        <span className="chip chip-muted">⏱ {topic.estTime}</span>
      </div>

      <div className="topic-actions">
        <button className="btn-google topic-action-btn" onClick={onChangeTopic}>
          Change Topic
        </button>
        <button className="btn-google topic-action-btn" onClick={onRandomTopic}>
          🎲 Random Topic
        </button>
        <button
          className={"btn-google topic-action-btn" + (favorite ? " favorited" : "")}
          onClick={onToggleFavorite}
        >
          {favorite ? "★ Favorited" : "☆ Favorite"}
        </button>
        <button className="btn-google topic-action-btn" disabled title="Coming soon">
          ⤴ Share
        </button>
      </div>
    </div>
  );
}
