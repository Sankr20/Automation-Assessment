export class CheckoutCompletePage{

constructor(page) {
    this.page=page;
    this.pageTitle=page.locator('.title');
    this.thankyouMsg=page.locator('.complete-header');
    this.deliveryInstructions=page.locator('.complete-text');
}

async verifyOrderSuccessMsg(){

await this.pageTitle.waitFor();

const thankYouHeader=await this.thankyouMsg.textContent();
const deliveryText=await this.deliveryInstructions.textContent();

return{
    thankYouHeader,
    deliveryText
};

}







}