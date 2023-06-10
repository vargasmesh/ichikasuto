import * as cheerio from "cheerio";

export const parseIchimoe = ($: cheerio.CheerioAPI) => {
  const romanji = $(".ds-text[data-pick=0]").text();

  return {
    romanji,
  };
};
