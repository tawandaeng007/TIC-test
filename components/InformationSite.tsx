import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, Menu } from "lucide-react";
import SpinBackdrop from "./SpinBackdrop";
import TicLogo from "./TicLogo";
import ArticleSlideshow from "./ArticleSlideshow";
import { articles } from "@/lib/articles";
import "./information.css";

const nav = [["/", "หน้าแรก"], ["/articles/", "ความรู้สุขภาพผิว"], ["/about/", "เกี่ยวกับ"], ["/contact/", "ติดต่อเรา"]];
const imageBase = (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/images/";
export default function InformationSite({page = "home", slug}: {page?: string; slug?: string}) {
  const article = articles.find(item => item.slug === slug);
  return <main className="information-site">
    <SpinBackdrop />
    <header className="info-header"><Link href="/" aria-label="TIC หน้าแรก"><TicLogo /></Link>
      <nav aria-label="เมนูหลัก">{nav.map(([href,label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <details className="info-mobile-menu"><summary aria-label="เปิดเมนู"><Menu /></summary><nav>{nav.map(([href,label]) => <Link key={href} href={href}>{label}</Link>)}</nav></details>
    </header>
    {page === "home" && <>
      <section className="editorial-home-hero">
        <img className="editorial-model" src={imageBase+"clinic-editorial-hero.png"} alt="นางแบบประกอบเว็บไซต์ TIC" fetchPriority="high" />
        <div className="editorial-hero-copy"><span className="info-kicker">TIC CLINIC</span><h1>เข้าใจผิวของคุณ<br/><strong>เริ่มต้นด้วยความรู้ที่ถูกต้อง</strong></h1><p>เรื่องสุขภาพผิวและข้อควรรู้เกี่ยวกับหัตถการ<br/>พร้อมแหล่งข้อมูลให้ศึกษาเพิ่มเติม</p><Link className="info-button" href="/articles/">อ่านบทความ <ArrowUpRight /></Link></div>
      </section>
      <ArticleSlideshow items={articles} />
    </>}
    {(page === "home" || page === "articles") && <section className="info-section">
      <div className="info-heading"><div><span className="info-kicker">READ & UNDERSTAND</span><h2>ห้องสมุดสุขภาพผิว</h2></div><p>พื้นฐานที่เข้าใจง่าย พร้อมข้อจำกัดและความเสี่ยงที่ควรรู้</p></div>
      <div className="info-article-grid">{articles.map(item => <Link className="info-article-card" key={item.slug} href={`/articles/${item.slug}/`}><div className="editorial-card-image"><img loading="lazy" src={(process.env.NEXT_PUBLIC_BASE_PATH??"")+item.image} alt={`ภาพประกอบ: ${item.title}`} /><span>{item.category}</span></div><div className="info-card-copy"><h3>{item.title}</h3><p>{item.intro}</p><span className="info-read">อ่านต่อ <ArrowUpRight /></span></div></Link>)}</div>
    </section>}
    {page === "article" && article && <article className="info-reading">
      <Link href="/articles/">← บทความทั้งหมด</Link><span className="info-kicker">{article.category}</span><h1>{article.title}</h1><p className="info-lead">{article.intro}</p>
      <figure className="editorial-article-figure"><img className="editorial-article-cover" src={(process.env.NEXT_PUBLIC_BASE_PATH??"")+article.image} alt={`ภาพประกอบ: ${article.title}`} /><figcaption>ภาพนางแบบสร้างขึ้นเพื่อประกอบบทความ ไม่ใช่ภาพผู้ป่วยหรือผลการรักษา</figcaption></figure>
      {article.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
      <aside className="info-source"><h2>แหล่งข้อมูล</h2>{article.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title} <ArrowUpRight size={16}/></a>)}<p>เรียบเรียงเป็นข้อมูลทั่วไป ไม่ใช่การวินิจฉัยหรือคำแนะนำเฉพาะบุคคล · ตรวจแหล่งข้อมูล 9 กันยายน 2569</p></aside>
    </article>}
    {page === "about" && <section className="info-reading"><span className="info-kicker">ABOUT TIC</span><h1>เกี่ยวกับ TIC</h1><p className="info-lead">เราเชื่อว่าการดูแลผิวเริ่มจากความเข้าใจ ทั้งสภาพผิวของตัวเองและข้อมูลที่ใช้ประกอบการตัดสินใจ</p><img className="editorial-article-cover" src={imageBase+"articles/understanding-fillers.webp"} alt="ภาพนางแบบประกอบเว็บไซต์ TIC" /><h2>เข้าใจผิวในแบบของคุณ</h2><p>ผิวของแต่ละคนมีความแตกต่าง การดูแลจึงควรคำนึงถึงสภาพผิว สุขภาพ และกิจวัตรประจำวัน ไม่จำเป็นต้องใช้วิธีเดียวกันกับคนอื่น</p><h2>รู้ก่อนเลือกดูแล</h2><p>สำรวจเรื่องการดูแลผิวในชีวิตประจำวัน ทำความเข้าใจหลักการของหัตถการ ตลอดจนข้อจำกัดและข้อควรระวัง ผ่านบทความที่มีแหล่งอ้างอิงให้ศึกษาเพิ่มเติม</p><Link className="info-button" href="/articles/">อ่านบทความ <ArrowUpRight /></Link></section>}
    {(page === "schedule" || page === "contact") && <section className="info-reading"><span className="info-kicker">CONTACT TIC</span><h1>ติดต่อเรา</h1><div className="info-facts"><div><h2>TIC</h2><p>จังหวัดสระบุรี</p></div></div></section>}
    {page === "faq" && <section className="info-reading"><h1>คำถามที่พบบ่อย</h1>{[
      ["ค้นหาบทความเกี่ยวกับอะไรได้บ้าง?","อ่านเรื่องการดูแลผิว กันแดด สิว ฝ้า และข้อควรรู้ก่อนทำหัตถการได้ในหน้าบทความ"],
      ["นำบทความไปใช้ตัดสินใจรักษาได้ไหม?","บทความเป็นข้อมูลเบื้องต้น การเลือกวิธีรักษาต้องอาศัยการประเมินสุขภาพและข้อบ่งใช้ของแต่ละบุคคล"],
      ["อ่านแหล่งอ้างอิงเพิ่มเติมได้ที่ไหน?","ท้ายแต่ละบทความมีลิงก์ไปยังแหล่งข้อมูลต้นทางสำหรับศึกษาเพิ่มเติม"]
    ].map(([q,a])=><details className="info-faq" key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>}
    {page === "unavailable" && <section className="info-reading"><span className="info-kicker">TIC</span><h1>ไม่พบหน้าที่คุณต้องการ</h1><p className="info-lead">อ่านความรู้เกี่ยวกับสุขภาพผิวได้ที่ห้องสมุดบทความ</p><Link className="info-button" href="/articles/">ไปที่บทความ <ArrowUpRight /></Link></section>}
    <footer className="info-footer"><div><TicLogo /></div><div><Link href="/articles/">บทความ</Link><Link href="/faq/">คำถามที่พบบ่อย</Link><Link href="/contact/">ติดต่อเรา</Link></div><small>© 2026 TIC</small></footer>
  </main>;
}
