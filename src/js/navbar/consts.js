export const navElementIDs = [
  'navInicio',
  'navQuienesSomos',
  'navContacto',
  'navNoticias',
  'navGaleria',
];
export const cardsIDs = ['quienes-somos', 'contacto', 'noticias', 'galeria'];
export const navElements = navElementIDs.map((id) => document.getElementById(id));
export const cards = cardsIDs.map((id) => document.getElementById(id));
export const scrollOffset = 60;
