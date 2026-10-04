"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Ghost as GhostIcon, Gift, Heart, Pause, Play, Sparkles, X } from "lucide-react";
import { landingRotation, prizeIndexForTicket, prizes, randomBelow, totalWeight, wheelPosition } from "../../lib/lucky-spin.mjs";
import styles from "./HalloweenSpin.module.css";
import HalloweenCelebration from "./HalloweenCelebration";
import { Bat, Cross, Ghost, Hills, HubPumpkin, Pumpkin, Spider, Web, ZombieHand } from "./HalloweenArt";

type Phase = "idle" | "spinning" | "reveal";

// Winner highlight (.55s) followed by the ghost rushing the camera (.85s).
const REVEAL_MS = 1400;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
function Brand({ decorative = false }: { decorative?: boolean }) {
  return <span className={styles.brand}><img src={`${basePath}/images/tic-clinic-logo.png`} alt={decorative ? "" : "TIC CLINIC"} width={1254} height={1254} draggable={false} /></span>;
}

function NightScenery() {
  return <div className={styles.nightScenery} aria-hidden="true">
    <span className={styles.moon} />
    <Web /><Web className={styles.webRight} />
    {[0, 1, 2].map((i) => <Bat key={i} className={styles[`nightBat${i}`]} />)}
    <Hills front />
    <Pumpkin className={styles.nightPumpkin0} /><Pumpkin className={styles.nightPumpkin1} />
    {/* Ghosts keep drifting up from below the fold; each one sways on its own rhythm. */}
    <div className={styles.flock}>{[[8, 0, 7.5, 74], [80, .25, 8.5, 92], [26, .7, 10, 58], [64, 1.1, 9, 66], [46, 2.4, 11, 50], [90, 3.6, 10, 60]].map(([x, delay, duration, size], i) => <span key={i} style={{ "--x": `${x}%`, "--delay": `${delay}s`, "--duration": `${duration}s`, "--size": `${size}px` } as CSSProperties}><Ghost /></span>)}</div>
  </div>;
}

