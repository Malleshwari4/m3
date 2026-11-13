import { expect } from "@playwright/test"
import { windowHandling } from'../utils/window'

export class Opp_Class{
    #Opp
    #CreateOpp
    #Oppname
    #OrgClick
    #save
    #OppValidation

    constructor( page ){
        this.page=page
        this.#Opp= page.getByRole('link',{name:'Opportunities'})
        this.#CreateOpp=page.locator('//img[@alt="Create Opportunity..."]')
        this.#Oppname=page.locator("//input[@name='potentialname']")
        this.#OrgClick=page.getByRole('img', { name: 'Select' })       
        // this.#OppValidation= page.locator('.dvHeaderText')
        this.#save=page.locator('//input[@title="Save [Alt+S]"]')
        this.#OppValidation=page.locator('//span[@class="dvHeaderText"]')
    }
// let newtab1 = await windowHandling(page,page.locator("(//img[@alt='Select'])[3]").click())

    async OppClick(){
        await this.#Opp.click()
    }
    async OppAction(OppName,OrgName){
        
        await this.#CreateOpp.click()
        await this.#Oppname.fill(OppName)
        let newtab1=await windowHandling(this.page,this.#OrgClick.first().click())
        await newtab1.locator('//a[@id="1"]').click()
        // await this.#Orgname.fill(OrgName)
        await this.#save.first().click()
    }
    async OppValidation(OValidation){
        await expect(this.#OppValidation).toContainText(OValidation)        
    }

}