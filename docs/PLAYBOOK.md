# Imbra Website — Playbook

> **Windows note:** `gh` must be invoked via full path in bash:
> `"/c/Program Files/GitHub CLI/gh.exe" <command>`
> All examples below use `gh` for brevity — substitute the full path on Windows.

---

## Astro

```bash
npm run dev       # start dev server with hot reload at http://localhost:4321
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

---

## Git workflow

### Daily workflow

```bash
# Start a new feature or fix
git checkout main
git pull
git checkout -b feature/description   # or fix/description

# Stage and commit
git add <file1> <file2>
git commit -m "feat: short description"

# Push and open PR
git push -u origin feature/description
gh pr create --repo Imbra-Ltd/imbra-ltd.github.io --title "feat: description" --body "..."
```

### Commit message conventions

```
feat:     new feature
fix:      bug fix
chore:    maintenance, releases, tooling
docs:     documentation only
style:    CSS/formatting, no logic change
refactor: code change that neither fixes a bug nor adds a feature
```

### Versioning

Release tags are `vMAJOR.MINOR.PATCH`. For this website:

| Part | Increment when |
|------|----------------|
| MAJOR | The site is rebuilt or repositioned so that old pages, URLs or the offer no longer hold |
| MINOR | Pages, sections or commercial terms change — the usual release |
| PATCH | Fixes and small copy corrections only |

Rules:

- A tag always points at a merged commit on `main` that has been reviewed in a PR.
- Every tag is annotated (`git tag -a`), never lightweight, so it carries its own
  message, author and date.
- Branimir releases. Nobody tags from a branch.
- `package.json` carries the same version as the latest release tag, without the `v`.
- Every push to `main` deploys. Tags mark releases, they do not deploy, and no
  workflow depends on them.
- Published tags stay published. The three March 2026 tags were renamed once,
  to `v0.1.0`, `v0.2.0` and `v0.3.0`, when this scheme was adopted. Each
  release notes the name and date it originally carried.

### Release workflow

```bash
# 1. Create a chore branch
git checkout main && git pull
git checkout -b chore/vX.Y.Z

# 2. Bump package.json, update CLAUDE.md, README.md, PLAYBOOK.md if needed
git add package.json docs/PLAYBOOK.md CLAUDE.md README.md
git commit -m "chore: release vX.Y.Z"

# 3. Push and open PR, merge via GitHub
git push -u origin chore/vX.Y.Z
gh pr create --title "chore: release vX.Y.Z" --body "Release notes here"

# 4. After PR is merged, pull main and tag
git checkout main && git pull
git tag -a vX.Y.Z -m "vX.Y.Z — short description"
git push origin vX.Y.Z

# 5. Publish the release notes, then clean up
gh release create vX.Y.Z --title "vX.Y.Z" --notes "Release notes here"
git branch -d chore/vX.Y.Z
git remote prune origin
```

### Useful git commands

```bash
git log --oneline -20          # compact commit history
git diff                       # unstaged changes
git diff --staged              # staged changes
git status                     # working tree status
git stash                      # stash uncommitted changes
git stash pop                  # restore stashed changes
git tag                        # list all tags
git checkout v0.1.0            # checkout a specific release
```

---

## GitHub CLI (gh)

### Issues

```bash
gh issue list --repo Imbra-Ltd/imbra-ltd.github.io --state open
gh issue create --repo Imbra-Ltd/imbra-ltd.github.io --title "Title" --body "Body"
gh issue edit 12 --repo Imbra-Ltd/imbra-ltd.github.io --title "New title"
gh issue close 12 --repo Imbra-Ltd/imbra-ltd.github.io
gh issue close 12 --repo Imbra-Ltd/imbra-ltd.github.io --comment "Reason"
```

### Milestones

```bash
# Create a milestone
gh api repos/Imbra-Ltd/imbra-ltd.github.io/milestones \
  --method POST --field title="v0.4.0"

# Assign issue to milestone
gh issue edit 8 --repo Imbra-Ltd/imbra-ltd.github.io --milestone "v0.4.0"
```

### Pull requests

```bash
gh pr create --repo Imbra-Ltd/imbra-ltd.github.io \
  --title "feat: description" \
  --body "## Summary\n..."

gh pr list --repo Imbra-Ltd/imbra-ltd.github.io
gh pr view 37 --repo Imbra-Ltd/imbra-ltd.github.io --json state,title
gh pr merge 37 --repo Imbra-Ltd/imbra-ltd.github.io
```

### Releases

```bash
gh release create v0.1.0 \
  --repo Imbra-Ltd/imbra-ltd.github.io \
  --title "v0.1.0" \
  --notes "Release notes here"

gh release list --repo Imbra-Ltd/imbra-ltd.github.io
```

---

## Content editing

All site content lives in `src/data/` as JSON. No component knowledge required.

| File | Controls |
|------|----------|
| `src/data/site.json` | Nav links, hero, contact section (incl. Formspree endpoint), footer |
| `src/data/services.json` | Services accordion — three pillars, each holding its service items |
| `src/data/process.json` | How-we-work section — the four engagement steps |
| `src/data/commitments.json` | Commitments section — what we think (beliefs) and what we commit to |
| `src/data/publications.json` | Research publications with DOI links, shown on `/about/` |
| `src/data/about.json` | About page — company, founder and research sections |
| `src/data/pricing.json` | Pricing page — all engagement models |
| `src/data/book.json` | Booking page — scheduling URL, call length, availability and the free-assessment explanation |

---

## Third-party services

| Service | Purpose | Config |
|---------|---------|--------|
| [Formspree](https://formspree.io) | Contact form → `contact@imbra.io` | `src/data/site.json` → `contact.formEndpoint` |
| Nextcloud Calendar (`cloud.imbra.io`) | Free-assessment scheduling, self-hosted on Hetzner Storage Share and linked out from `/book/` so no third-party script loads on imbra.io | `src/data/book.json` → `booking.url`, `booking.provider`, `booking.privacy` |

---

## Deployment

Pushing to `main` triggers GitHub Actions which builds and deploys to GitHub Pages automatically.

```bash
git checkout main
git push   # triggers deploy
```

Monitor: `https://github.com/Imbra-Ltd/imbra-ltd.github.io/actions`