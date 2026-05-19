# Kickoff prompt for Claude Code

Copy and paste this as your **first message** to Claude Code once you start a session in the `tvah-site` project folder.

---

```
Read CLAUDE.md to understand the project. Then read the two files in _content-from-old-site/ for context on the existing site's copy.

Here's what I want you to do, in order:

1. Fetch the 9 service pages from tustinvillageah.com (URLs listed in CLAUDE.md task #1). For each one, extract the meaningful body copy, FAQ-like sections, and any "what to expect" content. Save each one as a markdown file in _content-from-old-site/ so we have a paper trail.

2. Update scripts/seed.mjs to use that real copy in place of the placeholder copy I have now. Keep the same schema (shortDescription, body, whatToExpect, faqs). Per the project conventions, don't name specific doctors in the copy — rewrite generically if the source material does.

3. The owner has photos of Drs. Larkin, Nguyen, and Madan in the project root. Find them (search for any image files with "larkin", "nguyen", "madan" in the filename, case-insensitive, anywhere in the project). Extend seed.mjs to upload these to Sanity and patch them onto the doctor-nguyen, doctor-larkin, doctor-madan documents.

4. Rewrite src/app/(site)/about-us/page.tsx using the about-us.md content as source, but DROP the "Our practice" section that names doctors. Replace it with something equivalent that doesn't depend on specific names.

5. Re-run the seed: `node --env-file=.env.local scripts/seed.mjs`. Verify with `npm run dev` and visit /, /about-us, /our-doctors, and /wellness-exams. Tell me what to check.

Before you start: confirm you've read CLAUDE.md and tell me what you're about to do, then proceed. Ask before making destructive changes (deleting files, force-pushing, etc).
```

---

## Why this kickoff works

- **Forces Claude Code to load context first** (read CLAUDE.md before doing anything)
- **Gives it source material** (the pre-fetched markdown files)
- **Specific, ordered tasks** — no ambiguity about what to do
- **Names the doctors-in-copy rule explicitly** — most important editorial constraint
- **Sets up a verification step** so you can confirm the output

## Tips while working with Claude Code

- Let it run. When it asks before destructive changes, that's by design — say yes or no.
- If something looks off in the dev server output, paste the error directly into the chat. Claude Code will read it and fix.
- Use `/clear` between major task switches to keep context clean.
- Use `/compact` if context gets long during one task.
- If a task is multi-step, ask it to make a plan first, then execute. ("Plan, then execute" is a useful pattern.)
