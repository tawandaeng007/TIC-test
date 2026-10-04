import styles from "./HalloweenSpin.module.css";

type ArtProps = { className?: string };

const pumpkinFace = "M50 80l38 14-27 13zM150 80l-38 14 27 13zM100 100l-8 13h16zM46 120l17 8 10-8 13 12 14-10 14 10 13-12 10 8 17-8c-5 26-28 38-54 38s-49-12-54-38z";

/** Jack-o'-lantern; the face is drawn twice so the candle glow can flicker over a dark base. */
export function Pumpkin({ className = "" }: ArtProps) {
  return <svg className={`${styles.pumpkin} ${className}`} viewBox="0 0 200 172" aria-hidden="true">
    <path d="M93 36C90 19 98 7 113 2l9 11c-9 4-12 12-10 23z" fill="#6f9a30" />
    <ellipse cx="56" cy="104" rx="50" ry="60" fill="#e96d0c" />
    <ellipse cx="144" cy="104" rx="50" ry="60" fill="#e96d0c" />
    <ellipse cx="78" cy="103" rx="44" ry="64" fill="#f58310" />
    <ellipse cx="122" cy="103" rx="44" ry="64" fill="#f58310" />
    <ellipse cx="100" cy="102" rx="34" ry="66" fill="#ff9a1f" />
    <path d={pumpkinFace} fill="#3b1206" />
    <path className={styles.pumpkinGlow} d={pumpkinFace} />
  </svg>;
}

/** Faceless pumpkin that sits behind the hub label. */
export function HubPumpkin({ className = "" }: ArtProps) {
  return <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M46 13C45 6 49 2 56 0l4 6c-4 2-5 5-4 9z" fill="#6f9a30" />
    <ellipse cx="29" cy="54" rx="27" ry="40" fill="#e96d0c" />
    <ellipse cx="71" cy="54" rx="27" ry="40" fill="#e96d0c" />
    <ellipse cx="40" cy="54" rx="23" ry="43" fill="#f58310" />
    <ellipse cx="60" cy="54" rx="23" ry="43" fill="#f58310" />
    <ellipse cx="50" cy="54" rx="17" ry="45" fill="#ffa02a" />
    <ellipse cx="40" cy="30" rx="12" ry="7" fill="#fff" opacity=".22" />
  </svg>;
}

export function Ghost({ className = "" }: ArtProps) {
  return <svg className={`${styles.ghost} ${className}`} viewBox="0 0 120 140" aria-hidden="true">
    <path d="M60 6C30 6 14 30 14 62v58c0 11 9 13 16 5 6-7 12-7 18 0 6 7 13 7 19 0 6-7 12-7 18 0 7 8 21 6 21-5V62C106 30 90 6 60 6z" fill="#fffaf0" />
    <path d="M92 40c6 12 6 26 6 40v38c0 4-2 6-5 7 9 3 13-1 13-5V62c0-9-2-18-6-26z" fill="#eadfce" opacity=".7" />
    <ellipse cx="45" cy="50" rx="6.5" ry="9.5" fill="#2a0e4a" />
    <ellipse cx="75" cy="50" rx="6.5" ry="9.5" fill="#2a0e4a" />
    <ellipse cx="60" cy="70" rx="7.5" ry="9" fill="#2a0e4a" />
    <ellipse cx="33" cy="64" rx="6" ry="3.5" fill="#ffb6a3" opacity=".55" />
    <ellipse cx="87" cy="64" rx="6" ry="3.5" fill="#ffb6a3" opacity=".55" />
  </svg>;
}

export function Bat({ className = "" }: ArtProps) {
  return <span className={`${styles.bat} ${className}`} aria-hidden="true">
    <svg viewBox="0 0 120 56">
      <path d="M60 20L55 8l-2 10C40 4 20 6 4 18c10 0 16 6 18 16 6-6 14-6 18 2 6-6 14-2 20 12 6-14 14-18 20-12 4-8 12-8 18-2 2-10 8-16 18-16C100 6 80 4 67 18L65 8z" fill="currentColor" />
      <circle cx="56.5" cy="23" r="1.6" fill="#ffb347" /><circle cx="63.5" cy="23" r="1.6" fill="#ffb347" />
    </svg>
  </span>;
}

