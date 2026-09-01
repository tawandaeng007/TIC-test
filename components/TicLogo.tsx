/* eslint-disable @next/next/no-img-element */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function TicLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`tic-logo ${className}`.trim()}>
      <img
        src={`${basePath}/images/tic-clinic-logo-transparent.png`}
        alt="TIC Clinic"
        width={884}
        height={570}
        draggable={false}
      />
    </span>
  );
}
