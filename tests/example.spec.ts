import { test, expect } from '@playwright/test'

import { loadHomePage, assertTitle} from '../helpers'

test("Simple basic test", async ({ page }) => {
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test("Click on Elements", async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.skip("Selectors", async ({ page}) => {
    // Text
    await page.click('text=some text')
    
    // Css Selectors
    await page.click('button')
    await page.click('#id')
    await page.click('.class')

    // Only visible Css Selector
    await page.click('.submit-button:visbile')

    // Combinations
    await page.click('#username.first')

    // Xpath
    await page.click('//button')
})

test.describe("My first test suite", () => {
    test('Working with Inputs', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#signin_button')
    
        await page.type('#user_login', 'some username')
        await page.type('#user_password', 'some password')
        await page.click('text=Sign in')
    
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    
    test('Assertions @myTag', async ({ page }) => {
        await page.goto('https://www.example.com')
        await expect(page).toHaveURL('https://www.example.com')
        await expect(page).toHaveTitle('Example Domain')
    
        const element = await page.locator('h1')
        await expect(element).toBeVisible()
        await expect(element).toHaveText('Example Domain')
        await expect(element).toHaveCount(1)
    
        const nonExistingElement = await page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible()
    })
})

test.describe.parallel.only("Hooks", () => {
    test.beforeEach(async ({ page }) => {
        // Step load website
        await page.goto('https://www.example.com')
    })

    test("Screenshots", async ({ page }) => {

        // Take screenshot of full page
        await page.screenshot({ path: "screenshot.png", fullPage:true})
})

    test("Single element Screenshot", async ({ page }) => {
        const element = await page.locator('h1')
        await element.screenshot({ path: 'single_element_screenshot.png'})
    })
})

test("Custom Helpers", async ({ page }) => {
    await loadHomePage(page)
    // await page.pause() // Pause to debug
    await assertTitle(page)
})

