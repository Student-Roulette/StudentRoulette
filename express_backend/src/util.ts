import { decode } from "he";

export function htmlParse(description?: string): string | null {
  if (!description) {
    return null;
  }
  const unescaped = decode(description);
  const breaks = unescaped.replace(/<b\/>/gm, "\n");
  return breaks.replace(/<[^>]*>?/gm, "");
}
