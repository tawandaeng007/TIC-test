/* eslint-disable @next/next/no-img-element */
"use client";

import { type CSSProperties, useEffect, useState } from "react";
import {
  CalendarHeart,
  CalendarDays,
  CarFront,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Cpu,
  CreditCard,
  ExternalLink,
  HeartHandshake,
  MapPin,
  MessageSquareText,
  Music2,
  Phone,
  PlayCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import { useCart } from "@/components/CartProvider";
import PromotionShowcase from "@/components/PromotionShowcase";
import SpinBackdrop from "@/components/SpinBackdrop";
import TicLogo from "@/components/TicLogo";
import { catalog as programs } from "@/lib/catalog";

const reviewCases = [
  { image: "/images/reviews/review-1.jpg", title: "ฟิลเลอร์คาง", detail: "ภาพเคสที่คลินิกจัดทำและนำเสนอ" },
  { image: "/images/reviews/review-2.jpg", title: "ฟิลเลอร์ปาก", detail: "ภาพเคสที่คลินิกจัดทำและนำเสนอ" },
  { image: "/images/reviews/review-3.jpg", title: "ร้อยไหมยกกระชับ", detail: "ภาพเคสที่คลินิกจัดทำและนำเสนอ" },
  { image: "/images/reviews/review-4.jpg", title: "ฟิลเลอร์ใต้ตา", detail: "ภาพเคสที่คลินิกจัดทำและนำเสนอ" },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "ปลอดภัยได้มาตรฐาน",
    detail: "ผ่านการรับรองจากกระทรวงสาธารณสุข",
  },
  {
    icon: Stethoscope,
    title: "แพทย์ผู้เชี่ยวชาญ",
    detail: "ทีมแพทย์มากประสบการณ์ ดูแลอย่างใกล้ชิด",
  },
  {
    icon: Cpu,
    title: "เทคโนโลยีทันสมัย",
    detail: "เครื่องมือระดับพรีเมียม อัปเดตล่าสุด",
  },
  {
    icon: HeartHandshake,
    title: "ดูแลอย่างใส่ใจ",
    detail: "ให้คำปรึกษาก่อนและหลังทำทุกเคส",
  },
];

const doctorSchedule = [
  { days: "จันทร์ – ศุกร์", time: "10:00 – 20:00 น.", service: "ตรวจประเมินและรับบริการตามคิวที่ยืนยัน", status: "นัดหมายล่วงหน้า" },
  { days: "เสาร์", time: "10:00 – 20:00 น.", service: "ตรวจประเมินและรับบริการตามคิวที่ยืนยัน", status: "คิวมีจำนวนจำกัด" },
  { days: "อาทิตย์", time: "10:00 – 20:00 น.", service: "ตรวจประเมินและรับบริการตามคิวที่ยืนยัน", status: "คิวมีจำนวนจำกัด" },
];

const treatmentSteps = [
  { icon: MessageSquareText, number: "01", title: "พูดคุยความต้องการ", detail: "แจ้งปัญหาที่กังวล ประวัติสุขภาพ ยาที่ใช้ และผลลัพธ์ที่คาดหวัง" },
  { icon: Stethoscope, number: "02", title: "แพทย์ตรวจประเมิน", detail: "ประเมินความเหมาะสม พร้อมอธิบายทางเลือก ข้อจำกัด และการดูแลที่เกี่ยวข้อง" },
  { icon: Sparkles, number: "03", title: "ออกแบบแผนเฉพาะบุคคล", detail: "เลือกโปรแกรมและจำนวนครั้งที่เหมาะสม โดยยืนยันรายละเอียดและราคาก่อนรับบริการ" },
  { icon: HeartHandshake, number: "04", title: "รับบริการและติดตามผล", detail: "รับคำแนะนำหลังบริการ พร้อมช่องทางติดต่อทีมคลินิกเมื่อต้องการคำปรึกษา" },
];

const testimonials = [
  { quote: "ทีมดูแลอธิบายละเอียด ทำให้ตัดสินใจได้อย่างมั่นใจและไม่รู้สึกเร่งรีบ", name: "ผู้ใช้บริการโปรแกรมปรับรูปหน้า", rating: 5 },
  { quote: "ชอบที่ได้ประเมินก่อนทุกครั้ง และได้รับคำแนะนำการดูแลหลังบริการอย่างชัดเจน", name: "ผู้ใช้บริการโปรแกรมดูแลผิว", rating: 5 },
  { quote: "นัดหมายสะดวก ทีมงานติดตามผลและตอบคำถามหลังรับบริการดีมาก", name: "ผู้ใช้บริการโปรแกรมยกกระชับ", rating: 5 },
];

