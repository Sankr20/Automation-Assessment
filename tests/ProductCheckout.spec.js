import {test,expect} from '@playwright/test'
import { LoginPage } from '../pageObjects/LoginPage'
import { ProductsPage } from '../pageObjects/ProductsPage'
import { CartPage } from '../pageObjects/CartPage'
import { CheckoutPage } from '../pageObjects/CheckoutPage'
import { CheckoutOverview } from '../pageObjects/CheckoutOverview'
import { CheckoutCompletePage } from '../pageObjects/CheckoutCompletePage'


test.describe('Product check out End to End testing', ()=>{

test('Product checkout', async({page})=>{
const loginPage= new LoginPage(page);
const productsPage= new ProductsPage(page);
const cartPage=new CartPage(page);
const checkoutPage=new CheckoutPage(page);
const checkoutOverview=new CheckoutOverview(page);
const checkoutCompletePage= new CheckoutCompletePage(page);

//Login to the account
await loginPage.goTo();
await loginPage.login('standard_user','secret_sauce');

//Adding product to the cart
await productsPage.chooseProduct('Sauce Labs Backpack');
await productsPage.clickOnCartButton();

//Verifing cart details and proceeding to checkout
expect(await cartPage.verifyPageTitle()).toBe(true);
expect(await cartPage.verifyProductDetails('Sauce Labs Backpack')).toBe(true);
await cartPage.proceedToCheckout();

//Completing checkout workflow
await checkoutPage.enterYourInformation('First','Last','8000');
await checkoutPage.clickonContinue();

//Verifying order summary from checkout Overview screen
const summary=await checkoutOverview.verifyOrderSummary();
expect(summary.name).toContain('Sauce Labs Backpack');
expect(summary.desc).toContain('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
expect(summary.price).toBe('$29.99');
expect(summary.total).toContain('$29.99');
expect(summary.tax).toContain('$2.40');
expect(summary.totalPrice).toContain('$32.39');
await checkoutOverview.finishCheckout();

//Verifying order completion message
const successMsg=await checkoutCompletePage.verifyOrderSuccessMsg();
expect(successMsg.thankYouHeader).toContain('Thank you for your order!');
expect(successMsg.deliveryText).toContain('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
})


})