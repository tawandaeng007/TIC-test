export type CatalogVariant = {
  id: string;
  label: string;
  price: number;
};

const variants = (rows: Array<[string, string, number]>): CatalogVariant[] =>
  rows.map(([id, label, price]) => ({ id, label, price }));

export const catalogVariants: Record<string, CatalogVariant[]> = {
  "hifu-lift": variants([
    ["100-shots", "HIFU 100 Shots", 3999],
    ["300-shots", "HIFU 300 Shots", 5999],
    ["500-shots", "HIFU 500 Shots", 9999],
  ]),
  "botox-program": variants([
    ["hutox-50u", "HUTOX (เกาหลี) · 50 U", 2599],
    ["hutox-100u", "HUTOX (เกาหลี) · 100 U", 3999],
    ["aestox-50u", "AESTOX (เกาหลี) · 50 U", 3999],
    ["aestox-100u", "AESTOX (เกาหลี) · 100 U", 5999],
    ["aestox-200u", "AESTOX (เกาหลี) · 200 U", 8599],
    ["renevox-50u", "RENEVOX (เกาหลี) · 50 U", 2999],
    ["renevox-100u", "RENEVOX (เกาหลี) · 100 U", 4999],
    ["nabota-50u", "NABOTA (เกาหลี) · 50 U", 4999],
    ["nabota-100u", "NABOTA (เกาหลี) · 100 U", 7999],
    ["nabota-200u", "NABOTA (เกาหลี) · 200 U", 13999],
    ["mb-tox-50u", "MB TOX (เกาหลี) · 50 U", 5999],
    ["mb-tox-100u", "MB TOX (เกาหลี) · 100 U", 9999],
    ["xeomin-50u", "XEOMIN (เยอรมัน) · 50 U", 8599],
    ["xeomin-100u", "XEOMIN (เยอรมัน) · 100 U", 15599],
    ["allergen-50u", "ALLERGEN (อเมริกา) · 50 U", 9999],
    ["allergen-100u", "ALLERGEN (อเมริกา) · 100 U", 17999],
  ]),
  "premium-skin": variants([
    ["1-bottle", "1 กระปุก", 1290],
    ["6-bottles", "6 กระปุก", 4990],
    ["12-bottles", "12 กระปุก", 8990],
  ]),
  "diode-laser": variants([
    ["underarm", "รักแร้ · 1 แถม 1", 599],
    ["mustache", "หนวด · 1 แถม 1", 599],
    ["lower-leg", "ขาล่าง · 1 แถม 1", 999],
    ["upper-leg", "ขาบน · 1 แถม 1", 999],
    ["lower-arm", "แขนล่าง · 1 แถม 1", 999],
    ["upper-arm", "แขนบน · 1 แถม 1", 999],
    ["bikini", "บิกินี่ (Bikini) · 1 แถม 1", 1599],
    ["brazilian", "บราซิลเลี่ยน (Brazilian) · 1 แถม 1", 1999],
  ]),
  "vitamin-drip": variants([
    ["multi-vit-c", "Multi Vit C · 1 กระปุก", 390],
    ["skin-aura", "Skin Aura · 1 กระปุก", 690],
  ]),
  "weight-lock-s": variants([
    ["1-dose", "1 โดส · 2.5 mg", 2999],
    ["4-doses", "4 โดส", 10999],
    ["12-doses", "12 โดส", 29999],
    ["28-doses", "28 โดส", 59999],
  ]),
  "bright-injection": variants([
    ["balamin-1", "BALAMIN · 1 ขวด", 1999],
    ["balamin-2", "BALAMIN · 2 ขวด", 2999],
    ["chanel-1", "CHANEL · 1 ขวด", 3999],
    ["chanel-2", "CHANEL · 2 ขวด", 5999],
    ["hayyan-1", "HAYYAN · 1 ขวด", 3999],
    ["hayyan-2", "HAYYAN · 2 ขวด", 5999],
    ["revs-1", "REVS · 1 ขวด", 6999],
    ["revs-2", "REVS · 2 ขวด", 10999],
    ["rejuran-2cc", "REJURAN HEALER · 2 cc", 6999],
    ["rejuran-4cc", "REJURAN HEALER · 4 cc", 12999],
    ["relife-1cc", "RELIFE HYDRO BOOSTER · 1 cc", 8999],
    ["relife-2cc", "RELIFE HYDRO BOOSTER · 2 cc", 16999],
    ["vitaran-1cc", "VITARAN · 1 cc", 9999],
    ["vitaran-2cc", "VITARAN · 2 cc", 18999],
    ["belotero-1cc", "BELOTERO · 1 cc", 15999],
    ["belotero-2cc", "BELOTERO · 2 cc", 28999],
  ]),
  "multi-vit-c": variants([
    ["1-bottle", "1 กระปุก", 390],
    ["6-bottles", "6 กระปุก", 1990],
    ["12-bottles", "12 กระปุก", 3390],
  ]),
  "skin-aura": variants([
    ["1-bottle", "1 กระปุก", 690],
    ["6-bottles", "6 กระปุก", 2990],
    ["12-bottles", "12 กระปุก", 5390],
  ]),
  "triple-aura": variants([
    ["1-bottle", "1 กระปุก", 1990],
    ["6-bottles", "6 กระปุก", 6990],
    ["12-bottles", "12 กระปุก", 12590],
  ]),
  cinder: variants([
    ["1-bottle", "1 กระปุก", 2290],
    ["6-bottles", "6 กระปุก", 10990],
    ["12-bottles", "12 กระปุก", 17990],
  ]),
  "neo-bright": variants([
    ["1-bottle", "1 กระปุก", 4990],
    ["5-bottles", "5 กระปุก", 18990],
    ["12-bottles", "12 กระปุก", 29990],
  ]),
  "face-v-lift": variants([
    ["pdo-20", "ร้อยไหม PDO · 20 เส้น", 1999],
    ["pdo-30", "ร้อยไหม PDO · 30 เส้น", 2999],
    ["pdo-50", "ร้อยไหม PDO · 50 เส้น", 3999],
    ["fishbone-2", "ร้อยไหมก้างปลา · 2 เส้น", 1999],
    ["fishbone-4", "ร้อยไหมก้างปลา · 4 เส้น", 3999],
    ["fishbone-6", "ร้อยไหมก้างปลา · 6 เส้น", 4999],
    ["fishbone-10", "ร้อยไหมก้างปลา · 10 เส้น", 10000],
    ["mint-easy-2", "MINT EASY (เหนียง) · 2 เส้น", 15000],
    ["mint-easy-4", "MINT EASY (เหนียง) · 4 เส้น", 25000],
    ["mint-easy-6", "MINT EASY (เหนียง) · 6 เส้น", 35000],
    ["mint-fine-4", "MINT FINE (หน้า) · 4 เส้น", 15000],
    ["mint-fine-8", "MINT FINE (หน้า) · 8 เส้น", 25000],
    ["mint-fine-12", "MINT FINE (หน้า) · 12 เส้น", 35000],
  ]),
  "acne-care": variants([
    ["acne-5", "รักษาสิว 5 ขั้นตอน · 1 ครั้ง", 999],
    ["acne-11", "รักษาสิว 11 ขั้นตอน · 1 ครั้ง", 1999],
    ["prp-1", "PRP หน้าใส · 1 ครั้ง", 1999],
    ["prp-2", "PRP หน้าใส · 2 ครั้ง", 2999],
    ["made-1", "MADE COLLAGEN · 1 ครั้ง", 2599],
    ["made-2", "MADE COLLAGEN · 2 ครั้ง", 4599],
    ["derma-1", "DERMA GLOW · 1 ขวด", 3999],
    ["derma-2", "DERMA GLOW · 2 ขวด", 6999],
    ["neo-derm-1", "NEO DERM ACNE · 1 คู่", 3999],
    ["neo-derm-2", "NEO DERM ACNE · 2 คู่", 6999],
    ["exosome-1", "EXOSOME · 1 ครั้ง", 12999],
    ["exosome-2", "EXOSOME · 2 ครั้ง", 23999],
  ]),
  mounjaro: variants([
    ["2-5mg", "2.5 mg", 15000],
    ["5mg", "5 mg", 25000],
    ["7-5mg", "7.5 mg", 30000],
    ["10mg", "10 mg", 35000],
    ["12-5mg", "12.5 mg", 45000],
    ["15mg", "15 mg", 50000],
  ]),
  "collagen-program": variants([
    ["relife-1", "RELIFE HYDRO BOOSTER · 1 กล่อง", 8999],
    ["relife-2", "RELIFE HYDRO BOOSTER · 2 กล่อง", 16999],
    ["collaju-1", "COLLAJU · 1 กล่อง", 18999],
    ["collaju-2", "COLLAJU · 2 กล่อง", 35999],
    ["ejal-1", "EJAL 40 · 1 กล่อง", 14999],
    ["ejal-2", "EJAL 40 · 2 กล่อง", 28999],
    ["therafill-1", "THE RAFILL · 1 กล่อง", 18999],
    ["therafill-2", "THE RAFILL · 2 กล่อง", 35999],
    ["belotero-1", "BELOTERO · 1 กล่อง", 15999],
    ["belotero-2", "BELOTERO · 2 กล่อง", 29999],
    ["sculptra-1", "SCULPTRA · 1 กล่อง", 24999],
    ["sculptra-2", "SCULPTRA · 2 กล่อง", 44999],
    ["juvelook-1", "JUVELOOK · 1 กล่อง", 18999],
    ["juvelook-2", "JUVELOOK · 2 กล่อง", 35999],
    ["profhilo-1", "PROFHILO · 1 กล่อง", 23999],
    ["profhilo-2", "PROFHILO · 2 กล่อง", 43999],
  ]),
  vitran: variants([
    ["1cc", "1 cc", 8999],
    ["2cc", "2 cc", 16999],
  ]),
};

export const getCatalogVariants = (itemId: string): CatalogVariant[] =>
  catalogVariants[itemId] ?? [];

export const getCatalogVariant = (itemId: string, variantId?: string): CatalogVariant | undefined => {
  const itemVariants = getCatalogVariants(itemId);
  if (itemVariants.length === 0) return undefined;
  return itemVariants.find((variant) => variant.id === variantId) ?? itemVariants[0];
};
