export default function stateDefault() {
  const h4 = document.createElement('h4');
  h4.innerText = '¿Acepta la política de privacidad de Facebook?';

  const p = document.createElement('p');
  p.innerHTML =
    'Las noticias de esta página se muestran cargando componentes de Facebook. Para mostrarlas aquí, tiene que aceptar sus <a href="https://www.facebook.com/policy.php" target="_blank"> políticas de tratamiento de datos</a>.';

  const btn1 = document.createElement('button');
  btn1.id = 'btnAccept';
  btn1.innerText = 'Aceptar';
  btn1.setAttribute('type', 'button');
  btn1.classList.add('btn', 'btn-primary', 'accept-button');

  const btn2 = document.createElement('button');
  btn2.id = 'btnDeny';
  btn2.innerText = 'No aceptar';
  btn2.setAttribute('data-mdb-ripple-colo', 'dark');
  btn2.classList.add('btn', 'btn-link', 'accept-button');

  const col2 = document.createElement('div');
  col2.classList.add('col-12', 'col-lg-6', 'border', 'mx-auto', 'p-3', 'shadow-3');
  col2.appendChild(h4);
  col2.appendChild(p);
  col2.appendChild(btn1);
  col2.appendChild(btn2);

  const row2 = document.createElement('div');
  row2.classList.add('row');
  row2.appendChild(col2);

  const cf = document.createElement('div');
  cf.classList.add('container-fluid');
  cf.appendChild(row2);

  const col1 = document.createElement('div');
  col1.classList.add('col-12', 'pb-4');
  col1.appendChild(cf);

  const row1 = document.createElement('div');
  row1.classList.add('row');
  row1.appendChild(col1);

  return row1;
}
