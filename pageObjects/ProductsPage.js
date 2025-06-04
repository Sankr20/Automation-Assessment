export class ProductsPage{

constructor(page){
    this.page=page;
    this.filterDropDown=page.locator('.product_sort_container');
    this.inventoryContainer= page.locator('.inventory_item');
    this.productTitle= page.locator('.inventory_item_name');
    this.productPrice= page.locator('.inventory_item_price');
    this.cartIcon= page.locator('#shopping_cart_container');
}

async changeSortOrder(value){

await this.filterDropDown.selectOption(value);

}

async getProductTitles(){

    return await this.productTitle.allTextContents();
}

async getProductPrices(){
    const priceTexts= await this.productPrice.allTextContents();
    return priceTexts.map(text=>parseFloat(text.replace('$','')));
}

async chooseProduct(product){

    const count= await this.inventoryContainer.count();

    for(let i=0;i<count;i++){
        const productContainer=this.inventoryContainer.nth(i);
        const titleWebElement=productContainer.locator('.inventory_item_name');
        const titleText= await titleWebElement.textContent();

        if(product.includes(titleText.trim())){

           const addToCartBtn=await productContainer.locator('.btn');
           await addToCartBtn.click();

           const buttonText= await addToCartBtn.textContent();
        if(buttonText.trim()!='Remove'){
            throw new Error(`Expected 'Remove' button after adding "${titleText}", but got "${buttonText.trim()}"`);
        }
        }
    }
}

async clickOnCartButton(){

    await this.cartIcon.click();
}










}