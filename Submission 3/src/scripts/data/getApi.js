/* eslint-disable */
const getApi = async (request) => await $.get(`https://restaurant-api.dicoding.dev/${request}`).then((e) => e);

export default getApi;
