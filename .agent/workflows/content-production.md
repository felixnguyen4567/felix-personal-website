---
description: Create daily content (1 Journal + 1 AI News) as drafts for Felix to review
---

# Daily Content Production

// turbo-all

## Steps

1. Research trending AI topics
```
Use search_web to find the latest AI news, model releases, and industry trends.
```

2. Write AI News article (~1500 words, Markdown)
- Research a specific topic from current AI news
- Write in an analytical, developer-focused tone
- Include: summary, key details, competitive landscape, personal take
- Generate a cover image with generate_image tool
- Copy cover image to `public/images/covers/<slug>.png`

3. Write Journal article (~1200 words, Markdown)
- Choose a topic: building in public, developer workflow, AI perspective, tech deep dive
- Write in first person, reflective tone
- Include: problem statement, solution, lessons learned, what's next
- Generate a cover image with generate_image tool
- Copy cover image to `public/images/covers/<slug>.png`

4. Submit both articles as drafts via the Automation API
```bash
curl -s -X POST https://felixng.vercel.app/api/automation \
  -H "Authorization: Bearer sb_secret_2zpzAUmwAwY2vrm4-kWqwA_xSUrGReP" \
  -H "Content-Type: application/json" \
  -d '{
    "title_en": "<TITLE>",
    "title_vi": "<TITLE_VI (optional)>",
    "slug": "<slug-from-title>",
    "type": "AI_NEWS or JOURNAL",
    "published": false,
    "coverImageUrl": "/images/covers/<slug>.png",
    "content_en": "<MARKDOWN_CONTENT>"
  }'
```

5. Commit and push the new cover images
```bash
cd "/Users/Felix/Documents/antigravity/personal website" && git add public/images/covers/ && git commit -m "content: add cover images for daily posts" && git push origin main
```

6. Notify Felix to review drafts at `/en/admin/posts`

## Content Guidelines

### AI News tone
- Analytical, not breathless
- Developer-focused: what does this mean for builders?
- Include competitive context
- End with personal take

### Journal tone
- First person, reflective
- Honest about trade-offs
- Practical takeaways
- End with forward-looking thought

### Topic Calendar
| Day | AI News | Journal |
|-----|---------|---------|
| Mon | Model releases | Building in public |
| Tue | Agentic AI | Developer tools |
| Wed | Industry apps | AI perspectives |
| Thu | Open source | Tech deep dives |
| Fri | Ethics & safety | Weekly reflection |
