# Specification

## Summary
**Goal:** Fix broken/missing preloaded photo/audio assets and switch the friendship song to continuous background music that starts from the beginning.

**Planned changes:**
- Add the 6 uploaded WhatsApp JPEGs as public static assets and ensure they are accessible by direct URL in production (no 404s).
- Update the preloaded gallery photo list to reference the exact shipped filenames (including spaces/parentheses and “-1” suffixes) so all 6 render correctly.
- Remove the dedicated on-page “Our Friendship Song” section and implement continuous background music playback starting at timestamp 0, with a first-interaction fallback if autoplay is blocked.
- Bundle the MP3 at `/assets/audio/tamil-friendship-song.mp3` as a static public asset and ensure it loads in production without errors.
- Add a locally bundled fallback image so the Photos section always shows at least one valid image even if some preloaded photos fail to load.
- Store any newly generated fallback image under `frontend/public/assets/generated` and reference it via direct `/assets/generated/...` URLs.

**User-visible outcome:** The Photos section immediately shows a working preloaded gallery (no broken images), and the friendship song plays continuously in the background from the beginning (starting on first interaction if required), with no separate audio section shown.
