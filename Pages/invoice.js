import { expect } from "@playwright/test"
import { windowHandling } from "../utils/window"

export class Invoice_class{
    #More
    #Invoice
    #CInvoice
    #Iname
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
        this.#Invoice=page.locator("//a[@name='Invoice']")
        this.#CInvoice=page.getByRole('img',{name:'Create Invoice'})
        this. #Iname=page.locator("//input[@name='subject']")
        this.#OrgClick=page.locator('(//img[@src="themes/softed/images/select.gif"])[3]')  
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
  async InvoiceClick(){
    await this.#More.hover()
    await this.#Invoice.click()
  }
  async InvoiceAction(InvoiceName,BAdd,SAdd,Quantity,LPrice,DFill){
    await this.#CInvoice.click()
    await this.#Iname.fill(InvoiceName)
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
  async IValidation(Ivalidaton){
    await expect(this.#validation).toContainText(Ivalidaton)
  }
}