"use client";

export type Reflection = {
  wentWell: string;
  difficult: string;
  newWords: string;
  improveTomorrow: string;
  freeform: string;
  mood: "great" | "okay" | "rough" | null;
  confidence: number;
  energy: number;
};

const QUESTIONS: { key: keyof Reflection; label: string }[] = [
  { key: "wentWell", label: "What went well today?" },
  { key: "difficult", label: "What was difficult?" },
  { key: "newWords", label: "What new words did you learn?" },
  { key: "improveTomorrow", label: "What would you improve tomorrow?" },
];

export default function ReflectionTab({
  reflection,
  onChange,
}: {
  reflection: Reflection;
  onChange: (r: Reflection) => void;
}) {
  function update<K extends keyof Reflection>(key: K, value: Reflection[K]) {
    onChange({ ...reflection, [key]: value });
  }

  return (
    <div className="tab-panel">
      <div className="reflection-grid">
        {QUESTIONS.map((q) => (
          <div className="field reflection-field" key={q.key}>
            <label>{q.label}</label>
            <textarea
              className="reflection-textarea"
              rows={2}
              value={reflection[q.key] as string}
              onChange={(e) => update(q.key, e.target.value as any)}
              placeholder="Type a few sentences..."
            />
          </div>
        ))}
      </div>

      <div className="field reflection-field">
        <label>Anything else on your mind?</label>
        <textarea
          className="reflection-textarea"
          rows={4}
          value={reflection.freeform}
          onChange={(e) => update("freeform", e.target.value)}
          placeholder="Free write — no wrong answers here."
        />
      </div>

      <div className="reflection-controls-row">
        <div className="reflection-control">
          <span className="record-option-label mono">Mood</span>
          <div className="mood-row">
            {[
              { key: "great", emoji: "😀" },
              { key: "okay", emoji: "😐" },
              { key: "rough", emoji: "😟" },
            ].map((m) => (
              <button
                key={m.key}
                className={"mood-btn" + (reflection.mood === m.key ? " active" : "")}
                onClick={() => update("mood", m.key as Reflection["mood"])}
                aria-label={m.key}
              >
                {m.emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="reflection-control">
          <span className="record-option-label mono">
            Confidence <span className="mono">{reflection.confidence}/10</span>
          </span>
          <input
            type="range"
            min={1}
            max={10}
            value={reflection.confidence}
            onChange={(e) => update("confidence", Number(e.target.value))}
            className="kolac-slider"
          />
        </div>

        <div className="reflection-control">
          <span className="record-option-label mono">
            Energy <span className="mono">{reflection.energy}/10</span>
          </span>
          <input
            type="range"
            min={1}
            max={10}
            value={reflection.energy}
            onChange={(e) => update("energy", Number(e.target.value))}
            className="kolac-slider"
          />
        </div>
      </div>
    </div>
  );
}
