import { test } from '@playwright/test'
import logindata from '../../TestData/LoginData.json'
import Quotesdata from '../../TestData/Quotes.json'
import { Quote_class } from '../../Pages/Quotes'
import { Login_Class } from '../../Pages/loginclass'
import excel from 'exceljs'
import path from 'node:path'

test('Quotes With DDT JSON',async ({page}) => {

    let  LoginObj=new Login_Class(page)
     await LoginObj.launchUrl(logindata.url)
     await LoginObj.action(logindata.username,logindata.password)
    
    let QuoteObj= new Quote_class(page)
    await QuoteObj.QuoteClick()
    await QuoteObj.QuotesAction(Quotesdata.QuoteName,Quotesdata.BillAdd,Quotesdata.ShipAdd,Quotesdata.Qty,Quotesdata.ListPrice,Quotesdata.Discount)
    await QuoteObj.Validation(Quotesdata.QuoteName)
})

test.only('Quotes with DDT EXCEL ',async ({page}) => {
    test.slow()
        let  LoginObj=new Login_Class(page)
     await LoginObj.launchUrl(logindata.url)
     await LoginObj.action(logindata.username,logindata.password)

     let QuoteObj= new Quote_class(page)
    await QuoteObj.QuoteClick()

     let book=new excel.Workbook()
     await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
     let sheet= book.getWorksheet('Quotes')
    
    let data=[]
    for (let i=2 ;i<=sheet.rowCount;i++){
         let  QuoteName=await sheet.getRow(i).getCell(1).toString()
        let  OragName=await sheet.getRow(i).getCell(2).toString()
        let  BillingAdd=await sheet.getRow(i).getCell(3).toString()
        let  ShippingAdd=await sheet.getRow(i).getCell(4).toString()
        let  ProductName=await sheet.getRow(i).getCell(5).toString()
        let  Qty=await sheet.getRow(i).getCell(6).toString()
        let  ListPrice=await sheet.getRow(i).getCell(7).toString()
        let  discount=await sheet.getRow(i).getCell(8).toString()

        data.push({
            QuoteName,OragName,BillingAdd,ShippingAdd,ProductName,Qty,ListPrice
            ,discount
        })  
        
    }
    for (let Quotes of data){

        await QuoteObj.QuotesAction(Quotes.QuoteName,Quotes.BillingAdd,Quotes.ShippingAdd,Quotes.Qty,Quotes.ListPrice,Quotesdata.Discount)
    await QuoteObj.Validation(Quotes.QuoteName)
    

    }
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()

})