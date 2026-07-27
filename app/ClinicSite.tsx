"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarHeart, Gift, MessageSquareText, Phone } from "lucide-react";

const programs = [
  {
    tag: "Signature",
    title: "โบท็อกซ์ริ้วรอย",
    detail: "ลดริ้วรอย คืนความอ่อนเยาว์",
    price: "2,990.-",
    position: "16%",
  },
  {
    tag: "Popular",
    title: "ฟิลเลอร์ปรับรูปหน้า",
    detail: "ปรับรูปหน้า ดูมีมิติอย่างเป็นธรรมชาติ",
    price: "6,990.-",
    position: "24%",
  },
  {
    tag: "Brightening",
    title: "เลเซอร์หน้าใส",
    detail: "ผิวกระจ่างใส ลดฝ้า จุดด่างดำ",
    price: "3,990.-",
    position: "34%",
  },
  {
    tag: "Lift & Firm",
    title: "ยกกระชับ Ultherapy",
    detail: "ยกกระชับผิว ไม่ต้องผ่าตัด",
    price: "39,900.-",
    position: "12%",
  },
  {
    tag: "Healthy Glow",
    title: "Skin Booster",
    detail: "ผิวชุ่มชื้น ฉ่ำวาว สุขภาพดี",
    price: "4,990.-",
    position: "28%",
  },
];

const reviews = [
  {
    quote:
      "คุณหมอให้คำแนะนำดีมาก ทำแล้วผลลัพธ์ธรรมชาติ ประทับใจตั้งแต่ครั้งแรกเลยค่ะ",
    name: "คุณมินตรา",
    service: "ฟิลเลอร์ปรับรูปหน้า",
    initials: "MN",
  },
  {
    quote:
      "บริการประทับใจ พนักงานดูแลดีมากค่ะ คลินิกสะอาดและเป็นส่วนตัว",
    name: "คุณพิมพ์ชนก",
    service: "Skin Booster",
    initials: "PP",
  },
  {
    quote:
      "ทำแล้วหน้าใสขึ้นจริง เพื่อนทักเยอะเลยค่ะ คุณหมอมือเบามาก แนะนำเลยค่ะ",
    name: "คุณอรอนงค์",
    service: "เลเซอร์หน้าใส",
    initials: "AO",
  },
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
    kicker: "NATURAL RESULTS",
    title: "ผลลัพธ์ที่ยังคงเป็นคุณ",
    description:
      "เรามุ่งเน้นผลลัพธ์ที่ดูเป็นธรรมชาติ เหมาะกับโครงหน้าและความต้องการเฉพาะบุคคล",
  },
  contact: {
    kicker: "CONTACT & APPOINTMENT",
    title: "เริ่มต้นปรึกษาเราได้วันนี้",
    description:
      "พูดคุยกับทีมดูแลเพื่อนัดหมาย วิเคราะห์ความต้องการ และเลือกวันเวลาที่สะดวกสำหรับคุณ",
  },
};

