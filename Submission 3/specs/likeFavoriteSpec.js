const { async } = require("regenerator-runtime")
import dataReal from './utils/data.js';
import detailPage from '../src/scripts/views/pages/detailPage';
import restoIDB from '../src/scripts/data/resto-idb'

describe('Liking A Restaurant', ()=>{
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
        await restoIDB.deleteResto(idExample)
    })
    
    it('should show the like button when restaurant has not been liked before', async ()=>{
        await detailPageNow(dataReal);
        expect(document.querySelector('.button-favorite.afterAdd')).toBeFalsy();
    });

    it('should not show the unlike button when the restaurant has not been liked before', async()=>{
        await restoIDB.putResto(dataReal.restaurant)
        await detailPageNow(dataReal);
        expect(document.querySelector('.button-favorite.afterAdd')).toBeTruthy();

    });

    it('should be able to like the restaurant', async()=>{
        await detailPageNow(dataReal);        
        document.querySelector('.button-favorite').dispatchEvent(new Event('click'));
        await sleep(3000);
        const resto = await restoIDB.getResto(idExample);
        expect(resto.id).toEqual(idExample);

    });

    it('should not add a restaurant again when its already liked', async()=>{
        await detailPageNow(dataReal);
        await restoIDB.putResto(dataReal.restaurant);
        await restoIDB.putResto(dataReal.restaurant);
        await restoIDB.putResto(dataReal.restaurant);
        await sleep(3000);
        const resto = await restoIDB.getAllResto();
        expect(resto.length == 1).toBeTruthy();

    });

    it('should not add a restaurant when it has no id', async()=>{
        await restoIDB.putResto([]);
        const resto = await restoIDB.getAllResto();
        expect(resto).toEqual([]);
    });

})