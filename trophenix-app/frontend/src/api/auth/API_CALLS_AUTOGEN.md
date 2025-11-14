# Auto-generated API Calls

| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| POST | /auth/login/ | logs a user in and returns tokens | `payload: { email, password }` | [AuthTokens] |
| POST | /auth/login/refresh/ | refreshes auth tokens | `payload: { refresh }` | [AuthTokens] |
| GET | /auth/me/ | gets current user info |  | [User | null] |
| POST | /auth/register/ | registers a new user | `payload: { email, password, first_name?, last_name? }` | [User] |
| POST | /auth/select-account-type/ | selects account type for user | `payload: { type_compte: 'professionnel'|'sportif' }` | [any] |
| POST | /auth/oubli-mdp/ | forgot password (send reset) | `payload: { email }` | [any] |
| POST | /auth/reinitialisation-mdp/ | reset password using token | `payload: { token, nouveau_mot_de_passe }` | [any] |
