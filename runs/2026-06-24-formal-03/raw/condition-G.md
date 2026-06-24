## 1. Proposed change

Add a small “adoption interest” capability to public animal profiles. It should collect a visitor’s contact details and a brief message, then create a staff-reviewable interest record without deciding adoption eligibility or starting a full adoption workflow.

## 2. Possible UI, API, data, and domain impacts

- UI: an interest form on the public animal profile, plus success and validation states.
- API: a command to submit interest for a specific animal, with input validation and rate limiting.
- Data: an `AdoptionInterest` record linked to an animal, storing contact data, message, submission time, and a simple handling status.
- Domain: an independent adoption-interest entity and service/use case for registration; staff handling can remain outside this iteration.
- Assumption: staff will need a future internal view or notification mechanism to handle submissions.

## 3. Risks and validation ideas

- Spam or abusive submissions: validate fields, limit request frequency, and consider bot protection.
- Privacy exposure: minimize collected personal data, define retention rules, and obtain an appropriate consent notice.
- Duplicate interest: allow repeated submissions initially or detect likely duplicates by animal and contact information.
- Validate with unit tests for input and status rules, API integration tests, and a short staff usability review of submitted records.

## 4. Assumptions and questions to confirm before implementation

- Assumption: public animal profiles are available to visitors.
- Assumption: staff will handle adoption interest manually in a later step.
- Should visitors provide name, email, phone, message, or a smaller required set?
- Which initial statuses are needed, such as `new`, `contacted`, and `closed`?
- What privacy, consent, retention, and notification requirements apply?
