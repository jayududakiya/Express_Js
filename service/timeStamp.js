exports.getISTTimestamp = () => {
  const date = new Date();

  // Convert to IST
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istDate = new Date(date.getTime() + istOffset);

  // Extract components
  let hours = istDate.getUTCHours() % 12 || 12;
  const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(istDate.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(istDate.getUTCMilliseconds()).padStart(3, '0');
  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(istDate.getUTCDate()).padStart(2, '0');

  // Format as desired string
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+05:30`;
}
