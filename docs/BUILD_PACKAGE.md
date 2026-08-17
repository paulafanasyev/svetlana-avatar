# Reproducible build package

## Runtime order

1. `runtime/russian-visemes.js`
2. `runtime/svetlana-v13-runtime.js`
3. `runtime/svetlana-state-machine.js`
4. `runtime/svetlana-realtime-controller.js`
5. `runtime/svetlana-v11-tts-adapter.js`
6. `runtime/svetlana-v10-host.js`
7. `runtime/svetlana-runtime-entry.js`

The entrypoint is loaded last so its readiness check sees the complete runtime.

## Model

The canonical model is `avatar/model/model_base.glb` and must match the SHA-256 in `avatar/model/ASSET_MANIFEST.json`. The repository currently contains the LFS metadata/pointer, not the binary object. This is deliberate until the exact bytes are uploaded.

## Android

`android/MainActivity.kt` is the hardened WebView host source. A release APK is not considered built until Gradle/Android SDK execution succeeds and the resulting APK is inspected and launched.

## Verification

Static source checks, deterministic tests, device runtime tests and visual screenshots are separate evidence classes.
