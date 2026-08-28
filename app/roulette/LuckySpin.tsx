"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Gift, Heart, Pause, Play, Sparkles, X } from "lucide-react";
import { landingRotation, prizeIndexForTicket, prizes, randomBelow, totalWeight, wheelPosition } from "../../lib/lucky-spin.mjs";
import styles from "./LuckySpin.module.css";
import PrizeCelebration from "./PrizeCelebration";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
function Brand({ decorative = false }: { decorative?: boolean }) {
  return <span className={styles.brand}><img src={`${basePath}/images/tic-clinic-logo.png`} alt={decorative ? "" : "TIC CLINIC"} width={1254} height={1254} draggable={false} /></span>;
}

function RewardScenery({ fullScreen = false }: { fullScreen?: boolean }) {
  return <div className={`${styles.cardScenery} ${fullScreen ? styles.fullscreenScenery : ""}`} aria-hidden="true">
    <div className={styles.cardSilk} /><div className={styles.cardSilkSecond} /><div className={styles.cardSilkThird} />
    <div className={styles.cardFoils}>{[23, 17, 42, 33, 60, 51, 73, 68].map((top, i) => <i key={i} style={{ left: `${i % 2 === 0 ? 6 + i % 5 : 90 - i % 4}%`, top: `${top}%`, transform: `rotate(${i * 27 + 20}deg)` }} />)}</div>
    <div className={styles.cardStars}>{[18, 30, 47, 61, 76, 88].map((top, i) => <i key={i} style={{ left: `${i % 2 === 0 ? 9 : 90}%`, top: `${top}%`, animationDelay: `${i * -.6}s` }} />)}</div>
  </div>;
}

