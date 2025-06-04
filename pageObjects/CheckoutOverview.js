export class CheckoutOverview{


constructor(page){
this.page=page;
this.productName=page.locator('.inventory_item_name');
this.productDescription=page.locator('.inventory_item_desc');
this.productPrice=page.locator('.inventory_item_price');
this.itemTotal=page.locator('.summary_subtotal_label');
this.taxAmount=page.locator('.summary_tax_label');
this.totalPrice=page.locator('.summary_total_label');
this.finishBtn=page.locator('#finish');
}


async verifyOrderSummary(){

await this.productName.waitFor();
const name=await this.productName.textContent();
const desc=await this.productDescription.textContent();
const price=await this.productPrice.textContent();
const total=await this.itemTotal.textContent();
const tax=await this.taxAmount.textContent();
const totalPrice=await this.totalPrice.textContent();

return{
    name,
    desc,
    price,
    total,
    tax,
    totalPrice
};
}

async finishCheckout(){
    await this.finishBtn.click();
}


}