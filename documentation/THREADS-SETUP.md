# Map of Vienna - Discussion Threads Setup

This project extends the Map of Vienna with a discussion thread feature, allowing unregistered users to create and discuss topics specific to Vienna's 23 districts.

## Project Structure

```
mapofvienna/
├── backend/                    # Django REST API
│   ├── threads_api/           # Django project settings
│   ├── threads/               # Main Django app
│   │   ├── models.py          # Thread and Reply models
│   │   ├── views.py           # API views
│   │   ├── serializers.py     # DRF serializers
│   │   ├── urls.py            # API endpoints
│   │   └── migrations/        # Database migrations
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/                   # Angular SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Angular components
│   │   │   ├── services/      # API and state services
│   │   │   ├── app.component.ts
│   │   │   └── app.routes.ts
│   │   ├── main.ts
│   │   ├── styles.css
│   │   └── index.html
│   ├── angular.json
│   ├── package.json
│   └── Dockerfile
└── docker compose.yml         # Multi-container setup
```

## Features

### Backend API
- **Thread Management**: Create and retrieve discussion threads
- **Replies**: Add replies to threads (no edit/delete functionality)
- **District Filtering**: Threads organized by Vienna's 23 districts
- **No Authentication**: Open access - users provide anonymous names
- **REST API**: Fully RESTful endpoints for thread and reply management

### Frontend UI
- **Responsive UI**: Clean sidebar interface with live district selection
- **Thread List View**: Browse all threads in a selected district
- **Thread Details**: View full thread with replies
- **Thread Creation**: Simple form to start new discussions
- **Reply System**: Add replies to existing threads
- **Real-time Updates**: Refresh data from backend
- **Angular Signals**: Modern reactive state management

## Installation & Setup

### Prerequisites
- Docker & Docker Compose (recommended)
- OR Python 3.11+ and Node.js 20+ for local development

### Option 1: Using Docker Compose (Recommended)

```bash
# Start both backend and frontend
docker compose up

# Backend will be available at: http://localhost:8000/api/
# Frontend will be available at: http://localhost:4200
```

### Option 2: Local Development

#### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

Backend runs on: `http://localhost:8000`

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs on: `http://localhost:4200`

## API Endpoints

### Threads

**GET /api/threads/**
- List all threads with pagination (20 per page)
- Query params: `district_id` (filter by district)

**GET /api/threads/?district_id=1**
- Get threads for specific district

**GET /api/threads/{id}/**
- Get full thread with all replies

**POST /api/threads/**
- Create new thread
- Body:
  ```json
  {
    "title": "Discussion title",
    "content": "Discussion content",
    "author": "Your name",
    "district_id": 1
  }
  ```

**POST /api/threads/{id}/add_reply/**
- Add reply to thread
- Body:
  ```json
  {
    "content": "Reply content",
    "author": "Your name"
  }
  ```

### Notes
- No authentication required
- No editing or deletion allowed
- Threads are permanent once created
- District IDs range from 1-23 (Vienna districts)

## Database Models

### Thread
- `id`: Primary key
- `title`: Thread title (max 255 chars)
- `content`: Thread content
- `author`: Username (no registration, max 100 chars)
- `district_id`: Vienna district (1-23)
- `created_at`: Timestamp
- `updated_at`: Auto-updated timestamp

### Reply
- `id`: Primary key
- `thread`: Foreign key to Thread
- `content`: Reply content
- `author`: Username (max 100 chars)
- `created_at`: Timestamp
- `updated_at`: Auto-updated timestamp

## Configuration

### Backend (Django)

Environment variables:
- `DJANGO_DEBUG`: Enable debug mode (default: True)
- `DJANGO_SECRET_KEY`: Django secret key (change in production)
- `DJANGO_ALLOWED_HOSTS`: Comma-separated allowed hosts
- `CORS_ALLOWED_ORIGINS`: CORS allowed origins

### Frontend (Angular)

API Base URL configured in `thread.service.ts`:
- Development: `http://localhost:8000/api/threads`
- Update for production deployment

## Development

### Adding New Components
```bash
cd frontend
ng generate component components/component-name
```

### Running Backend Tests
```bash
cd backend
python manage.py test
```

### Building for Production

#### Backend
```bash
cd backend
docker build -t mapofvienna-api:latest .
```

#### Frontend
```bash
cd frontend
npm run build
```

## Districts (Vienna Bezirke)

The system supports all 23 Vienna districts:
1. Innere Stadt
2. Leopoldstadt
3. Landstraße
4. Wieden
5. Margareten
6. Mariahilf
7. Neubau
8. Josefstadt
9. Alsergrund
10. Favoriten
11. Simmering
12. Meidling
13. Hietzing
14. Penzing
15. Rudolfsheim-Fünfhaus
16. Ottakring
17. Hernals
18. Währing
19. Döbling
20. Brigittenau
21. Floridsdorf
22. Donaustadt
23. Liesing

## Styling & UI

- **Color Scheme**: Purple (#667eea) primary, gray accents
- **Responsive**: Designed for desktop, tablet, and mobile
- **Typography**: System fonts for optimal performance
- **CSS**: Modern CSS with flexbox and grid layouts

## Future Enhancements

- User reputation system
- District map integration with click-to-select
- Rich text editor for threads/replies
- Thread search and filtering
- User avatars and profiles
- Moderation system
- Real-time updates with WebSockets

## Troubleshooting

### Backend API connection errors
- Check if backend is running: `curl http://localhost:8000/api/threads/`
- Verify CORS settings in `backend/threads_api/settings.py`

### Frontend won't load
- Ensure Angular CLI is installed: `npm install -g @angular/cli`
- Clear node_modules: `rm -rf node_modules && npm install`

### Database errors
- Reset database: `python manage.py migrate --reset`
- Create superuser: `python manage.py createsuperuser`

## License

Same as Map of Vienna project

## Support

For issues or questions, refer to main project documentation.
