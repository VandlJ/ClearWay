// Helper function to parse "HH:MM:SS" into a Date object
function parseTime(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, seconds, 0);
  return date;
}

module.exports = { parseTime };
