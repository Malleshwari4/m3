import {test} from '../../Fixtures/CRMFixtures.js'
import Productdata from '../../TestData/Prodcut.json'

test('productfixture',async ({ProdFixture}) => {

    await ProdFixture.ProductClick()
    await ProdFixture.ProductAction(Productdata.Productname,Productdata.Quantity)
    await ProdFixture.ProductValidation(Productdata.Productname)
    
})