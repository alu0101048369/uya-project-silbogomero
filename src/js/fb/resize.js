import { getAccepted } from './state';

const fbUrl =
  'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2Fcategory%2FCultural-Center%2FAsociaci%25C3%25B3n-Cultural-Silbo-Gomero-100514121959304%2F&tabs=timeline&width={{width}}&height={{height}}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId';

export default function resize() {
  if (getAccepted() !== 'true') {
    return;
  }

  const fbCardTitle = document.getElementById('fb-card-title');
  const fbFrame = document.getElementById('fb-frame');

  const height = Math.floor(window.innerHeight * 0.7);
  let width = Math.floor(fbCardTitle.getBoundingClientRect().width);
  width = width < 500 ? width : 500;

  fbFrame.width = width;
  fbFrame.height = height;
  fbFrame.src = fbUrl.replace('{{height}}', height).replace('{{width}}', width);
}
