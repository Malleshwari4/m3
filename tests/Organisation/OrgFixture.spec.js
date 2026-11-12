import {test} from '../../Fixtures/CRMFixtures.js'
import Orgdata from '../../TestData/Organisation.json'

test('Orgfixture',async ({OrgFixture}) => {

    await OrgFixture.OrgClick()
    await OrgFixture.OrgAction(Orgdata.OrganisationName,Orgdata.Phone)
    await OrgFixture.validation(Orgdata.OrganisationName)
    
})