export class LoginPage{


constructor(page){
this.page=page;
this.userNameInput=page.locator('#user-name');
this.passwordInput=page.locator('#password');
this.loginButton=page.locator('#login-button');
this.productTitle= page.locator('.title');
this.errorMsg= page.locator("h3[data-test='error']");
}


async goTo(){
    await this.page.goto('/');
}

async login(userName,password){

await this.userNameInput.fill(userName);
await this.passwordInput.fill(password);
await this.loginButton.click();
}

async getProductsPageTitle(){

    return await this.productTitle.textContent();

}

async getErrorMsg(){
    return await this.errorMsg.textContent();
}




}