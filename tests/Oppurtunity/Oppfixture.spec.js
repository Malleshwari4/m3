import {test} from '../../Fixtures/CRMFixtures.js'
import  OppData from '../../TestData/Oppurtunities.json'
test ('Opp with Fixture',async ({OppFixture}) => {
      await OppFixture.OppClick()
      await OppFixture.OppAction(OppData.Oppname)
      await  OppFixture.OppValidation(OppData.Oppname)    
})