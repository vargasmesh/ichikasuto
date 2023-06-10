import * as cheerio from "cheerio";

export type Reading = {
  reading: string;
};

export type Word = {
  romanji: string;
  readings?: Reading[];
};

export const parseIchimoe = ($: cheerio.CheerioAPI) => {
  const romanji = $(".ds-text[data-pick=0]").text();

  const tokens = $(".gloss-row[data-pick=0] > ul > li");

  const words: Word[] = [];
  tokens.each((_, token) => {
    const child = $(token);
    const romanji = child.find(".gloss-rtext > a > em").text();
    const readings: Reading[] = [];

    child.find("dt").map((_, reading) => {
      readings.push({
        reading: $(reading).text(),
      });
    });

    words.push({ romanji, readings });
  });

  return {
    romanji,
    words,
  };
};

export type ParsedIchimoe = ReturnType<typeof parseIchimoe>;
