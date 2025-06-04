import {test,expect} from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage.js';

test.describe('Login test',()=>{

let loginPage;

test.beforeEach(async({page})=>{
loginPage=new LoginPage(page);
await loginPage.goTo();

})

test('Valid login workflow', async()=>{
await loginPage.login('standard_user','secret_sauce');
const title=await loginPage.getProductsPageTitle();
expect(title).toBe('Products');
})

test('Invalid login using Locked out User', async()=>{
await loginPage.login('locked_out_user','secret_sauce');
const errorMsg=await loginPage.getErrorMsg();
expect(errorMsg).toBe('Epic sadface: Sorry, this user has been locked out.');
})

test('Invalid login using Not in server user', async()=>{
await loginPage.login('nonexistent_user','secret_sauce');
const errorMsg=await loginPage.getErrorMsg();
expect(errorMsg).toBe('Epic sadface: Username and password do not match any user in this service');
})

test('Invalid login with blank UserName', async()=>{
await loginPage.login('','secret_sauce');
const errorMsg=await loginPage.getErrorMsg();
expect(errorMsg).toBe('Epic sadface: Username is required');
})

test('Invalid login with blank Password', async()=>{
await loginPage.login('standard_user','');
const errorMsg=await loginPage.getErrorMsg();
expect(errorMsg).toBe('Epic sadface: Password is required');
})




})