const { async } = require("regenerator-runtime")
import dataReal from './utils/data.js';
import detailPage from '../src/scripts/views/pages/detailPage';
import restoIDB from '../src/scripts/data/resto-idb'

describe('Unliking A Restaurant', () =>{
    const idExample = 's1knt6za9kkfw1e867';
    const detailPageNow = async (data)=>{
        document.body.innerHTML = await detailPage.createElement(data);
        await detailPage.prosesSelectFunc(data.restaurant.id);
        sleep(3000)
    }
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    beforeEach(async ()=>{
        await restoIDB.putResto(dataReal.restaurant)
    })
    it('should display unlike widget when the restaurant has been liked', async()=>{
        await detailPageNow(dataReal);
        expect(document.querySelector('.button-favorite.afterAdd')).toBeTruthy();

    });
    it('should not display like widget when the restaurant has been liked', async()=>{
        await restoIDB.deleteResto(dataReal.restaurant.id)
        await detailPageNow(dataReal);
        expect(document.querySelector('.button-favorite.afterAdd')).toBeFalsy();
    });

    it('should be able to remove liked restaurant from the list', async()=>{
        await detailPageNow(dataReal);        
        document.querySelector('.button-favorite').dispatchEvent(new Event('click'));
        await sleep(3000);
        const resto = await restoIDB.getResto(idExample);
        console.log(resto);
        expect(resto == undefined).toBeTruthy();
    });
});