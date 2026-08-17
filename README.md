# Светлана — Realtime AI Avatar

Отдельный репозиторий аватара Светланы для повторного использования в **Мире Самозанятых** и других клиентах.

## Архитектура

AI → Host → TTS → Conversation Queue → Russian visemes → Native morphs → Lip-sync → Emotion → Gaze/Blink → Realtime Avatar

## Компоненты

- `runtime/` — web runtime и integration bridges
- `android/` — Android/WebView host
- `docs/` — интеграция и протокол
- `qa/` — честные результаты QA и визуальные regression references
- `avatar/` — модель, morph targets, visemes и анимационные ассеты

## Статус

Кодовые integration layers v9–v13 подготовлены. Реальный Android APK/WebGL2 device runtime пока не считается проверенным, пока не выполнен фактический запуск.

## Правило QA

Никаких чужих изображений вместо Светланы. Визуальным доказательством считаются только реальные рендеры/скриншоты проекта.
