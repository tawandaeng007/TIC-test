import a from "./articles/part-0.json";
import b from "./articles/part-1.json";
import c from "./articles/part-2.json";
import d from "./articles/part-3.json";
import expanded from "./articles/expanded.json";
export const articles = [...a,...b,...c,...d].map(article => {
  const extra=expanded[article.slug as keyof typeof expanded];
  return {...article,image:`/images/articles/${article.slug}.webp`,sections:[...extra.sections,...article.sections],sources:[extra.source,...article.sources]};
});
