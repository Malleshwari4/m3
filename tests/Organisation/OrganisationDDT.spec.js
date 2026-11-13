import {expect, test } from '@playwright/test'
import logiindata from '../../TestData/LoginData.json'
import excel from 'exceljs'
import path from 'node:path'
import Organisationdata from '../../TestData/Organisation.json'

test.only('Organisation with DDT JSON',async ({page}) => {
    
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill(logiindata.username)
    await page.locator("//input[@name='user_password']").fill(logiindata.password)
    await page.locator('#submitButton').click()

    //create Organisation
    await page.getByRole('link',{name:'Organizations'}).click()
    await page.getByRole('img',{name:'Create Organization'}).click()
    await page.locator("//input[@name='accountname']").fill(Organisationdata.OrganisationName)
    // await page.locator("(//input[@class='detailedViewTextBox'])[2]").fill(Organisationdata.OrganisationNo)
    await page.locator(`(//input[@class="detailedViewTextBox"])[3]`).fill(Organisationdata.Website)
    await page.locator("//input[@id='phone']").fill(Organisationdata.Phone)
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()
    await expect(page.locator("//span[@class='dvHeaderText']")).toContainText(Organisationdata.OName)
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()


})

test('Organisation with DDT EXCEL ' ,async ({page}) => {
    test.slow()
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill(logiindata.username)
    await page.locator("//input[@name='user_password']").fill(logiindata.password)
    await page.locator('#submitButton').click()

        let book = new excel.Workbook()
        await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
        let sheet= await book.getWorksheet('Organisation') 
        let data=[]

         for(let i=2;i<=sheet.rowCount;i++){
            let OrganisationName=await sheet.getRow(i).getCell(1).toString()
            // let organisationNo =await sheet.getRow(i).getCell(2).toString()
            // let website=await sheet.getRow(i).getCell(2).toString()
             let phone=await sheet.getRow(i).getCell(2).toString()
    
            data.push({
                OrganisationName,phone
            })      
    
            }


            for( let Organisations of data){

                await page.getByRole('link',{name:'ORGANIZATIONS'}).first().click()
                await page.getByRole('img',{name:'Create Organization'}).click()
                await page.locator("//input[@name='accountname']").fill(Organisations.OrganisationName)
                // await page.locator("(//input[@class='detailedViewTextBox'])[2]").fill(Organisations.organisationNo)
                // await page.locator(`(//input[@class="detailedViewTextBox"])[3]`).fill(Organisations.website)             

                await page.locator("//input[@id='phone']").fill(Organisations.phone)   
                            
                await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()
                let OName= await page.locator("//span[@class='dvHeaderText']").textContent()
                console.log(OName);
                 
                if (OName?.includes(Organisations.OrganisationName)) {
                console.log(Organisations.OrganisationName+' is created');
                } else {
                console.log(Organisations.OrganisationName +' is not created');
                }

              }  
   
                //! logout
                    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
                    await page.locator('//a[text()="Sign Out"]').click()


})