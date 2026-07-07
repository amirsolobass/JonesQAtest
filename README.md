# Jones Automation Exercise

Playwright automation for the Jones QA home assignment — landing form tests against https://test.netlify.app/.

## Prerequisites

- Node.js 18+ (developed on 25.6.1)

## Setup

```bash
npm install
npx playwright install chromium
```

## Running the tests

```bash
npx playwright test            # run all tests (headless)
npx playwright test --headed   # run with a visible browser
npx playwright test --ui       # interactive UI mode
npx playwright show-report     # open the HTML report of the last run
```

## Project structure
```
├── pages/
│   └── landing.page.ts      # Page Object for the landing page
├── tests/
│   └── landing-form.spec.ts # Form submission tests
├── screenshots/             # Screenshots taken during test runs (gitignored)
└── playwright.config.ts     # Base URL, browser, trace settings
```

## Decisions

- The exercise asks to use the Playwright library, however Playwright's docs says:
  >Under most circumstances, for end-to-end testing, you'll want to use @playwright/test (Playwright Test), and not playwright (Playwright Library) directly.

  So I opted to use Playwright Test instead.
- I used Playwright's POM (Page Object Model) in order to separate page interactions and test flows. This makes the tests readable (using methods as user actions), while allowing the locators to change in one place.
- I chose to use role + accessible name (`.getByRole(..., {...})`) for the selectors in the landing page since that most resembles how users actually see and interact with the form, instead of `.getByPlaceholder()`, for example.
- The exercise asks for a screenshot before submitting; mine also captures the Number of Employees change.
- I added a negative test to cover required-field validation, checking that the required field blocks the form submission.

## Task coverage

| Requirement | Where |
|---|---|
| Fill Name, Email, Phone, Company, Website | `fillForm()` in `landing.page.ts`, used in the happy-path test |
| Screenshot before clicking "Request a call back" | `page.screenshot()` in the happy-path test |
| Bonus: change Number of Employees to 51-500 | `selectEmployeesOption('51-500')` |
| Click "Request a call back" | `submitForm()` |
| console.log on reaching the thank-you page | After the `toHaveURL(/thank-you/)` assertion |
| Extra: negative test | Empty required fields block submission (native HTML5 validation) |