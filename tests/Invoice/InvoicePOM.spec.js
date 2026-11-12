import {test} from '@playwright/test'
import logindata from '../../TestData/LoginData.json'
import InvoiceData from '../../TestData/Invoice.json'
import { Invoice_class } from '../../Pages/invoice'
import { Login_Class } from '../../Pages/loginclass'
import path from 'node:path'
import excel from 'exceljs'

test('invoice with POM JSON',async ({page}) => {
    let loginObj= new Login_Class(page)
   await loginObj.launchUrl(logindata.url)
    await loginObj.action(logindata.username,logindata.password)
    
    let InvoiceObj= new Invoice_class(page)
    await InvoiceObj.InvoiceClick()
    await InvoiceObj.InvoiceAction(InvoiceData.IName,InvoiceData.BillAdd,InvoiceData.ShipAdd,InvoiceData.Qty,InvoiceData.ListPrice,InvoiceData.Discount)
    await InvoiceObj.IValidation(InvoiceData.IName)
    
})


test('Quotes',async ({page}) => {
    test.slow()
    
     let loginObj= new Login_Class(page)
   await loginObj.launchUrl(logindata.url)
    await loginObj.action(logindata.username,logindata.password)
    
    let InvoiceObj= new Invoice_class(page)
    await InvoiceObj.InvoiceClick()

    let book= new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
    let sheet= await book.getWorksheet('Invoice')
    let data=[]
    for(let i=2;i<=sheet.rowCount;i++){
        let  InvoiceName=await sheet.getRow(i).getCell(1).toString()
        let  OragName=await sheet.getRow(i).getCell(2).toString()
        let  BillingAdd=await sheet.getRow(i).getCell(3).toString()
        let  ShippingAdd=await sheet.getRow(i).getCell(4).toString()
        let  ProductName=await sheet.getRow(i).getCell(5).toString()
        let  Qty=await sheet.getRow(i).getCell(6).toString()
        let  ListPrice=await sheet.getRow(i).getCell(7).toString()
        let  discount=await sheet.getRow(i).getCell(8).toString()

        data.push({
            InvoiceName,OragName,BillingAdd,ShippingAdd,ProductName,Qty,ListPrice
            ,discount
        })  

    }
    for(let InvoiceData of data){
          await InvoiceObj.InvoiceAction(InvoiceData.InvoiceName,InvoiceData.BillingAdd,InvoiceData.ShippingAdd,InvoiceData.Qty,InvoiceData.ListPrice,InvoiceData.discount)
          await InvoiceObj.IValidation(InvoiceData.InvoiceName)
    }

     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()
})