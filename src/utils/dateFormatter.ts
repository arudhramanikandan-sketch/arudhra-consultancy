/**
 * Formats a date or ISO string into:
 * "DD MMM YYYY, h:mm AM/PM"
 * Examples:
 * - "08 Oct 2026, 6:35 PM"
 * - "08 Oct 2026, 7:10 PM"
 * - "08 Oct 2026, 10:38 AM"
 */
export function formatJobsLastUpdated(dateInput?: string | number | Date | null): string {
  if (!dateInput) {
    return 'Recently updated';
  }

  const d = new Date(dateInput);
  if (isNaN(d.getTime())) {
    if (typeof dateInput === 'string' && dateInput.trim()) {
      return dateInput.trim();
    }
    return 'Recently updated';
  }

  const day = d.getDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  let hours = d.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // 0 hour should be 12
  const formattedHours = hours.toString();
  const minutes = d.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year}, ${formattedHours}:${minutes} ${ampm}`;
}
