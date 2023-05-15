export default function spam() {
  const colorBlue = 'color: #1a73e8';
  console.log('%c¡Hi! Thank you for being interested in this website.', colorBlue);
  console.log(
    // eslint-disable-next-line quotes
    "%cMy name is Miguel Dorta, and I'm a Software Developer. I'm the creator of this page and the maintainer of the asociacionsilbogomero.org domain.",
    colorBlue
  );
  console.log(
    '%cIf you want to know more about my work, you can visit:\n  https://www.migueldorta.com',
    colorBlue
  );
}
