export class CartPage{


constructor(page){
    this.page=page;
    this.pageTitle=page.locator('.title');
    this.productTitle=page.locator('.inventory_item_name');
    this.checkOutBtn=page.locator('#checkout');
}

async proceedToCheckout(){
    await this.checkOutBtn.click();
}

async verifyPageTitle(){
await this.pageTitle.waitFor();
const title=await this.pageTitle.textContent();
return title.includes('Your Cart')
}

async verifyProductDetails(productName){
await this.productTitle.waitFor();
const product=await this.productTitle.textContent();
return product.includes(productName)
}




}