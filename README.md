# Svetlana Avatar

Standalone realtime Russian-speaking avatar component for web and Android.

## Pipeline

AI response → TTS → phoneme timeline → SvetlanaBridge → Russian visemes → facial morphs → emotion/gaze/blink → realtime render.

## Repository status

The repository contains the runtime contracts, morph manifest, Android host sources, integration documentation and asset manifests. Large binary model assets are tracked by SHA-256/LFS metadata and must only be marked present after the actual binary object has been uploaded and verified.

## Verification rule

- **Static**: source/config inspection and JS syntax checks.
- **Deterministic**: offline protocol tests without network providers.
- **Runtime**: browser/WebView/device execution.
- **Visual**: screenshots captured from the actual Svetlana runtime.

These categories are never conflated.

## Integration

See `docs/INTEGRATION_CONTRACT.md` and `docs/INTEGRATION.md`.
