import {expect, test} from '@playwright/test'
import excel from 'exceljs'
import logindata from '../../TestData/LoginData.json'
import OppData from '../../TestData/Oppurtunities.json'
import path from 'node:path'

test('Oppurtunity with DDT JSON',async ({page}) => {

    await page.goto(logindata.url)
    await page.locator("//input[@name='user_name']").fill(logindata.username)
    await page.locator("//input[@name='user_password']").fill(logindata.password)
    await page.locator('#submitButton').click()

    //create Oppurtunity
    await page.getByRole('link',{name:'OPPORTUNITIES'}).click()
    await page.getByRole('img',{name:'Create Opportunity'}).click()
    await page.locator("//input[@name='potentialname']").fill(OppData.Oppname)
    // await page.getByRole('img',{name:'Select'}).click()

   let [newtab1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('img', { name: 'Select' }).first().click()
    ]);

    await newtab1.waitForLoadState();
    await newtab1.getByRole('link',{name:OppData.OrgName}).click()
    await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()

    await expect(page.locator("//span[@class='dvHeaderText']")).toContainText(OppData.Oppname)

     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()

    
})
test('Oppurtunity with DDT EXCEL',async ({page}) => {
    test.slow()

    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill(logindata.username)
    await page.locator("//input[@name='user_password']").fill(logindata.password)
    await page.locator('#submitButton').click()
    await page.getByRole('link',{name:'OPPORTUNITIES'}).click()
    

     let book = new excel.Workbook()
        await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
        let sheet= await book.getWorksheet('Oppurtunites') 
         let data=[]
         for(let i=2;i<=sheet.rowCount;i++){
            let OppurtunityName=await sheet.getRow(i).getCell(1).value
            let OrganisationName=await sheet.getRow(i).getCell(2).value
           
    
            data.push({
                OppurtunityName,OrganisationName
            })      
    
         }

         for(let Oppurtunites of data){

            //create Oppurtunity
            
            await page.getByRole('img',{name:'Create Opportunity'}).click()
            await page.locator("//input[@name='potentialname']").fill(Oppurtunites.OppurtunityName)
            // await page.getByRole('img',{name:'Select'}).click()

            let [newtab1] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('img', { name: 'Select' }).first().click()
            ]);

            await newtab1.waitForLoadState();

            await newtab1.getByRole('link',{name:Oppurtunites.OrganisationName}).click()
            
            await page.locator("(//input[@title='Save [Alt+S]'])[1]").click()


            let OName= await page.locator("//span[@class='dvHeaderText']").textContent()
            console.log(OName);

            
            if (OName?.includes(Oppurtunites.OppurtunityName)) {
            console.log( Oppurtunites.OppurtunityName+'Oppurtunity is created');
            } else {
            console.log(Oppurtunites.OppurtunityName+ 'oppurtunity is not created');
            }

       }
        //! logout
        await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
        await page.locator('//a[text()="Sign Out"]').click()

    
})