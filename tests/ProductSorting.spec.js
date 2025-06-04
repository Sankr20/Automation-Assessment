import {test,expect} from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage.js';
import { ProductsPage } from '../pageObjects/ProductsPage.js';

test.describe('Product Sorting', ()=>{

let loginPage;
let productsPage

test.beforeEach('Login to the account', async({page})=>{
    loginPage=new LoginPage(page);
    productsPage= new ProductsPage(page);
    await loginPage.goTo();
    await loginPage.login('standard_user','secret_sauce');
})

test('Sorting the Products in Descending order', async()=>{
const originalProductTitles=await productsPage.getProductTitles();
await productsPage.changeSortOrder('za');
const reversedProductTitles=await productsPage.getProductTitles();
expect(reversedProductTitles).toEqual([...originalProductTitles].sort().reverse());
})

test('Sorting the Product Prices in Ascending Order', async()=>{
const originalPrices=await productsPage.getProductPrices();
await productsPage.changeSortOrder('lohi');
const reversedPrices= await productsPage.getProductPrices();
expect(reversedPrices).toEqual([...originalPrices].sort((a,b)=>a-b));
})

test('Sorting the Product Prices in Descending Order', async()=>{
const originalPrices=await productsPage.getProductPrices();
await productsPage.changeSortOrder('hilo');
const reversedPrices= await productsPage.getProductPrices();
expect(reversedPrices).toEqual([...originalPrices].sort((a,b)=>b-a));
})

})