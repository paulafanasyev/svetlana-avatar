# Svetlana Avatar release policy

## Current baseline

The repository is the standalone home for the Svetlana avatar runtime.
The intended pipeline is:

AI response → TTS provider → audio/phoneme timeline → SvetlanaBridge → Russian visemes → native morphs → emotion/gaze/blink → realtime avatar.

## Integration rule

The `mir-samozanyatykh` project should consume this repository as a component rather than copying the avatar implementation into its own source tree.

## Verification rule

A feature is not marked runtime-verified until it has been executed in the target browser/device environment. Static syntax checks, source inspection, and deterministic tests are reported separately.

## Security

Provider credentials must stay server-side/native. The browser runtime must only receive short-lived or same-origin/blob audio resources. Android/WebView commands must use an explicit allow-list.
