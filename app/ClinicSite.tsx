/* eslint-disable @next/next/no-img-element */
"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { CalendarHeart, MessageSquareText, Phone, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import PromotionShowcase from "@/components/PromotionShowcase";
import { catalog as programs } from "@/lib/catalog";

const reviewCases = [
  { image: "/images/reviews/review-1.jpg", title: "ฟิลเลอร์คาง", detail: "ภาพเคสที่คลินิกจัดทำและนำเสนอ" },
  { image: "/images/reviews/review-2.jpg", title: "ฟิลเลอร์ปาก", detail: "ภาพเคสที่คลินิกจัดทำและนำเสนอ" },
  { image: "/images/reviews/review-3.jpg", title: "ร้อยไหมยกกระชับ", detail: "ภาพเคสที่คลินิกจัดทำและนำเสนอ" },
  { image: "/images/reviews/review-4.jpg", title: "ฟิลเลอร์ใต้ตา", detail: "ภาพเคสที่คลินิกจัดทำและนำเสนอ" },
];

const trustItems = [
  {
    icon: "✦",
    title: "ปลอดภัยได้มาตรฐาน",
    detail: "ผ่านการรับรองจากกระทรวงสาธารณสุข",
  },
  {
    icon: "◎",
    title: "แพทย์ผู้เชี่ยวชาญ",
    detail: "ทีมแพทย์มากประสบการณ์ ดูแลอย่างใกล้ชิด",
  },
  {
    icon: "◇",
    title: "เทคโนโลยีทันสมัย",
    detail: "เครื่องมือระดับพรีเมียม อัปเดตล่าสุด",
  },
  {
    icon: "♡",
    title: "ดูแลอย่างใส่ใจ",
    detail: "ให้คำปรึกษาก่อนและหลังทำทุกเคส",
  },
];

export type ClinicPage =
  | "home"
  | "about"
  | "services"
  | "promotion"
  | "reviews"
  | "results"
  | "contact";

const pageDetails: Record<
  Exclude<ClinicPage, "home">,
  { kicker: string; title: string; description: string }
