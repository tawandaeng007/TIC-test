import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
import InformationSite from "@/components/InformationSite";
export const dynamicParams = false;
export function generateStaticParams(){return articles.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const article=articles.find(a=>a.slug===slug);
  return {title:article ? article.title+" | TIC" : "TIC",description:article?.intro};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  if(!articles.some(a=>a.slug===slug))notFound();
  return <InformationSite page="article" slug={slug}/>;
}
