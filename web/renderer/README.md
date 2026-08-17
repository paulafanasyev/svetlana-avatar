# Светлана WebGL renderer

This is the standalone renderer entry point for the avatar.

Current verified scope:
- WebGL2 context acquisition;
- deterministic canvas resize;
- shader compilation/linking;
- render loop;
- no external CDN dependency.

Not yet claimed:
- GLB loading;
- real model rendering;
- morph application on the GLB;
- screenshot of the real avatar.

The canonical binary model remains `assets/model/model_base.glb` and must be supplied through the repository's LFS/release path before model loading is enabled.
