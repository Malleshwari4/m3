import {test} from '../../Fixtures/CRMFixtures'
import SIData from '../../TestData/SalesInvoice.json'

test ('Sales with Fixture',async ({SInvoiceFixture}) => {
    await SInvoiceFixture.SalesClick()
    await SInvoiceFixture.SalesAction(SIData.SName,SIData.BillAdd,SIData.ShipAdd,SIData.Qty,SIData.ListPrice,SIData.Discount)
    await SInvoiceFixture.SValidation(SIData.SName)    
})