import detectLegacyBrowser from './legacy';
import spam from './spam';
import ui from './register/ui';
import { enableAwakener } from './register/logic/functionAwakener';

detectLegacyBrowser();
ui();
spam();
enableAwakener();
