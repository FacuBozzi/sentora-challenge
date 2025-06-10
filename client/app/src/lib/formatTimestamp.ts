const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//converts timestamp to string in format "Month Day, Hours"
export function formatTimestampUTC(ts: string): string {
  const date = new Date(ts);
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const hour = String(date.getUTCHours()).padStart(2, "0");
  return `${month} ${day}, ${hour}hs`;
}
