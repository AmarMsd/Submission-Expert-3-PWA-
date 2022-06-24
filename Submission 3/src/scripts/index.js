/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import 'regenerator-runtime';
import App from './views/app';
import '../styles/main.css';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// eslint-disable-next-line linebreak-style

const app = new App({
  header: document.querySelector('header'),
  drawer: document.querySelector('#drawer'),
  main: document.querySelector('main'),
  footer: document.querySelector('footer'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
