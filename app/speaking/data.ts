export type Topic = {
  id: string;
  title: string;
  categories: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  estTime: string;
  overview: string;
  background: string[];
  vocabulary: { word: string; meaning: string; example: string; difficulty: string }[];
};

export const TOPICS: Topic[] = [
  {
    id: "ai-teachers",
    title: "Should AI replace teachers?",
    categories: ["Technology", "Education", "Debate"],
    difficulty: "Medium",
    estTime: "3–5 minutes",
    overview:
      "AI tutors can personalize lessons and grade instantly, but teaching is also about mentorship, empathy, and human connection — things software still struggles to replicate.",
    background: [
      "Over the last few years, adaptive learning platforms have gotten remarkably good at identifying exactly where a student is stuck and adjusting the material in real time, something a teacher juggling thirty students can rarely do for each person individually.",
      "At the same time, most people can point to one teacher who changed how they saw themselves — not because of a perfectly paced lesson plan, but because that person noticed something going on and cared enough to say something.",
      "The real question in this debate usually isn't 'AI or teacher', but where the line between the two should sit, and what we lose if we draw it in the wrong place.",
    ],
    vocabulary: [
      { word: "Personalize", meaning: "to adapt something to an individual's needs", example: "The app personalizes each lesson based on your quiz scores.", difficulty: "Medium" },
      { word: "Mentorship", meaning: "guidance from a more experienced person", example: "Good mentorship goes beyond just answering questions.", difficulty: "Medium" },
      { word: "Scalable", meaning: "able to grow without losing effectiveness", example: "Software is scalable in a way one-on-one tutoring isn't.", difficulty: "Hard" },
      { word: "Empathy", meaning: "the ability to understand another's feelings", example: "Empathy helps teachers notice when a student is struggling.", difficulty: "Easy" },
      { word: "Redundant", meaning: "no longer needed", example: "Some fear that grading by hand will become redundant.", difficulty: "Medium" },
    ],
  },
  {
    id: "social-media-harm",
    title: "Is social media doing more harm than good?",
    categories: ["Technology", "Society", "Debate"],
    difficulty: "Medium",
    estTime: "3–5 minutes",
    overview:
      "Social media connects people across the world instantly, but it's also linked to shorter attention spans, comparison anxiety, and the spread of misinformation.",
    background: [
      "Platforms were originally built to help people stay in touch, and by that narrow measure they've succeeded spectacularly — billions of people now talk to friends and family they'd otherwise lose touch with.",
      "But the same feed that shows you a friend's vacation photos is optimized to keep you scrolling, and that optimization has real costs: research keeps finding links between heavy use and anxiety, especially among teenagers.",
      "The honest answer probably depends on how it's used — as a tool you pick up deliberately, or as a habit that picks you up whenever you're bored.",
    ],
    vocabulary: [
      { word: "Misinformation", meaning: "false information spread regardless of intent", example: "Misinformation spreads faster than corrections do.", difficulty: "Hard" },
      { word: "Comparison", meaning: "the act of measuring yourself against others", example: "Constant comparison online can hurt self-esteem.", difficulty: "Easy" },
      { word: "Algorithm", meaning: "a set of rules a computer follows to make decisions", example: "The algorithm decides what shows up in your feed.", difficulty: "Medium" },
      { word: "Moderation", meaning: "keeping something within reasonable limits", example: "Most experts recommend moderation, not total avoidance.", difficulty: "Medium" },
      { word: "Validation", meaning: "recognition or approval", example: "Some people chase likes for a sense of validation.", difficulty: "Medium" },
    ],
  },
  {
    id: "free-college",
    title: "Should college education be free?",
    categories: ["Education", "Policy", "Debate"],
    difficulty: "Medium",
    estTime: "3–5 minutes",
    overview:
      "Free college could open doors for students who can't afford tuition, but someone still has to pay for it — the debate is really about priorities and trade-offs.",
    background: [
      "Supporters point to countries where public university is tuition-free and argue that an educated population pays for itself many times over in tax revenue and innovation.",
      "Critics worry about cost, quality, and fairness — if everyone can attend for free, does that dilute the value of a degree, and is it fair to ask people who didn't attend college to fund those who did?",
      "Most real-world proposals land somewhere in between: free community college, income-based repayment, or free tuition tied to family income.",
    ],
    vocabulary: [
      { word: "Tuition", meaning: "the fee charged for instruction", example: "Tuition at public universities varies widely by state.", difficulty: "Easy" },
      { word: "Subsidize", meaning: "to support financially, often with public funds", example: "The government subsidizes some student loans.", difficulty: "Hard" },
      { word: "Equity", meaning: "fairness in outcomes, not just opportunity", example: "Free tuition is often framed as a matter of equity.", difficulty: "Medium" },
      { word: "Trade-off", meaning: "a balance between two competing things", example: "Every funding model involves some trade-off.", difficulty: "Medium" },
      { word: "Dilute", meaning: "to reduce the strength or value of something", example: "Some worry it would dilute the value of a degree.", difficulty: "Hard" },
    ],
  },
  {
    id: "remote-work",
    title: "Is remote work better than office work?",
    categories: ["Work", "Lifestyle", "Debate"],
    difficulty: "Easy",
    estTime: "3–5 minutes",
    overview:
      "Remote work gives people back their commute and more control over their day, while offices offer spontaneous collaboration and a clearer line between work and home.",
    background: [
      "The pandemic forced a global experiment in remote work, and a lot of companies discovered their teams could stay just as productive — sometimes more — without a daily commute.",
      "But something is also harder to replicate over video calls: the hallway conversation that solves a problem in thirty seconds, or simply feeling like part of a team.",
      "Increasingly, the debate isn't remote versus office at all — it's about which kind of work actually needs a room, and which doesn't.",
    ],
    vocabulary: [
      { word: "Commute", meaning: "the journey to and from work", example: "Skipping the commute gives people back an hour a day.", difficulty: "Easy" },
      { word: "Collaboration", meaning: "working together to produce something", example: "Some tasks benefit from in-person collaboration.", difficulty: "Medium" },
      { word: "Autonomy", meaning: "the freedom to manage your own work", example: "Remote work often comes with more autonomy.", difficulty: "Hard" },
      { word: "Burnout", meaning: "exhaustion from prolonged stress", example: "Blurred boundaries can lead to burnout.", difficulty: "Medium" },
      { word: "Spontaneous", meaning: "happening without being planned", example: "Office layouts encourage spontaneous conversation.", difficulty: "Medium" },
    ],
  },
  {
    id: "plastic-ban",
    title: "Should plastic be banned globally?",
    categories: ["Environment", "Policy", "Debate"],
    difficulty: "Medium",
    estTime: "3–5 minutes",
    overview:
      "Plastic pollution is a genuine environmental crisis, but plastic also enables cheap medical equipment and food preservation — a full ban would trade one set of problems for another.",
    background: [
      "Plastic waste in oceans and landfills is one of the most visible environmental problems of our time, and single-use items in particular have become an easy target for regulation.",
      "At the same time, plastic is cheap, lightweight, and often more hygienic than the alternatives — a hospital without plastic packaging would face serious sterility challenges.",
      "Most environmental policy now focuses less on banning plastic outright and more on banning specific single-use categories while investing in recycling and biodegradable alternatives.",
    ],
    vocabulary: [
      { word: "Biodegradable", meaning: "able to decompose naturally", example: "Biodegradable packaging breaks down much faster.", difficulty: "Hard" },
      { word: "Sterility", meaning: "the state of being free from germs", example: "Plastic packaging helps maintain sterility in hospitals.", difficulty: "Hard" },
      { word: "Regulation", meaning: "a rule made by an authority", example: "New regulation targets single-use plastic bags.", difficulty: "Medium" },
      { word: "Landfill", meaning: "a site for disposing of waste by burying it", example: "Most plastic waste ends up in a landfill.", difficulty: "Easy" },
      { word: "Alternative", meaning: "another option instead of the usual one", example: "Paper straws are a common plastic alternative.", difficulty: "Easy" },
    ],
  },
  {
    id: "space-exploration",
    title: "Is space exploration worth the cost?",
    categories: ["Science", "Policy", "Debate"],
    difficulty: "Hard",
    estTime: "3–5 minutes",
    overview:
      "Space programs are expensive and don't solve immediate problems on Earth, but the same research has produced technology, and perspective, that's changed life here at home.",
    background: [
      "Critics point out that a single mission can cost billions of dollars that could otherwise fund healthcare, education, or poverty relief right now, for people who need it today.",
      "Supporters counter that space research has quietly produced technology now used everywhere, from satellite communication to medical imaging, and that some problems — like tracking asteroids — can only be solved by looking up.",
      "There's also a harder-to-quantify argument: that seeing Earth as a small, fragile planet from space has changed how people think about the environment and about each other.",
    ],
    vocabulary: [
      { word: "Allocation", meaning: "the distribution of resources for a purpose", example: "Budget allocation for space programs is often debated.", difficulty: "Hard" },
      { word: "Byproduct", meaning: "a secondary result of a process", example: "Many everyday technologies are a byproduct of space research.", difficulty: "Medium" },
      { word: "Feasible", meaning: "possible to do successfully", example: "A crewed Mars mission may soon be feasible.", difficulty: "Medium" },
      { word: "Perspective", meaning: "a particular way of viewing something", example: "Astronauts often describe a shift in perspective.", difficulty: "Easy" },
      { word: "Prioritize", meaning: "to treat something as more important", example: "Governments must prioritize where funding goes.", difficulty: "Medium" },
    ],
  },
];

export const KEY_QUESTION_TEMPLATES = [
  "Why is this topic important?",
  "What are the main benefits?",
  "What are the main disadvantages?",
  "What is your personal opinion?",
  "Can you think of a real-life example?",
];

export const USEFUL_PHRASES = [
  "From my perspective...",
  "On the other hand...",
  "One possible solution is...",
  "It's also worth considering...",
  "For example...",
  "In conclusion...",
];

export const SUGGESTED_STRUCTURE = [
  "Introduction — state the topic and your position",
  "Explain your opinion — give your main reason",
  "Give examples — back it up with something concrete",
  "Mention another viewpoint — show you've considered it",
  "Conclusion — sum up in one or two sentences",
];

export const MOTIVATIONAL_QUOTES = [
  "Confidence comes from consistency.",
  "Every session compounds — small reps, real growth.",
  "Fluency is a muscle. You're training it right now.",
  "You don't need to sound perfect. You need to sound like you.",
  "The best speakers were once beginners who kept showing up.",
];
