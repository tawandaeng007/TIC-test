# TIC Lucky Spin versions

Repository: `tawandaeng007/TIC-test`
Live spin URL: `https://tawandaeng007.github.io/TIC-test/roulette/`
GitHub Pages publishes `main` from `/docs`.

## Halloween version (2026-10-04)

`app/roulette/page.tsx` uses `app/halloween-spin/HalloweenSpin.tsx` so existing QR codes and links open the Halloween version. The standalone `/halloween-spin/` route is also available.

## Restore the original version

The original published version is preserved by Git tag `spin-before-halloween-2026-10-04` at commit `d03a070a53c20ba5d19cefd8a68b724772f98c33`.

When the owner requests “กลับมาเวอร์ชันเดิม”, restore only `app/roulette/page.tsx` from that tag. Original components `app/roulette/LuckySpin.tsx`, `LuckySpin.module.css`, and `PrizeCelebration.tsx` remain in place. Rebuild using `npm run build:pages`, verify `/roulette/`, commit the restored route and generated `/docs` files, and push `main` to this repository. Preserve unrelated local work.

Do not modify `approval-site`, repository `ticclinicth/TIC-Clinic`, or deployment `ticclinicth.com` for a spin-version switch.

Both versions use `lib/lucky-spin.mjs`. Gold has weight `0` and cannot be selected. Keep prize weights and values unchanged when changing the theme. Verify with `npm run test:spin`.
