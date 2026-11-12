// import {test} from '../../Fixtures/Login'

// test('login',async ({loginFixture}) => {
    
// })

// import {}


import {test} from '../../Fixtures/CRMFixtures.js'
import leaddata from '../../TestData/LeadData.json'

test('LeadFixture',async ({leadFixture}) => {
    await leadFixture.leadClick()
    await leadFixture.actions(leaddata.Fistname,leaddata.LastName,leaddata.Company)
    await leadFixture.validation(leaddata.Fistname)
    
})
