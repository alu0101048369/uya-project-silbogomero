export function setInputRed(element) {
  element.parentElement
    .querySelectorAll('.form-notch-leading, .form-notch-middle, .form-notch-trailing')
    .forEach((subElement) => {
      subElement.classList.add('border-red');
    });
}

export function unsetInputRed(element) {
  element.parentElement.querySelectorAll('.border-red').forEach((subElement) => {
    subElement.classList.remove('border-red');
  });
}

export function addEventUnsetInputRedOnInput(element) {
  element.addEventListener('input', (evt) => {
    if (evt.target.value !== '') {
      unsetInputRed(evt.target);
    }
  });
}
