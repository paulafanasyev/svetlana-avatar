# Светлана — verified model audit

The canonical local GLB was inspected as a binary glTF 2.0 asset.

## Verified

- File: `model_base.glb`
- Size: `43,580,292` bytes
- SHA-256: `9a65654d5de83f73201f9577b3fb44478d7ef6d0412b81c2467724a4de1151f5`
- Generator: `THREE.GLTFExporter r170`
- Scenes: 1
- Nodes: 2
- Meshes: 1
- Materials: 1
- Textures: 4
- Images: 4
- Skins: 0
- Animations: 0
- Morph targets: 11

## Morph targets found in the actual GLB

`blink_L`, `blink_R`, `browUp_L`, `browUp_R`, `jawOpen`, `mouthOpen`, `mouthSmile_L`, `mouthSmile_R`, `mouthPucker`, `mouthFunnel`, `mouthClose`.

## Important limitation

The inspected GLB contains facial morph targets but **zero skeletal animations** and no skin. Therefore the repository must not claim that body animation or a production facial rig is already present. Realtime facial behavior can be driven through morph targets; body/eye-bone animation requires a separate animation-capable asset or runtime layer.

This audit is structural/static verification. It is not a substitute for a real WebGL/Android render test.
