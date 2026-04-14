# SpamCop Automator – Copilot Agent Instructions

## Project Overview

**SpamCop Automator** is a browser extension for Chrome and Firefox that automates the
[SpamCop](https://www.spamcop.net/) spam-reporting workflow. SpamCop is a service that
lets users forward spam emails to a special address; the service then parses each email
and presents a confirmation page before sending abuse reports to the relevant networks.
Manually clicking "Send Report" for every queued message is tedious — this extension
automates that repetitive clicking.

The extension runs only on `https://www.spamcop.net/sc*` pages. When the page contains
exactly one `sendreport` form (i.e., a single ready-to-confirm report), it auto-submits
it. When there is no ready form, it looks for the first link whose URL or inner text
contains `sc?id=` (the pattern for individual report-confirmation URLs) and navigates
to it, which starts the next report in the queue.

---

## Repository Structure

```
SpamcopAutomator/
├── chrome/
│   ├── manifest.json     # MV3 manifest for Chrome
│   └── content.js        # Content script (Chrome-specific)
├── firefox/
│   ├── manifest.json     # MV3 manifest for Firefox
│   ├── background.js     # Minimal no-op background script (Firefox compatibility)
│   └── content.js        # Content script (Firefox-specific)
├── .gitignore
└── LICENSE
```

There is **no build system**, no `package.json`, no transpilation step, and no test
framework. All source files are plain ES5 JavaScript that are loaded directly by the
browser extension runtime.

---

## Technology Stack

| Area | Detail |
|---|---|
| Language | Vanilla JavaScript (ES5, IIFE pattern) |
| Extension API | WebExtensions API (Manifest Version 3) |
| Browsers supported | Google Chrome, Mozilla Firefox |
| Build tooling | None – files are used as-is |
| Tests | None present |
| Dependencies | None (no npm, no external libraries) |

---

## How the Extension Works

Both `chrome/content.js` and `firefox/content.js` execute the same logical flow inside
a self-invoking function (IIFE) on every matching page load:

1. **Auto-submit single report:** Call `document.getElementsByName('sendreport')`. If
   exactly one form is found, submit it immediately.

2. **Navigate to the next report:** If there is not exactly one form, scan all links
   (`document.links`) for one whose `href` or `innerHTML` contains `sc?id=` (case
   insensitive). The first match triggers a navigation to that link via
   `location.href = attrQuoteEscape(link.href)`.

Helper functions defined inside the IIFE:
- `htmlEscape(s)` – escapes `&`, `>`, `<` for HTML context.
- `attrQuoteEscape(s)` – escapes `&` and `"` for use in an HTML attribute/URL context;
  applied to all `href` values before assigning to `location.href` to prevent
  open-redirect XSS.

---

## Chrome vs. Firefox Differences

| Aspect | Chrome (`chrome/`) | Firefox (`firefox/`) |
|---|---|---|
| `manifest.json` | No `background` key | Has `"background": {"scripts": ["background.js"]}` |
| `background.js` | Not present | Present; is a no-op comment-only file |
| Link lookup fallback | Uses only `document.links` | Falls back to `document.getElementsByTagName('a')` when `document.links` is empty/null |
| Test hook | None | Checks `global.redirected`; if defined, writes the resolved URL there instead of navigating – used for unit testing without a real browser |

The `manifest.json` files are otherwise identical (same name, version, description,
permissions, host permissions, content script declaration, and `browser_specific_settings`
gecko ID `spamcop-automator@ghostwheel.kiwi`).

---

## Loading the Extension Locally

### Chrome
1. Open `chrome://extensions/`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** → select the `chrome/` folder

### Firefox
1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on…** → select `firefox/manifest.json`

To package for distribution:
- Chrome: zip the `chrome/` directory contents → rename to `.crx` or upload to Chrome
  Web Store
- Firefox: zip the `firefox/` directory contents → rename to `.xpi` or sign via AMO

---

## Known Issues and Quirks

1. **`.gitignore` blocks `*.md` files** – The repo's `.gitignore` previously contained
   `*.md` at the repository root, which would have prevented Markdown files from being
   tracked. A negation rule `!.github/**/*.md` was added so that files inside `.github/`
   (including this file) are still tracked by git. Any future Markdown files intended
   to be committed (e.g., a README) should either be placed under `.github/` or have a
   corresponding negation rule added to `.gitignore`.

2. **Unused helper `htmlEscape`** – The `htmlEscape` function is defined in both
   `content.js` files but is never called. It may be a leftover from an earlier
   implementation.

3. **Unused variable `n`** – In both content scripts, `var n = 0;` is declared but
   never read or written after that point. It is safe to remove.

4. **Dead condition `if (x != null)`** – The variable `x` is set to the string literal
   `'sc?id='` two lines earlier and can never be `null` at that point. The condition is
   always `true` and the `if` block is therefore unconditional.

5. **No automated tests** – The only test hook in the codebase is the `global.redirected`
   variable in `firefox/content.js`. There is no test runner, no spec files, and no CI
   configuration.

---

## Suggested Workflow for Agent Tasks

- **Making changes to the extension logic:** Edit `chrome/content.js` and
  `firefox/content.js` together, keeping them in sync except for the known intentional
  differences described above.
- **Adding new features:** Keep changes as minimal ES5-compatible JavaScript inside the
  IIFE; do not introduce a build system unless the scope of the change requires it.
- **Testing changes:** Load the unpacked extension in the browser (see above) and visit
  a real or mock SpamCop confirmation page. Since there are no automated tests, manual
  verification against the target URL pattern `https://www.spamcop.net/sc*` is the only
  option currently available.
- **Packaging:** The `.gitignore` already excludes `.crx` and `.xpi` artifacts.
