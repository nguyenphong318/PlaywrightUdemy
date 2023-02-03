import { expect, Locator, Page} from '@playwright/test'

export class PaymentPage {
    readonly page: Page
    readonly payeeSelectbox: Locator
    readonly payeeDetailButton: Locator
    readonly payeeDetail: Locator
    readonly accountSelectbox: Locator
    readonly accountMountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly successMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.payeeSelectbox = page.locator('#sp_payee')
        this.payeeDetailButton = page.locator('#sp_get_payee_details')
        this.payeeDetail = page.locator('#sp_payee_details')
        this.accountSelectbox = page.locator('#sp_account')
        this.accountMountInput = page.locator('#sp_amount')
        this.dateInput = page.locator('#sp_date')
        this.descriptionInput = page.locator('#sp_description')
        this.submitPaymentButton = page.locator('#pay_saved_payees')
        this.successMessage = page.locator('#alert_content>span')
    }
    
    async createPayment() {
        await this.payeeSelectbox.selectOption('apple')
        await this.payeeDetailButton.click()
        await expect(this.payeeDetail).toBeVisible()
        await this.accountSelectbox.selectOption('6')
        await this.accountMountInput.type('5000')
        await this.dateInput.type('2022-02-01')
        await this.descriptionInput.type('Some message')
        await this.submitPaymentButton.click()
    }

    async assertSuccessMessage() {
        await expect(this.successMessage).toBeVisible()
        await expect(this.successMessage).toContainText('The payment was successfully submitted.')
    }
}