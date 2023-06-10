import { useIchimoe } from "./lib/useIchimoe";
import { useState } from "react";
import { List } from "@raycast/api";
import { Word } from "./lib/parser";

const renderDetailMarkdown = (word: Word) => {
  let markdown = "";

  word.meanings?.forEach((reading) => {
    markdown += `## ${reading.kana}\n`;
    reading.translations?.forEach((translation, index) => {
      markdown += `${index + 1}. _${translation.type}_ ${translation.value}\n`;
    });
  });

  return markdown;
};

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const { parsedIchimoe, isLoading } = useIchimoe(searchText);

  return (
    <List isLoading={isLoading} onSearchTextChange={setSearchText} isShowingDetail={true}>
      {parsedIchimoe &&
        parsedIchimoe.words.map((word) => {
          const detail = <List.Item.Detail markdown={renderDetailMarkdown(word)} />;

          return <List.Item title={word.romanji} key={word.romanji} detail={detail} />;
        })}
    </List>
  );
}
