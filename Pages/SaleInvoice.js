import { expect } from "@playwright/test"
import { windowHandling } from "../utils/window"

export class Sales_class{
    #More
    #Sales
    #CSale
    #Sname
    #OrgClick
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
        this.#Sales=page.locator("//a[@name='Sales Order']")
        this.#CSale=page.getByRole('img',{name:'Create Sales Order'})
        this. #Sname=page.locator("//input[@name='subject']")
        this.#OrgClick=page.locator('(//img[@src="themes/softed/images/select.gif"])[4]')  
        this. #BillAdd=page.locator("//textarea[@name='bill_street']")
        this.#ShipAdd=page.locator("//textarea[@name='ship_street']")
        this.#Pclick= page.locator("(//img[@title='Products'])")
        this. #Qty=page.locator("#qty1")
        this. #ListPrice=page.locator("//input[@name='listPrice1']")
        this. #Discount=page.locator("(//a[text()='Discount'])[2]")
        this.#DcheckBox=page.locator("(//input[@name='discount_final'])[2]")
        this. #DFill=page.locator("//input[@id='discount_percentage_final']")
        this.#save=page.locator('(//input[@title="Save [Alt+S]"])')
        this.#validation=page.locator("//span[@class='lvtHeaderText']")
    }
  async SalesClick(){
    await this.#More.hover()
    await this.#Sales.click()
  }
  async SalesAction(QuoteName,BAdd,SAdd,Quantity,LPrice,DFill){
    await this.#CSale.click()
    await this.#Sname.fill(QuoteName)
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
    await this.#save.first().click()
  }
  async SValidation(Svalidaton){
    await expect(this.#validation).toContainText(Svalidaton)
  }
}