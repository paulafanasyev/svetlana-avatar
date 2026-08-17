# Next runtime gate

The repository is ready for the first real browser evidence run.

Gate sequence:
1. canonical `model_base.glb` is made available at the renderer asset path;
2. `npm ci` and production build pass;
3. Chromium is installed and starts the renderer;
4. GLB loads successfully;
5. all 11 canonical morph targets are found;
6. visual smoke applies morphs;
7. screenshot artifact is uploaded;
8. screenshot is manually inspected before calling it a visual pass.

The binary LFS upload remains separate because the current GitHub text-file API cannot transfer the 43.6 MB local GLB object.
