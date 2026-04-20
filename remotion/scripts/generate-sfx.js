/**
 * Synthetic SFX generation is intentionally disabled.
 *
 * The Remotion composition now uses real UI sound effects stored in `public/`
 * instead of procedurally synthesized tones. See `public/SFX_SOURCES.md` for
 * the source pack and file mapping.
 */

console.error(
  [
    "Synthetic SFX generation has been retired.",
    "This project now uses real CC0 sound effects in public/.",
    "See public/SFX_SOURCES.md for the current asset mapping.",
  ].join("\n"),
);

process.exit(1);
