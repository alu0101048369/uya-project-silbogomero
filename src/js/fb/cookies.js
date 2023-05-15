const cookieName = 'accept-fb-privacy-policy';

export function setCookie(v) {
  const expDate = new Date(new Date().getTime() + 365 * 24 * 60 * 60);
  document.cookie = `${cookieName}=${v}; expires=${expDate.toUTCString()}`;
}

export function getCookie() {
  const cookies = document.cookie.split(';');
  // eslint-disable-next-line no-restricted-syntax
  for (const cookie of cookies) {
    const kv = cookie.split('=');
    if (kv[0].trim() === cookieName) {
      return kv[1];
    }
  }
  return 'null';
}