export function Spider({ className = "" }: ArtProps) {
  return <span className={`${styles.spiderLine} ${className}`} aria-hidden="true">
    <svg viewBox="0 0 60 64">
      <g fill="none" stroke="#21093a" strokeWidth="2.6" strokeLinecap="round">
        <path d="M22 28Q10 20 5 28M21 34Q8 31 3 41M22 39Q10 43 7 54M25 43Q17 51 17 60" />
        <path d="M38 28Q50 20 55 28M39 34Q52 31 57 41M38 39Q50 43 53 54M35 43Q43 51 43 60" />
      </g>
      <circle cx="30" cy="35" r="11.5" fill="#21093a" /><circle cx="30" cy="20" r="7.5" fill="#21093a" />
      <circle cx="27" cy="19" r="1.5" fill="#ffb347" /><circle cx="33" cy="19" r="1.5" fill="#ffb347" />
    </svg>
  </span>;
}

// Quarter web anchored at the top-left corner; one decimal keeps server and browser output identical.
const webAngles = [2, 24, 45, 66, 88];
const webPoint = (angle: number, radius: number) => `${(radius * Math.cos(angle * Math.PI / 180)).toFixed(1)} ${(radius * Math.sin(angle * Math.PI / 180)).toFixed(1)}`;
const webPath = [
  ...webAngles.map((angle) => `M0 0L${webPoint(angle, 206)}`),
  ...[52, 98, 146, 194].map((radius) => webAngles.map((angle, i) => i === 0 ? `M${webPoint(angle, radius)}` : `Q${webPoint((angle + webAngles[i - 1]) / 2, radius * .84)} ${webPoint(angle, radius)}`).join("")),
].join("");

export function Web({ className = "" }: ArtProps) {
  return <svg className={`${styles.web} ${className}`} viewBox="0 0 206 206" aria-hidden="true"><path d={webPath} /></svg>;
}

export function ZombieHand({ className = "" }: ArtProps) {
  return <svg className={`${styles.zombie} ${className}`} viewBox="0 0 90 130" aria-hidden="true">
    <g fill="none" stroke="#7fae3c" strokeLinecap="round" strokeLinejoin="round">
      <path d="M45 130V80" strokeWidth="24" />
      <path d="M45 80c-4-8-1-14 1-17" strokeWidth="30" />
      <path d="M33 62l-7-22 4-14M42 58l-2-28 4-16M51 58l3-26 6-14M59 64l7-20 8-10M32 80L18 69l-6-13" strokeWidth="8" />
    </g>
    <path d="M36 106l9 6M50 93l7-5M40 74l5 3" fill="none" stroke="#5c8527" strokeWidth="3" strokeLinecap="round" />
  </svg>;
}

export function Cross({ className = "" }: ArtProps) {
  return <svg className={`${styles.cross} ${className}`} viewBox="0 0 60 100" aria-hidden="true"><path d="M22 0h16v24h22v16H38v60H22V40H0V24h22z" /></svg>;
}

export function Hills({ front = false }: { front?: boolean }) {
  return <svg className={`${styles.hills} ${front ? styles.hillsFront : ""}`} viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
    {front
      ? <><path d="M0 150c90-50 190-50 270 0 70-60 190-70 280-10 80-50 200-50 290 10 90-60 210-60 300 0 80-40 200-40 300 20v130H0z" fill="#4f1b8c" />
        <path d="M0 215c120-45 240-40 340 5 110-50 250-50 370 0 110-45 250-45 360 5 110-45 250-40 370 10v65H0z" fill="#6a27ad" /></>
      : <path d="M0 110C120 50 220 60 320 100 420 30 560 30 660 90 760 40 900 30 1000 90c100-50 260-50 440 10v200H0z" fill="#3b1466" />}
  </svg>;
}
