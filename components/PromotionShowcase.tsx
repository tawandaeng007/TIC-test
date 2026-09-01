/* eslint-disable @next/next/no-img-element */
"use client";

import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ShoppingBag, X } from "lucide-react";
import { catalog, featuredCatalog, formatBaht, type CatalogItem } from "@/lib/catalog";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteHref = (path: string) => `${basePath}${path}`;
const categories = ["ทั้งหมด", "ปรับรูปหน้า", "ยกกระชับ", "ดูแลผิว", "ดริปวิตามิน", "เลเซอร์", "ดูแลรูปร่าง"] as const;
const promotionArtStyle = (path: string) =>
  ({ "--promotion-art": `url("${siteHref(path)}")` }) as CSSProperties;

export default function PromotionShowcase({
  mode,
  onAdd,
}: {
  mode: "home" | "catalog";
  onAdd: (id: string, title: string) => void;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [category, setCategory] = useState<(typeof categories)[number]>("ทั้งหมด");
  const [selected, setSelected] = useState<CatalogItem | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % featuredCatalog.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const visibleItems = useMemo(() => {
    const source = mode === "home" ? catalog.slice(0, 10) : catalog;
    return category === "ทั้งหมด" ? source : source.filter((item) => item.category === category);
  }, [category, mode]);
  const featured = featuredCatalog[active];

  return (
    <>
      {(mode === "home" || mode === "catalog") && (
        <section className="promo-showcase" aria-label="โปรโมชั่นเด่น">
          <div className="container promo-stage" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
            <button className="promo-art-button" style={promotionArtStyle(featured.image)} type="button" onClick={() => setSelected(featured)} aria-label={`ดูรายละเอียด ${featured.title}`}>
              <img src={siteHref(featured.image)} alt={`โปรโมชั่น ${featured.title}`} />
            </button>
            <div className="promo-stage-copy">
              <span className="promo-chip">{featured.category}</span>
              <small>โปรโมชั่นแนะนำ</small>
              <h2>{featured.title}</h2>
              <p>{featured.detail}</p>
              <div className="promo-stage-price"><span>ราคาเริ่มต้น</span><strong>{formatBaht(featured.price)} <small>บาท</small></strong></div>
              <div className="promo-stage-actions">
                <button type="button" onClick={() => onAdd(featured.id, featured.title)}><ShoppingBag /> ใส่ตะกร้า</button>
                <button type="button" onClick={() => setSelected(featured)}>ดูรายละเอียด</button>
              </div>
              <div className="promo-dots" aria-label="เลือกโปรโมชั่นเด่น">
                {featuredCatalog.map((item, index) => <button className={index === active ? "is-active" : ""} key={item.id} type="button" onClick={() => setActive(index)} aria-label={`แสดง ${item.title}`} />)}
              </div>
            </div>
            <div className="promo-stage-arrows">
              <button type="button" onClick={() => setActive((active - 1 + featuredCatalog.length) % featuredCatalog.length)} aria-label="โปรโมชั่นก่อนหน้า"><ArrowLeft /></button>
              <button type="button" onClick={() => setActive((active + 1) % featuredCatalog.length)} aria-label="โปรโมชั่นถัดไป"><ArrowRight /></button>
            </div>
          </div>
        </section>
      )}

      <section className="programs section-shell" id="services">
        <div className="container">
          <div className="section-heading promo-catalog-heading">
            <div><span className="section-kicker">TIC CLINIC PROGRAMS</span><h2>{mode === "home" ? "โปรแกรมที่น่าสนใจ" : "โปรโมชั่นและโปรแกรมทั้งหมด"}</h2></div>
            {mode === "home" && <a href={`${basePath}/promotion/`}>ดูโปรโมชั่นทั้งหมด <span>→</span></a>}
          </div>
          {mode === "catalog" && (
            <div className="catalog-filters" aria-label="กรองประเภทโปรแกรม">
              {categories.map((item) => <button className={category === item ? "is-active" : ""} type="button" key={item} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
          )}
          <div className={mode === "home" ? "promotion-product-grid is-home" : "promotion-product-grid"}>
            {visibleItems.map((item) => (
              <article className="promotion-product-card" key={item.id}>
                <button className="promotion-product-image" style={promotionArtStyle(item.image)} type="button" onClick={() => setSelected(item)} aria-label={`ดูรายละเอียด ${item.title}`}>
                  <img loading="lazy" src={siteHref(item.image)} alt={`โปรโมชั่น ${item.title}`} />
                  <span>{item.tag}</span>
                </button>
                <div className="promotion-product-content">
                  <small>{item.category}</small>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <div className="promotion-product-price"><span>เริ่มต้น</span><strong>{formatBaht(item.price)}.-</strong></div>
                  <div className="promotion-product-actions">
                    <button type="button" onClick={() => setSelected(item)}>รายละเอียด</button>
                    <button type="button" onClick={() => onAdd(item.id, item.title)}><ShoppingBag /> ใส่ตะกร้า</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div className="product-modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="product-modal-close" type="button" onClick={() => setSelected(null)} aria-label="ปิดรายละเอียด"><X /></button>
            <div className="product-modal-art" style={promotionArtStyle(selected.image)}><img src={siteHref(selected.image)} alt={`โปรโมชั่น ${selected.title}`} /></div>
            <div className="product-modal-copy">
              <span>{selected.category}</span>
              <h2 id="product-modal-title">{selected.title}</h2>
              <p>{selected.detail}</p>
              <div className="product-modal-price"><small>ราคาเริ่มต้น</small><strong>{formatBaht(selected.price)} บาท</strong></div>
              <p className="product-modal-note">ราคาและรายละเอียดเป็นไปตามเงื่อนไขในภาพโปรโมชั่น กรุณาให้ทีมคลินิกประเมินและยืนยันก่อนรับบริการ</p>
              <button className="checkout-button" type="button" onClick={() => { onAdd(selected.id, selected.title); setSelected(null); }}><ShoppingBag /> เพิ่มลงตะกร้า</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
