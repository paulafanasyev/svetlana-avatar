# Svetlana security/runtime QA matrix

| Check | Method | Status |
|---|---|---|
| Unsupported host command rejected | deterministic source/runtime test | static |
| External WebView navigation blocked | Android source inspection | static |
| Provider secrets absent from browser runtime | source inspection | static |
| TTS cancellation path exists | runtime source test | static |
| State transition validation | Node smoke test | deterministic |
| Viseme interpolation | Node smoke test | deterministic |
| Real WebGL2 rendering | browser/device | NOT YET RUN |
| Real Android APK execution | device/emulator | NOT YET RUN |
| Real TTS provider | configured runtime | NOT YET RUN |
| Real lip-sync against audio | device/browser | NOT YET RUN |

Do not promote a NOT YET RUN item to PASS without execution evidence.
