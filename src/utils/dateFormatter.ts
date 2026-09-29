/**
 * Formats a date or ISO string into:
 * "DD MMM YYYY, hh:mm AM/PM"
 * Example: "29 Sep 2026, 11:26 AM"
 */
export function formatJobsLastUpdated(dateInput?: string | number | Date | null): string {
  const d = dateInput ? new Date(dateInput) : new Date();
  const validDate = isNaN(d.getTime()) ? new Date() : d;

  const day = validDate.getDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[validDate.getMonth()];
  const year = validDate.getFullYear();

  let hours = validDate.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 hour should be 12
  const formattedHours = hours.toString();
  const minutes = validDate.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year}, ${formattedHours}:${minutes} ${ampm}`;
}
