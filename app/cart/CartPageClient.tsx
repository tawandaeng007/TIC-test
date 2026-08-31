"use client";

import { Check, Minus, Plus, ShoppingBag, Sparkles, Trash2 } from "lucide-react";
import CommerceShell from "@/components/CommerceShell";
import { useCart } from "@/components/CartProvider";
import { catalog, formatBaht } from "@/lib/catalog";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteHref = (path: string) => path === "/" ? `${basePath}/` : `${basePath}${path}`;

export default function CartPageClient() {
  const { lines, hydrated, itemCount, subtotal, addItem, setQuantity, removeItem } = useCart();
  const suggestions = catalog.filter((item) => !lines.some((line) => line.id === item.id)).slice(0, 3);

  return (
    <CommerceShell step="cart">
      <section className="commerce-hero">
        <div className="container">
          <span className="section-kicker">YOUR BEAUTY SELECTION</span>
          <h1>ตะกร้าของคุณ</h1>
          <p>เลือกคอร์สที่สนใจ ตรวจสอบรายละเอียด แล้วกรอกข้อมูลสำหรับรับบริการในขั้นตอนถัดไป</p>
        </div>
      </section>

      <section className="cart-section">
        <div className="container">
          {!hydrated ? (
            <div className="cart-loading" aria-live="polite">กำลังเปิดตะกร้าของคุณ…</div>
          ) : lines.length === 0 ? (
            <div className="cart-empty">
              <span><ShoppingBag aria-hidden="true" /></span>
              <h2>ตะกร้ายังว่างอยู่</h2>
              <p>กลับไปเลือกคอร์สที่สนใจ แล้วกดไอคอนตะกร้าบนการ์ดคอร์สได้เลย</p>
              <a className="button button-primary" href={siteHref("/services/")}>เลือกดูคอร์ส <span>→</span></a>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-list">
                <div className="cart-list-heading">
                  <h2>คอร์สที่เลือก</h2>
                  <span>{itemCount} รายการ</span>
                </div>
                {lines.map(({ item, quantity }) => (
                  <article className="cart-line" key={item.id}>
                    <div className="cart-line-mark"><Sparkles aria-hidden="true" /></div>
                    <div className="cart-line-copy">
                      <span>{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                      <button type="button" onClick={() => removeItem(item.id)}><Trash2 aria-hidden="true" /> นำออก</button>
                    </div>
                    <div className="cart-line-controls">
                      <strong>{formatBaht(item.price * quantity)} บาท</strong>
                      <div className="quantity-control" aria-label={`จำนวน ${item.title}`}>
                        <button type="button" onClick={() => setQuantity(item.id, quantity - 1)} aria-label="ลดจำนวน"><Minus /></button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => setQuantity(item.id, quantity + 1)} disabled={quantity >= 10} aria-label="เพิ่มจำนวน"><Plus /></button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="order-summary">
                <span className="summary-badge">DEMO CHECKOUT</span>
                <h2>สรุปคำสั่งซื้อ</h2>
                <div className="summary-row"><span>จำนวนคอร์ส</span><strong>{itemCount} รายการ</strong></div>
                <div className="summary-row"><span>ค่าบริการ</span><strong>ไม่มี</strong></div>
                <div className="summary-total"><span>ยอดรวม</span><strong>{formatBaht(subtotal)} <small>บาท</small></strong></div>
                <p><Check aria-hidden="true" /> ราคานี้เป็นยอดทดลอง โปรดให้คลินิกยืนยันสิทธิ์และเงื่อนไขก่อนรับบริการ</p>
                <a className="checkout-button" href={siteHref("/checkout/")}>สรุปและกรอกข้อมูล <span>→</span></a>
                <small>ขั้นตอนถัดไปยังไม่ตัดเงิน</small>
              </aside>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="cart-suggestions">
              <div className="cart-suggestions-heading">
                <span className="section-kicker">YOU MAY ALSO LIKE</span>
                <h2>คอร์สที่คุณอาจสนใจ</h2>
              </div>
              <div className="suggestion-grid">
                {suggestions.map((item) => (
                  <article key={item.id}>
                    <span>{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    <div><strong>{formatBaht(item.price)} บาท</strong><button type="button" onClick={() => addItem(item.id)}><Plus /> เพิ่ม</button></div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </CommerceShell>
  );
}
