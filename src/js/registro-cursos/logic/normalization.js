export function normalizeBirthday(str) {
  const parts = str.split('-');
  const birthday = Math.floor(new Date(parts[0], parts[1] - 1, parts[2]).getTime() / 1000);
  const now = Math.floor(new Date().getTime() / 1000);

  return birthday < now ? birthday : null;
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
