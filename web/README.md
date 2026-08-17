# Svetlana Web runtime

## Build

```bash
cd web
npm ci
npm run build
```

The renderer uses Three.js + GLTFLoader and expects the canonical model at `/assets/model/model_base.glb`.

## Verification boundary

A successful build proves only that the web bundle compiles. It does not prove that the GLB is present or that a browser rendered Svetlana. Runtime and visual verification require serving the built app with the binary model available and capturing/reviewing a real screenshot.
