"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

type Story = {slug:string; title:string; intro:string; image:string};
export default function ArticleSlideshow({items}:{items:Story[]}) {
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);
  const [interacting,setInteracting]=useState(false);
  useEffect(()=>{
    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer=window.setInterval(()=>{
      if(!paused&&!interacting&&!motion.matches&&!document.hidden) setActive(i=>(i+1)%items.length);
    },6000);
    return ()=>window.clearInterval(timer);
  },[paused,interacting,items.length]);
  if(!items.length)return null;
  const item=items[active];
  const move=(delta:number)=>setActive(i=>(i+delta+items.length)%items.length);
  return <section className="editorial-feature-wrap article-slideshow" aria-label="บทความแนะนำ" aria-roledescription="สไลด์โชว์" onMouseEnter={()=>setInteracting(true)} onMouseLeave={()=>setInteracting(false)} onFocusCapture={()=>setInteracting(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setInteracting(false);}}>
    <Link key={item.slug} className="editorial-feature-card article-slide" href={`/articles/${item.slug}/`}>
      <img src={(process.env.NEXT_PUBLIC_BASE_PATH??"")+item.image} alt="ภาพนางแบบประกอบความรู้สุขภาพผิว" />
      <div><span className="info-kicker">บทความแนะนำ · SKIN JOURNAL</span><h2>{item.title}</h2><p>{item.intro}</p><span className="info-button">อ่านเรื่องนี้ <ArrowUpRight /></span></div>
    </Link>
    <div className="article-slide-controls"><button aria-label="บทความก่อนหน้า" onClick={()=>move(-1)}><ChevronLeft/></button><div className="article-slide-dots">{items.map((story,i)=><button key={story.slug} aria-label={`ดูบทความ ${i+1}: ${story.title}`} aria-current={active===i?"true":undefined} onClick={()=>setActive(i)}><span/></button>)}</div><button aria-label="บทความถัดไป" onClick={()=>move(1)}><ChevronRight/></button><button aria-label={paused?"เล่นสไลด์อัตโนมัติ":"หยุดสไลด์อัตโนมัติ"} aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>{paused?<Play/>:<Pause/>}</button></div>
  </section>;
}
