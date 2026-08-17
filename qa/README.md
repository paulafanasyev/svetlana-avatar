# QA evidence policy

Browser visual QA produces an artifact only when Chromium actually executes the renderer. A workflow file is not evidence of a successful render.

Evidence levels:
- `STATIC`: source inspected only.
- `DETERMINISTIC`: automated non-browser test passed.
- `RUNTIME`: browser/device executed the code.
- `VISUAL`: screenshot artifact was produced and inspected.

Never label the avatar `VISUAL PASS` without an actual screenshot artifact from the canonical model.
