# Integration contract

## Web

Load `runtime/svetlana-v9-bridge.js`, then `runtime/svetlana-v10-host.js`, then `runtime/svetlana-v11-tts-adapter.js`.

Primary commands:

- `ai.speech`
- `ai.cancel`
- `ai.stream.chunk`
- `ai.stream.end`
- `avatar.lookAt`
- `avatar.emotion`
- `avatar.stop`
- `host.ping`

## Android

Use the WebView host only with trusted local/HTTPS content. Keep provider API keys outside the WebView. Navigation must be allow-listed and the JS interface must never be exposed to arbitrary web content.

## Мир Самозанятых

The project should consume Светлана as a separate component rather than copying her runtime into the main application.
