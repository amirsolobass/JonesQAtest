import { Page, Locator } from '@playwright/test';

export interface ContactDetails {
    name: string;
    email: string;
    phone: string;
    company: string;
    website: string;
}

export class LandingPage {
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly companyInput: Locator;
    readonly websiteInput: Locator;
    readonly employeesSelect: Locator;
    readonly submitButton: Locator;

    constructor(readonly page: Page) {
        this.nameInput = page.getByRole('textbox', { name: /^name/i });
        this.emailInput = page.getByRole('textbox', { name: /^email/i });
        this.phoneInput = page.getByRole('textbox', { name: /^phone/i });
        this.companyInput = page.getByRole('textbox', { name: /^company/i });
        this.websiteInput = page.getByRole('textbox', { name: /^website/i });
        this.employeesSelect = page.getByLabel('Number of Employees');
        this.submitButton = page.getByRole('button', { name: 'Request a call back' });
    }

    async goto() {
        await this.page.goto('/');
    }

    async fillForm(contactDetails: ContactDetails) {
        await this.nameInput.fill(contactDetails.name);
        await this.emailInput.fill(contactDetails.email);
        await this.phoneInput.fill(contactDetails.phone);
        await this.companyInput.fill(contactDetails.company);
        await this.websiteInput.fill(contactDetails.website);
    }

    async selectEmployeesOption(option: string) {
        await this.employeesSelect.selectOption(option);
    }

    async submitForm() {
        await this.submitButton.click();
    }
}