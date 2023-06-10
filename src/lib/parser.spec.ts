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
        {
          romanji: "ohayō",
          meanings: [{ kana: "おはよう", translations: [{ value: "good morning", type: "[int]" }] }],
        },
        {
          romanji: "ichi/hito",
          meanings: [
            {
              kana: "1. 一 【いち】",
              translations: [
                { type: "[num,pref]", value: "one; 1" },
                { type: "[adj-no,suf]", value: "best" },
                { type: "[adj-no]", value: "first; foremost" },
                { type: "[n]", value: "beginning; start" },
                { type: "[n-pref]", value: "a (single); one (of many)" },
                { type: "[n]", value: "ace (playing card)" },
                { type: "[n]", value: "bottom string (on a shamisen, etc.)" },
              ],
            },
            {
              kana: "2. 一 【ひと】",
              translations: [
                { value: "one", type: "[pref]" },
                { value: "one", type: "[num]" },
              ],
            },
          ],
        },
        { romanji: "kasuto", meanings: [{ kana: "カスト", translations: [{ type: "[n]", value: "caste" }] }] },
      ],
    };

    const result = parseIchimoe($);

    expect(result).toStrictEqual(expected);
  });
});
