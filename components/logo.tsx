const SIZES = {
  sm: { chip: 26, font: 15, gap: 8 },
  md: { chip: 34, font: 19, gap: 10 },
  lg: { chip: 44, font: 25, gap: 12 },
} as const;

export default function Logo({
  size = "md",
}: {
  size?: keyof typeof SIZES;
}) {
  const s = SIZES[size];

  return (
    <div
      className="kolac-logo"
      style={{ gap: s.gap }}
      aria-label="KolaC"
    >
      <svg
        width={s.chip}
        height={s.chip}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="10"
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth="1.4"
        />
        <path
          d="M13 11v18M13 20l8-9M13 20l8 9"
          stroke="var(--accent)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="29" cy="11.5" r="2.1" fill="var(--accent)" />
      </svg>
      <span className="mono kolac-wordmark" style={{ fontSize: s.font }}>
        Kola<span style={{ color: "var(--accent)" }}>C</span>
      </span>
    </div>
  );
}
