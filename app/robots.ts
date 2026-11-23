import type { MetadataRoute } from "next";

/* AEO/GEO: explicitly welcome the AI answer-engine crawlers so they can
   read the homepage and its JSON-LD (FAQPage/LocalBusiness in layout.tsx).
   One block per agent — Next.js emits a separate User-Agent stanza per
   string in userAgent, mirroring the robots.md API-reference example. */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training + ChatGPT browsing
  "ChatGPT-User", // ChatGPT real-time user requests
  "PerplexityBot", // Perplexity answer engine
  "ClaudeBot", // Anthropic Claude
  "Google-Extended", // Gemini / AI features (not Googlebot itself)
];

const SITE_URL = "https://wecareforparents.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
