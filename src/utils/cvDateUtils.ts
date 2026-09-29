import { CVEmploymentRecord } from '../types';

/**
 * Extracts a numeric year-month score from a date string (e.g. "2024-05", "May 2022", "2021", etc.)
 * Returns a number like 202405 for comparison.
 */
export function parseYearMonth(dateStr?: string): number {
  if (!dateStr || !dateStr.trim()) return 0;
  const str = dateStr.trim();

  // Check for YYYY-MM or YYYY/MM
  const isoMatch = str.match(/^(\d{4})[-/](\d{1,2})/);
  if (isoMatch) {
    return parseInt(isoMatch[1], 10) * 100 + parseInt(isoMatch[2], 10);
  }

  // Check for 4-digit year
  const yearMatch = str.match(/\b(19\d\d|20\d\d)\b/);
  if (yearMatch) {
    const year = parseInt(yearMatch[1], 10);
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const lower = str.toLowerCase();
    const monthIdx = months.findIndex(m => lower.includes(m));
    const month = monthIdx !== -1 ? monthIdx + 1 : 6; // Default to mid-year if month unspecified
    return year * 100 + month;
  }

  return 0;
}

/**
 * Sorts employment records in chronological order.
 * By default in professional CV drafting, reverse chronological ('desc' = most recent first)
 * with currently working jobs at the top is the industry gold standard.
 */
export function sortEmploymentChronological(
  records: CVEmploymentRecord[] = [],
  order: 'desc' | 'asc' = 'desc'
): CVEmploymentRecord[] {
  return [...records].sort((a, b) => {
    // Current job always stays at top in reverse chronological view
    if (order === 'desc') {
      if (a.isCurrentlyWorking && !b.isCurrentlyWorking) return -1;
      if (!a.isCurrentlyWorking && b.isCurrentlyWorking) return 1;
    }

    const valA = parseYearMonth(a.startDate || a.endDate);
    const valB = parseYearMonth(b.startDate || b.endDate);

    if (valA === valB) {
      const endA = a.isCurrentlyWorking ? 999999 : parseYearMonth(a.endDate);
      const endB = b.isCurrentlyWorking ? 999999 : parseYearMonth(b.endDate);
      return order === 'desc' ? endB - endA : endA - endB;
    }

    return order === 'desc' ? valB - valA : valA - valB;
  });
}
