"use client";

import { useState } from "react";
import { TranscriptResult } from "../../mock-analysis";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function highlightSentence(
  text: string,
  fillerWords: string[],
  repeatedWords: string[]
) {
  const parts = text.split(/(\s+)/);
  return parts.map((part, i) => {
    const clean = part.toLowerCase().replace(/[.,!?]/g, "");
    if (fillerWords.includes(clean)) {
      return (
        <span className="hl-filler" key={i}>
          {part}
        </span>
      );
    }
    if (repeatedWords.includes(clean)) {
      return (
        <span className="hl-repeat" key={i}>
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function TranscriptTab({
  transcript,
  durationSeconds,
}: {
  transcript: TranscriptResult;
  durationSeconds: number;
}) {
  const [activeSentence, setActiveSentence] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(transcript.fullText);
  const [copied, setCopied] = useState(false);

  function copyTranscript() {
    navigator.clipboard?.writeText(editedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function downloadTranscript() {
    const blob = new Blob([editedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kolac-transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="tab-panel">
      <div className="transcript-stats-row">
        <div className="mini-stat">
          <span className="mono mini-stat-value">{transcript.wordCount}</span>
          <span className="mini-stat-label">Words</span>
        </div>
        <div className="mini-stat">
          <span className="mono mini-stat-value">{formatTime(durationSeconds)}</span>
          <span className="mini-stat-label">Duration</span>
        </div>
        <div className="mini-stat">
          <span className="mono mini-stat-value">{transcript.speakingSpeed}</span>
          <span className="mini-stat-label">Words / min</span>
        </div>
        <div className="mini-stat">
          <span className="mono mini-stat-value">{transcript.fluency}</span>
          <span className="mini-stat-label">Est. Fluency</span>
        </div>
      </div>

      <div className="transcript-toolbar">
        <button className="btn-google small" onClick={copyTranscript}>
          {copied ? "Copied ✓" : "📋 Copy"}
        </button>
        <button className="btn-google small" onClick={() => setEditing((e) => !e)}>
          {editing ? "✓ Done Editing" : "✎ Edit"}
        </button>
        <button className="btn-google small" onClick={downloadTranscript}>
          ⬇ Download
        </button>
        <div className="legend">
          <span className="legend-dot hl-filler" /> filler word
          <span className="legend-dot hl-repeat" /> repeated word
        </div>
      </div>

      <div className="transcript-split">
        <div className="transcript-text-col">
          {editing ? (
            <textarea
              className="transcript-edit-area"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          ) : (
            <div className="transcript-lines">
              {transcript.sentences.map((s, i) => (
                <p
                  key={s.id}
                  className={"transcript-line" + (activeSentence === i ? " active" : "")}
                  onClick={() => setActiveSentence(i)}
                >
                  <span className="mono transcript-timestamp">{formatTime(s.start)}</span>
                  {highlightSentence(s.text, transcript.fillerWords, transcript.repeatedWords)}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="transcript-timeline-col">
          <div className="badge-eyebrow mono" style={{ marginBottom: 12 }}>
            <span className="status-dot" />
            Timeline
          </div>
          {transcript.sentences.map((s, i) => (
            <button
              key={s.id}
              className={"timeline-marker" + (activeSentence === i ? " active" : "")}
              onClick={() => setActiveSentence(i)}
            >
              <span className="mono">{formatTime(s.start)}</span>
              <span className="timeline-dot" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
