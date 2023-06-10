import { Detail } from "@raycast/api";
import { parseIchimoe, queryIchimoe } from "./lib/ichimoe";
import { usePromise } from "@raycast/utils";

export default function Command() {
  const input = "おはよう一カスト";

  const { data, isLoading } = usePromise(async () => {
    const ichimoe = await queryIchimoe(input);
    return parseIchimoe(ichimoe);
  });

  const markdown = !isLoading
    ? `
  # ${input} 
  ${data?.romanji ? "## " + data?.romanji : ""}
  `
    : "";

  return <Detail markdown={markdown} isLoading={isLoading} navigationTitle={input} />;
}
