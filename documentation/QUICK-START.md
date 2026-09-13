# Quick Start Guide - Map of Vienna Discussion Threads

## 🚀 Start in 2 Minutes

### Option 1: Docker Compose (Easiest)

```bash
docker compose up
```

- Backend API: http://localhost:8000/api/
- Frontend: http://localhost:4200

### Option 2: Local Development

#### Terminal 1 - Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
```

## 📝 First Steps

1. **Open Frontend**: Navigate to http://localhost:4200
2. **Browse Districts**: The sidebar shows Vienna's 23 districts (currently, click on a district ID to activate)
3. **Create a Thread**: Click "New Discussion" button
4. **Add a Reply**: Click on any thread to view details and add replies

## 🔌 API Quick Test

```bash
# Get all threads
curl http://localhost:8000/api/threads/

# Create a thread
curl -X POST http://localhost:8000/api/threads/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Discussion",
    "content": "This is a test",
    "author": "TestUser",
    "district_id": 1
  }'

# Get thread with replies
curl http://localhost:8000/api/threads/1/

# Add a reply
curl -X POST http://localhost:8000/api/threads/1/add_reply/ \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Great discussion!",
    "author": "ReplyUser"
  }'
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `backend/threads/models.py` | Database models for threads and replies |
| `backend/threads/views.py` | REST API endpoints |
| `frontend/src/app/services/thread.service.ts` | Frontend API calls |
| `frontend/src/app/components/` | UI components |
| `docker compose.yml` | Multi-container setup |

## 🛠️ Common Tasks

### Reset Database
```bash
cd backend
rm db.sqlite3
python manage.py migrate
```

### Clear Frontend Cache
```bash
cd frontend
rm -rf node_modules
npm install
```

### View Logs
```bash
# Docker
docker compose logs -f backend
docker compose logs -f frontend

# Local
# Check terminal where services are running
```

## 📖 Documentation

- **Full Setup**: See `THREADS-SETUP.md`
- **API Reference**: See `THREADS-API-SPEC.md`

## 🐛 Troubleshooting

**Backend won't start?**
- Check Python version: `python --version` (need 3.11+)
- Install dependencies: `pip install -r backend/requirements.txt`

**Frontend won't start?**
- Check Node version: `node --version` (need 20+)
- Clear cache: `rm -rf frontend/node_modules && cd frontend && npm install`

**API connection error?**
- Ensure backend is running: `curl http://localhost:8000/api/threads/`
- Check CORS settings in `backend/threads_api/settings.py`

## 🎯 Next Steps

1. Review the API documentation
2. Explore the component structure
3. Test creating threads and replies
4. Consider adding features like real-time updates or map integration

## 📚 Architecture

```
User Request
    ↓
Frontend (Angular) → API Call
    ↓
Backend (Django) → Database (SQLite)
    ↓
Response (JSON)
    ↓
Frontend Updates UI
```

The system uses:
- **Backend**: Django REST Framework (Python)
- **Frontend**: Angular 19+ with Signals (TypeScript)
- **Database**: SQLite (development), MySQL/PostgreSQL (production)
- **Communication**: JSON REST API

## 🔐 Security Notes

- No authentication in development
- Add authentication for production
- Implement rate limiting
- Validate all user inputs
- Enable CSRF protection for sensitive endpoints

## 📝 License

Same as Map of Vienna project