> = {
  about: {
    kicker: "ABOUT TIC CLINIC",
    title: "ความงามที่ดี เริ่มจากความเข้าใจ",
    description:
      "เราดูแลทุกคนด้วยมาตรฐานเดียวกัน ตั้งแต่การวิเคราะห์ ออกแบบแผนการดูแล ไปจนถึงการติดตามผลอย่างใกล้ชิด",
  },
  services: {
    kicker: "OUR SERVICES",
    title: "บริการที่ออกแบบเพื่อคุณ",
    description:
      "เลือกการดูแลที่ตอบโจทย์คุณโดยเฉพาะ พร้อมรับคำปรึกษาจากทีมแพทย์ก่อนตัดสินใจทุกครั้ง",
  },
  promotion: {
    kicker: "SPECIAL PRIVILEGES",
    title: "สิทธิพิเศษจาก TIC Clinic",
    description:
      "พบโปรแกรมแนะนำและสิทธิพิเศษที่เราคัดสรร เพื่อให้คุณเริ่มต้นดูแลตัวเองได้อย่างมั่นใจ",
  },
  reviews: {
    kicker: "REAL EXPERIENCES",
    title: "เสียงจากผู้ใช้บริการจริง",
    description:
      "ประสบการณ์และความรู้สึกจากผู้ที่ไว้วางใจให้ TIC Clinic ดูแลในทุกช่วงของความมั่นใจ",
  },
  results: {
    kicker: "SELECTED CASES",
    title: "ผลงานจากเคสที่ได้รับอนุญาต",
    description:
      "ชมภาพผลงานที่คลินิกจัดทำเพื่อประกอบการตัดสินใจ ผลลัพธ์ของแต่ละบุคคลอาจแตกต่างกัน",
  },
  contact: {
    kicker: "CONTACT & APPOINTMENT",
    title: "เริ่มต้นปรึกษาเราได้วันนี้",
    description:
      "พูดคุยกับทีมดูแลเพื่อนัดหมาย วิเคราะห์ความต้องการ และเลือกวันเวลาที่สะดวกสำหรับคุณ",
  },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteHref = (path: string) =>
  path === "/" ? `${basePath}/` : `${basePath}${path}`;

export default function ClinicSite({ page = "home" }: { page?: ClinicPage }) {
  const { addItem, itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  useEffect(() => {
    if (!addedItem) return;
    const timer = window.setTimeout(() => setAddedItem(null), 2200);
    return () => window.clearTimeout(timer);
  }, [addedItem]);

  const openBooking = () => {
    setSent(false);
    setBookingOpen(true);
    setMenuOpen(false);
  };

  const addProgram = (id: string, title: string) => {
    addItem(id);
    setAddedItem(title);
  };

  return (
    <main
      className="clinic-site"
      style={
        {
          "--clinic-hero": `url("${siteHref("/images/tic-clinic-hero.png")}")`,
        } as CSSProperties
      }
    >
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href={siteHref("/")} aria-label="TIC Clinic หน้าแรก">
            <strong>TIC</strong>
            <span>CLINIC</span>
          </a>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>

          <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
            <a className={page === "home" ? "active" : ""} href={siteHref("/")} onClick={() => setMenuOpen(false)}>
              หน้าแรก
            </a>
            <a className={page === "about" ? "active" : ""} href={siteHref("/about/")} onClick={() => setMenuOpen(false)}>
              เกี่ยวกับเรา
            </a>
            <a className={page === "services" ? "active" : ""} href={siteHref("/services/")} onClick={() => setMenuOpen(false)}>
              บริการ
            </a>
            <a className={page === "promotion" ? "active" : ""} href={siteHref("/promotion/")} onClick={() => setMenuOpen(false)}>
              โปรโมชั่น
            </a>
            <a className={page === "reviews" ? "active" : ""} href={siteHref("/reviews/")} onClick={() => setMenuOpen(false)}>
              รีวิว
            </a>
            <a className={page === "results" ? "active" : ""} href={siteHref("/results/")} onClick={() => setMenuOpen(false)}>
              ผลงาน
            </a>
            <a className={page === "contact" ? "active" : ""} href={siteHref("/contact/")} onClick={() => setMenuOpen(false)}>
              ติดต่อเรา
            </a>
            <a className="nav-cart" href={siteHref("/cart/")} onClick={() => setMenuOpen(false)} aria-label={`ตะกร้า ${itemCount} รายการ`}>
              <ShoppingBag aria-hidden="true" />
              <span>ตะกร้า</span>
              {itemCount > 0 && <strong>{itemCount}</strong>}
            </a>
            <button className="nav-booking" type="button" onClick={openBooking}>
              จองคิว
            </button>
          </nav>
        </div>
      </header>

      {page === "home" ? (
      <section className="hero" id="home">
        <div className="hero-image" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">
              <span />
              TIC CLINIC
            </div>
            <h1>
              ดูแลความงามอย่างมั่นใจ
              <strong>มาตรฐานการดูแลระดับพรีเมียม</strong>
            </h1>
            <p>
              ปลอดภัย ได้มาตรฐาน โดยทีมแพทย์ผู้เชี่ยวชาญ
              <br />
              พร้อมเทคโนโลยีที่ทันสมัย เพื่อผลลัพธ์ที่ดูเป็นธรรมชาติ
            </p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={openBooking}>
                จองคิวปรึกษา
                <span>→</span>
              </button>
              <a className="button button-outline" href={siteHref("/services/")}>
                สอบถามเพิ่มเติม
              </a>
            </div>
          </div>
        </div>
      </section>
      ) : (
        <section className="inner-hero">
          <div className="container inner-hero-content">
            <span className="section-kicker">{pageDetails[page].kicker}</span>
            <h1>{pageDetails[page].title}</h1>
            <p>{pageDetails[page].description}</p>
            <div className="inner-breadcrumb">
              <a href={siteHref("/")}>หน้าแรก</a>
              <span>›</span>
              <strong>{pageDetails[page].title}</strong>
            </div>
          </div>
        </section>
      )}

      {(page === "home" || page === "services" || page === "promotion") && (
        <PromotionShowcase mode={page === "home" ? "home" : "catalog"} onAdd={addProgram} />
      )}

      {page === "about" && (
        <section className="about-story">
          <div className="container about-story-grid">
            <div className="about-story-image" aria-hidden="true" />
            <div className="about-story-copy">
              <span className="section-kicker">CARE WITH PURPOSE</span>
              <h2>ดูแลด้วยความเข้าใจ<br />ในแบบที่เป็นคุณ</h2>
              <p>
                TIC Clinic เริ่มต้นจากความตั้งใจที่จะทำให้การดูแลความงามเป็นเรื่องที่มั่นใจได้
                เราให้เวลาในการรับฟัง วิเคราะห์ และอธิบายทุกทางเลือกอย่างตรงไปตรงมา
              </p>
              <p>
                ทุกแผนการดูแลจึงถูกออกแบบให้เหมาะกับโครงหน้า สภาพผิว และเป้าหมายของแต่ละคน
                โดยไม่เปลี่ยนคุณให้กลายเป็นใครอีกคน
              </p>
              <button className="button button-primary" type="button" onClick={openBooking}>
                นัดหมายปรึกษาทีมแพทย์ <span>→</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {(page === "home" || page === "about") && (
      <section className="trust-section" id="about">
        <div className="container trust-grid">
          {trustItems.map((item) => (
            <article key={item.title}>
              <div className="trust-icon">{item.icon}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      )}

      {(page === "home" || page === "reviews" || page === "results") && (
      <section className="reviews-section section-shell" id="reviews">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <span className="section-kicker">SELECTED CASES</span>
              <h2>ภาพผลงานจากคลินิก</h2>
            </div>
            <p>
              ภาพประกอบจากเคสที่คลินิกจัดทำ ผลลัพธ์ของแต่ละบุคคลอาจแตกต่างกัน
              ควรรับการประเมินจากแพทย์ก่อนเลือกโปรแกรม
            </p>
          </div>

          <div className="case-gallery">
            {reviewCases.map((review) => (
              <article className="case-card" key={review.title}>
                <img loading="lazy" src={siteHref(review.image)} alt={review.title} />
                <div><strong>{review.title}</strong><span>{review.detail}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {(page === "home" || page === "promotion") && (
      <section className="promotion-section" id="promotion">
        <div className="container promotion-card">
          <div>
            <span className="section-kicker light">WELCOME PRIVILEGE</span>
            <h2>สิทธิพิเศษสำหรับลูกค้าใหม่</h2>
            <p>รับคำปรึกษาและวิเคราะห์ใบหน้าโดยแพทย์ ไม่มีค่าใช้จ่าย</p>
          </div>
          <button className="button button-gold" type="button" onClick={openBooking}>
            รับสิทธิ์ปรึกษาฟรี <span>→</span>
          </button>
        </div>
      </section>
      )}

      {page === "contact" && (
        <section className="contact-page">
          <div className="container contact-page-grid">
            <div className="contact-panel">
              <span className="section-kicker">VISIT TIC CLINIC</span>
              <h2>พูดคุยกับทีมดูแลของเรา</h2>
              <p>
                ฝากข้อมูลสำหรับนัดหมาย หรือโทรหาเราได้ทุกวันในเวลาทำการ
                ทีมดูแลพร้อมช่วยแนะนำบริการที่เหมาะกับคุณ
              </p>
              <div className="contact-list">
                <div><span>ที่ตั้ง</span><strong>จังหวัดสระบุรี ประเทศไทย</strong></div>
                <div><span>โทรศัพท์</span><a href={siteHref("/contact/")}>02 XXX XXXX</a></div>
                <div><span>อีเมล</span><a href="mailto:hello@ticclinic.co">hello@ticclinic.co</a></div>
                <div><span>เวลาทำการ</span><strong>ทุกวัน 10:00 - 20:00 น.</strong></div>
              </div>
              <button className="button button-primary" type="button" onClick={openBooking}>
                จองคิวปรึกษาฟรี <span>→</span>
              </button>
            </div>
            <div className="contact-visual" aria-hidden="true">
              <div>
                <span>TIC CLINIC</span>
                <strong>SARABURI, THAILAND</strong>
                <small>Medical care, made personal.</small>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer id="contact">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href={siteHref("/")}>
              <strong>TIC</strong>
              <span>CLINIC</span>
            </a>
            <p>
              คลินิกความงามที่เชื่อว่าความสวยที่ดีที่สุด
              คือความสวยที่ยังคงเป็นตัวคุณ
            </p>
          </div>
          <div>
            <h3>บริการ</h3>
            <a href={siteHref("/services/")}>ปรับรูปหน้า</a>
            <a href={siteHref("/services/")}>ยกกระชับ</a>
            <a href={siteHref("/services/")}>ดูแลผิวพรรณ</a>
          </div>
          <div>
            <h3>ติดต่อเรา</h3>
            <p>จังหวัดสระบุรี ประเทศไทย</p>
            <a href={siteHref("/contact/")}>02 XXX XXXX</a>
            <a href="mailto:hello@ticclinic.co">hello@ticclinic.co</a>
          </div>
          <div>
            <h3>เวลาทำการ</h3>
            <p>เปิดบริการทุกวัน</p>
            <strong>10:00 - 20:00 น.</strong>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 TIC Clinic. All rights reserved.</span>
          <span>Medical care, made personal.</span>
        </div>
      </footer>

      <nav className="mobile-bottom-nav" aria-label="เมนูด่วนสำหรับมือถือ">
        <a href={siteHref("/reviews/")}>
          <span className="mobile-nav-icon" aria-hidden="true">
            <MessageSquareText />
          </span>
          <span>รีวิว</span>
        </a>
        <button type="button" onClick={openBooking}>
          <span className="mobile-nav-icon" aria-hidden="true">
            <CalendarHeart />
          </span>
          <span>ปรึกษาฟรี</span>
        </button>
        <a
          className="mobile-nav-home"
          aria-label="กลับสู่ด้านบน"
          href={siteHref("/")}
        >
          <span className="mobile-nav-logo">
            <strong>TIC</strong>
            <small>CLINIC</small>
          </span>
        </a>
        <a href={siteHref("/cart/")}>
          <span className="mobile-nav-icon" aria-hidden="true">
            <ShoppingBag />
          </span>
          <span>ตะกร้า{itemCount > 0 ? ` (${itemCount})` : ""}</span>
        </a>
        <a href={siteHref("/contact/")}>
          <span className="mobile-nav-icon" aria-hidden="true">
            <Phone />
          </span>
          <span>โทร</span>
        </a>
      </nav>

      <div className={addedItem ? "cart-toast is-visible" : "cart-toast"} role="status" aria-live="polite">
        <span>✓</span>
        <div><strong>เพิ่มลงตะกร้าแล้ว</strong><small>{addedItem}</small></div>
        <a href={siteHref("/cart/")}>ดูตะกร้า</a>
      </div>

      {bookingOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setBookingOpen(false)}>
          <section
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="ปิด"
              onClick={() => setBookingOpen(false)}
            >
              ×
            </button>
            {!sent ? (
              <>
                <span className="section-kicker">PRIVATE CONSULTATION</span>
                <h2 id="booking-title">นัดหมายปรึกษาแพทย์</h2>
                <p>ฝากข้อมูลไว้ ทีมดูแลจะติดต่อกลับเพื่อยืนยันวันและเวลาที่สะดวก</p>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSent(true);
                  }}
                >
                  <label>
                    ชื่อ–นามสกุล
                    <input required name="name" placeholder="กรอกชื่อของคุณ" />
                  </label>
                  <label>
                    เบอร์โทรศัพท์
                    <input required name="phone" inputMode="tel" placeholder="08x-xxx-xxxx" />
                  </label>
                  <label>
                    บริการที่สนใจ
                    <select name="service" defaultValue="">
                      <option value="" disabled>
                        เลือกบริการ
                      </option>
                      {programs.map((program) => (
                        <option key={program.title}>{program.title}</option>
                      ))}
                    </select>
                  </label>
                  <button className="button button-primary modal-submit" type="submit">
                    ส่งข้อมูลนัดหมาย
                  </button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <span>✓</span>
                <h2>รับข้อมูลเรียบร้อยแล้ว</h2>
                <p>ทีม TIC Clinic จะติดต่อกลับเพื่อยืนยันนัดหมายโดยเร็วที่สุด</p>
                <button className="button button-primary" type="button" onClick={() => setBookingOpen(false)}>
                  กลับสู่หน้าเว็บไซต์
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
