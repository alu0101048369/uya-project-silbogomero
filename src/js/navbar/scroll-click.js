import { Collapse } from 'mdb-ui-kit';
import breakpoint from '../common/breakpoint';
import { navElements, cards } from './consts';

const navCollapse = new Collapse(document.getElementById('navbarSupportedContent'), {
  toggle: false,
});

document.getElementById('navbar-toggle-btn').addEventListener('click', () => {
  navCollapse.toggle();
});

function scrollCollapsingNav(elementToScroll) {
  elementToScroll.scrollIntoView();
  if (window.innerWidth >= breakpoint.md) {
    return;
  }
  navCollapse.hide();
}

export default function scrollClick() {
  navElements[0].addEventListener('click', () => scrollCollapsingNav(document.body));
  for (let i = 0; i < cards.length; i++) {
    navElements[i + 1].addEventListener('click', () => scrollCollapsingNav(cards[i]));
  }
}
