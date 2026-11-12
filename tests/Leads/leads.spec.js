import {test,expect} from '@playwright/test'
import { Dropdown } from '../../utils/Dropdown'

test ('leads1',async ({page}) => {
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()
    await page.getByRole('link',{name:'Leads'}).click()
    await page.getByRole('img',{name:'Create Lead'}).click()
    await Dropdown(page.locator('//select[@name="salutationtype"]'),'Ms.')
    await page.locator("//input[@name='firstname']").fill('Malleshwari')
    await page.locator("//input[@name='lastname']").fill('pallikonda')
    await page.locator("//input[@name='company']").fill('TestYantra')
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    await expect(page.locator('//span[@class="dvHeaderText"]')).toContainText('Malleshwari')
    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()

})