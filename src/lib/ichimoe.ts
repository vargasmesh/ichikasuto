import fetch from "node-fetch";
import * as cheerio from "cheerio";

export const queryIchimoe = async (kanji: string) => {
  const params = new URLSearchParams({ q: kanji });
  const url = "https://ichi.moe/cl/qr/?" + params;
  const response = await fetch(url);
  return cheerio.load(await response.text());
};

export const parseIchimoe = ($: cheerio.CheerioAPI) => {
  const romanji = $(".ds-text[data-pick=0]").text();

  return {
    romanji,
  };
};
