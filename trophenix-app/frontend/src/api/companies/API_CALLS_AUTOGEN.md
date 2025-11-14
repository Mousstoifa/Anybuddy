# Auto-generated API Calls

| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| POST | /companies/ | creates a company | `payload: Partial<Company>` | [Company] |
| GET | /companies/{id}/ | gets a company by id | `id` | [Company] |
| PUT | /companies/{id}/ | updates a company (full) | `id, payload` | [Company] |
| PATCH | /companies/{id}/ | partial updates a company | `id, payload` | [Company] |
| POST | /companies/employees/ | creates a company employee | `payload: Partial<CompanyEmployee>` | [CompanyEmployee] |
| GET | /companies/employees/{id}/ | gets a company employee by id | `id` | [CompanyEmployee] |
| PUT | /companies/employees/{id}/ | updates a company employee (full) | `id, payload` | [CompanyEmployee] |
| PATCH | /companies/employees/{id}/ | partial updates a company employee | `id, payload` | [CompanyEmployee] |
