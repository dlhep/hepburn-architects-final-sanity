# Conversion tracking

## Vercel environment variables

Set these public variables for the production project (IDs only; never add private API keys):

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX   # optional
```

The site works without either value. The Ads ID is only configured when supplied.
The guide thank-you page uses a short-lived session token so refreshing it does not repeatedly count the same completed guide download.

## Consent

`ConversionTracking` is mounted once from `app/layout.tsx`. Before Google Analytics loads it sets Google Consent Mode v2 defaults: analytics and advertising storage are denied; functionality and security storage are granted. No analytics events are sent until the visitor chooses **Accept analytics**. The choice is stored in `localStorage` under `hepburn-analytics-consent-v2`; Cookie settings reopens the choice. The privacy link is `/privacy-policy` (redirecting to the canonical `/privacy` notice).

## Events

Page and content: `page_view`, `project_view`, `service_view`, `location_page_view`.

Commercial interactions: `phone_click`, `email_click`, `enquiry_cta_click`, `booking_click`, `outbound_click`, `social_click`.

Forms and leads: `form_start`, `form_submit`, `generate_lead`, `guide_form_start`, `guide_form_submit`, `guide_download_complete`.

Calculator: `fee_calculator_start`, `fee_calculator_step`, `fee_calculator_complete`, `fee_calculator_enquiry` (the successful calculator lead is `generate_lead` with `lead_type: fee_calculator`).

Downloads: `guide_download`, `file_download`.

Chatbot: `chatbot_open`, `chatbot_option_selected`, `chatbot_enquiry_start`, `chatbot_enquiry_submit`, `chatbot_link_click`.

Recommended GA4 key events: `generate_lead`, `booking_click`, `fee_calculator_complete`, `guide_download_complete`, `phone_click`. Mark these in the GA4 property; this code does not change GA4 configuration.

## Testing

1. Use a staging/preview GA4 property or a temporary measurement ID when possible. Do not test with production traffic if you need clean reporting.
2. Open the site in Google Tag Assistant, accept analytics, and confirm Consent Mode changes from denied to granted and that one `page_view` appears per route.
3. In GA4 DebugView, exercise a telephone link, Calendly link, contact form, calculator, guide form/download, chatbot and an external/social link. Confirm event parameters contain only broad postcode districts (for example `B15`) and fee bands.
4. Reject optional cookies and verify no events are sent. Clear the consent key to test the banner again.

## Adding a future form

Give the form a stable `id` and `name`, add `data-track-location` (`contact_form`, `guide_form`, or another useful location), and use `trackSuccessfulFormSubmission(form, ...)` plus `trackLead(...)` only after the existing request has returned successfully. Keep `data-track-manual-submit="true"` to prevent the delegated valid-submit observer from counting an attempted submission before success.

## Privacy and PII restrictions

Never send names, email addresses, telephone numbers, full postcodes, street addresses, free-text messages, chat text, or exact personalised quotations to GA4. The central helper removes undefined values, checks consent, catches errors, and adds `page_path`. Postcodes are reduced to a broad outward district and calculator values to a broad fee band.

## Troubleshooting

- No events: check `NEXT_PUBLIC_GA_MEASUREMENT_ID`, accept analytics, and inspect the browser console/network for `gtag` requests.
- Events before consent: clear local storage and verify the consent default script shows all analytics/ad storage as denied.
- Duplicate page views: ensure no additional GA4 plugin or manually configured `gtag('config')` has been added; this tracker uses `send_page_view: false`.
- Missing lead: confirm the form request succeeds before the tracking helper is called and check DebugView after consent.
