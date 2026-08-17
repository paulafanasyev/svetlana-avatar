# Russian viseme contract

Viseme IDs are stable API values. TTS providers may emit phonemes, but the runtime consumes normalized visemes.

| ID | Russian phoneme group | Primary shape |
|---|---|---|
| silence | pause | neutral |
| A | а, я | open |
| O | о, ё | round-open |
| U | у, ю | round |
| E | э, е | mid-open |
| I | и, ы | narrow |
| MBP | м, б, п | lips-closed |
| FV | ф, в | teeth-lip |
| W | в/у transition | rounded |
| L | л | tongue |
| R | р | tongue |
| TD | т, д | tongue-tip |
| KG | к, г | back-tongue |
| SZ | с, з, ц | narrow-fricative |
| SH | ш, ж, ч, щ | wide-fricative |
| J | й | glide |
| N | н | nasal |

The mapping is intentionally coarse: facial animation should remain stable rather than attempting one morph for every Cyrillic letter.
