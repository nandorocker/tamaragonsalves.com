# Contact Page And Form Design

Date: 2026-06-20

## Goal

Add contact forms to the site so visitors can send inquiries directly to Tamara Amoroso Gonsalves. The forms should support speaking invitations, consulting or training inquiries, media interviews, legal or policy collaboration, academic or research collaboration, and other general messages.

## Contact Surfaces

The site will have two contact form surfaces:

- A canonical standalone contact page at `/en/contact` and `/pt/contact`.
- A compact embedded form in the existing homepage `#contact-me` section.

The standalone pages will be the primary navigation destination. The homepage section will replace the current primary email button with the same form fields in a tighter layout. Both surfaces will use the same API endpoint, validation rules, inquiry types, anti-spam behavior, and success state.

The existing social links will remain available: Instagram and LinkedIn. Direct email will also remain available, but the email address must not be baked into static HTML. It should continue to be injected client-side from split address parts, consistent with the current `public/js/send_email.js` pattern.

## Form Fields

Required fields:

- Name
- Email
- Inquiry type
- Message

Optional fields:

- Organization
- Phone
- Preferred language

Inquiry type options:

- Speaking
- Consulting or training
- Media/interview
- Legal or policy collaboration
- Academic/research
- Other

The page intro should be short, inviting, and prose-only. It should explain that visitors can contact Tamara through the form for speaking invitations, consulting or training, interviews, research or academic collaboration, legal or policy work, and related inquiries. It should not use a large bullet list.

## Consent Copy

The form will not use a privacy checkbox. Instead, it will show consent-by-submit copy near the submit button:

> By sending this message, you confirm that you have read and accept the Privacy Policy and Terms and Conditions.

The Privacy Policy and Terms and Conditions text must link to the localized pages for the current language.

## Success And Error States

After a successful client-side submission, the form should be replaced in place with this confirmation message:

> Thank you for reaching out. Your message has been sent to Tamara, and she will review it soon.

The confirmation state should include a discreet text link:

> Need to send another message? Return to the form.

Using this link should restore the form. The success state should be client-side only; no `?sent=1` URL state or dedicated success route is needed.

Errors should appear inline near the form. Required field, invalid email, and service errors should be understandable without being visually noisy.

## API And Email Flow

Add a new server endpoint at `/api/contact`. It should be separate from the existing download endpoints so contact handling does not mix with download verification, subscriber state, or cookie logic.

The endpoint will accept JSON and validate:

- Required fields are present.
- Email has a valid shape.
- Values do not exceed reasonable maximum lengths.
- The hidden honeypot field is empty.

The endpoint will send one notification email through Resend to `info@tamaragonsalves.com`. It will use the same verified sender style already used by the download flow:

```text
Tamara Amoroso Gonsalves <info@tamaragonsalves.com>
```

The visitor's email should be set as `reply_to` so Tamara can reply directly from her inbox. The site should not send an automatic confirmation email to the visitor.

Contact submissions should not be stored in the database or any other persistence layer.

## Anti-Spam

Use an invisible honeypot field and validate it server-side. Also reject overlong field values. Do not add CAPTCHA unless spam becomes a real problem later.

## Localization

The standalone contact page, homepage form copy, field labels, inquiry type options, consent copy, success message, return link, and error messages should be localized in English and Portuguese.

The navigation contact link should point to `/en/contact` or `/pt/contact` instead of the homepage anchor.

Existing internal links that point to `#contact-me` can remain when they specifically refer to the homepage section, but primary navigation should use the standalone page.

## Testing And Verification

Add focused test coverage for the contact API:

- Missing required fields are rejected.
- Invalid email is rejected.
- Honeypot submissions are rejected.
- Successful submissions call Resend with the expected recipient, sender, reply-to, subject, and HTML content.
- The API does not require or perform persistence.

Update routing or build expectations if needed so `/en/contact` and `/pt/contact` are generated.

Verify with:

```bash
bun test
bun run build
```
