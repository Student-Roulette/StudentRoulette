import { decode } from "he";

export function htmlParse(description?: string): string | null {
  return description ? decode(description.replace(/<[^>]*>?/gm, "")) : null;
}
