import {test } from '@playwright/test'
import loginData from '../../TestData/LoginData.json'
import { Login_Class } from '../../Pages/loginclass'
import OppData from '../../TestData/Oppurtunities.json'
import { Opp_Class } from '../../Pages/Oppurtunites'
import excel from 'exceljs'
import path from 'node:path'

test.only('Oppurtunites with POM JSON',async ({page}) => {
    
    let loginObj= new Login_Class(page)
    await loginObj.launchUrl(loginData.url)
    await loginObj.action(loginData.username,loginData.password)
    
    let OppObj= new Opp_Class(page)
    await OppObj.OppClick()
    await OppObj.OppAction(OppData.Oppname,OppData.OrgName)
    // await OppData.OppValidation(OppData.Oppname)
    
})


test('Oppurtunites with POM Excel',async ({page}) => {
    test.slow()
    
        let loginObj= new Login_Class(page)
         await loginObj.launchUrl(loginData.url)
      await  loginObj.action(loginData.username,loginData.password)
        
        let OppObj= new Opp_Class(page)
        await OppObj.OppClick()

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
                await OppObj.OppAction(Oppurtunites.OppurtunityName,Oppurtunites.OrganisationName)
                await OppObj.OppValidation(Oppurtunites.OppurtunityName)
            }
    
})