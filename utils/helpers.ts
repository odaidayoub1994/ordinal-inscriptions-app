export function truncateText(text: string): string {
  if (text.length > 6) {
    return `${text.slice(0, 6)}...${text.slice(-6)}`;
  }
  return text;
}
