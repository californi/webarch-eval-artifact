## 1. Proposed change

Add a minimal “Register adoption interest” capability to the public animal profile. It should collect a visitor’s contact details and a short message, create an adoption-interest record, and place it in a pending state for later staff handling.

## 2. Possible UI, API, data, and domain impacts

- UI: an interest form on the public animal profile, success and validation states, and basic privacy notice.
- API: a public request to submit interest for one animal; internal retrieval can be deferred unless staff handling is included in this iteration.
- Data: an adoption-interest record linked to an animal, including contact details, message, submission timestamp, and status.
- Domain: an `AdoptionInterest` entity and an application service/use case for registering it, with repository abstraction for persistence.

## 3. Risks and validation ideas

- Risk: spam or duplicate submissions. Validate required fields, rate-limit submissions, and consider a CAPTCHA later if needed.
- Risk: poor-quality or unsafe contact data. Validate input format and avoid exposing submitted data publicly.
- Risk: interest submitted for an unavailable animal. Validate that the animal can receive interest at submission time.
- Validate with unit tests for the use case, API validation tests, and an end-to-end public submission flow.

## 4. Assumptions and questions to confirm before implementation

- Assumption: visitors can access public animal profiles without authentication.
- Assumption: staff will handle submitted interest outside this initial capability or in a later iteration.
- Confirm which fields are required, such as name, email, phone, city, and message.
- Confirm whether consent for storing contact data is required and what retention policy applies.
- Confirm which animal statuses should accept adoption interest.
- Confirm whether duplicate interest for the same animal should be allowed.
