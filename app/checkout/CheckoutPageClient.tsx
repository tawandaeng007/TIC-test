"use client";

import { type FormEvent, useState } from "react";
import { ArrowLeft, Check, CreditCard, LockKeyhole, ShieldCheck, ShoppingBag } from "lucide-react";
import CommerceShell from "@/components/CommerceShell";
import { useCart } from "@/components/CartProvider";
import { formatBaht } from "@/lib/catalog";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteHref = (path: string) => path === "/" ? `${basePath}/` : `${basePath}${path}`;

type CheckoutData = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  postcode: string;
  contactMethod: string;
  appointment: string;
  note: string;
};

const initialData: CheckoutData = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  province: "สระบุรี",
  postcode: "",
  contactMethod: "โทรศัพท์",
  appointment: "",
  note: "",
};

export default function CheckoutPageClient() {
  const { lines, hydrated, itemCount, subtotal } = useCart();
  const [data, setData] = useState(initialData);
  const [stage, setStage] = useState<"details" | "payment">("details");

  const update = (field: keyof CheckoutData, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
  };

  const submitDetails = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStage("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CommerceShell step="checkout">
      <section className="commerce-hero checkout-hero">
        <div className="container">
          <span className="section-kicker">SECURE CHECKOUT</span>
          <h1>{stage === "details" ? "ข้อมูลสำหรับรับบริการ" : "ตรวจสอบก่อนชำระเงิน"}</h1>
          <p>{stage === "details" ? "กรอกข้อมูลสำหรับออกใบสรุปและให้ทีมคลินิกติดต่อกลับ" : "ข้อมูลของคุณครบแล้ว กรุณารอทีมคลินิกยืนยันรายการและช่องทางชำระ"}</p>
        </div>
      </section>

      <section className="checkout-section">
        <div className="container">
          {!hydrated ? (
            <div className="cart-loading">กำลังเตรียมข้อมูลคำสั่งซื้อ…</div>
          ) : lines.length === 0 ? (
            <div className="cart-empty">
              <span><ShoppingBag aria-hidden="true" /></span>
              <h2>ยังไม่มีคอร์สสำหรับสรุป</h2>
              <p>เลือกคอร์สลงตะกร้าก่อน แล้วกลับมากรอกข้อมูลในหน้านี้</p>
              <a className="button button-primary" href={siteHref("/services/")}>เลือกดูคอร์ส <span>→</span></a>
            </div>
          ) : stage === "details" ? (
            <div className="checkout-layout">
              <form className="checkout-form" onSubmit={submitDetails}>
                <div className="checkout-panel-heading">
                  <span>01</span>
                  <div><h2>ข้อมูลผู้รับบริการ</h2><p>กรอกข้อมูลติดต่อให้ครบเพื่อเตรียมสรุปรายการ</p></div>
                </div>

                <div className="form-grid">
                  <label className="form-field form-field-wide">
                    <span>ชื่อ–นามสกุล *</span>
                    <input required autoComplete="name" value={data.fullName} onChange={(event) => update("fullName", event.target.value)} placeholder="กรอกชื่อและนามสกุล" />
                  </label>
                  <label className="form-field">
                    <span>เบอร์โทรศัพท์ *</span>
                    <input required type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9+() -]{9,}" value={data.phone} onChange={(event) => update("phone", event.target.value)} placeholder="08x-xxx-xxxx" />
                  </label>
                  <label className="form-field">
                    <span>อีเมล *</span>
                    <input required type="email" autoComplete="email" value={data.email} onChange={(event) => update("email", event.target.value)} placeholder="name@example.com" />
                  </label>
                </div>

                <div className="checkout-panel-heading subheading">
                  <span>02</span>
                  <div><h2>ที่อยู่และการติดต่อ</h2><p>สำหรับจัดทำใบสรุปและติดต่อยืนยันคิว</p></div>
                </div>

                <div className="form-grid">
                  <label className="form-field form-field-wide">
                    <span>ที่อยู่สำหรับออกใบเสร็จ *</span>
                    <textarea required autoComplete="street-address" rows={3} value={data.address} onChange={(event) => update("address", event.target.value)} placeholder="บ้านเลขที่ ถนน ตำบล/แขวง อำเภอ/เขต" />
                  </label>
                  <label className="form-field">
                    <span>จังหวัด *</span>
                    <input required autoComplete="address-level1" value={data.province} onChange={(event) => update("province", event.target.value)} />
                  </label>
                  <label className="form-field">
                    <span>รหัสไปรษณีย์ *</span>
                    <input required inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" maxLength={5} value={data.postcode} onChange={(event) => update("postcode", event.target.value)} placeholder="18000" />
                  </label>
                  <label className="form-field">
                    <span>ช่องทางที่สะดวกให้ติดต่อ</span>
                    <select value={data.contactMethod} onChange={(event) => update("contactMethod", event.target.value)}>
                      <option>โทรศัพท์</option><option>LINE</option><option>อีเมล</option>
                    </select>
                  </label>
                  <label className="form-field">
                    <span>วันที่อยากเข้ารับบริการ</span>
                    <input type="date" value={data.appointment} onChange={(event) => update("appointment", event.target.value)} />
                  </label>
                  <label className="form-field form-field-wide">
                    <span>ข้อมูลเพิ่มเติม</span>
                    <textarea rows={3} value={data.note} onChange={(event) => update("note", event.target.value)} placeholder="เช่น ช่วงเวลาที่สะดวก หรือสิ่งที่อยากปรึกษา" />
                  </label>
                </div>

                <label className="checkout-consent">
                  <input required type="checkbox" />
                  <span>ฉันตรวจสอบข้อมูลแล้ว และยินยอมให้ทีมคลินิกติดต่อกลับเพื่อยืนยันรายการ ราคา และวันรับบริการ</span>
                </label>
                <button className="checkout-button checkout-submit" type="submit">ตรวจสอบและไปหน้าชำระเงิน <span>→</span></button>
              </form>

              <OrderSummary lines={lines} itemCount={itemCount} subtotal={subtotal} />
            </div>
          ) : (
            <div className="payment-ready-layout">
              <section className="payment-ready-card">
                <div className="payment-ready-icon"><LockKeyhole aria-hidden="true" /></div>
                <span className="summary-badge">PAYMENT INFORMATION</span>
                <h2>รอทีมคลินิกยืนยันก่อนชำระเงิน</h2>
                <p>ช่องทางชำระออนไลน์ยังไม่เปิดใช้งาน ทีมคลินิกจะตรวจสอบสิทธิ์ ราคา และติดต่อกลับเพื่อแจ้งขั้นตอนถัดไป</p>
                <div className="customer-summary">
                  <span>ผู้รับบริการ</span><strong>{data.fullName}</strong>
                  <span>ติดต่อ</span><strong>{data.phone}</strong>
                  <span>ยอดที่เตรียมชำระ</span><strong>{formatBaht(subtotal)} บาท</strong>
                </div>
                <div className="payment-placeholder">
                  <CreditCard aria-hidden="true" />
                  <div><strong>ชำระเงินออนไลน์</strong><span>กำลังอยู่ระหว่างเปิดให้บริการ</span></div>
                </div>
                <button className="checkout-button is-disabled" type="button" disabled>ชำระออนไลน์เร็ว ๆ นี้</button>
                <button className="edit-details-button" type="button" onClick={() => setStage("details")}><ArrowLeft /> กลับไปแก้ไขข้อมูล</button>
              </section>
              <aside className="payment-trust-card">
                <ShieldCheck aria-hidden="true" />
                <h3>ข้อมูลรายการของคุณ</h3>
                <ul>
                  <li><Check /> ตะกร้าจำรายการบนอุปกรณ์นี้</li>
                  <li><Check /> ตรวจฟอร์มสำคัญก่อนดำเนินการ</li>
                  <li><Check /> ยังไม่มีการรับหรือจัดเก็บข้อมูลบัตร</li>
                </ul>
                <a href={siteHref("/cart/")}>กลับไปดูตะกร้า</a>
              </aside>
            </div>
          )}
        </div>
      </section>
    </CommerceShell>
  );
}

function OrderSummary({ lines, itemCount, subtotal }: { lines: ReturnType<typeof useCart>["lines"]; itemCount: number; subtotal: number }) {
  return (
    <aside className="order-summary checkout-summary">
      <span className="summary-badge">ORDER SUMMARY</span>
      <h2>รายการของคุณ</h2>
      <div className="checkout-summary-lines">
        {lines.map(({ item, variant, lineKey, unitPrice, quantity }) => (
          <div key={lineKey}>
            <span>{item.title}<small>{variant ? `${variant.label} · ` : ""}จำนวน {quantity}</small></span>
            <strong>{formatBaht(unitPrice * quantity)}</strong>
          </div>
        ))}
      </div>
      <div className="summary-row"><span>รวม {itemCount} รายการ</span><strong>ไม่มีค่าบริการ</strong></div>
      <div className="summary-total"><span>ยอดรวม</span><strong>{formatBaht(subtotal)} <small>บาท</small></strong></div>
      <p><ShieldCheck aria-hidden="true" /> ข้อมูลในแบบฟอร์มนี้ยังไม่ถูกส่งจนกว่าจะเชื่อมระบบยืนยันรายการกับคลินิก</p>
    </aside>
  );
}
