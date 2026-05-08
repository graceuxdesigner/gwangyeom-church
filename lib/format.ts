// "20260427" or "2026.04.27" → "4월 4주"
export function toWeekLabel(dateStr: string): string {
  const cleaned = dateStr.replace(/[^0-9]/g, "");
  if (cleaned.length !== 8) return dateStr;
  const y = parseInt(cleaned.slice(0, 4));
  const m = parseInt(cleaned.slice(4, 6));
  const d = parseInt(cleaned.slice(6, 8));
  if (isNaN(y) || isNaN(m) || isNaN(d)) return dateStr;
  const firstOfMonth = new Date(y, m - 1, 1);
  const weekOfMonth = Math.ceil((d + firstOfMonth.getDay()) / 7);
  return `${m}월 ${weekOfMonth}주`;
}

// "20260427" → "2026.04.27"
export function toDisplayDate(dateStr: string): string {
  const cleaned = dateStr.replace(/[^0-9]/g, "");
  if (cleaned.length !== 8) return dateStr;
  return `${cleaned.slice(0, 4)}.${cleaned.slice(4, 6)}.${cleaned.slice(6, 8)}`;
}
