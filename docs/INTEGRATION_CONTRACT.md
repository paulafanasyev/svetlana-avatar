# Integration contract for Мир Самозанятых

## Web

Load the trusted Svetlana runtime and call:

```js
SvetlanaHost.command({
  type: 'ai.speech',
  payload: {
    text: 'Привет!',
    emotion: 'neutral',
    phonemes: []
  }
});
```

## Supported commands

- `ai.speech`
- `ai.cancel`
- `ai.stream.chunk`
- `ai.stream.end`
- `avatar.lookAt`
- `avatar.emotion`
- `avatar.stop`
- `host.ping`

## TTS

Register a provider with `SvetlanaTTSAdapter.register(name, provider)`.
The provider must expose `synthesize({text, voice, locale, signal})` and return `audioUrl` or `audioBlob`.

Never put provider API keys into this repository or into browser JavaScript.
