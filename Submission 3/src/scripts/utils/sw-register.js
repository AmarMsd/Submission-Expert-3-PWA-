/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    await runtime.register();
    // eslint-disable-next-line linebreak-style
    return;
  }
  // eslint-disable-next-line no-console
  console.log('Service worker not supported in this browser');
};

export default swRegister;
