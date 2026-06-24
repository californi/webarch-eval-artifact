## 1. Proposed change

Add a minimal “Adoption interest” capability to the public animal profile. A visitor submits contact details and a short message; the system records the interest as pending staff review. This deliberately excludes eligibility assessment, approval, matching, and final adoption workflows.

## 2. Possible UI, API, data, and domain impacts

- UI: add a concise interest form and confirmation/error states to the public animal profile.
- API: add a validated command endpoint to create an adoption-interest record for a specific animal.
- Data: persist animal reference, applicant contact data, message, submission timestamp, and review status.
- Domain: introduce an `AdoptionInterest` entity and a use case/service responsible for registration rules.
- Staff handling: assumption: a later internal interface or notification mechanism will be needed to review submitted interests.

## 3. Risks and validation ideas

- Spam and duplicate submissions: use rate limiting, bot protection, and duplicate-detection rules.
- Privacy exposure: collect only necessary data, restrict staff access, and define retention/deletion practices.
- Invalid or unavailable animal references: validate that the public profile can accept interest before persistence.
- Validation: test successful submission, invalid input, unavailable animals, duplicate attempts, and authorization around staff review.

## 4. Assumptions and questions to confirm before implementation

- Assumption: public animal profiles are available to visitors without authentication.
- Assumption: staff will handle adoption interests outside the scope of this increment.
- Which contact fields are required, and is consent text legally required?
- Can visitors submit interest for animals that are no longer available?
- Should duplicate requests be blocked, merged, or kept as separate records?
- How should staff be notified and where should they review submissions?
