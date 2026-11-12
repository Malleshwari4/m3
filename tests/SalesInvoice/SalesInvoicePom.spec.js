import{test} from '@playwright/test'
import logindata from '../../TestData/LoginData.json'
import SIData from '../../TestData/SalesInvoice.json'
import { Sales_class } from '../../Pages/SaleInvoice'
import { Login_Class } from '../../Pages/loginclass'
import path from 'node:path'
import excel from 'exceljs'

test('SalesInvoice with POM JSON',async ({page}) => {

    let loginObj= new Login_Class(page)
   await loginObj.launchUrl(logindata.url)
    await loginObj.action(logindata.username,logindata.password)
    
    let SalesObj= new Sales_class(page)
    await SalesObj.SalesClick()
    await SalesObj.SalesAction(SIData.SName,SIData.BillAdd,SIData.ShipAdd,SIData.Qty,SIData.ListPrice,SIData.Discount)
    await SalesObj.SValidation(SIData.SName)
})

test.only('Sales with POM EXCEL',async ({page}) => {

    test.slow()
    
    let loginObj= new Login_Class(page)
   await loginObj.launchUrl(logindata.url)
    await loginObj.action(logindata.username,logindata.password)
    
    let SalesObj= new Sales_class(page)
    await SalesObj.SalesClick()
  

    let book= new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../../TestData/VTiger.xlsx'))
    let sheet=await book.getWorksheet('SalesOrder')
    let data=[]

    for(let i=2;i<=sheet.rowCount;i++){

        let  Subject=await sheet.getRow(i).getCell(1).toString()
        let  OragName=await sheet.getRow(i).getCell(2).toString()
        let  BillingAdd=await sheet.getRow(i).getCell(3).toString()
        let  ShippingAdd=await sheet.getRow(i).getCell(4).toString()
        let  ProductName=await sheet.getRow(i).getCell(5).toString()
        let  Qty=await sheet.getRow(i).getCell(6).toString()
        let  ListPrice=await sheet.getRow(i).getCell(7).toString()

        data.push({
            Subject,OragName,BillingAdd,ShippingAdd,ProductName,Qty,ListPrice
        })

    }
    for(let Sales of data){    
        await SalesObj.SalesAction(SIData.SName,SIData.BillAdd,SIData.ShipAdd,SIData.Qty,SIData.ListPrice,SIData.Discount)
        await SalesObj.SValidation(SIData.SName)
    }
    
     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()

})

