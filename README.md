# Sports Station - Ctrl+Click Fix

A browser fix that enables **Ctrl+Click** and **middle-click** to open product cards in a new tab on [sportsstation.id](https://www.sportsstation.id).

## The Problem

Sports Station uses a Vue.js SPA that intercepts all click events and navigates using `window.location.href`, bypassing the browser's native Ctrl+Click behavior. This makes it impossible to open products in a new tab the normal way.

## ⚠️ Important: Where This Works

The fix only works on **product listing pages**, not the homepage.

✅ Works:
- `https://www.sportsstation.id/skechers.html`
- `https://www.sportsstation.id/search/skechers.html?q=skechers`
- Any page with a search or brand filter applied

❌ Does NOT work:
- `https://www.sportsstation.id/` (homepage)
- Any page without product cards loaded

**If you're on the homepage**, use the search bar or click a brand/category first, then apply the script.

## Solution 1: Console Script (Quick)

1. Go to a product listing page (e.g. [sportsstation.id/skechers.html](https://www.sportsstation.id/skechers.html))
2. Make sure products are visible on the page
3. Open DevTools (`F12`) → Console tab
4. Copy the contents of [`enable.txt`](./enable.txt) and paste it into the console
5. Press Enter
6. You should see `parent patched!` — you're done!

Now **Ctrl+Click** any product card to open it in a new tab.

> ⚠️ You need to repeat this every time you refresh the page.

## Solution 2: Chrome Extension (Permanent)

For a permanent fix that runs automatically on every visit:

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked**
5. Select the `sportsstation-fix` folder
6. Done — the fix runs automatically on every visit!

> The extension uses `"world": "MAIN"` to run in the page's own JS context,
> which is required to access Vue component internals.

## How It Works

The fix patches the `handleGoDetails` method on the Vue parent component (`SearchResultListComponent`). When a Ctrl+Click or middle-click is detected, instead of letting the method run `window.location.href = p.pdpUrl` (same tab), it calls `window.open(p.pdpUrl, '_blank')` (new tab).

## Why Tampermonkey Doesn't Work

Tampermonkey runs in an isolated sandbox that cannot access the page's Vue component instances (`__vue__`), even with `@grant unsafeWindow`. The Chrome extension approach works because it explicitly sets `"world": "MAIN"` in the manifest.

## Files

- `enable.txt` — Console script for quick one-time use
- `manifest.json` — Chrome extension manifest
- `content.js` — Chrome extension content script