const faqs = [
  { question: "ควรเตรียมตัวอย่างไรก่อนรับบริการ?", answer: "แจ้งโรคประจำตัว ประวัติแพ้ยา ยาและอาหารเสริมที่ใช้อยู่ รวมถึงการตั้งครรภ์หรือให้นมบุตรแก่ทีมแพทย์ ไม่ควรหยุดยาที่แพทย์สั่งด้วยตนเอง และควรทำตามคำแนะนำเฉพาะโปรแกรมที่คลินิกแจ้งก่อนวันนัด" },
  { question: "หลังรับบริการต้องดูแลตัวเองอย่างไร?", answer: "วิธีดูแลแตกต่างกันในแต่ละโปรแกรม ทีมคลินิกจะสรุปข้อควรทำและข้อควรหลีกเลี่ยงให้หลังบริการ หากมีอาการผิดปกติหรือไม่แน่ใจ ควรติดต่อคลินิกทันที" },
  { question: "มีที่จอดรถหรือไม่?", answer: "มีจุดจอดรถในบริเวณใกล้คลินิก กรุณาติดต่อทีมงานก่อนเดินทางเพื่อรับตำแหน่งทางเข้าและจุดจอดรถที่สะดวกในวันนัด" },
  { question: "ชำระเงินด้วยช่องทางใดได้บ้าง?", answer: "สามารถเลือกช่องทางชำระที่คลินิกยืนยันในวันรับบริการ เช่น เงินสด โอนเงิน หรือบัตรตามเงื่อนไขของคลินิก ระบบชำระออนไลน์บนเว็บไซต์ยังไม่เปิดรับเงินจริง" },
  { question: "สามารถผ่อนชำระได้หรือไม่?", answer: "การผ่อนชำระขึ้นอยู่กับยอดบริการ บัตร และผู้ให้บริการทางการเงิน กรุณาสอบถามทีมคลินิกก่อนชำระเพื่อรับเงื่อนไขล่าสุด" },
  { question: "หากต้องการเลื่อนหรือยกเลิกนัดต้องทำอย่างไร?", answer: "ติดต่อทีมคลินิกผ่านโทรศัพท์หรือ LINE Official ล่วงหน้า พร้อมแจ้งชื่อและเวลานัดเดิม ทีมงานจะช่วยตรวจสอบคิวที่สะดวกให้ใหม่" },
];

const socialLinks = [
  { label: "LINE Official", detail: "แชตและนัดหมาย", href: "https://line.me/", icon: MessageSquareText },
  { label: "Facebook", detail: "ข่าวสารและรีวิว", href: "https://www.facebook.com/", icon: UsersRound },
  { label: "TikTok", detail: "วิดีโอและเคสรีวิว", href: "https://www.tiktok.com/search?q=TIC%20Clinic", icon: Music2 },
];

