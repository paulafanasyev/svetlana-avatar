# Local Three.js runtime

The renderer must not depend on a CDN for Three.js or GLTFLoader in visual QA. Use the project package (`three`) and bundle it with Vite. GLTFLoader is an addon and should be imported from `three/addons/loaders/GLTFLoader.js` (the current Three.js package path). This keeps visual QA deterministic when the runner has no outbound network access.

Reference: Three.js documentation confirms GLTFLoader is an addon and supports binary `.glb` assets. See https://threejs.org/docs/
