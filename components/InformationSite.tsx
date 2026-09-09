import Link from "next/link";
import { BookOpen, ArrowUpRight, ShieldCheck, Sun, Heart, Menu } from "lucide-react";
import SpinBackdrop from "./SpinBackdrop";
import TicLogo from "./TicLogo";
import { articles } from "@/lib/articles";
import "./information.css";

const nav = [["/", "หน้าแรก"], ["/articles/", "ความรู้สุขภาพผิว"], ["/about/", "เกี่ยวกับ"], ["/contact/", "ข้อมูลติดต่อ"]];
export default function InformationSite({page = "home", slug}: {page?: string; slug?: string}) {
  const article = articles.find(item => item.slug === slug);
  return <main className="information-site">
    <SpinBackdrop />
    <header className="info-header"><Link href="/" aria-label="TIC หน้าแรก"><TicLogo /></Link>
      <nav aria-label="เมนูหลัก">{nav.map(([href,label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <details className="info-mobile-menu"><summary aria-label="เปิดเมนู"><Menu /></summary><nav>{nav.map(([href,label]) => <Link key={href} href={href}>{label}</Link>)}</nav></details>
    </header>
    {page === "home" && <section className="info-hero">
      <div><span className="info-kicker">TIC · SKIN JOURNAL</span><h1>รู้จักผิว<br/><em>เข้าใจการดูแล</em></h1><p>อ่านเรื่องสุขภาพผิว หลักการของหัตถการ และข้อควรรู้ก่อนตัดสินใจ จากข้อมูลที่มีแหล่งอ้างอิงให้ตรวจสอบ</p><Link className="info-button" href="/articles/">อ่านบทความ <ArrowUpRight /></Link></div>
      <Link className="info-feature" href="/articles/sunscreen-basics/"><Sun size={52} strokeWidth={1}/><span>DAILY CARE</span><h2>กันแดดหนึ่งหลอด<br/>บอกอะไรเราบ้าง</h2><p>เข้าใจ UVA, UVB และการใช้ให้เหมาะกับชีวิตประจำวัน</p><span className="info-read">อ่านเรื่องนี้ <ArrowUpRight /></span></Link>
    </section>}
    {(page === "home" || page === "articles") && <section className="info-section">
      <div className="info-heading"><div><span className="info-kicker">READ & UNDERSTAND</span><h2>ห้องสมุดสุขภาพผิว</h2></div><p>พื้นฐานที่เข้าใจง่าย พร้อมข้อจำกัดและความเสี่ยงที่ควรรู้</p></div>
      <div className="info-article-grid">{articles.map((item,index) => <Link className="info-article-card" key={item.slug} href={`/articles/${item.slug}/`}><div className={`info-card-top tone-${index%3}`}>{index%3===0?<BookOpen />:index%3===1?<Heart />:<ShieldCheck />}<span>{item.category}</span></div><div className="info-card-copy"><h3>{item.title}</h3><p>{item.intro}</p><span className="info-read">อ่านต่อ <ArrowUpRight /></span></div></Link>)}</div>
    </section>}
    {page === "article" && article && <article className="info-reading">
      <Link href="/articles/">← บทความทั้งหมด</Link><span className="info-kicker">{article.category}</span><h1>{article.title}</h1><p className="info-lead">{article.intro}</p>
      {article.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
      <aside className="info-source"><h2>แหล่งข้อมูล</h2>{article.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title} <ArrowUpRight size={16}/></a>)}<p>เรียบเรียงเป็นข้อมูลทั่วไป ไม่ใช่การวินิจฉัยหรือคำแนะนำเฉพาะบุคคล · ตรวจแหล่งข้อมูล 9 กันยายน 2569</p></aside>
    </article>}
    {page === "about" && <section className="info-reading"><span className="info-kicker">ABOUT</span><h1>พื้นที่สำหรับความเข้าใจ<br/>เรื่องสุขภาพผิว</h1><p className="info-lead">เว็บไซต์อยู่ระหว่างปรับปรุงข้อมูลบริษัทและสถานพยาบาล ในช่วงนี้นำเสนอความรู้สุขภาพผิวและข้อมูลทั่วไป</p><h2>ข้อมูลที่ตรวจสอบได้</h2><p>บทความแสดงแหล่งอ้างอิง แยกความรู้ทั่วไปออกจากคำแนะนำเฉพาะบุคคล และอธิบายข้อจำกัดของหัตถการควบคู่กับหลักการทำงาน</p><h2>ข้อมูลแพทย์และสถานที่</h2><p>จะประกาศรายละเอียดเมื่อได้รับข้อมูลที่ยืนยันแล้ว รวมถึงชื่อและคุณวุฒิแพทย์ สถานที่ และกำหนดเปิดให้บริการ</p></section>}
    {(page === "schedule" || page === "contact") && <section className="info-reading"><span className="info-kicker">INFORMATION</span><h1>{page==="schedule"?"ข้อมูลวันและเวลา":"ข้อมูลการติดต่อ"}</h1><p className="info-lead">อยู่ระหว่างยืนยันข้อมูลสำหรับประกาศอย่างเป็นทางการ</p><div className="info-facts"><div><h2>พื้นที่</h2><p>จังหวัดสระบุรี</p></div><div><h2>กำหนดเปิดและตารางแพทย์</h2><p>ยังไม่มีประกาศกำหนดการที่ยืนยัน</p></div><div><h2>พิกัดและการเดินทาง</h2><p>จะเพิ่มที่อยู่ พิกัด และข้อมูลที่จอดรถเมื่อยืนยันตำแหน่งแล้ว</p></div><div><h2>ช่องทางติดต่อ</h2><p>เบอร์โทรศัพท์และบัญชีทางการจะประกาศในหน้านี้เมื่อพร้อม</p></div></div></section>}
    {page === "faq" && <section className="info-reading"><h1>คำถามที่พบบ่อย</h1>{[
      ["เว็บไซต์เปิดให้ใช้บริการแล้วหรือยัง?","ขณะนี้เว็บไซต์นำเสนอข้อมูลทั่วไปและบทความ กำหนดเปิดให้บริการจะประกาศเมื่อยืนยันแล้ว"],
      ["นำบทความไปใช้ตัดสินใจรักษาได้ไหม?","บทความเป็นข้อมูลเบื้องต้น การเลือกวิธีรักษาต้องอาศัยการประเมินสุขภาพและข้อบ่งใช้ของแต่ละบุคคล"],
      ["ข้อมูลแพทย์และการเดินทางอยู่ที่ไหน?","รายละเอียดจะเพิ่มในหน้าข้อมูลการติดต่อเมื่อมีข้อมูลที่ยืนยันแล้ว"]
    ].map(([q,a])=><details className="info-faq" key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>}
    {page === "unavailable" && <section className="info-reading"><span className="info-kicker">TIC</span><h1>หน้านี้ยังไม่เปิดใช้งาน</h1><p className="info-lead">อ่านความรู้เกี่ยวกับสุขภาพผิวได้ที่ห้องสมุดบทความ</p><Link className="info-button" href="/articles/">ไปที่บทความ <ArrowUpRight /></Link></section>}
    <footer className="info-footer"><div><TicLogo /><p>ข้อมูลทั่วไปและความรู้สุขภาพผิว</p></div><div><Link href="/articles/">บทความ</Link><Link href="/faq/">คำถามที่พบบ่อย</Link><Link href="/contact/">ข้อมูลติดต่อ</Link></div><small>© 2026 TIC</small></footer>
  </main>;
}
