import {test} from '../../Fixtures/CRMFixtures'
import contactData from '../../TestData/Contacts.json'

test('contactFixture' ,async ({ContactFixture}) => {
    await ContactFixture.ContactClick()
    await ContactFixture.contactAction(contactData.Title,contactData.ContactFirstname,contactData.Contactlastname)
    await ContactFixture.Contactvalidation(contactData.ContactFirstname)    
})