import type { CSSProperties } from "react";

export default function SpinBackdrop() {
  return (
    <div className="spin-backdrop" aria-hidden="true">
      <div className="spin-silk spin-silk-one" />
      <div className="spin-silk spin-silk-two" />
      <div className="spin-silk spin-silk-three" />
      {[0, 1, 2, 3, 4].map((index) => (
        <span className={`spin-bubble spin-bubble-${index}`} key={`bubble-${index}`} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <span
          className="spin-sparkle"
          key={`sparkle-${index}`}
          style={{ "--spin-index": index } as CSSProperties}
        />
      ))}
    </div>
  );
}
