import { endpoint } from './consts';
import { normalizeBirthday, normalizePhone } from './normalization';
import { normalizeDNI } from '../../common/utils';

export async function sendData(data) {
  let resp;
  try {
    resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    });
  } catch (_) {
    return 'Ha habido un problema al contactar con el servidor. Revise su conexión o vuelva a intentarlo más tarde.';
  }
  if (!resp.ok) {
    return `Error: ${await resp.text()}`;
  }
  return null;
}

export function checkFields(fields) {
  const results = {
    valid: { isMember: fields.isMember },
    invalid: [],
  };

  const dni = normalizeDNI(fields.dni);
  if (dni) {
    results.valid.dni = dni;
  } else {
    results.invalid.push('dni');
  }

  const mail = fields.mail.trim();
  // eslint-disable-next-line prettier/prettier, no-useless-escape
  if (mail.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
    results.valid.mail = mail;
  } else {
    results.invalid.push('mail');
  }

  const courseLocation = fields.courseLocation.trim();
  if (courseLocation) {
    results.valid.courseLocation = courseLocation;
  } else {
    results.invalid.push('courseLocation');
  }

  if (!fields.isMember) {
    ['name', 'surname', 'address', 'city'].forEach((key) => {
      const value = fields[key].trim();
      if (value) {
        results.valid[key] = value;
      } else {
        results.invalid.push(key);
      }
    });

    const birthday = normalizeBirthday(fields.birthday);
    if (birthday !== null) {
      results.valid.birthday = birthday;
    } else {
      results.invalid.push('birthday');
    }

    const phone = normalizePhone(fields.phone);
    if (phone && phone !== 'err') {
      results.valid.phone = phone;
    } else {
      results.invalid.push('phone');
    }
  }

  return results;
}
