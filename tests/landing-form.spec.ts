import { test, expect } from '@playwright/test';
import { LandingPage, ContactDetails } from '../pages/landing.page';

const contactDetails: ContactDetails = {
    name: 'Amir Solomon',
    email: 'example@example.com',
    phone: '123-456-7890',
    company: 'Example Company',
    website: 'https://www.example.com',
};

test.describe('Landing Form', () => {
    let landingPage: LandingPage;

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        await landingPage.goto();
    });

    test('submits form and reaches thank-you page', async ({ page }) => {
        await landingPage.fillForm(contactDetails);
        await landingPage.selectEmployeesOption('51-500');
        await page.screenshot({ path: 'screenshots/form-filled.png', fullPage: true });
        await landingPage.submitForm();
        await expect(page).toHaveURL(/thank-you/);
        console.log('Form submitted successfully and navigated to the thank you page.');
    });

    test('does not navigate when required fields are empty', async ({ page }) => {
        await landingPage.submitForm();
        await expect(landingPage.nameInput).toHaveAttribute('required', '');
        const blocked = await landingPage.nameInput.evaluate(
            el => (el as HTMLInputElement).validity.valueMissing
        );
        expect(blocked).toBe(true);
        await expect(page).toHaveURL('/');
        console.log('Form submission prevented due to empty required fields.');
    });
});