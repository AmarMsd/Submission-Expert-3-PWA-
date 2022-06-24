/* eslint linebreak-style: ['error', 'windows'] */

import { openDB } from 'idb';

const DB_NAME = 'resto-idb';
const DB_VERSION = 1.0;
const OBJECT_STORE_NAME = 'restaurant';

const openIdb = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: 'id',
    });
  },
});

const FavoriteRestoIdb = {
  async getResto(id) {
    return (await openIdb).get(OBJECT_STORE_NAME, id);
  },

  async getAllResto() {
    return (await openIdb).getAll(OBJECT_STORE_NAME);
  },

  // eslint-disable-next-line consistent-return
  async putResto(resto) {
    if (resto.id != null) {
      return (await openIdb).put(OBJECT_STORE_NAME, resto);
    }
  },

  async deleteResto(id) {
    return (await openIdb).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRestoIdb;
