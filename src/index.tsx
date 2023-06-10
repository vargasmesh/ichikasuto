import { Detail } from "@raycast/api";
import { useIchimoe } from "./lib/ichimoe";

export default function Command() {
  const input = "おはよう一カスト";
  const { parsedIchimoe, isLoading } = useIchimoe(input);

  const markdown = !isLoading
    ? `
  # ${input} 
  ${parsedIchimoe?.romanji ? "## " + parsedIchimoe?.romanji : ""}
  `
    : "";

  return <Detail markdown={markdown} isLoading={isLoading} navigationTitle={input} />;
}
