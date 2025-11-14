# Auto-generated API Calls

| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| GET | /athletes/me/ | gets current athlete profile |  | [Athlete | null] |
| GET | /athletes/{id}/ | gets athlete by id | `id` | [Athlete] |
| GET | /athletes/ | fetches paginated athletes list |  | [PaginatedResponseMixin<Athlete>] |
| POST | /athlete/situation/ | saves athlete situation | `payload: { situation: string }` | [any] |
| POST | /athlete/type/ | saves athlete type | `payload: { type: string }` | [any] |
| POST | /athlete/club/ | saves athlete club info | `payload: { club: string, niveau: string, ministerielle: boolean }` | [any] |
| POST | /athlete/projet-pro/ | saves project (professional) | `payload: any` | [any] |
| POST | /athlete/profil/ | saves athlete profile | `payload: any` | [any] |
| POST | /athlete/account/ | creates an athlete account | `payload: any` | [any] |
| POST | /athlete/send-code/ | sends verification code to email | `payload: { email: string }` | [any] |
| POST | /athlete/verify-email/ | verifies email with code | `payload: { verification_code: string }` | [any] |
