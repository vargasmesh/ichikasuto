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
        { romanji: "ohayō", readings: [{ reading: "おはよう" }] },
        { romanji: "ichi/hito", readings: [{ reading: "1. 一 【いち】" }, { reading: "2. 一 【ひと】" }] },
        { romanji: "kasuto", readings: [{ reading: "カスト" }] },
      ],
    };

    const result = parseIchimoe($);

    expect(result).toStrictEqual(expected);
  });
});
