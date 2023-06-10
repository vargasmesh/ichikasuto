import * as cheerio from "cheerio";
import { useFetch } from "@raycast/utils";
import { useEffect, useState } from "react";
import { parseIchimoe } from "./parser";

export const useIchimoe = (kanji: string) => {
  const [parsedIchimoe, setParsedIchimoe] = useState<ReturnType<typeof parseIchimoe>>();
  const params = new URLSearchParams({ q: kanji });
  const { isLoading, data } = useFetch("https://ichi.moe/cl/qr/?" + params);

  useEffect(() => {
    if (!isLoading) {
      setParsedIchimoe(parseIchimoe(cheerio.load(data as string)));
    }
  }, [isLoading]);

  return { isLoading, parsedIchimoe };
};
