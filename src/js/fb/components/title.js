export default function title() {
  const h2 = document.createElement('h2');
  h2.id = 'fb-card-title';
  h2.innerText = 'Noticias';

  const col = document.createElement('div');
  col.classList.add('col-12', 'py-3');
  col.appendChild(h2);

  const row = document.createElement('div');
  row.classList.add('row');
  row.appendChild(col);

  return row;
}
