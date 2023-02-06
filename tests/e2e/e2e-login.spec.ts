import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page_objects/LoginPage'
import { HomePage } from '../../page_objects/HomePage'

test.describe.parallel.only("Login/ Logout Flow", () => {
    let loginPage : LoginPage
    let homePage : HomePage

    // Before Hook
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
        // await page.goto('http://zero.webappsecurity.com/')
    })
    // Negative Scenario
    test("Negative Scenario for Login", async ({ page }) => {
        // await page.click('#signin_button')
        // await page.type('#user_login', 'invalid username')
        // await page.type('#user_password', 'invalid password')
        // await page.click('text=Sign in')
        await homePage.clickOnSignInButton()
        await loginPage.login('invalid username', 'invalid password')
        await loginPage.wait(3000)
        await loginPage.assertErrorMessage()

        // const errorMessage = await page.locator('.alert-error')
        // await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    // Positive Scenario + Logout
    test("Positive Scenario for Login And Logout", async ({ page }) => {
        // await page.click('#signin_button')
        // await page.type('#user_login', 'username')
        // await page.type('#user_password', 'password')
        // await page.click('text=Sign in')

        await homePage.clickOnSignInButton()
        await loginPage.login('username', 'password')

        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})