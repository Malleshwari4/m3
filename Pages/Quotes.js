import { expect } from "@playwright/test"
import { windowHandling } from "../utils/window"

export class Quote_class{
    #More
    #Quotes
    #CQuote
    #Qname
    #OrgClick
    #OName
    #BillAdd
    #ShipAdd
    #Pclick
    #Qty
    #ListPrice
    #Discount
    #DcheckBox
    #DFill
    #save
    #validation

    constructor(page){
      this.page=page
        this.#More=page.locator('//img[@src="themes/softed/images/menuDnArrow.gif"]')
        this.#Quotes=page.locator("//a[@name='Quotes']")
        this.#CQuote=page.getByRole('img',{name:'Create Quote'})
        this. #Qname=page.locator("//input[@name='subject']")

        // this.#OrgClick=page.locator("(//img[@alt='Select'])[3]") 
        this.#OrgClick=page.locator('(//img[@src="themes/softed/images/select.gif"])[3]')  
        this. #BillAdd=page.locator("//textarea[@name='bill_street']")
        this.#ShipAdd=page.locator("//textarea[@name='ship_street']")
        this.#Pclick= page.locator("(//img[@title='Products'])")
        this. #Qty=page.locator("#qty1")
        this. #ListPrice=page.locator("//input[@name='listPrice1']")
        this. #Discount=page.locator("(//a[text()='Discount'])[2]")
        this.#DcheckBox=page.locator("(//input[@name='discount_final'])[2]")
        this. #DFill=page.locator("//input[@id='discount_percentage_final']")
        this.#save=page.locator('(//input[@title="Save [Alt+S]"])[2]')
        this.#validation=page.locator("//span[@class='lvtHeaderText']")
    }
  async QuoteClick(){
    await this.#More.hover()
    await this.#Quotes.click()
  }
  async QuotesAction(QuoteName,BAdd,SAdd,Quantity,LPrice,DFill){
    await this.#CQuote.click()
    await this.#Qname.fill(QuoteName)
    // let newtab1=await windowHandling(this.page,this.#OrgClick.first().click())
    // await newtab1.locator('//a[@id="1"]').click()

    let newtab1=await windowHandling(this.page,this.#OrgClick.first().click())
    await newtab1.locator('//a[@id="1"]').click()

    await this.#BillAdd.fill(BAdd)
    await this.#ShipAdd.fill(SAdd)
    let newtab2=await windowHandling(this.page,this.#Pclick.first().click())
    await newtab2.locator('#popup_product_182').click()
    await this.#Qty.fill(Quantity)
    await this.#ListPrice.fill(LPrice)
    await this.#Discount.click()
    await this.#DcheckBox.click()
    await this.#DFill.fill(DFill)
    await this.#save.click()
  }
  async Validation(Qvalidaton){
    await expect(this.#validation).toContainText(Qvalidaton)
  }
}