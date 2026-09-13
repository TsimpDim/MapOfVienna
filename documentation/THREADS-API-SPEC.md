# Map of Vienna Threads API Specification

## Overview

The Threads API provides RESTful endpoints for creating and managing discussion threads organized by Vienna's districts.

## Base URL

```
http://localhost:8000/api/
```

## Authentication

No authentication required. All endpoints are publicly accessible.

## Response Format

All responses use JSON format.

### Success Response
```json
{
  "id": 1,
  "title": "Discussion Title",
  "author": "John Doe",
  "district_id": 1,
  "created_at": "2024-01-15T10:30:00Z",
  "reply_count": 5
}
```

### Error Response
```json
{
  "error": "Error message",
  "detail": "Detailed error information"
}
```

## Endpoints

### 1. List Threads

**Endpoint:** `GET /threads/`

**Description:** Get paginated list of all threads

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `page_size` | integer | Items per page (default: 20, max: 100) |
| `district_id` | integer | Filter by district ID (1-23) |

**Example Request:**
```bash
GET /threads/?district_id=1&page=1
```

**Response (200 OK):**
```json
{
  "count": 42,
  "next": "http://localhost:8000/api/threads/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Best restaurants in Innere Stadt",
      "author": "Jane Smith",
      "district_id": 1,
      "created_at": "2024-01-15T10:30:00Z",
      "reply_count": 8
    },
    {
      "id": 2,
      "title": "Public transport improvements needed",
      "author": "John Doe",
      "district_id": 1,
      "created_at": "2024-01-14T15:20:00Z",
      "reply_count": 3
    }
  ]
}
```

### 2. Create Thread

**Endpoint:** `POST /threads/`

**Description:** Create a new discussion thread

**Request Body:**
```json
{
  "title": "Discussion Title",
  "content": "Full discussion content here...",
  "author": "Your Name",
  "district_id": 1
}
```

**Validation Rules:**
- `title`: Required, max 255 characters
- `content`: Required, any length
- `author`: Required, max 100 characters
- `district_id`: Required, integer 1-23

**Example Request:**
```bash
curl -X POST http://localhost:8000/api/threads/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Love the new coffee shops",
    "content": "Has anyone tried the new cafes opening on Neubaugasse?",
    "author": "Maria",
    "district_id": 7
  }'
```

**Response (201 Created):**
```json
{
  "id": 42,
  "title": "Love the new coffee shops",
  "content": "Has anyone tried the new cafes opening on Neubaugasse?",
  "author": "Maria",
  "district_id": 7,
  "created_at": "2024-01-15T11:45:00Z"
}
```

**Response (400 Bad Request):**
```json
{
  "title": ["This field may not be blank."],
  "content": ["This field may not be blank."],
  "author": ["This field may not be blank."],
  "district_id": ["This field may not be null."]
}
```

### 3. Get Thread Details

**Endpoint:** `GET /threads/{id}/`

**Description:** Get a specific thread with all its replies

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Thread ID |

**Example Request:**
```bash
GET /threads/42/
```

**Response (200 OK):**
```json
{
  "id": 42,
  "title": "Love the new coffee shops",
  "content": "Has anyone tried the new cafes opening on Neubaugasse?",
  "author": "Maria",
  "district_id": 7,
  "created_at": "2024-01-15T11:45:00Z",
  "reply_count": 3,
  "replies": [
    {
      "id": 1,
      "content": "Yes! The cappuccino at Cafe Wien is amazing",
      "author": "Hans",
      "created_at": "2024-01-15T12:00:00Z"
    },
    {
      "id": 2,
      "content": "Been there twice already!",
      "author": "Sophie",
      "created_at": "2024-01-15T13:30:00Z"
    },
    {
      "id": 3,
      "content": "Prices are a bit high though",
      "author": "Klaus",
      "created_at": "2024-01-15T14:15:00Z"
    }
  ]
}
```

**Response (404 Not Found):**
```json
{
  "detail": "Not found."
}
```

### 4. Add Reply

**Endpoint:** `POST /threads/{id}/add_reply/`

**Description:** Add a reply to an existing thread

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Thread ID |

**Request Body:**
```json
{
  "content": "Reply content here...",
  "author": "Your Name"
}
```

**Validation Rules:**
- `content`: Required, any length
- `author`: Required, max 100 characters

**Example Request:**
```bash
curl -X POST http://localhost:8000/api/threads/42/add_reply/ \
  -H "Content-Type: application/json" \
  -d '{
    "content": "I totally agree! The atmosphere is perfect.",
    "author": "Eva"
  }'
```

**Response (201 Created):**
```json
{
  "id": 4,
  "content": "I totally agree! The atmosphere is perfect.",
  "author": "Eva",
  "created_at": "2024-01-15T15:00:00Z"
}
```

**Response (400 Bad Request):**
```json
{
  "content": ["This field may not be blank."],
  "author": ["This field may not be blank."]
}
```

**Response (404 Not Found):**
```json
{
  "detail": "Not found."
}
```

### 5. Get Threads by District

**Endpoint:** `GET /threads/by_district/`

**Description:** Get all threads for a specific district (convenience endpoint)

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `district_id` | integer | District ID (1-23) - **Required** |

**Example Request:**
```bash
GET /threads/by_district/?district_id=1
```

**Response (200 OK):**
Same as list threads endpoint filtered by district

**Response (400 Bad Request):**
```json
{
  "error": "district_id is required"
}
```

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid parameters or validation error |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

## Rate Limiting

No rate limiting is currently implemented. For production, consider adding:
- IP-based rate limiting
- User-agent based limiting
- DDoS protection

## Pagination

List endpoints support pagination with the following defaults:
- Page size: 20 items
- Maximum page size: 100 items

Navigate using `next` and `previous` URLs in responses.

## Sorting

Threads are sorted by creation date (newest first).
Replies within threads are sorted by creation date (oldest first).

## Data Constraints

### Thread
- `district_id`: Must be integer from 1-23
- `title`: Max 255 characters
- `author`: Max 100 characters
- `content`: No limit

### Reply
- `author`: Max 100 characters
- `content`: No limit

## CORS Headers

The API includes CORS headers to allow requests from:
- `http://localhost:4200` (Angular dev)
- `http://localhost:3000` (Alternative frontend)
- Configure additional origins in `CORS_ALLOWED_ORIGINS` environment variable

## Example Usage

### JavaScript/Fetch

```javascript
// Create a thread
fetch('http://localhost:8000/api/threads/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Great district!',
    content: 'This is a wonderful area',
    author: 'Tourist',
    district_id: 1
  })
})
.then(r => r.json())
.then(data => console.log('Thread created:', data));

// Get threads
fetch('http://localhost:8000/api/threads/?district_id=1')
  .then(r => r.json())
  .then(data => console.log('Threads:', data.results));
```

### cURL

```bash
# List threads
curl http://localhost:8000/api/threads/?district_id=1

# Create thread
curl -X POST http://localhost:8000/api/threads/ \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Content","author":"Name","district_id":1}'

# Get thread with replies
curl http://localhost:8000/api/threads/1/

# Add reply
curl -X POST http://localhost:8000/api/threads/1/add_reply/ \
  -H "Content-Type: application/json" \
  -d '{"content":"Great discussion!","author":"User"}'
```

## Version History

### v1.0.0 (Current)
- Initial API release
- Thread CRUD (Create, Read only)
- Reply functionality
- District-based organization
