/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-tabs */
/* eslint-disable no-return-await */
import UrlParser from '../../routes/url-parser';
import FavoriteRestoIdb from '../../data/resto-idb';
import getApi from '../../data/getApi';

const detailPage = {
  async init() {
    this.url = UrlParser.parseActiveUrlWithoutCombiner();
    return await getApi(`detail/${this.url.id}`).then((e) => this.createElement(e) );
  },
  async createElement(e){

    return await `
    <div class="detail-page"> 
    <picture class="detail-wrap">
    <source class="detail-image lazyload" media="(max-width: 600px)" srcset="./images/loading.gif" data-src="https://restaurant-api.dicoding.dev/images/small/${e.restaurant.pictureId}">
        <img class= "detail-image lazyload" data-src="https://restaurant-api.dicoding.dev/images/large/${e.restaurant.pictureId}" src='./images/loading.gif' 
             alt="Gambar Data API">

    </picture>
      <ul class="detail-info">
        <li class="detail-restaurant">${e.restaurant.name}</li>
        <li class="detail-address">${e.restaurant.address}</li>
        <li class="detail-address">${e.restaurant.city}</li>
        <li class="detail-rating">Rating ${e.restaurant.rating}</li>
        <li class="detail-desc">${e.restaurant.description}</li>
        <button title="Love it" class="button-favorite ${await FavoriteRestoIdb.getResto(e.restaurant.id) ? "afterAdd" : "" }"> 
        <p>${await FavoriteRestoIdb.getResto(e.restaurant.id) ? "Unfavorite" : "Favorite" }</p>
        </button>
        <li class="kategori-header">Kategori</li>
         <span class="kategori">
         </span>
      </ul> 
    </div>
  
    <h4>Menu</h4>
    <div class="detail-menu">
      <div class="detail-food">
        <h2 class="title-food">Food</h2>
        <ul class="foods">
        
        
        </ul>
  
      </div>
      <div class="detail-drink">
        <h2 class="title-drink">Drink</h2>
        <ul class="drinks">
          
        </ul>
      </div>
    </div>
  
    <div class="detail-review">
      <h2>Review</h2>
      <ul class="reviews">
      
      </ul>
    </div>
    `;
  },
  async afterRender() {
    await this.proseKategori();
    await this.prosesFoods();
    await this.prosesDrinks();
    await this.prosesReviews();
    await this.prosesSelectFunc(this.url.id);
  },

  async proseKategori() {
    const kategori = document.querySelector('.kategori');
    await getApi(`detail/${this.url.id}`).then((e) => {
      e.restaurant.categories.forEach((e) => {
        kategori.innerHTML += `
		<li class="detail-kategori">${e.name}</li>
		`;
      });
    });
  },

  async prosesFoods() {
    const foods = document.querySelector('.foods');
    await getApi(`detail/${this.url.id}`).then((e) => {
      e.restaurant.menus.foods.forEach((e) => {
        foods.innerHTML += `
		<li>${e.name}</li>`;
      });
    });
  },

  async prosesDrinks() {
    const drinks = document.querySelector('.drinks');
    await getApi(`detail/${this.url.id}`).then((e) => {
      e.restaurant.menus.drinks.forEach((e) => {
        drinks.innerHTML += `
		<li>${e.name}</li>`;
      });
    });
  },

  async prosesReviews() {
    const reviews = document.querySelector('.reviews');
    await getApi(`detail/${this.url.id}`).then((e) => {
      e.restaurant.customerReviews.forEach((e) => {
        reviews.innerHTML += `
		<li>${e.name} - ${e.review}</li>`;
      });
    });
  },
  async prosesSelectFunc(id) {
    const favorite = document.querySelector('.button-favorite');
    favorite.addEventListener('click', async () => {
      // eslint-disable-next-line eqeqeq
      if (await FavoriteRestoIdb.getResto(id) != undefined) {
        await this.prosesDelete(favorite,id);
      } else {
        await this.prosesFavorite(favorite,id);
      }
    });
  },
  async prosesFavorite(favorite,id) {
    const data = await getApi(`detail/${id}`).then((e) => e.restaurant);
    FavoriteRestoIdb.putResto(data);
    // eslint-disable-next-line no-param-reassign
    favorite.classList.toggle('afterAdd');
    favorite.innerText = 'Unfavorite';
  },

  async prosesDelete(favorite,id) {
    FavoriteRestoIdb.deleteResto(id);
    favorite.classList.toggle('afterAdd');
    favorite.innerText = 'Favorite';
  },
};

export default detailPage;
