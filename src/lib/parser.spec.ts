import { describe, expect, it } from "vitest";
import fs from "fs";
import * as cheerio from "cheerio";
import { parseIchimoe } from "./parser";

describe("parseIchimoe", () => {
  it("should parse", () => {
    const $ = cheerio.load(fs.readFileSync("./src/lib/testdata/test.html").toString());
    const expected = {
      romanji: "ohayō ichi/hito kasuto",
      words: [
        { romanji: "ohayō", meanings: [{ kana: "おはよう", translations: ["good morning"] }] },
        {
          romanji: "ichi/hito",
          meanings: [
            {
              kana: "1. 一 【いち】",
              translations: [
                "one; 1",
                "best",
                "first; foremost",
                "beginning; start",
                "a (single); one (of many)",
                "ace (playing card)",
                "bottom string (on a shamisen, etc.)",
              ],
            },
            { kana: "2. 一 【ひと】", translations: ["one", "one"] },
          ],
        },
        { romanji: "kasuto", meanings: [{ kana: "カスト", translations: ["caste"] }] },
      ],
    };

    const result = parseIchimoe($);

    expect(result).toStrictEqual(expected);
  });
});
