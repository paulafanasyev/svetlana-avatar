# Svetlana v13.1 QA matrix

| Layer | Status | Evidence |
|---|---|---|
| JS syntax | static | Node `--check` |
| JSON manifests | static | parser |
| Russian viseme normalization | deterministic | no-network unit harness |
| TTS provider | contract only | provider interface |
| WebGL render | not runtime-verified | requires browser execution |
| Android build | not runtime-verified | requires Android SDK/Gradle |
| Real screenshot | not runtime-verified | must come from actual project runtime |
| Binary GLB in GitHub LFS | pending | pointer/checksum exists; object upload required |
