import {test as base} from './Login.js'
import { Lead_Class } from '../Pages/leadsclass.js'
import { Org_Class } from '../Pages/OrgClass.js'
import { contact_class } from '../Pages/Contacts.js'
import { Opp_Class } from '../Pages/Oppurtunites.js'
import { Product_class } from '../Pages/Product.js'
import { Quote_class } from '../Pages/Quotes.js'
import { Sales_class } from '../Pages/SaleInvoice.js'
import { Invoice_class } from '../Pages/invoice.js'

export let test=base.extend({
     leadFixture: async ({loginFixture},use) => {
          let leadObj= new Lead_Class(loginFixture)
          use(leadObj)
     },
      OrgFixture: async ({loginFixture},use) => {
          let Orgobj= new Org_Class(loginFixture)
          use(Orgobj)
     },
     ContactFixture: async ({loginFixture},use) => {
          let Contactobj= new contact_class(loginFixture)
          use(Contactobj)
     },
     OppFixture: async ({loginFixture},use) => {
          let Oppobj= new Opp_Class(loginFixture)
          use(Oppobj)
     },
     ProdFixture: async ({loginFixture},use) => {
          let Prodobj= new Product_class(loginFixture)
          use(Prodobj)
     },
     QuotesFixture: async ({loginFixture},use) => {
          let Quoteobj= new Quote_class(loginFixture)
          use(Quoteobj)
     },
     SInvoiceFixture: async ({loginFixture},use) => {
          let Salesobj= new Sales_class(loginFixture)
          use(Salesobj)
     },
     InvoiceFixture: async ({loginFixture},use) => {
          let Invoiceobj= new Invoice_class(loginFixture)
          use(Invoiceobj)
     }
})