export type ClinicPage =
  | "home"
  | "about"
  | "schedule"
  | "services"
  | "promotion"
  | "reviews"
  | "results"
  | "faq"
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
  schedule: {
    kicker: "DOCTOR SCHEDULE",
    title: "ตารางการเข้าตรวจและรับนัดหมาย",
    description:
      "ตรวจสอบช่วงเวลารับนัดหมายก่อนเดินทาง และยืนยันคิวกับทีมคลินิกเพื่อให้เราเตรียมการดูแลได้อย่างเหมาะสม",
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
  faq: {
    kicker: "FREQUENTLY ASKED QUESTIONS",
    title: "ข้อมูลสำคัญก่อนเข้ารับบริการ",
    description:
      "รวมคำตอบเรื่องการเตรียมตัว การดูแลหลังบริการ ที่จอดรถ การชำระเงิน และการผ่อนชำระ",
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

  const addProgram = (id: string, title: string, variantId?: string) => {
    addItem(id, variantId);
    setAddedItem(title);
  };

  return (
    <main
      className="clinic-site"
      style={
        {
          "--clinic-hero": `url("${siteHref("/images/tic-clinic-hero-v2.png")}")`,
        } as CSSProperties
      }
    >
      <SpinBackdrop />
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href={siteHref("/")} aria-label="TIC Clinic หน้าแรก">
            <TicLogo />
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
              เกี่ยวกับ
            </a>
            <a className={page === "schedule" ? "active" : ""} href={siteHref("/schedule/")} onClick={() => setMenuOpen(false)}>
              ตารางแพทย์
            </a>
            <a className={page === "services" ? "active" : ""} href={siteHref("/services/")} onClick={() => setMenuOpen(false)}>
              บริการ/ราคา
            </a>
            <a className={page === "reviews" ? "active" : ""} href={siteHref("/reviews/")} onClick={() => setMenuOpen(false)}>
              รีวิว
            </a>
            <a className={page === "faq" ? "active" : ""} href={siteHref("/faq/")} onClick={() => setMenuOpen(false)}>
              FAQ
            </a>
            <a className={page === "contact" ? "active" : ""} href={siteHref("/contact/")} onClick={() => setMenuOpen(false)}>
              ติดต่อเรา
            </a>
            <a className={addedItem ? "nav-cart is-cart-bumping" : "nav-cart"} href={siteHref("/cart/")} onClick={() => setMenuOpen(false)} aria-label={`ตะกร้า ${itemCount} รายการ`}>
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

      {page === "home" && (
        <section className="clinic-overview section-shell">
          <div className="container clinic-overview-grid">
            <div className="clinic-overview-copy">
              <span className="section-kicker">WELCOME TO TIC CLINIC</span>
              <h2>ดูแลทุกขั้นตอนด้วยความเข้าใจ</h2>
              <p>
                เราเริ่มจากการรับฟัง ตรวจประเมิน และอธิบายทุกทางเลือกอย่างตรงไปตรงมา
                เพื่อให้คุณเลือกการดูแลที่เหมาะกับตัวเองได้อย่างมั่นใจ
              </p>
              <a className="button button-primary" href={siteHref("/about/")}>รู้จัก TIC Clinic <span>→</span></a>
            </div>
            <div className="clinic-quick-links">
              <a href={siteHref("/schedule/")}><CalendarDays /><span><strong>ตารางแพทย์</strong><small>ดูช่วงเวลารับนัดหมาย</small></span></a>
              <a href={siteHref("/services/")}><Sparkles /><span><strong>บริการและราคา</strong><small>เลือกหมวดหมู่และแพ็กเกจ</small></span></a>
              <a href={siteHref("/faq/")}><MessageSquareText /><span><strong>คำถามที่พบบ่อย</strong><small>เตรียมตัวและการชำระเงิน</small></span></a>
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

      {page === "schedule" && (
        <section className="schedule-section section-shell">
          <div className="container schedule-layout">
            <div className="schedule-panel">
              <div className="section-heading split-heading">
                <div><span className="section-kicker">APPOINTMENT HOURS</span><h2>ตารางรับนัดหมาย</h2></div>
                <p>ตารางอาจมีการเปลี่ยนแปลง โปรดยืนยันรายชื่อแพทย์และเวลากับทีมคลินิกก่อนเดินทางทุกครั้ง</p>
              </div>
              <div className="schedule-table-wrap">
                <table className="schedule-table">
                  <thead><tr><th>วัน</th><th>เวลา</th><th>รูปแบบการเข้าตรวจ</th><th>สถานะ</th></tr></thead>
                  <tbody>
                    {doctorSchedule.map((row) => (
                      <tr key={row.days}><td>{row.days}</td><td>{row.time}</td><td>{row.service}</td><td><span>{row.status}</span></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <aside className="schedule-booking-card">
              <CalendarHeart aria-hidden="true" />
              <span className="section-kicker">BOOK YOUR VISIT</span>
              <h2>นัดหมายก่อนเดินทาง</h2>
              <p>เลือกวันและช่วงเวลาที่สะดวก ทีมงานจะติดต่อกลับเพื่อยืนยันแพทย์และคิวบริการ</p>
              <button className="button button-primary" type="button" onClick={openBooking}>นัดหมายทันที <span>→</span></button>
              <small><Clock3 /> เปิดบริการทุกวัน 10:00 – 20:00 น.</small>
            </aside>
          </div>
        </section>
      )}

      {page === "services" && (
        <section className="treatment-journey section-shell">
          <div className="container">
            <div className="section-heading split-heading">
              <div><span className="section-kicker">TREATMENT JOURNEY</span><h2>ขั้นตอนการรับบริการ</h2></div>
              <p>ทุกโปรแกรมเริ่มจากการประเมินความเหมาะสม และยืนยันรายละเอียดก่อนรับบริการจริง</p>
            </div>
            <div className="treatment-step-grid">
              {treatmentSteps.map((step) => (
                <article key={step.number}><span>{step.number}</span><step.icon aria-hidden="true" /><h3>{step.title}</h3><p>{step.detail}</p></article>
              ))}
            </div>
          </div>
        </section>
      )}

      {(page === "home" || page === "about") && (
      <section className="trust-section" id="about">
        <div className="container trust-grid">
          {trustItems.map((item) => (
            <article key={item.title}>
              <div className="trust-icon">
                <item.icon aria-hidden="true" />
              </div>
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
          {page === "reviews" && (
            <>
              <div className="testimonial-grid">
                {testimonials.map((review) => (
                  <article key={review.name}>
                    <div className="testimonial-stars" aria-label={`${review.rating} ดาว`}>
                      {Array.from({ length: review.rating }, (_, index) => <Star key={index} aria-hidden="true" />)}
                    </div>
                    <blockquote>“{review.quote}”</blockquote>
                    <strong>{review.name}</strong>
                  </article>
                ))}
              </div>
              <div className="video-review-heading">
                <div><span className="section-kicker">VIDEO STORIES</span><h2>วิดีโอสัมภาษณ์ความประทับใจ</h2></div>
                <p>ติดตามวิดีโอรีวิวและประสบการณ์เพิ่มเติมผ่านช่องทางโซเชียลของคลินิก</p>
              </div>
              <div className="video-story-grid">
                {reviewCases.slice(0, 3).map((review, index) => (
                  <a className="video-story-card" href={index === 0 ? "https://www.tiktok.com/search?q=TIC%20Clinic" : "https://www.facebook.com/"} target="_blank" rel="noreferrer" key={review.title}>
                    <img src={siteHref(review.image)} alt="" />
                    <span><PlayCircle aria-hidden="true" /></span>
                    <div><small>VIDEO INTERVIEW</small><strong>{review.title}</strong><em>เปิดชมบนช่องทางของคลินิก <ExternalLink /></em></div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      )}

      {page === "faq" && (
        <section className="faq-section section-shell">
          <div className="container faq-layout">
            <aside className="faq-aside">
              <span className="section-kicker">BEFORE YOUR VISIT</span>
              <h2>เตรียมตัวให้พร้อมก่อนเข้าคลินิก</h2>
              <p>หากคำถามของคุณไม่อยู่ในรายการ สามารถส่งข้อความถึงทีมดูแลได้โดยตรง</p>
              <div>
                <span><CarFront /> ที่จอดรถ</span>
                <span><CircleDollarSign /> การชำระเงิน</span>
                <span><CreditCard /> การผ่อนชำระ</span>
              </div>
              <button className="button button-primary" type="button" onClick={openBooking}>สอบถามทีมคลินิก <span>→</span></button>
            </aside>
            <div className="faq-list">
              {faqs.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>{item.question}<span>＋</span></summary>
                  <p>{item.answer}</p>
                </details>
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
            <h2>พร้อมเริ่มดูแลตัวเองหรือยัง?</h2>
            <p>เลือกวันเวลาที่สะดวก แล้วให้ทีมคลินิกช่วยตรวจสอบคิวและแนะนำโปรแกรมที่เหมาะกับคุณ</p>
          </div>
          <button className="button button-gold" type="button" onClick={openBooking}>
            นัดหมายทันที <span>→</span>
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
            <div className="contact-map">
              <iframe
                title="แผนที่ TIC Clinic จังหวัดสระบุรี"
                src="https://www.google.com/maps?q=%E0%B8%88%E0%B8%B1%E0%B8%87%E0%B8%AB%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%AA%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a href="https://www.google.com/maps/search/?api=1&query=%E0%B8%88%E0%B8%B1%E0%B8%87%E0%B8%AB%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%AA%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5" target="_blank" rel="noreferrer"><MapPin /> เปิดใน Google Maps <ExternalLink /></a>
            </div>
          </div>
          <div className="contact-social-section" id="contact-channels">
            <div><span className="section-kicker">FOLLOW & CHAT</span><h2>ติดตามและพูดคุยกับเรา</h2></div>
            <div className="social-link-grid">
              {socialLinks.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" key={social.label}><social.icon /><span><strong>{social.label}</strong><small>{social.detail}</small></span><ExternalLink /></a>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer id="contact">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href={siteHref("/")}>
              <TicLogo />
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
            <h3>ข้อมูลคลินิก</h3>
            <a href={siteHref("/schedule/")}>ตารางแพทย์</a>
            <a href={siteHref("/faq/")}>คำถามที่พบบ่อย</a>
            <a href={siteHref("/reviews/")}>รีวิวและผลงาน</a>
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
            <TicLogo className="tic-logo-mobile" />
          </span>
        </a>
        <a className={addedItem ? "mobile-cart-link is-cart-bumping" : "mobile-cart-link"} href={siteHref("/cart/")}>
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

      {addedItem && (
        <div className="cart-fly-effect" key={`${addedItem}-${itemCount}`} aria-hidden="true">
          <ShoppingBag />
          <i />
          <i />
          <i />
        </div>
      )}

      <div className={addedItem ? "cart-toast is-visible" : "cart-toast"} role="status" aria-live="polite">
        <span><CheckCircle2 aria-hidden="true" /></span>
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
