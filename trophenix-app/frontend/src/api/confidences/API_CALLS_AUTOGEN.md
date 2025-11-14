# Auto-generated API Calls

| Method | Path | Description | Input parameters | Response data (json) |
|---|---|---|---|---|
| GET | /confidences/ | lists confidences (paginated) | `params?` | [PaginatedResponseMixin<Confidence>] |
| POST | /confidences/ | creates a confidence | `payload: Partial<Confidence>` | [Confidence] |
| GET | /confidences/{id}/ | gets a confidence by id | `id` | [Confidence] |
| PUT | /confidences/{id}/ | updates a confidence (full) | `id, payload` | [Confidence] |
| PATCH | /confidences/{id}/ | partial updates a confidence | `id, payload` | [Confidence] |
| DELETE | /confidences/{id}/ | deletes a confidence | `id` | [void] |
| GET | /confidences/{confidenceId}/comments/ | lists comments for a confidence | `confidenceId` | [ConfidenceComment[]] |
| POST | /confidences/{confidenceId}/comments/ | creates a comment | `confidenceId, payload` | [ConfidenceComment] |
| PUT | /confidences/comments/{id}/ | updates a comment | `id, payload` | [ConfidenceComment] |
| PATCH | /confidences/comments/{id}/ | partial updates a comment | `id, payload` | [ConfidenceComment] |
| DELETE | /confidences/comments/{id}/ | deletes a comment | `id` | [void] |
| POST | /confidences/{id}/like/ | likes a confidence | `id` | [any] |
| DELETE | /confidences/{id}/like/ | unlikes a confidence | `id` | [any] |
| POST | /confidences/comments/{id}/like/ | likes a comment | `id` | [any] |
| DELETE | /confidences/comments/{id}/like/ | unlikes a comment | `id` | [any] |
| GET | /confidences/{id}/generate-stream-url/ | generates a stream URL for a confidence | `id` | `[{ url: string }]` |
| POST | /confidences/{id}/save-stream-url/ | saves a stream URL | `id, payload: { url }` | [any] |
