import {test} from '@playwright/test'
test('Delete',async ({page}) => {
    await page.goto('http://localhost:8888/index.php?action=Login&module=Users')
    await page.locator("//input[@name='user_name']").fill('admin')
    await page.locator("//input[@name='user_password']").fill('admin')
    await page.locator('#submitButton').click()
    await page.getByRole('link',{name:'Leads'}).click()

    //delete
    await page
})