# Specification

## Summary
**Goal:** Turn the Photos section into a “Ghibli storybook birthday surprise” gallery using 6 static couple illustrations, and remove all photo upload functionality.

**Planned changes:**
- Remove the photo upload UI/CTA from the Photos section, along with the hidden file input, upload handler logic, and any unused Upload icon import.
- Replace the current preloaded photo list with exactly 6 new static Ghibli-style couple images (study with laptop; biscuits & tea; gym workout; joyful dancing; bike ride together; “heart within us”) and ensure the slider displays these images.
- Update the Photos section heading and light framing text/styling to an English, storybook-themed presentation while keeping the existing page structure (hero → messages → photos).
- Add the 6 images as static files under `frontend/public/assets/generated/` and reference them directly via `/assets/generated/<filename>.png` (no backend involvement).

**User-visible outcome:** Visitors see a storybook-style Photos section with a 6-image Ghibli-inspired couple gallery and can browse the slider, but can no longer upload photos.
