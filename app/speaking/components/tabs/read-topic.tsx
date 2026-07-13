"use client";

import { Topic, KEY_QUESTION_TEMPLATES, USEFUL_PHRASES, SUGGESTED_STRUCTURE } from "../../data";

export default function ReadTopicTab({
  topic,
  onStartRecording,
}: {
  topic: Topic;
  onStartRecording: () => void;
}) {
  return (
    <div className="tab-panel">
      <section className="read-section">
        <h3 className="read-heading mono">Topic Overview</h3>
        <p className="read-text">{topic.overview}</p>
      </section>

      <section className="read-section">
        <h3 className="read-heading mono">Background</h3>
        {topic.background.map((p, i) => (
          <p className="read-text" key={i}>
            {p}
          </p>
        ))}
      </section>

      <section className="read-section">
        <h3 className="read-heading mono">Key Questions</h3>
        <ul className="key-questions">
          {KEY_QUESTION_TEMPLATES.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </section>

      <section className="read-section">
        <h3 className="read-heading mono">Helpful Vocabulary</h3>
        <div className="vocab-grid">
          {topic.vocabulary.map((v) => (
            <div className="vocab-card" key={v.word}>
              <div className="vocab-card-top">
                <span className="vocab-word">{v.word}</span>
                <button className="vocab-pron" title="Play pronunciation" aria-label="Play pronunciation">
                  🔊
                </button>
              </div>
              <p className="vocab-meaning">{v.meaning}</p>
              <p className="vocab-example">&ldquo;{v.example}&rdquo;</p>
              <span className="chip chip-muted vocab-difficulty">{v.difficulty}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="read-section">
        <h3 className="read-heading mono">Useful Speaking Phrases</h3>
        <div className="phrase-row">
          {USEFUL_PHRASES.map((p) => (
            <span className="phrase-chip" key={p}>
              {p}
            </span>
          ))}
        </div>
      </section>

      <section className="read-section">
        <h3 className="read-heading mono">Suggested Structure</h3>
        <ol className="structure-list">
          {SUGGESTED_STRUCTURE.map((s, i) => (
            <li key={i}>
              <span className="structure-num mono">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </section>

      <button className="btn-primary start-recording-cta" onClick={onStartRecording}>
        🎙️ Start Recording
      </button>
    </div>
  );
}
