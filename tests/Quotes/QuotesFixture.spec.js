import {test} from '../../Fixtures/CRMFixtures'
import Quotes from '../../TestData/Quotes.json'
test('Quotes with Fixture',async ({QuotesFixture}) => {

    await QuotesFixture.QuoteClick()
    await QuotesFixture.QuotesAction(Quotes.QuoteName,Quotes.BillAdd,Quotes.ShipAdd,Quotes.Qty,Quotes.ListPrice,Quotes.Discount)
    await QuotesFixture.Validation(Quotes.QuoteName)
    
})