export default function ClinicSite({ page = "home" }: { page?: ClinicPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [beforeAfter, setBeforeAfter] = useState(52);
  const [sent, setSent] = useState(false);
  const programRail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  const scrollPrograms = (direction: number) => {
    programRail.current?.scrollBy({
      left: direction * 360,
      behavior: "smooth",
    });
  };

  const openBooking = () => {
    setSent(false);
    setBookingOpen(true);
    setMenuOpen(false);
  };

  return (
    <main>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>🎁 โปรโมชั่นพิเศษสำหรับลูกค้าใหม่ ปรึกษาฟรี ไม่มีค่าใช้จ่าย</span>
          <div className="topbar-meta">
            <span>⌖ สาขา อารีย์</span>
            <span className="topbar-divider" />
            <span>เปิดบริการทุกวัน 10:00 - 20:00 น.</span>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="/" aria-label="TIC Clinic หน้าแรก">
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
            <a className={page === "home" ? "active" : ""} href="/" onClick={() => setMenuOpen(false)}>
              หน้าแรก
            </a>
            <a className={page === "about" ? "active" : ""} href="/about" onClick={() => setMenuOpen(false)}>
              เกี่ยวกับเรา
            </a>
            <a className={page === "services" ? "active" : ""} href="/services" onClick={() => setMenuOpen(false)}>
              บริการ
            </a>
            <a className={page === "promotion" ? "active" : ""} href="/promotion" onClick={() => setMenuOpen(false)}>
              โปรโมชั่น
            </a>
            <a className={page === "reviews" ? "active" : ""} href="/reviews" onClick={() => setMenuOpen(false)}>
              รีวิว
            </a>
            <a className={page === "results" ? "active" : ""} href="/results" onClick={() => setMenuOpen(false)}>
              ผลลัพธ์
            </a>
            <a className={page === "contact" ? "active" : ""} href="/contact" onClick={() => setMenuOpen(false)}>
              ติดต่อเรา
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
              <a className="button button-outline" href="/services">
                สอบถามเพิ่มเติม
              </a>
            </div>
            <div className="hero-proof">
              <div className="avatars" aria-hidden="true">
                <span>MN</span>
                <span>PP</span>
                <span>AO</span>
              </div>
              <div>
                <span className="stars">★★★★★</span>
                <small>ความพึงพอใจจากผู้ใช้บริการกว่า 2,500 รีวิว</small>
              </div>
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
              <a href="/">หน้าแรก</a>
              <span>›</span>
              <strong>{pageDetails[page].title}</strong>
            </div>
          </div>
        </section>
      )}

      {(page === "home" || page === "services" || page === "promotion") && (
      <section className="programs section-shell" id="services">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">OUR SIGNATURE PROGRAMS</span>
              <h2>โปรแกรมแนะนำ</h2>
            </div>
            <div className="rail-actions">
              <button type="button" onClick={() => scrollPrograms(-1)} aria-label="เลื่อนไปทางซ้าย">
                ←
              </button>
              <button type="button" onClick={() => scrollPrograms(1)} aria-label="เลื่อนไปทางขวา">
                →
              </button>
            </div>
          </div>

          <div className="program-rail" ref={programRail}>
            {programs.map((program) => (
              <article className="program-card" key={program.title}>
                <div
                  className="program-photo"
                  style={{ backgroundPosition: `${program.position} center` }}
                >
                  <span>{program.tag}</span>
                </div>
                <div className="program-content">
                  <h3>{program.title}</h3>
                  <p>{program.detail}</p>
                  <div className="price-row">
                    <div>
                      <small>เริ่มต้น</small>
                      <strong>{program.price}</strong>
                    </div>
                    <button type="button" onClick={openBooking} aria-label={`จอง ${program.title}`}>
                      ↗
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
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

      {(page === "home" || page === "reviews") && (
      <section className="reviews-section section-shell" id="reviews">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <span className="section-kicker">REAL EXPERIENCES</span>
              <h2>เสียงจากผู้ใช้บริการจริง</h2>
            </div>
            <p>
              เพราะทุกความมั่นใจมีความหมาย เราจึงใส่ใจในทุกขั้นตอน
              และให้ผลลัพธ์ที่เป็นธรรมชาติที่สุดสำหรับคุณ
            </p>
          </div>

          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-top">
                  <span className="stars">★★★★★</span>
                  <span className="quote-mark">“</span>
                </div>
                <blockquote>{review.quote}</blockquote>
                <div className="review-person">
                  <div className="review-avatar">{review.initials}</div>
                  <div>
                    <strong>{review.name}</strong>
                    <small>{review.service}</small>
                  </div>
                  <span className="verified">✓ รีวิวที่ยืนยันแล้ว</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {(page === "home" || page === "results") && (
      <section className="results-section" id="results">
        <div className="container results-grid">
          <div className="results-copy">
            <span className="section-kicker">NATURAL RESULTS</span>
            <h2>
              ผลลัพธ์ที่คุณ
              <br />
              สัมผัสได้
            </h2>
            <p>
              เราออกแบบการดูแลเฉพาะบุคคล เพื่อให้ผลลัพธ์ดูสวยอย่างเป็นธรรมชาติ
              และยังคงความเป็นตัวคุณ
            </p>
            <div className="result-stats">
              <div>
                <strong>12+</strong>
                <span>ปีแห่งประสบการณ์</span>
              </div>
              <div>
                <strong>15K+</strong>
                <span>เคสที่ไว้วางใจ</span>
              </div>
              <div>
                <strong>98%</strong>
                <span>ความพึงพอใจ</span>
              </div>
            </div>
            <button className="text-link" type="button" onClick={openBooking}>
              ปรึกษาแพทย์ฟรี <span>→</span>
            </button>
          </div>

          <div className="before-after">
            <div className="ba-image ba-after" />
            <div
              className="ba-image ba-before"
              style={{ clipPath: `inset(0 ${100 - beforeAfter}% 0 0)` }}
            />
            <span className="ba-label before">ก่อนดูแล</span>
            <span className="ba-label after">หลังดูแล</span>
            <div className="ba-line" style={{ left: `${beforeAfter}%` }}>
              <span>↔</span>
            </div>
            <input
              aria-label="เลื่อนเพื่อเปรียบเทียบก่อนและหลัง"
              type="range"
              min="12"
              max="88"
              value={beforeAfter}
              onChange={(event) => setBeforeAfter(Number(event.target.value))}
            />
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
                <div><span>ที่ตั้ง</span><strong>18 ซอยอารีย์ 1 แขวงพญาไท กรุงเทพฯ</strong></div>
                <div><span>โทรศัพท์</span><a href="tel:021234567">02 123 4567</a></div>
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
                <strong>ARI, BANGKOK</strong>
                <small>Medical care, made personal.</small>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer id="contact">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="/">
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
            <a href="/services">ปรับรูปหน้า</a>
            <a href="/services">ยกกระชับ</a>
            <a href="/services">ดูแลผิวพรรณ</a>
          </div>
          <div>
            <h3>ติดต่อเรา</h3>
            <p>18 ซอยอารีย์ 1 แขวงพญาไท กรุงเทพฯ</p>
            <a href="tel:021234567">02 123 4567</a>
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
        <a href="/reviews">
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
          href="/"
        >
          <span className="mobile-nav-logo">
            <strong>TIC</strong>
            <small>CLINIC</small>
          </span>
        </a>
        <a href="/promotion">
          <span className="mobile-nav-icon" aria-hidden="true">
            <Gift />
          </span>
          <span>โปรโมชั่น</span>
        </a>
        <a href="tel:021234567">
          <span className="mobile-nav-icon" aria-hidden="true">
            <Phone />
          </span>
          <span>โทร</span>
        </a>
      </nav>

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
