import { getCookie } from './cookies';
import { setAccepted, changeState } from './state';
import resize from './resize';

function setCallbacks() {
  const btnChoose = document.getElementById('btnChoose');
  const btnAccept = document.getElementById('btnAccept');
  const btnDeny = document.getElementById('btnDeny');
  const fbFrame = document.getElementById('fb-frame');

  if (btnChoose !== null) {
    btnChoose.addEventListener('click', () => {
      setAccepted('null');
      changeState();
      setCallbacks();
    });
  }
  if (btnAccept !== null) {
    btnAccept.addEventListener('click', () => {
      setAccepted('true');
      changeState();
      setCallbacks();
    });
  }
  if (btnDeny !== null) {
    btnDeny.addEventListener('click', () => {
      setAccepted('false');
      changeState();
      setCallbacks();
    });
  }
  if (fbFrame !== null) {
    resize();
    fbFrame.addEventListener('load', () => {
      const loader = document.getElementById('fb-loader');
      loader.parentElement.removeChild(loader);
      fbFrame.hidden = false;
    });
    setTimeout(() => {
      const takingTooLong = document.getElementById('fb-taking-too-long');
      if (takingTooLong) {
        takingTooLong.style.display = 'block';
      }
    }, 5000);
  }
}

export default function fb() {
  const state = getCookie();
  setAccepted(state);
  changeState();
  setCallbacks();
}
