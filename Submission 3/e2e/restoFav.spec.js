const { async } = require("regenerator-runtime")
const assert = require('assert');
Feature('Favorite Resto');

Scenario('favorite and unfavorite restaurant',async ({I})=>{
	I.amOnPage('/');
	let nameResto;
	await I.waitForElement('.list_item',80).then(async (element)=>{
		nameResto = await I.grabTextFrom('.list_item_title a');
		I.click('.list_item_title a');
		await I.waitForElement('.button-favorite',80).then(async ()=>{
			I.wait(3);
			await I.click('.button-favorite');
			I.amOnPage('/#/favorite');
			await I.waitForElement('.list_item',80).then(async (element)=>{
				assert.strictEqual(nameResto,await I.grabTextFrom('.list_item_title a'));
			})
		})
	});
	I.amOnPage('/');
	await I.waitForElement('.list_item',80).then(async (e)=>{
		I.click('.list_item_title a');
		await I.waitForElement('.button-favorite',80).then(async ()=>{
			I.wait(3);
			await I.click('.button-favorite');
			I.amOnPage('/#/favorite');
			I.dontSeeElement('.list_item');
		});
	})
})

Scenario("Show Message Favorite Resto",async ({I})=>{
	I.amOnPage('/#/favorite');
	I.seeElement('.message-empty')
})