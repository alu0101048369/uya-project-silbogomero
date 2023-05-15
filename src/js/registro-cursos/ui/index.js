/* eslint-disable */
import * as mdb from 'mdb-ui-kit';
import { checkFields, sendData } from '../logic';
import { addEventUnsetInputRedOnInput, addEventUnsetSelectRedOnChange, setInputRed, setSelectRed } from './uiUtils';

const form = {
  client: {
    name: document.getElementById('inputName'),
    surname: document.getElementById('inputSurname'),
    dni: document.getElementById('inputDNI'),
    birthday: document.getElementById('inputBirthday'),
    phone: document.getElementById('inputPhone'),
    mail: document.getElementById('inputMail'),
    address: document.getElementById('inputAddress'),
    city: document.getElementById('inputCity'),
  },
  course: {
    location: document.getElementById('inputLocation'),
  },
  isMember: {
    btnYes: document.getElementById("radBtnYes"),
    btnNo: document.getElementById("radBtnNo"),
    hiddenForm: document.getElementById("form-hidden-default"),
    value: undefined,
  },
  btnSubmit: document.getElementById('btnSubmit'),
  recaptchaContainer: document.getElementById("recaptchaContainer"),
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
  form.client.birthday.value = `${now.getFullYear()}-${addLeadingZero(
    now.getMonth() + 1
  )}-${addLeadingZero(now.getDate())}`;

  // Unset red fields when input is detected
  Object.keys(form.client).forEach((key) => {
    addEventUnsetInputRedOnInput(form.client[key]);
  });
  addEventUnsetSelectRedOnChange(form.course.location);

  form.isMember.btnYes.addEventListener('change', isMemberRadioBtnEvent);
  form.isMember.btnNo.addEventListener('change', isMemberRadioBtnEvent);
  form.btnSubmit.addEventListener('click', submit);
}

async function submit() {
  disableAllFields(true);

  // Check fields
  const fieldValues = {
    isMember: form.isMember.value,
    courseLocation: form.course.location.value,
  };
  Object.keys(form.client).forEach((key) => {
    fieldValues[key] = form.client[key].value;
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

  // Hide form and show confirmation message
  document.getElementById('registerForm').classList.add('d-none');
  document.getElementById('registerConfirmation').classList.remove('d-none');
}

function parseLogicCheckInvalid(invalid) {
  const fieldsInSpanish = [];
  invalid.forEach((fieldName) => {
    let nameInSpanish;
    let field;

    switch (fieldName) {
      case 'name':
        nameInSpanish = 'Nombre';
        field = form.client.name;
        break;
      case 'surname':
        nameInSpanish = 'Apellidos';
        field = form.client.surname;
        break;
      case 'dni':
        nameInSpanish = 'DNI';
        field = form.client.dni;
        break;
      case 'birthday':
        nameInSpanish = 'Fecha de nacimiento';
        field = form.client.birthday;
        break;
      case 'phone':
        nameInSpanish = 'Teléfono';
        field = form.client.phone;
        break;
      case 'mail':
        nameInSpanish = 'Correo electrónico';
        field = form.client.mail;
        break;
      case 'address':
        nameInSpanish = 'Domicilio';
        field = form.client.address;
        break;
      case 'city':
        nameInSpanish = 'Población';
        field = form.client.city;
        break;
      case 'courseLocation':
        nameInSpanish = 'Municipio donde recibir las clases';
        field = form.course.location;
        break;
      default:
    }

    if (fieldName !== 'courseLocation') {
      setInputRed(field);
    } else {
      setSelectRed(field);
    }
    fieldsInSpanish.push(nameInSpanish);
  });
  return fieldsInSpanish;
}

function disableAllFields(value) {
  Object.keys(form.client).forEach((key) => {
    form.client[key].disabled = value;
  });
  Object.keys(form.isMember).forEach((key) => {
    if (key.startsWith("btn")) {
      form.isMember[key].disabled = value;
    }
  });
  form.course.location.disabled = value;
  form.btnSubmit.disabled = value;
}

/* function unsetCheckRed() {
  form.iban.checkIban.classList.remove('border-red');
  form.iban.checkIbanLabel.classList.remove('text-danger');
} */

function isMemberRadioBtnEvent(event) {
  form.isMember.value = event.target.value === "yes";
  form.course.location.parentElement.classList.remove("d-none");
  form.recaptchaContainer.classList.remove("d-none");
  form.btnSubmit.parentElement.classList.remove("d-none");
  ["dni", "mail"].forEach(v => {
    form.client[v].parentElement.parentElement.classList.remove("d-none");
  });
  ["name", "surname", "birthday", "phone", "address", "city"].forEach(v => {
    form.client[v].parentElement.parentElement.classList.toggle("d-none", event.target.value === "yes");
  });
}

function addLeadingZero(n) {
  return n < 10 ? `0${n}` : n;
}
