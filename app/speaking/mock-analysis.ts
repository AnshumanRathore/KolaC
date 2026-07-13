import { Topic } from "./data";

export type TranscriptSentence = {
  id: string;
  start: number; // seconds
  text: string;
};

export type TranscriptResult = {
  sentences: TranscriptSentence[];
  fullText: string;
  wordCount: number;
  fillerWords: string[];
  fillerCount: number;
  repeatedWords: string[];
  speakingSpeed: number; // words per minute
  fluency: "High" | "Medium" | "Developing";
};

export type FeedbackCategory = {
  key: string;
  label: string;
  score: number;
  explanation: string;
  suggestion: string;
};

export type FeedbackResult = {
  overall: number;
  categories: FeedbackCategory[];
};

const FILLER_WORDS = ["actually", "like", "um", "basically"];

function buildTemplateSentences(topic: Topic): string[] {
  return [
    `So, today I want to talk about whether ${topic.title.toLowerCase().replace("?", "")}.`,
    `From my perspective, this is actually a really important question because it affects a lot of people.`,
    `On one hand, there are, um, clear benefits — it can save time and, like, open up new opportunities.`,
    `On the other hand, there are real downsides that we shouldn't actually ignore.`,
    `For example, I've noticed that this comes up a lot in conversations with my friends and family.`,
    `One possible solution is to find a middle ground instead of choosing one extreme or the other.`,
    `I think the most important thing is actually being thoughtful about how we approach this.`,
    `It's also worth considering the people who are most affected by this decision.`,
    `In my opinion, the benefits are significant, but they come with real responsibility.`,
    `In conclusion, I believe this topic deserves more careful, balanced conversation.`,
  ];
}

export function generateTranscript(
  topic: Topic,
  durationSeconds: number
): TranscriptResult {
  const templates = buildTemplateSentences(topic);
  const safeDuration = Math.max(durationSeconds, 20);
  const gap = safeDuration / templates.length;

  const sentences: TranscriptSentence[] = templates.map((text, i) => ({
    id: `s${i}`,
    start: Math.round(i * gap),
    text,
  }));

  const fullText = templates.join(" ");
  const words = fullText
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  const wordCount = words.length;
  const fillerCount = words.filter((w) => FILLER_WORDS.includes(w)).length;

  const freq: Record<string, number> = {};
  words.forEach((w) => {
    if (w.length > 4 && !FILLER_WORDS.includes(w)) {
      freq[w] = (freq[w] || 0) + 1;
    }
  });
  const repeatedWords = Object.entries(freq)
    .filter(([, count]) => count >= 2)
    .map(([w]) => w);

  const speakingSpeed = Math.round(wordCount / (safeDuration / 60));
  const fluency: TranscriptResult["fluency"] =
    fillerCount <= 2 ? "High" : fillerCount <= 5 ? "Medium" : "Developing";

  return {
    sentences,
    fullText,
    wordCount,
    fillerWords: FILLER_WORDS,
    fillerCount,
    repeatedWords,
    speakingSpeed,
    fluency,
  };
}

function seededScore(seed: string, base: number, spread: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  return Math.min(98, Math.max(52, base + (hash % spread) - spread / 2));
}

export function generateFeedback(
  topic: Topic,
  transcript: TranscriptResult
): FeedbackResult {
  const seed = topic.id;

  const categories: FeedbackCategory[] = [
    {
      key: "confidence",
      label: "Confidence",
      score: seededScore(seed + "confidence", 80, 20),
      explanation: "Your tone stayed steady through most of the recording.",
      suggestion: "Try opening with a stronger, more definite first sentence.",
    },
    {
      key: "fluency",
      label: "Fluency",
      score: transcript.fluency === "High" ? 90 : transcript.fluency === "Medium" ? 74 : 60,
      explanation:
        transcript.fillerCount > 0
          ? `You used filler words like "actually" ${transcript.fillerCount} times.`
          : "You spoke smoothly with very few filler words.",
      suggestion: "Pause silently instead of filling gaps with 'um' or 'like'.",
    },
    {
      key: "vocabulary",
      label: "Vocabulary",
      score: seededScore(seed + "vocabulary", 78, 18),
      explanation: "You used a reasonable range of everyday vocabulary.",
      suggestion: `Try weaving in a word like "${topic.vocabulary[0]?.word}" from today's list.`,
    },
    {
      key: "grammar",
      label: "Grammar",
      score: seededScore(seed + "grammar", 82, 16),
      explanation: "Most sentences were grammatically complete and clear.",
      suggestion: "Watch out for run-on sentences when you're thinking out loud.",
    },
    {
      key: "sentenceVariety",
      label: "Sentence Variety",
      score: seededScore(seed + "variety", 72, 20),
      explanation:
        transcript.repeatedWords.length > 0
          ? `You repeated "${transcript.repeatedWords[0]}" a few times.`
          : "You varied your sentence openings well.",
      suggestion: "Mix short, punchy sentences with longer explanatory ones.",
    },
    {
      key: "clarity",
      label: "Clarity",
      score: seededScore(seed + "clarity", 80, 18),
      explanation: "Your main point came through clearly by the end.",
      suggestion: "State your opinion in the first sentence, not the last.",
    },
    {
      key: "structure",
      label: "Structure",
      score: seededScore(seed + "structure", 76, 20),
      explanation: "You touched on multiple points but could sequence them more clearly.",
      suggestion: "Try following: intro → opinion → example → other view → conclusion.",
    },
  ];

  const overall = Math.round(
    categories.reduce((sum, c) => sum + c.score, 0) / categories.length
  );

  return { overall, categories };
}
