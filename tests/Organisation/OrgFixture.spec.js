import {test} from '../../Fixtures/CRMFixtures.js'
import Orgdata from '../../TestData/Organisation.json'
import { Randomnumber } from '../../utils/randomUtilis.js';

test('Orgfixture',async ({OrgFixture}) => {
    let randname= Randomnumber();
    await OrgFixture.OrgClick()
    await OrgFixture.OrgAction(Orgdata.OrganisationName+randname,Orgdata.Phone)
    await OrgFixture.validation(Orgdata.OrganisationName)
    
})