export default function btnChoose() {
  const btn = document.createElement('button');
  btn.id = 'btnChoose';
  btn.setAttribute('type', 'button');
  btn.setAttribute('data-mdb-ripple-color', 'dark');
  btn.classList.add('btn', 'btn-link', 'shadow-0');
  btn.innerText = 'Elegir si quiero cargar componentes de Facebook';

  const col = document.createElement('div');
  col.classList.add('col-12', 'pb-4', 'text-center');
  col.appendChild(btn);

  const row = document.createElement('div');
  row.classList.add('row');
  row.appendChild(col);

  return row;
}
