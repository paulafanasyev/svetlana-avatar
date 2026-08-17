# Security policy

- Never commit TTS/AI provider secrets.
- Browser audio URLs must be same-origin or controlled blob/data URLs.
- Android WebView commands are allow-listed.
- Do not attach the JavaScript bridge to arbitrary remote pages.
- Do not trust client-supplied user IDs or authorization claims.
- Real runtime/device tests must be reported separately from static checks.
