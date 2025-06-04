export class CheckoutPage{

constructor(page){
    this.page=page;
    this.firstNameInput=page.locator('#first-name');
    this.lastNameInput=page.locator('#last-name');
    this.postalCode=page.locator('#postal-code');
    this.continueBtn=page.locator('#continue');
}


async enterYourInformation(fName,lName,zip){
await this.firstNameInput.fill(fName);
await this.lastNameInput.fill(lName);
await this.postalCode.fill(zip);

}

async clickonContinue(){
    await this.continueBtn.click();
}

}