import * as cheerio from "cheerio";

type Translation = {
  type: string;
  value: string;
};

export type Meaning = {
  kana: string;
  translations: Translation[];
};

export type Word = {
  romanji: string;
  meanings: Meaning[];
};

export const parseIchimoe = ($: cheerio.CheerioAPI) => {
  const romanji = $(".ds-text[data-pick=0]").text();

  const tokens = $(".gloss-row[data-pick=0] > ul > li");

  const words: Word[] = [];
  tokens.each((_, token) => {
    const child = $(token);
    const romanji = child.find(".gloss-rtext > a > em").text();
    const meanings: Meaning[] = [];

    let tempMeaning: Meaning | undefined = undefined;
    child
      .find("dl")
      .children()
      .each((_, r) => {
        if (r.name === "dt") {
          if (tempMeaning) {
            meanings.push(tempMeaning);
          }

          tempMeaning = {
            kana: $(r).text(),
            translations: [],
          };
        }

        if (r.name === "dd" && tempMeaning) {
          $(r)
            .find("ol > li")
            .each((_, t) => {
              const row = $(t);
              tempMeaning?.translations.push({
                type: row.find(".pos-desc").text(),
                value: row.find(".gloss-desc").text(),
              });
            })
            .get();
        }
      });

    if (tempMeaning) meanings.push(tempMeaning);

    words.push({ romanji, meanings });
  });

  return {
    romanji,
    words,
  };
};

export type ParsedIchimoe = ReturnType<typeof parseIchimoe>;
