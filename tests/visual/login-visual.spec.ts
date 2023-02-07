import {test } from '@playwright/test'
import { HomePage } from '../../page_objects/HomePage'
import { LoginPage } from '../../page_objects/LoginPage'

test.describe("Login Page Visual Test", () => {
  let homePage: HomePage
  let loginPage: LoginPage
  
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)

    await homePage.visit()
    await homePage.clickOnSignInButton()
  })

  test("Login Form", async({ page }) => {
    await loginPage.snapshotLoginForm()
  })

  test("Login Error Message", async({ page }) => {
    await loginPage.login('Fail', "Password")
    await loginPage.snapshotErrorMessage()
  })
})