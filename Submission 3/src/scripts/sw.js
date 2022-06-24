/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint no-implicit-globals: "error" */
import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  // eslint-disable-next-line no-undef
  event.waitUntil(CacheHelper.cachingAppShell([...assets, './']));
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