export default function HalloweenSpin() {
  const [rotation, setRotation] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [camera, setCamera] = useState<string | null>(null);
  const [effectsPaused, setEffectsPaused] = useState(false);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [result, setResult] = useState<(typeof prizes)[number] | null>(null);
  const [resultClosing, setResultClosing] = useState(false);
  const [error, setError] = useState("");
  const locked = useRef(false);
  const pendingPrize = useRef<(typeof prizes)[number] | null>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useRef(false);
  const effectsOff = useRef(false);
  const savedOverflow = useRef<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const spinButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const cameraRig = useRef<HTMLDivElement>(null);
  const rim = useRef<HTMLDivElement>(null);

  function unlockScroll() {
    if (savedOverflow.current === null) return;
    document.documentElement.style.overflow = savedOverflow.current;
    savedOverflow.current = null;
  }

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { reducedMotion.current = preference.matches; };
    // The zoom is measured once per spin, so a rotated or resized screen falls back to the plain view.
    const resetCamera = () => setCamera(null);
    update();
    preference.addEventListener("change", update);
    window.addEventListener("resize", resetCamera);
    return () => {
      preference.removeEventListener("change", update);
      window.removeEventListener("resize", resetCamera);
      if (finishTimer.current) clearTimeout(finishTimer.current);
      if (revealTimer.current) clearTimeout(revealTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    if (!result || !dialog.current) return;
    if (!dialog.current.open) dialog.current.showModal();
    dialog.current.scrollTop = 0;
  }, [result]);

  /** Push the camera in until the whole wheel, pointer included, fills the screen. */
  function zoomIn() {
    if (!rim.current || !cameraRig.current || reducedMotion.current || effectsOff.current) return;
    const wheel = rim.current.getBoundingClientRect();
    const rig = cameraRig.current.getBoundingClientRect();
    const width = document.documentElement.clientWidth;
    const height = window.innerHeight;
    const scale = Math.min(1.6, Math.max(1.05, Math.min(width * .96, height * .8) / wheel.width));
    const focusX = wheel.left + wheel.width / 2;
    const focusY = wheel.top + wheel.height / 2;
    const x = width / 2 - rig.left - scale * (focusX - rig.left);
    const y = height * .52 - rig.top - scale * (focusY - rig.top);
    setCamera(`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${scale.toFixed(3)})`);
  }

  function showResult(reward: (typeof prizes)[number]) {
    revealTimer.current = null;
    setPhase("idle");
    setCamera(null);
    setResult(reward);
  }

  function finishSpin() {
    if (!pendingPrize.current) return;
    if (finishTimer.current) clearTimeout(finishTimer.current);
    finishTimer.current = null;
    const reward = pendingPrize.current;
    pendingPrize.current = null;
    setWinnerId(reward.id);
    if (reducedMotion.current || effectsOff.current) return showResult(reward);
    setPhase("reveal");
    revealTimer.current = setTimeout(() => showResult(reward), REVEAL_MS);
  }

  function spin() {
    // A synchronous lock blocks rapid taps before React renders the disabled state.
    if (locked.current) return;
    locked.current = true;
    setError("");
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : spinButton.current;
    try {
      const index = prizeIndexForTicket(randomBelow(totalWeight));
      pendingPrize.current = prizes[index];
      const jitter = randomBelow(17) - 8;
      // Lock scrolling before measuring so the zoom target cannot drift mid-spin.
      savedOverflow.current = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      zoomIn();
      setWinnerId(null);
      setPhase("spinning");
      setRotation((current) => landingRotation(current, index, jitter));
      // Fallback also finishes when background tabs suppress transition events.
      finishTimer.current = setTimeout(finishSpin, reducedMotion.current ? 120 : 6400);
    } catch {
      locked.current = false;
      pendingPrize.current = null;
      unlockScroll();
      setCamera(null);
      setPhase("idle");
      setError("ยังหมุนไม่ได้ กรุณาลองอีกครั้งหรือเปิดผ่านเบราว์เซอร์ที่รองรับ");
    }
  }

  function toggleEffects() {
    effectsOff.current = !effectsPaused;
    if (!effectsPaused) setCamera(null);
    setEffectsPaused(!effectsPaused);
  }

  function dismissResult() {
    if (closeTimer.current) return;
    setResultClosing(true);
    closeTimer.current = setTimeout(() => dialog.current?.close(), reducedMotion.current || effectsPaused ? 0 : 220);
  }

  function closeResult() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    setResultClosing(false);
    setResult(null);
    unlockScroll();
    locked.current = false;
    requestAnimationFrame(() => (returnFocus.current ?? spinButton.current)?.focus());
  }

  const spinning = phase === "spinning";
  const busy = phase !== "idle" || result !== null;

  return (
    <div className={styles.page} data-effects={effectsPaused ? "paused" : "on"} data-phase={phase}>
      <main className={styles.main}>
        <div ref={cameraRig} className={styles.camera} style={camera ? { transform: camera } : undefined}>
          <div className={styles.stage}>
          <div className={styles.scenery} aria-hidden="true">
            <Web /><Web className={styles.webRight} />
            <Spider />
            {[0, 1, 2, 3].map((i) => <Bat key={i} className={styles[`bat${i}`]} />)}
            {[12, 24, 39, 58, 71, 86].map((left, i) => <span key={i} className={styles.ember} style={{ left: `${left}%`, "--delay": `${-i * 1.7}s`, "--duration": `${9 + i % 3 * 2}s`, "--sway": `${i % 2 ? 34 : -28}px` } as CSSProperties} />)}
          </div>
          <div className={styles.hero}>
            {/* The wheel stands on this ground; on narrow screens the fill carries the purple on under the rewards. */}
            <div className={styles.ground} aria-hidden="true">
              <Hills />
              <Cross className={styles.cross0} /><Cross className={styles.cross1} />
              <ZombieHand />
              <Hills front />
              <Pumpkin className={styles.pumpkin2} /><Pumpkin className={styles.pumpkin0} /><Pumpkin className={styles.pumpkin1} />
              <Ghost className={styles.sceneGhost} />
            </div>
            <div className={styles.groundFill} aria-hidden="true" />
            <section className={styles.intro}>
              <div className={styles.eyebrow}><Gift size={19} strokeWidth={1.6} /> สิทธิ์พิเศษสำหรับคุณ</div>
              <p className={styles.kicker}>A LITTLE SPIN. A LOVELY GIFT.</p>
              <h1><span className={styles.halloween}>Halloween</span>TIC Lucky Spin</h1>
              <p className={styles.description}>หมุนรับของขวัญ<br />แทนคำขอบคุณจาก <strong>TIC Clinic</strong></p>
              <div className={styles.actions}>
                <button ref={spinButton} className={styles.primary} type="button" disabled={busy} onClick={spin}><Sparkles size={19} /> {busy && !result ? "กำลังลุ้นของขวัญ…" : "หมุนรับโชค"} <ArrowRight size={18} /></button>
                <a className={styles.secondary} href="#rewards"><Gift size={18} /> ดูของรางวัล</a>
              </div>
              <p className={styles.smallNote}><Heart size={16} /> เติมความสุขให้ทุกการดูแลตัวเอง</p>
              {error && <p className={styles.error} role="alert">{error}</p>}
            </section>

            <section className={styles.wheelSection} aria-label="วงล้อของรางวัล TIC Lucky Spin" aria-busy={phase !== "idle"}>
              <div className={styles.wheelWrap} data-state={spinning ? "spinning" : winnerId ? "won" : "idle"}>
                <div className={styles.pointer} aria-hidden="true"><div><Brand decorative /></div></div>
                <div ref={rim} className={styles.rim}>
                  <div className={styles.aura} aria-hidden="true" />
                  <div className={styles.lightTrail} aria-hidden="true" />
                  <div className={styles.wheelDust} aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <span key={i} style={{ ...wheelPosition(i, 16, 50), "--particle-delay": `${-(i % 7) * .6}s`, "--particle-size": `${i % 3 === 0 ? 1.8 : .85}cqw` } as CSSProperties} />)}</div>
                  {Array.from({ length: 32 }, (_, i) => <span key={i} className={styles.bulb} aria-hidden="true" style={{ ...wheelPosition(i, 32, 48.05), "--light-phase": -i / 32 } as CSSProperties} />)}
                  <div className={styles.wheel} style={{ "--rotation": `${rotation}deg` } as CSSProperties} aria-hidden="true" onTransitionEnd={(event) => { if (event.target === event.currentTarget && event.propertyName === "transform") finishSpin(); }}>
                    {prizes.map((prize, i) => <div key={prize.id} className={styles.labelPosition} style={wheelPosition(i, 10, 33)}>
                      <div className={styles.label} data-tone={i % 2 ? "night" : "cream"} data-winner={prize.id === winnerId ? "true" : undefined}><span className={styles.number}>{i + 1}</span><span>{prize.lines.map((line) => <span className={styles.labelLine} key={line}>{line}</span>)}</span></div>
                    </div>)}
                  </div>
                  <div className={styles.glassSheen} aria-hidden="true" />
                  <button className={styles.hub} type="button" disabled={busy} onClick={spin} aria-label={phase !== "idle" ? "กำลังหมุนวงล้อ" : "หมุนรับโชค"}><HubPumpkin className={styles.hubPumpkin} /><span>{phase !== "idle" ? "ลุ้น" : "กด"}</span><strong>{phase !== "idle" ? "โชค" : "หมุน"}</strong></button>
                </div>
                <div className={styles.pedestal} aria-hidden="true" />
              </div>
              <div className={styles.wheelControls}>
                <p className={styles.wheelCaption}>{phase !== "idle" ? "YOUR LOVELY SURPRISE IS ON ITS WAY" : "YOUR LUCKY MOMENT STARTS HERE"}</p>
                <button className={styles.effectsToggle} type="button" onClick={toggleEffects}>{effectsPaused ? <Play size={11} /> : <Pause size={11} />}{effectsPaused ? "เปิดเอฟเฟกต์" : "พักเอฟเฟกต์"}</button>
              </div>
              <p className={styles.srOnly} role="status">{phase !== "idle" ? "วงล้อกำลังหมุน กรุณารอผลรางวัล" : result ? `คุณได้รับ ${result.name}` : "วงล้อพร้อมแล้ว กดหมุนรับโชคได้เลย"}</p>
            </section>

            <aside className={styles.rewards} id="rewards" aria-labelledby="rewards-title">
              <div className={styles.rewardsHeading}><span className={styles.giftBadge}><Gift size={20} /></span><div><p>A GIFT FOR YOU</p><h2 id="rewards-title">รายการของรางวัล</h2></div></div>
              <div className={styles.listHeading}><span>ของขวัญพิเศษ</span><span>มูลค่า</span></div>
              <ol className={styles.prizeList}>{prizes.map((prize, i) => <li key={prize.id} data-winner={prize.id === winnerId ? "true" : undefined}><span className={styles.listNumber}>{i + 1}</span><span>{prize.name}</span><strong>{prize.valueBaht.toLocaleString("th-TH")} <small>บาท</small></strong></li>)}</ol>
              <p className={styles.terms}><Gift size={17} /><span>ของรางวัลไม่สามารถแลกเปลี่ยน<br />เป็นเงินสดได้</span></p>
            </aside>
          </div>
          </div>

          <div className={styles.below}>
            <section className={styles.features} aria-label="ของขวัญจาก TIC Clinic">
              <div><span><GhostIcon /></span><p><strong>ช่วงเวลาพิเศษของคุณ</strong><small>ให้ทุกการหมุนเป็นความสุข</small></p></div>
              <div><span><Gift /></span><p><strong>ของขวัญที่ตั้งใจเลือก</strong><small>บริการและโปรแกรมจาก TIC Clinic</small></p></div>
              <div><span><Heart /></span><p><strong>ด้วยความขอบคุณจากเรา</strong><small>อีกหนึ่งความใส่ใจที่อยากมอบให้คุณ</small></p></div>
            </section>
          </div>
        </div>
      </main>

      <div className={styles.vignette} aria-hidden="true" />
      {phase === "reveal" && <div className={styles.reveal} aria-hidden="true"><Ghost /></div>}

      <dialog ref={dialog} className={styles.resultDialog} data-closing={resultClosing ? "true" : undefined} aria-labelledby="result-title" aria-describedby="result-description" onClose={closeResult} onCancel={(event) => { event.preventDefault(); dismissResult(); }} onClick={(event) => { if (event.target === event.currentTarget) dismissResult(); }}>
        {result && <>
          <NightScenery />
          <HalloweenCelebration active={!effectsPaused && !resultClosing} />
          <div className={styles.flash} aria-hidden="true" />
          <div className={styles.cardWrap}>
            <Ghost className={styles.heroGhost} />
            <div className={styles.resultCard}>
              <button className={styles.closeButton} autoFocus onClick={dismissResult} aria-label="ปิดผลรางวัล" type="button"><X size={19} /></button>
              <div className={styles.resultIdentity}><Brand /><span>TIC LUCKY SPIN<small>A GIFT FOR YOU</small></span></div>
              <div className={styles.resultIntro}><span className={styles.resultGift} aria-hidden="true"><Gift size={29} strokeWidth={1.35} /></span><p>ของขวัญดี ๆ ของคุณ</p><h2 id="result-title">ยินดีด้วย<span>!</span></h2></div>
              <div className={styles.rewardRule} aria-hidden="true"><span>✦</span></div>
              <div id="result-description" className={styles.rewardDetails}>
                <p>คุณได้รับ</p>
                <div className={styles.prizeReveal}><h3>{result.name}</h3></div>
                <div className={styles.resultValue}><span>มูลค่าของรางวัล</span><strong>{result.valueBaht.toLocaleString("th-TH")} <small>บาท</small></strong></div>
              </div>
              <p className={styles.resultThanks}>ขอบคุณที่ให้ TIC Clinic ดูแลคุณ</p>
              <button className={styles.resultAccept} onClick={dismissResult} type="button">เรียบร้อย <ArrowRight size={17} /></button>
              <p className={styles.resultTerms}>ของรางวัลไม่สามารถแลกเปลี่ยนเป็นเงินสดได้</p>
            </div>
          </div>
        </>}
      </dialog>
    </div>
  );
}
