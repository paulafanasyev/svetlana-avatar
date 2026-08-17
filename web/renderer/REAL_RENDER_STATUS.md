# Real render status

This renderer now has a real GLB binary parser and model contract verifier. It is intentionally not claiming a visual model render yet.

Verified source facts for the canonical local model:
- GLB 2.0
- 1 scene
- 2 nodes
- 1 mesh
- 1 material
- 4 textures
- 4 embedded images
- 0 skins
- 0 animations
- 11 facial morph targets

The browser render is considered **runtime verified** only after the canonical binary is served to `web/renderer/`, loaded by `model-loader.js`, and a real browser/device screenshot is captured and reviewed.

Do not substitute a stock or unrelated avatar image for this evidence.
