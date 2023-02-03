import { expect, Locator, Page} from '@playwright/test'

export class HomePage {
    readonly page: Page
    readonly signInButton: Locator
    readonly searchTextbox: Locator
    readonly linkFeedback: Locator

    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator('#signin_button')
        this.searchTextbox = page.locator('#searchTerm')
        this.linkFeedback = page.locator('#feedback')
    }

    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/')
    }

    async clickOnSignInButton() {
        await this.signInButton.click()
    }

    async clickOnFeedbackLink() {
        await this.linkFeedback.click()
    }

    async searchFor(pharse: string) {
        await this.searchTextbox.type(pharse)
        await this.page.keyboard.press('Enter')
    }
}