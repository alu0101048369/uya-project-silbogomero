import title from './components/title';
import btnChoose from './components/btnChoose';
import stateDefault from './components/stateDefault';
import stateAccept from './components/stateAccept';
import stateDeny from './components/stateDeny';
import { setCookie } from './cookies';

const noticiasContent = document.getElementById('noticias-content');
let accepted = 'null';

export function getAccepted() {
  return accepted;
}

export function setAccepted(a) {
  accepted = a;
  setCookie(a);
}

export function changeState() {
  noticiasContent.innerHTML = '';
  noticiasContent.appendChild(title());

  switch (accepted) {
    case 'true':
      noticiasContent.appendChild(stateAccept());
      noticiasContent.appendChild(btnChoose());
      break;
    case 'false':
      noticiasContent.appendChild(stateDeny());
      noticiasContent.appendChild(btnChoose());
      break;
    default:
      noticiasContent.appendChild(stateDefault());
  }
}
