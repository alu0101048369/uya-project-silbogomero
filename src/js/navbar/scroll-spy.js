import { navElements, cards, scrollOffset } from './consts';

const rNavElements = navElements.slice().reverse();
const rCards = cards.slice().reverse();

function getCardInView() {
  for (let i = 0; i < rCards.length; i++) {
    const pos = rCards[i].getBoundingClientRect();

    if (i === 0 && pos.bottom - window.innerHeight <= 0) {
      return 0;
    }

    if (pos.top - scrollOffset <= 0) {
      return i;
    }
  }
  return rCards.length;
}

function callback() {
  const cardIndex = getCardInView();
  for (let i = 0; i < rNavElements.length; i++) {
    if (i === cardIndex) {
      rNavElements[i].classList.add('active');
    } else {
      rNavElements[i].classList.remove('active');
    }
  }
}

export default function scrollSpy() {
  document.addEventListener('scroll', callback);
}
