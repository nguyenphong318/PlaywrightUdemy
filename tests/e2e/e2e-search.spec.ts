import { test, expect } from '@playwright/test'
import { HomePage } from '../../page_objects/HomePage'

test.describe("Search Results", () => {
    test('Should find search results', async ({ page }) => {
        let homePage: HomePage = new HomePage(page)

        // await page.goto('http://zero.webappsecurity.com/index.html')
        // await page.type('#searchTerm', 'bank')
        // await page.keyboard.press('Enter')

        await homePage.visit()
        await homePage.searchFor('bank')

        const numberOfLinks = await page.locator('li>a')
        await expect(numberOfLinks).toHaveCount(2)
    })
})