import DetailPage from '../views/pages/detailPage';
import favorite from '../views/pages/favorite';
import HomePage from '../views/pages/homePage';

const routes = {
  '/': HomePage,
  '/detailpage/:id': DetailPage,
  '/favorite': favorite,
};

export default routes;
