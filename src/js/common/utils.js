const dniLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';

export function addLeadingZero(i) {
  if (i < 10) {
    return `0${i}`;
  }
  return i;
}

export function isMinor(birthday) {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  return Math.floor(d.setDate(d.getDate() - 1) / 1000) <= birthday;
}

export function stringToTimestamp(s) {
  const parts = s.split('-');
  return Math.floor(new Date(parts[0], parts[1] - 1, parts[2]).getTime() / 1000);
}

export function normalizeDNI(str) {
  str = str.replace(/[- ]+/g, '').toUpperCase();

  let parts = str.match(/^([A-Z]?)(\d{7,8})([A-Z])/);
  if (!parts) {
    return null;
  }
  parts = parts.slice(1);
  if (parts.length !== 3) {
    return null;
  }

  const nieLetter = parts[0];
  let dniNumber = parts[1];
  const letter = parts[2];

  if (nieLetter !== '') {
    dniNumber = `${nieLetter.charCodeAt(0) - 'X'.charCodeAt(0)}${dniNumber}`;
  }

  if (dniLetters[dniNumber % 23] !== letter) {
    return null;
  }
  return nieLetter + parts[1] + letter;
}

export function normalizeDbDni(str) {
  str = str.replace(/[- ]+/g, '').toUpperCase();

  let parts = str.match(/^([A-Z]?)(\d{7,8})([A-Z])/);
  if (!parts) {
    return null;
  }
  parts = parts.slice(1);
  if (parts.length !== 3) {
    return null;
  }

  const nieLetter = parts[0];
  let dniNumber = parts[1];
  const letter = parts[2];
  let normalizedDNI = `${dniNumber}-${letter}`;

  if (nieLetter !== '') {
    dniNumber = `${nieLetter.charCodeAt(0) - 'X'.charCodeAt(0)}${dniNumber}`;
    normalizedDNI = `${nieLetter}-${normalizedDNI}`;
  }

  if (dniLetters[dniNumber % 23] !== letter) {
    return null;
  }
  return normalizedDNI;
}
