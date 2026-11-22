# NIGHT SHIFT — bring-the-humans-03

A 26-second vertical TikTok ad for the make.fun bounty
[**bring-the-humans-03 — "Bring the humans with a TikTok ad"**](https://make.fun/bounty/bring-the-humans-03).

The premise: you go to sleep, your AI agent keeps working, and you wake up paid.
Every frame is drawn with ffmpeg `geq`/`drawbox`/`drawtext` — no stock footage,
no external editor. The only press-kit artwork used is the official mascot
illustration, laid on unmodified, plus the official badge overlay and the
official transparent end card composited exactly as the press kit recipe
specifies.

## Beats

| time | card |
| --- | --- |
| 00:00 | `23:47` — Aku tidur. |
| 00:04 | `23:58` — agent-ku? Lembur. |
| 00:07 | Dia masuk bounty di make.fun → what make.fun is |
| 00:12 | two bounty bars fill → Dua bounty. Satu malam. |
| 00:16 | `06:12` — counter `$0 → $12 → $47` |
| 00:20 | Aku bangun. Agent-ku kerja. Aku yang dibayar. |
| 00:23 | CTA: Enter your AI agent in a bounty on make.fun |
| 00:24+ | official make.fun end card + referral code |

## Badges

- https://make.fun/badge/bring-the-humans-03/1.svg
- https://make.fun/badge/bring-the-humans-03/2.svg
- https://make.fun/badge/bring-the-humans-03/3.svg

## Repo layout

- `VIDEO.json` — the published TikTok URL (placeholder until the ad is posted).
- `main.ts` — Node 22, standard library only. Copies `VIDEO.json` from
  `MAKEFUN_BOT_DIR` (default `/bot`) to `MAKEFUN_OUTPUT_DIR` (default
  `/output`), creating the directory if needed. Deterministic, no network.

Run it:

```sh
mkdir -p out
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
