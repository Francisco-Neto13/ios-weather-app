export const formatCityTime = (timestamp, timezoneOffset) => {
  if (!Number.isFinite(timestamp)) return null;

  const offset = Number.isFinite(timezoneOffset) ? timezoneOffset : 0;
  const date = new Date((timestamp + offset) * 1000);
  const rawHours = date.getUTCHours();
  let hours = rawHours % 12;

  if (hours === 0) hours = 12;

  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const period = rawHours >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${period}`;
};
