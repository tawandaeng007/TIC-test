"use client";

import type { ReactNode } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartProvider";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteHref = (path: string) => path === "/" ? `${basePath}/` : `${basePath}${path}`;

export default function CommerceShell({
  children,
  step,
}: {
  children: ReactNode;
  step: "cart" | "checkout";
}) {
  const { itemCount } = useCart();

  return (
    <main className="commerce-page">
      <header className="commerce-header">
        <div className="container commerce-header-inner">
          <a className="commerce-back" href={siteHref("/")}>
            <ArrowLeft aria-hidden="true" /> กลับหน้าเว็บไซต์
          </a>
          <a className="brand" href={siteHref("/")} aria-label="TIC Clinic หน้าแรก">
            <strong>TIC</strong>
            <span>CLINIC</span>
          </a>
          <a className="commerce-bag" href={siteHref("/cart/")} aria-label={`ตะกร้า ${itemCount} รายการ`}>
            <ShoppingBag aria-hidden="true" />
            <span>ตะกร้า</span>
            <strong>{itemCount}</strong>
          </a>
        </div>
      </header>

      <div className="container commerce-steps" aria-label="ขั้นตอนการสั่งซื้อ">
        <span className={step === "cart" ? "is-current" : "is-complete"}><i>1</i> ตะกร้า</span>
        <span className={step === "checkout" ? "is-current" : ""}><i>2</i> ข้อมูลลูกค้า</span>
        <span><i>3</i> ชำระเงิน</span>
      </div>

      {children}

      <footer className="commerce-footer">
        <div className="container">
          <span>TIC CLINIC · SARABURI</span>
          <p>ทีมคลินิกจะยืนยันรายการและเงื่อนไขก่อนชำระ · ช่องทางชำระออนไลน์ยังไม่เปิดใช้งาน</p>
        </div>
      </footer>
    </main>
  );
}
