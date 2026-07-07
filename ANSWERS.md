# UI Mock-up Questions
## a. Problems found
### Security:
- No CVV field at all.
- Raw card number is collected by a custom form - card data reaches the company's servers instead of a tokenized provider.
- No input masking or card number validation indicated.
### Functional:
- Card type should be inferred from the number - user can pick VISA and type a Mastercard number.
- Expiration month/year dropdowns might be able to select an expired date.
- Payment amount has no currency symbol.
- No country selection - the form assumes US users (state/province list, postal code format won't fit UK/Canada/etc).
- "No dashes or spaces" asks for user formatting, the form should strip dashes/spaces itself.
### Usability:
- Only one label for 2 address inputs, also the label is long and confusing. Second line isn't marked required or optional.
- Payment amount is static text with no context - no plan name, shopping cart or invoice reference.
- Continue button next to Cancel can lead to accidental cancellation mid-payment.
### Accessibility:
- Required fields marked by asterisk should be tested for blocking form submission - otherwise they are useless.
### Performance:
- Nothing indicates Continue gets disabled after clicking - risk of double charge on double click.
## b. Test Cases
### Test Case 1 — Successful payment with valid details
1. Select card type VISA.
2. Enter a valid card number.
3. Select a future expiration month/year.
4. Fill First Name, Last Name, Billing Address, City, State, Postal Code with valid values.
5. Click Continue.
  - Expected: payment of 30.00 is processed, user reaches a confirmation screen, no duplicate charge on the account.

### Test Case 2 — Expired card date is rejected
1. Fill all required fields with valid values.
2. Select an expiration month/year in the past (e.g. last month).
3. Click Continue.
  - Expected: validation error indicating the card is expired, form is not submitted, no charge attempted.

### Test Case 3 — Invalid card number is rejected
1. Fill all required fields with valid values.
2. Enter a card number that fails checksum validation.
3. Click Continue.
  - Expected: inline error on the card number field, form is not submitted, no request sent to the payment processor.

## c. Product Solution
The 2 most severe bugs I’ve found are no CVV field, and card data being collected to the company’s servers.<br> These bugs are critical for 2 main reasons: a) Without CVV, the form can’t verify that the user actually holds the card. b) collecting raw card data puts the company's servers in full PCI-DSS scope — every system touching the data must meet strict security requirements and be audited.<br>
Adding a CVV field by itself will not solve this issue however, so the better approach would be to use a hosted payment fields solution (like Stripe Elements or Braintree Hosted Fields) to “outsource” the transaction process, so that the raw card data never touches the company's servers. This also fixes other issues found above — the card type dropdown becomes unnecessary (brand is auto-detected), card number validation comes built in, and even the state/province/postal code issues.