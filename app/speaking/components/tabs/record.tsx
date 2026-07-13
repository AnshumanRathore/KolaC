"use client";

import { useEffect, useRef, useState } from "react";

const DURATIONS = [
  { label: "2 min", seconds: 120 },
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
];

const HINTS = [
  "Keep speaking naturally.",
  "Don't worry about grammar.",
  "Focus on expressing ideas.",
  "Pauses are okay — take your time.",
];

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type Status = "idle" | "recording" | "paused" | "finished";

export default function RecordTab({
  onFinish,
  onTick,
  onStatusChange,
}: {
  onFinish: (durationSeconds: number) => void;
  onTick?: (remainingSeconds: number | null) => void;
  onStatusChange?: (status: Status) => void;
}) {
  const [mode, setMode] = useState<"audio" | "video">("audio");
  const [duration, setDuration] = useState(180);
  const [status, setStatus] = useState<Status>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [micLevel, setMicLevel] = useState(0);

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hintTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function cleanupTimers() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (hintTimerRef.current) clearInterval(hintTimerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    timerRef.current = null;
    hintTimerRef.current = null;
    rafRef.current = null;
  }

  function stopStream() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
  }

  useEffect(() => {
    return () => {
      cleanupTimers();
      stopStream();
    };
  }, []);

  function drawWaveform() {
    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    if (!analyser || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const data = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(data);

    const barCount = 32;
    const step = Math.floor(bufferLength / barCount);
    const w = canvas.width;
    const h = canvas.height;
    const barWidth = w / barCount;

    ctx.clearRect(0, 0, w, h);

    let peak = 0;
    for (let i = 0; i < barCount; i++) {
      const value = data[i * step] || 0;
      peak = Math.max(peak, value);
      const barHeight = Math.max(4, (value / 255) * h);
      ctx.fillStyle = "rgba(76, 235, 196, 0.9)";
      ctx.beginPath();
      const x = i * barWidth + 1;
      const y = h - barHeight;
      const r = Math.min(3, barWidth / 2 - 1);
      ctx.roundRect(x, y, barWidth - 2, barHeight, r);
      ctx.fill();
    }
    setMicLevel(Math.round((peak / 255) * 100));

    rafRef.current = requestAnimationFrame(drawWaveform);
  }

  async function startRecording() {
    setError(null);
    try {
      const constraints: MediaStreamConstraints =
        mode === "video" ? { audio: true, video: true } : { audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (mode === "video" && videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;

      const recorder = new MediaRecorder(stream);
      recorder.start();
      recorderRef.current = recorder;

      setStatus("recording");
      setElapsed(0);
      setHintIndex(0);

      timerRef.current = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          if (next >= duration) {
            finishRecording(next);
            return next;
          }
          return next;
        });
      }, 1000);

      hintTimerRef.current = setInterval(() => {
        setHintIndex((i) => (i + 1) % HINTS.length);
      }, 4000);

      rafRef.current = requestAnimationFrame(drawWaveform);
    } catch (err) {
      setError(
        "We couldn't access your microphone. Check your browser permissions and try again."
      );
    }
  }

  function pauseRecording() {
    recorderRef.current?.pause();
    if (timerRef.current) clearInterval(timerRef.current);
    if (hintTimerRef.current) clearInterval(hintTimerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setStatus("paused");
  }

  function resumeRecording() {
    recorderRef.current?.resume();
    setStatus("recording");
    timerRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= duration) {
          finishRecording(next);
          return next;
        }
        return next;
      });
    }, 1000);
    hintTimerRef.current = setInterval(() => {
      setHintIndex((i) => (i + 1) % HINTS.length);
    }, 4000);
    rafRef.current = requestAnimationFrame(drawWaveform);
  }

  function restartRecording() {
    cleanupTimers();
    recorderRef.current?.stop();
    stopStream();
    setStatus("idle");
    setElapsed(0);
    setMicLevel(0);
  }

  function finishRecording(finalElapsed?: number) {
    cleanupTimers();
    recorderRef.current?.stop();
    stopStream();
    setStatus("finished");
    onFinish(finalElapsed ?? elapsed);
  }

  const remaining = Math.max(0, duration - elapsed);

  return (
    <div className="tab-panel record-panel">
      {status === "idle" && (
        <>
          <div className="record-options">
            <div className="record-option-group">
              <span className="record-option-label mono">Mode</span>
              <div className="pill-group">
                <button
                  className={"pill-btn" + (mode === "audio" ? " active" : "")}
                  onClick={() => setMode("audio")}
                >
                  🎧 Audio
                </button>
                <button
                  className={"pill-btn" + (mode === "video" ? " active" : "")}
                  onClick={() => setMode("video")}
                >
                  📹 Video
                </button>
              </div>
            </div>

            <div className="record-option-group">
              <span className="record-option-label mono">Duration</span>
              <div className="pill-group">
                {DURATIONS.map((d) => (
                  <button
                    key={d.seconds}
                    className={"pill-btn" + (duration === d.seconds ? " active" : "")}
                    onClick={() => setDuration(d.seconds)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="mic-stage">
            <button className="mic-button idle" onClick={startRecording} aria-label="Start recording">
              🎙️
            </button>
            <p className="mic-hint">Tap to start your speaking session</p>
          </div>
        </>
      )}

      {(status === "recording" || status === "paused") && (
        <div className="recording-live">
          {mode === "video" && (
            <video ref={videoRef} className="video-preview" autoPlay muted playsInline />
          )}

          <div className="mic-stage">
            <div className={"mic-button" + (status === "recording" ? " live" : " paused-state")}>
              🎙️
              {status === "recording" && (
                <>
                  <span className="mic-ring ring-1" />
                  <span className="mic-ring ring-2" />
                </>
              )}
            </div>
            <span className="mono record-timer">{formatTime(remaining)}</span>
            <span className="record-status-label">
              {status === "recording" ? "Recording..." : "Paused"}
            </span>
          </div>

          <canvas ref={canvasRef} width={480} height={70} className="waveform-canvas" />

          <div className="mic-level-bar">
            <div className="mic-level-fill" style={{ width: `${micLevel}%` }} />
          </div>

          {status === "recording" && (
            <p className="record-hint mono">{HINTS[hintIndex]}</p>
          )}

          <div className="record-controls">
            {status === "recording" ? (
              <button className="btn-google" onClick={pauseRecording}>
                ⏸ Pause
              </button>
            ) : (
              <button className="btn-google" onClick={resumeRecording}>
                ▶ Resume
              </button>
            )}
            <button className="btn-google" onClick={restartRecording}>
              ↺ Restart
            </button>
            <button className="btn-primary record-finish-btn" onClick={() => finishRecording()}>
              ✓ Finish Recording
            </button>
          </div>
        </div>
      )}

      {status === "finished" && (
        <div className="record-finished">
          <p className="mono">Nice work. Generating your transcript…</p>
        </div>
      )}
    </div>
  );
}
