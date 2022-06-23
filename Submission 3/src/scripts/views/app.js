/* eslint-disable no-shadow */
/* eslint-disable no-console */
// eslint-disable-next-line no-shadow
/* eslint quotes: ["error", "single"] */
/* eslint-env es6 */

import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import footer from './components/footer';
import header from './components/header';

class App {
  constructor({ header, main, footer }) {
    this.header = header;
    this.main = main;
    this.footer = footer;
  }

  async initialAppShell() {
    this.header.innerHTML = await header.init();
    header.afterRender();
    this.footer.innerHTML = await footer.init();
  }

  async renderPage() {
    await this.initialAppShell();
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    console.log(page);
    this.main.innerHTML = await page.init();
    await page.afterRender();
    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#main-content').focus();
    });
  }
}

export default App;
