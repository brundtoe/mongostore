/**
 * Get current date and time in YYYY-MM-DD HH:MM:SS format
 * @returns {string}
 */
function getDateTime() {
  const updated_at = new Date()
  const pad = (n) => String(n).padStart(2, '0');
  return `${updated_at.getFullYear()}-${pad(updated_at.getMonth() + 1)}-${pad(updated_at.getDate())} ${pad(updated_at.getHours())}:${pad(updated_at.getMinutes())}:${pad(updated_at.getSeconds())}`;
}

module.exports = getDateTime
