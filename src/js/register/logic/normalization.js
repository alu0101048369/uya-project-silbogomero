const IBAN = require('iban');

export function normalizeBirthday(str) {
  const parts = str.split('-');
  const birthday = Math.floor(new Date(parts[0], parts[1] - 1, parts[2]).getTime() / 1000);
  const dayBeforeYesterday = Math.floor(new Date().getTime() / 1000) - 2 * 24 * 60 * 60;

  return birthday < dayBeforeYesterday ? birthday : null;
}

export function normalizeIban(str) {
  return IBAN.isValid(str) ? IBAN.electronicFormat(str) : null;
}

// Returns null when empty, "err" when invalid, and the phone if valid
export function normalizePhone(str) {
  let phone = str.replace(/[- ()]+/g, '');
  if (!phone) {
    return null;
  }

  if (phone.charAt(0) !== '+') {
    phone = `+34${phone}`;
  }

  return phone.match(/^\+[0-9]{5,18}$/) ? phone : 'err';
}
