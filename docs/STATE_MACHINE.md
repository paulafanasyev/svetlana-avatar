# Svetlana runtime state machine

States:
- idle: breathing/blink/gaze only
- listening: attention + subtle gaze
- thinking: reduced mouth motion, active gaze
- speaking: TTS-driven visemes + emotion
- interrupted: immediate audio/mouth stop, return to listening/idle
- error: safe neutral fallback

Transitions must cancel the active speech request before accepting a new one.
