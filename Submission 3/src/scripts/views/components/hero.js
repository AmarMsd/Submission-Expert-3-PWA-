/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
const hero = {
  async init() {
    return ` <div class="hero" style="background-image: linear-gradient(rgba(0, 0, 5, 0.5), rgba(0, 0, 5, 0.5)), " ;>
    <picture class="hero-image">
    <source class="lazyload" media="(max-width: 600px)" srcset="./images/loading.gif " data-src="./images/heros/hero-image_4.jpg">
    <img class="lazyload" src="./images/loading.gif" data-src="./images/heros/hero-image_4.jpg" alt="gambar hero"> 
    </picture>
    <div class="hero-text-content">
      <div class="hero-text">
        <h1>Hayu Makan</h1>
        <p>This Website is For Finding Your Favorite Restaurant</p>
      </div>
    </div>
  </div>`;
  },
};

export default hero;
