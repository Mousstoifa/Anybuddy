# Auto-generated API Calls

| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| GET | /job_offers/ | gets published jobs (with optional filters) | `filters?` (contract_type, location, remote_possible, experience_level, job_sector) | [JobOffer[]] |
| GET | /job_offers/?company_id={companyId} | gets jobs for a company | `companyId` | [JobOffer[]] |
| GET | /job_offers/{jobId}/ | gets a job by id | `jobId` | [JobOffer | null] |
| POST | /job_offers/ | creates a job (draft) for a company | `companyId, jobData` | [JobOffer] |
| PUT | /job_offers/{jobId}/ | updates a job (full) | `jobId, updates` | [JobOffer] |
| PUT | /job_offers/{jobId}/ | publishes a job (sets status published) | `jobId` | [JobOffer] |
| PUT | /job_offers/{jobId}/ | closes a job (sets status closed) | `jobId` | [JobOffer] |
| DELETE | /job_offers/{jobId}/ | deletes a job | `jobId` | [void] |
| GET | /job_applications/?athlete_id={athleteId} | gets applications for an athlete | `athleteId` | [JobApplication[]] |
| GET | /job_applications/?job_offer_id={jobId} | gets applications for a job | `jobId` | [JobApplication[]] |
| POST | /job_applications/ | applies to a job (create application) | `athleteId, applicationData` | [JobApplication] |
| PUT | /job_applications/{applicationId}/ | updates application status/data | `applicationId, updates` | [JobApplication] |
| POST | /saved_jobs/ | saves a job for an athlete | `athleteId, jobId` | [SavedJob] |
| DELETE | /saved_jobs/ | unsaves a job (by athlete & job) | `athleteId, jobId` (query params) | [void] |
| GET | /saved_jobs/?athlete_id={athleteId} | lists saved jobs for athlete | `athleteId` | [SavedJob[]] |
| GET | /job_applications/?athlete_id={athleteId}&job_offer_id={jobId} | checks if athlete has applied to job | `athleteId, jobId` | [boolean] |
| GET | /job_offers/ | gets all jobs (admin/filterable) | `params?` | [JobOffer[]] |
