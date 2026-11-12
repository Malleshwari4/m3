import {test } from '../../Fixtures/CRMFixtures'
import InvoiceData from '../../TestData/Invoice.json'

test('Invoice with Fixture',async ({InvoiceFixture}) => {
    await InvoiceFixture.InvoiceClick()
    await InvoiceFixture.InvoiceAction(InvoiceData.IName,InvoiceData.BillAdd,InvoiceData.ShipAdd,InvoiceData.Qty,InvoiceData.ListPrice,InvoiceData.Discount)
    await InvoiceFixture.IValidation(InvoiceData.IName)
    
})