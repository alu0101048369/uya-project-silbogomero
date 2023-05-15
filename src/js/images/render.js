import { Modal } from 'mdb-ui-kit';

const imgContainer = document.getElementById('gallery-img-container');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modal = new Modal(document.getElementById('exampleModal'));

export default function render(resp) {
  if (resp.error !== null) {
    console.error('Error loading gallery:', resp.error);
    imgContainer.firstElementChild.innerText =
      'Ha habido un error al cargar la galería. Inténtelo más tarde.';
    return;
  }

  imgContainer.removeChild(imgContainer.firstElementChild);

  resp.list.forEach((element) => {
    if (!element) {
      return;
    }
    const img = document.createElement('img');
    img.src = element.image;
    img.alt = element.title;
    img.classList.add('w-100', 'object-fit-cover', 'gallery-img', 'hover-shadow');

    const a = document.createElement('a');
    a.href = '#';
    a.classList.add('w-100', 'h-100');
    a.addEventListener('click', (evt) => {
      evt.preventDefault();
      modalImg.src = element.image;
      modalTitle.innerText = element.title;
      modalDescription.innerText = element.description;
      modal.show();
    });
    a.appendChild(img);

    const wrapper = document.createElement('div');
    wrapper.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'px-3', 'py-3');
    wrapper.appendChild(a);

    imgContainer.appendChild(wrapper);
  });
}