export default function LuckySpin() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [effectsPaused, setEffectsPaused] = useState(false);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [result, setResult] = useState<(typeof prizes)[number] | null>(null);
  const [resultClosing, setResultClosing] = useState(false);
  const [error, setError] = useState("");
  const locked = useRef(false);
  const pendingPrize = useRef<(typeof prizes)[number] | null>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const spinButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { reducedMotion.current = preference.matches; };
    update();
    preference.addEventListener("change", update);
    return () => {
      preference.removeEventListener("change", update);
      if (finishTimer.current) clearTimeout(finishTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!result || !dialog.current) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    if (!dialog.current.open) dialog.current.showModal();
    dialog.current.scrollTop = 0;
    return () => { document.documentElement.style.overflow = previousOverflow; };
  }, [result]);

  function finishSpin() {
    if (!pendingPrize.current) return;
    if (finishTimer.current) clearTimeout(finishTimer.current);
    finishTimer.current = null;
    const reward = pendingPrize.current;
    pendingPrize.current = null;
    setSpinning(false);
    setWinnerId(reward.id);
    setResult(reward);
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
      setWinnerId(null);
      setSpinning(true);
      setRotation((current) => landingRotation(current, index, jitter));
      // Fallback also finishes when background tabs suppress transition events.
      finishTimer.current = setTimeout(finishSpin, reducedMotion.current ? 120 : 6400);
    } catch {
      locked.current = false;
      pendingPrize.current = null;
      setSpinning(false);
      setError("ยังหมุนไม่ได้ กรุณาลองอีกครั้งหรือเปิดผ่านเบราว์เซอร์ที่รองรับ");
    }
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
    locked.current = false;
    requestAnimationFrame(() => (returnFocus.current ?? spinButton.current)?.focus());
  }

  const busy = spinning || result !== null;

  return (
    <div className={styles.page} data-effects={effectsPaused ? "paused" : "on"}>
      <main className={styles.main}>
        <div className={styles.scenery} aria-hidden="true">
          <div className={styles.silkOne} /><div className={styles.silkTwo} /><div className={styles.silkThree} />
          {[0, 1, 2, 3, 4].map((i) => <span key={i} className={`${styles.bubble} ${styles[`bubble${i}`]}`} />)}
          {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className={styles.sparkle} style={{ "--i": i } as CSSProperties} />)}
        </div>

        <div className={styles.hero}>
          <section className={styles.intro}>
            <div className={styles.eyebrow}><Gift size={19} strokeWidth={1.6} /> สิทธิ์พิเศษสำหรับคุณ</div>
            <p className={styles.kicker}>A LITTLE SPIN. A LOVELY GIFT.</p>
            <h1><span>TIC</span> Lucky<br />{" "}Spin<span className={styles.titleSpark}>✧</span></h1>
            <p className={styles.description}>หมุนรับของขวัญ<br />แทนคำขอบคุณจาก <strong>TIC Clinic</strong></p>
            <div className={styles.actions}>
              <button ref={spinButton} className={styles.primary} type="button" disabled={busy} onClick={spin}><Sparkles size={19} /> {spinning ? "กำลังลุ้นของขวัญ…" : "หมุนรับโชค"} <ArrowRight size={18} /></button>
              <a className={styles.secondary} href="#rewards"><Gift size={18} /> ดูของรางวัล</a>
            </div>
            <p className={styles.smallNote}><Heart size={16} /> เติมความสุขให้ทุกการดูแลตัวเอง</p>
            {error && <p className={styles.error} role="alert">{error}</p>}
          </section>

          <section className={styles.wheelSection} aria-label="วงล้อของรางวัล TIC Lucky Spin" aria-busy={spinning}>
            <div className={styles.wheelWrap} data-state={spinning ? "spinning" : winnerId ? "won" : "idle"}>
              <div className={styles.pointer} aria-hidden="true"><div><Brand decorative /></div></div>
              <div className={styles.rim}>
                <div className={styles.aura} aria-hidden="true" />
                <div className={styles.lightTrail} aria-hidden="true" />
                <div className={styles.wheelDust} aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <span key={i} style={{ ...wheelPosition(i, 16, 50), "--particle-delay": `${-(i % 7) * .6}s`, "--particle-size": `${i % 3 === 0 ? 1.8 : .85}cqw` } as CSSProperties} />)}</div>
                {Array.from({ length: 32 }, (_, i) => <span key={i} className={styles.bulb} aria-hidden="true" style={{ ...wheelPosition(i, 32, 48.05), "--light-phase": -i / 32 } as CSSProperties} />)}
                <div className={styles.wheel} style={{ "--rotation": `${rotation}deg` } as CSSProperties} aria-hidden="true" onTransitionEnd={(event) => { if (event.target === event.currentTarget && event.propertyName === "transform") finishSpin(); }}>
                  {prizes.map((prize, i) => <div key={prize.id} className={styles.labelPosition} style={wheelPosition(i, 10, 33)}>
                    <div className={styles.label} data-winner={prize.id === winnerId ? "true" : undefined}><span className={styles.number}>{i + 1}</span><span>{prize.lines.map((line) => <span className={styles.labelLine} key={line}>{line}</span>)}</span></div>
                  </div>)}
                </div>
                <div className={styles.glassSheen} aria-hidden="true" />
                <button className={`${styles.hub} ${spinning ? styles.hubSpinning : ""}`} type="button" disabled={busy} onClick={spin} aria-label={spinning ? "กำลังหมุนวงล้อ" : "หมุนรับโชค"}><span>{spinning ? "ลุ้น" : "กด"}</span><strong>{spinning ? "โชค" : "หมุน"}</strong><Sparkles /></button>
              </div>
              <div className={styles.pedestal} aria-hidden="true" />
            </div>
            <div className={styles.wheelControls}>
              <p className={styles.wheelCaption}>{spinning ? "YOUR LOVELY SURPRISE IS ON ITS WAY" : "YOUR LUCKY MOMENT STARTS HERE"}</p>
              <button className={styles.effectsToggle} type="button" onClick={() => setEffectsPaused((paused) => !paused)}>{effectsPaused ? <Play size={11} /> : <Pause size={11} />}{effectsPaused ? "เปิดเอฟเฟกต์" : "พักเอฟเฟกต์"}</button>
            </div>
            <p className={styles.srOnly} role="status">{spinning ? "วงล้อกำลังหมุน กรุณารอผลรางวัล" : result ? `คุณได้รับ ${result.name}` : "วงล้อพร้อมแล้ว กดหมุนรับโชคได้เลย"}</p>
          </section>

          <aside className={styles.rewards} id="rewards" aria-labelledby="rewards-title">
            <div className={styles.rewardsHeading}><span className={styles.giftBadge}><Gift size={20} /></span><div><p>A GIFT FOR YOU</p><h2 id="rewards-title">รายการของรางวัล</h2></div></div>
            <div className={styles.listHeading}><span>ของขวัญพิเศษ</span><span>มูลค่า</span></div>
            <ol className={styles.prizeList}>{prizes.map((prize, i) => <li key={prize.id} data-winner={prize.id === winnerId ? "true" : undefined}><span className={styles.listNumber}>{i + 1}</span><span>{prize.name}</span><strong>{prize.valueBaht.toLocaleString("th-TH")} <small>บาท</small></strong></li>)}</ol>
            <p className={styles.terms}><Gift size={17} /><span>ของรางวัลไม่สามารถแลกเปลี่ยน<br />เป็นเงินสดได้</span></p>
          </aside>
        </div>

        <section className={styles.features} aria-label="ของขวัญจาก TIC Clinic">
          <div><span><Sparkles /></span><p><strong>ช่วงเวลาพิเศษของคุณ</strong><small>ให้ทุกการหมุนเป็นความสุข</small></p></div>
          <div><span><Gift /></span><p><strong>ของขวัญที่ตั้งใจเลือก</strong><small>บริการและโปรแกรมจาก TIC Clinic</small></p></div>
          <div><span><Heart /></span><p><strong>ด้วยความขอบคุณจากเรา</strong><small>อีกหนึ่งความใส่ใจที่อยากมอบให้คุณ</small></p></div>
        </section>
      </main>

      <dialog ref={dialog} className={styles.resultDialog} data-closing={resultClosing ? "true" : undefined} aria-labelledby="result-title" aria-describedby="result-description" onClose={closeResult} onCancel={(event) => { event.preventDefault(); dismissResult(); }} onClick={(event) => { if (event.target === event.currentTarget) dismissResult(); }}>
        {result && <>
          <RewardScenery fullScreen />
          <PrizeCelebration active={!effectsPaused && !resultClosing} />
          <div className={styles.resultCard}>
            <RewardScenery />
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
        </>}
      </dialog>
    </div>
  );
}
