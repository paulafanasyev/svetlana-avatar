# WebGL runtime policy

The renderer must explicitly detect WebGL capability before loading the avatar. Headless environments without GPU/WebGL must fail as `WEBGL_UNAVAILABLE`, not produce a false visual pass.

CI visual evidence requires:
- a browser with WebGL enabled;
- canonical `model_base.glb`;
- `data-svetlana-ready=true`;
- a screenshot artifact;
- manual inspection of that artifact.

A fallback WebGL1 context is allowed only for capability diagnostics; the canonical avatar renderer remains WebGL2-targeted.
