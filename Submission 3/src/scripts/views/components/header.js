/* eslint-disable no-tabs */
const header = {
  async init() {
    return ` <div class="block_navbar_menu">
		<button href="#" id="menu" class="navbar__menu">☰</button>
		<div class="logo">HAYU MAKAN</div>
		</div>
  
	  <nav id="drawer" class="nav">
		<div class="logo">HAYU MAKAN</div>  
		<ul class="nav__list">
		  <li class="nav__item"><a href="#">Home</a></li>
  
		  <li class="nav__item"><a href="#/favorite">Favorite</a></li>
		  <li class="nav__item"><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/amar-musaddad-423240231/">About Us</a></li>
		</ul>
	  </nav>`;
  },
  async afterRender() {
    const btnBurger = document.querySelector('#menu');
    btnBurger.addEventListener('click', () => {
      document.querySelector('.logo').classList.toggle('hidden');
      document.querySelector('.nav').classList.toggle('active');
    });
  },
};

export default header;
