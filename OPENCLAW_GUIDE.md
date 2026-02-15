# Felix Ng Website — OpenClaw (Kai) Operating Guide

## Overview

This is the management guide for **felixng.vercel.app**, a bilingual (EN/VI) personal website built with Next.js + Supabase. You (Kai) can create content via the **Automation API**.

---

## Architecture at a Glance

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), Tailwind CSS 4 |
| Database | Supabase PostgreSQL (Prisma ORM) |
| Auth | Supabase Auth (email/password) |
| Hosting | Vercel (auto-deploys from GitHub `main`) |
| Repo | `felixnguyen4567/felix-personal-website` |

---

## Content Types

| Type | Route | Description |
|---|---|---|
| `JOURNAL` | `/journal` | Personal reflections, project updates, tutorials |
| `AI_NEWS` | `/ai-news` | AI industry news, trends, analysis |
| `LOG` | `/logs` | Legacy — short status updates |
| `NOTE` | `/notes` | Legacy — brief notes |

**Primary types are `JOURNAL` and `AI_NEWS`**. Use these for new content. `LOG` and `NOTE` are legacy types.

---

## Automation API

### Endpoint

```
POST https://felixng.vercel.app/api/automation
```

### Authentication

```
Authorization: Bearer <AUTOMATION_API_KEY>
```

The API key is stored in the Vercel environment variables as `AUTOMATION_API_KEY`.

### Request Body (JSON)

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `title_en` | string | ✅ Yes | — | English title |
| `title_vi` | string | No | null | Vietnamese title |
| `content_en` | string | ✅ Yes | — | English content (Markdown supported) |
| `content_vi` | string | No | null | Vietnamese content |
| `slug` | string | ✅ Yes | — | URL slug (must be unique, lowercase, hyphens) |
| `type` | string | No | `"JOURNAL"` | One of: `JOURNAL`, `AI_NEWS`, `LOG`, `NOTE` |
| `published` | boolean | No | `false` | Whether post is immediately visible |
| `coverImageUrl` | string | No | null | Cover image URL (use `/images/covers/filename.png` for local images) |

### Example: Create a Journal Post (Draft)

```bash
curl -X POST https://felixng.vercel.app/api/automation \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "title_en": "My New Post Title",
    "slug": "my-new-post-title",
    "type": "JOURNAL",
    "content_en": "# Hello World\n\nThis is my first automated post.",
    "published": false
  }'
```

### Example: Create an AI News Post

```bash
curl -X POST https://felixng.vercel.app/api/automation \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "title_en": "GPT-5 Released: What You Need to Know",
    "slug": "gpt-5-released-what-you-need-to-know",
    "type": "AI_NEWS",
    "content_en": "## Breaking News\n\nOpenAI has released GPT-5...",
    "coverImageUrl": "/images/covers/gpt5-cover.png",
    "published": false
  }'
```

### Response

**Success (201):**
```json
{
  "success": true,
  "post": {
    "id": "uuid",
    "slug": "my-new-post-title",
    "type": "JOURNAL",
    "title_en": "My New Post Title",
    "content_en": "...",
    "published": false,
    "createdAt": "2026-02-15T..."
  }
}
```

**Error responses:**
- `401` — Invalid or missing API key
- `400` — Missing required fields or invalid type
- `500` — Server error (e.g., duplicate slug)

---

## Content Workflow (Human-in-the-Loop)

```
Kai creates draft via API → Felix reviews in Admin → Felix publishes → Live on website
```

### Step-by-step:

1. **Kai creates a draft** via `POST /api/automation` with `published: false`
2. **Felix logs into Admin** at `/en/admin` (email + password)
3. **Felix reviews** the post at `/en/admin/posts` (drafts show with yellow "Draft" badge)
4. **Felix can**:
   - ✏️ **Edit** — modify title, content, cover image, type, slug
   - ✅ **Publish** — click "Publish" button to make it live
   - 🗑️ **Delete** — remove the post entirely
5. **Once published**, the post appears on the public site at the appropriate route

---

## Content Guidelines for Kai

### Slug Rules
- Must be **unique** across all posts
- Use **lowercase letters, numbers, and hyphens** only
- Generated from the title: `"My Post Title"` → `"my-post-title"`
- **Never reuse** a slug that already exists

### Markdown Content
The `content_en` field supports full Markdown:
- Headers: `# H1`, `## H2`, `### H3`
- Bold: `**text**`, Italic: `*text*`
- Lists: `- item` or `1. item`
- Code blocks: `` ```language ... ``` ``
- Links: `[text](url)`
- Images: `![alt](url)`

### Cover Images
- If you have a URL, pass it as `coverImageUrl`
- For posts without a cover image, the website will show a gradient placeholder
- Local images should be placed in `public/images/covers/` and referenced as `/images/covers/filename.png`

### Bilingual Content
- Always provide `title_en` and `content_en` (required)
- Optionally provide `title_vi` and `content_vi` for Vietnamese readers
- If Vietnamese content is missing, the website falls back to English

---

## Database Schema Reference

### Post Table
```
id            UUID (auto-generated)
slug          String (unique)
type          JOURNAL | AI_NEWS | LOG | NOTE
title_en      String (required)
title_vi      String (optional)
excerpt_en    String (optional — not settable via API)
excerpt_vi    String (optional — not settable via API)
content_en    String (required, Markdown)
content_vi    String (optional, Markdown)
published     Boolean (default: false)
coverImageUrl String (optional)
createdAt     DateTime (auto)
updatedAt     DateTime (auto)
authorId      UUID (auto-assigned)
```

### Project Table
```
id            UUID (auto-generated)
slug          String (unique)
title_en      String (required)
desc_en       String (required)
content_en    String (required)
coverImageUrl String (optional)
tags          String (optional)
category      String (optional)
link          String (optional)
published     Boolean (default: false)
```

Projects are currently managed via the Admin UI only. There is no automation API for projects yet.

---

## Admin Panel Routes

| Route | Purpose |
|---|---|
| `/en/admin` | Dashboard (quick access to Posts, Projects, System) |
| `/en/admin/login` | Login page |
| `/en/admin/posts` | List all posts (including drafts) |
| `/en/admin/posts/new` | Create new post via form |
| `/en/admin/posts/[id]/edit` | Edit existing post |
| `/en/admin/projects` | List all projects |
| `/en/admin/projects/new` | Create new project |
| `/en/admin/system` | Audit logs |

---

## Public Site Routes

| Route | Content Source |
|---|---|
| `/en` | Homepage — shows latest posts |
| `/en/journal` | All published JOURNAL posts |
| `/en/journal/[slug]` | Individual journal post |
| `/en/ai-news` | All published AI_NEWS posts |
| `/en/ai-news/[slug]` | Individual AI news post |
| `/en/projects` | All published projects |
| `/en/projects/[slug]` | Individual project |
| `/en/about` | About page |
| `/en/contact` | Contact page |

Replace `/en` with `/vi` for Vietnamese versions.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| `401 Unauthorized` | Check the `Authorization` header matches `Bearer <AUTOMATION_API_KEY>` |
| `400 Missing required fields` | Ensure `title_en`, `content_en`, and `slug` are all provided |
| `500 Unique constraint failed` | The `slug` already exists. Use a different slug. |
| Post not appearing on site | Check if `published` is `true`. By default, posts are created as drafts. |
| Cache not updating | The API automatically revalidates `/journal` and `/ai-news` pages |
