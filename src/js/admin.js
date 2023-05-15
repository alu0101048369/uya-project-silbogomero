import 'mdb-ui-kit';
import { init as initFirebase } from './firebase';
import main from './admin/main';
import gallery from './admin/gallery';
import socios from './admin/socios';
import spam from './spam';
import detectLegacyBrowser from './legacy';
import alumnos from './admin/aulainsular';

detectLegacyBrowser();
initFirebase();

switch (window.location.pathname) {
  case '/admin':
  case '/admin/':
  case '/admin/index.html':
    main();
    break;
  case '/admin/socios.html':
    socios();
    break;
  case '/admin/gallery.html':
    gallery();
    break;
  case '/admin/aulainsular.html':
    alumnos();
    break;
  default:
    window.location.href = '/404';
}

spam();
