import { test, expect } from '@playwright/test'
import { HomePage } from '../../page_objects/HomePage'
import { LoginPage } from '../../page_objects/LoginPage'
import { PaymentPage } from '../../page_objects/PaymentPage'
import { NavBar } from '../../page_objects/components/Navbar'

test.describe.only("New Payment", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage
    let navBar: NavBar

    test.beforeEach(async ({ page }) => {
        // await page.goto('http://zero.webappsecurity.com/index.html')
        // await page.click('#signin_button')
        // await page.type('#user_login', 'username')
        // await page.type('#user_password', 'password')
        // await page.click('text=Sign in')

        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        paymentPage = new PaymentPage(page)
        navBar = new NavBar(page)

        await homePage.visit()
        await homePage.clickOnSignInButton()
        await loginPage.login('username', 'password')
    })

    test("Should send new payment", async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
        // await page.click('#pay_bills_tab')
        // await page.selectOption('#sp_payee', 'apple')

        await navBar.clickOnTab('Pay Bills')

        // await page.click('#sp_get_payee_details')
        // await page.waitForSelector('#sp_payee_details')
        // await page.selectOption('#sp_account', '6')
        // await page.type('#sp_amount', '500')
        // await page.type('#sp_date', '2022-02-01')
        // await page.type('#sp_description', 'some description')
        // await page.click('#pay_saved_payees')

        await paymentPage.createPayment()
        await paymentPage.assertSuccessMessage()

        // const successMessage = await page.locator('#alert_content>span')
        // await expect(successMessage).toBeVisible()
        // await expect(successMessage).toContainText('The payment was successfully submitted.')
    })

})