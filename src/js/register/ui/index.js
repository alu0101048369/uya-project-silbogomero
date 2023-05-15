import * as mdb from 'mdb-ui-kit';
import { isMinor } from '../../common/utils';
import { checkFields, sendData } from '../logic';
import { disableAwakener } from '../logic/functionAwakener';
import { addEventUnsetInputRedOnInput, setInputRed } from './uiUtils';

const form = {
  member: {
    name: document.getElementById('inputName'),
    surname: document.getElementById('inputSurname'),
    dni: document.getElementById('inputDNI'),
    birthday: document.getElementById('inputBirthday'),
    phone: document.getElementById('inputPhone'),
    fax: document.getElementById('inputFax'),
    mail: document.getElementById('inputMail'),
    address: document.getElementById('inputAddress'),
    city: document.getElementById('inputCity'),
    zipcode: document.getElementById('inputZipcode'),
    province: document.getElementById('inputProvince'),
    country: document.getElementById('inputCountry'),
  },
  iban: {
    input: document.getElementById('inputIban'),
    checkIban: document.getElementById('checkIban'),
    checkIbanLabel: document.getElementById('checkIbanLabel'),
    radBtnAuto: document.getElementById('radBtnAuto'),
    radBtnManual: document.getElementById('radBtnManual'),
    radBtnMinor: document.getElementById('radBtnMinor'),
    collapseIbanAuto: new mdb.Collapse(document.getElementById('collapseIbanAuto')),
    collapseIbanManual: new mdb.Collapse(document.getElementById('collapseIbanManual'), {
      toggle: false,
    }),
    collapseIbanMinor: new mdb.Collapse(document.getElementById('collapseIbanMinor'), {
      toggle: false,
    }),
  },
  btnSubmit: document.getElementById('btnSubmit'),
};

const errorModal = {
  _modal: new mdb.Modal(document.getElementById('modal')),
  _body: document.getElementById('modalBody'),
  show: (err) => {
    errorModal._body.innerText = err;
    errorModal._modal.show();
  },
};

export default function ui() {
  // Set birthday date to today
  const now = new Date();
  form.member.birthday.value = `${now.getFullYear()}-${addLeadingZero(
    now.getMonth() + 1
  )}-${addLeadingZero(now.getDate())}`;

  // Unset red fields when input is detected
  Object.keys(form.member).forEach((key) => {
    addEventUnsetInputRedOnInput(form.member[key]);
  });
  addEventUnsetInputRedOnInput(form.iban.input);
  form.iban.checkIban.addEventListener('change', unsetCheckRed);

  // Set listener to change dialog in IBAN radio buttons
  form.iban.radBtnAuto.addEventListener('change', ibanRadioButtonEvent);
  form.iban.radBtnManual.addEventListener('change', ibanRadioButtonEvent);
  form.iban.radBtnMinor.addEventListener('change', ibanRadioButtonEvent);
  form.btnSubmit.addEventListener('click', submit);

  // TODO set waker for cloud function
}

async function submit() {
  disableAllFields(true);

  // Check fields
  const fieldValues = {
    ibanRequired: form.iban.radBtnAuto.checked,
    iban: form.iban.input.value,
  };
  Object.keys(form.member).forEach((key) => {
    fieldValues[key] = form.member[key].value;
  });
  const { valid, invalid } = checkFields(fieldValues);

  // Report invalid fields
  if (invalid.length > 0) {
    const invalidFieldsInSpanish = parseLogicCheckInvalid(invalid);
    errorModal.show(
      // eslint-disable-next-line prettier/prettier
      `Los siguientes campos están incompletos o son inválidos: ${invalidFieldsInSpanish.join(', ')}`
    );
    disableAllFields(false);
    return;
  }
  if (!checkIbanSubform(valid.birthday)) {
    disableAllFields(false);
    return;
  }

  // Send data to server
  const resp = await sendData({
    // eslint-disable-next-line no-undef
    'g-recaptcha-response': grecaptcha.getResponse(),
    ...valid,
  });
  if (resp) {
    errorModal.show(resp);
    disableAllFields(false);
    return;
  }

  // Hide form, show confirmation messages, and disable awakener
  document.getElementById('registerForm').classList.add('d-none');
  document
    .getElementById(
      !form.iban.radBtnManual.checked ? 'registeredWithIban' : 'registeredWithoutIban'
    )
    .classList.remove('d-none');
  disableAwakener();
}

function parseLogicCheckInvalid(invalid) {
  const fieldsInSpanish = [];
  invalid.forEach((fieldName) => {
    let nameInSpanish;
    let field;

    switch (fieldName) {
      case 'name':
        nameInSpanish = 'Nombre';
        field = form.member.name;
        break;
      case 'surname':
        nameInSpanish = 'Apellidos';
        field = form.member.surname;
        break;
      case 'dni':
        nameInSpanish = 'DNI';
        field = form.member.dni;
        break;
      case 'birthday':
        nameInSpanish = 'Fecha de nacimiento';
        field = form.member.birthday;
        break;
      case 'phone':
        nameInSpanish = 'Teléfono';
        field = form.member.phone;
        break;
      case 'fax':
        nameInSpanish = 'Fax';
        field = form.member.fax;
        break;
      case 'mail':
        nameInSpanish = 'Correo electrónico';
        field = form.member.mail;
        break;
      case 'address':
        nameInSpanish = 'Domicilio';
        field = form.member.address;
        break;
      case 'city':
        nameInSpanish = 'Población';
        field = form.member.city;
        break;
      case 'zipcode':
        nameInSpanish = 'Código postal';
        field = form.member.zipcode;
        break;
      case 'province':
        nameInSpanish = 'Provincia';
        field = form.member.province;
        break;
      case 'country':
        nameInSpanish = 'País';
        field = form.member.country;
        break;
      case 'iban':
        nameInSpanish = 'IBAN';
        field = form.iban.input;
        break;
      default:
    }

    fieldsInSpanish.push(nameInSpanish);
    setInputRed(field);
  });
  return fieldsInSpanish;
}

function checkIbanSubform(birthday) {
  if (form.iban.radBtnAuto.checked && !form.iban.checkIban.checked) {
    errorModal.show(
      'Tiene que confirmar ser el propietario de la cuenta para domiciliar la cuota de socio'
    );
    form.iban.checkIban.classList.add('border-red');
    form.iban.checkIbanLabel.classList.add('text-danger');
    return false;
  }
  if (form.iban.radBtnMinor.checked && !isMinor(birthday)) {
    errorModal.show('No puede considerarse menor de edad con esa fecha de nacimiento');
    setInputRed(form.member.birthday);
    return false;
  }
  return true;
}

function disableAllFields(value) {
  Object.keys(form.member).forEach((key) => {
    form.member[key].disabled = value;
  });
  Object.keys(form.iban)
    .filter((key) => !key.startsWith('collapse'))
    .forEach((key) => {
      form.iban[key].disabled = value;
    });
  form.btnSubmit.disabled = value;
}

function unsetCheckRed() {
  form.iban.checkIban.classList.remove('border-red');
  form.iban.checkIbanLabel.classList.remove('text-danger');
}

function ibanRadioButtonEvent(e) {
  const i = [form.iban.radBtnAuto, form.iban.radBtnManual, form.iban.radBtnMinor].indexOf(e.target);
  [form.iban.collapseIbanAuto, form.iban.collapseIbanManual, form.iban.collapseIbanMinor].forEach(
    (element, index) => {
      if (index === i) {
        element.show();
      } else {
        element.hide();
      }
    }
  );
}

function addLeadingZero(n) {
  return n < 10 ? `0${n}` : n;
}
