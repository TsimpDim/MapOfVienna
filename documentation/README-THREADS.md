# Map of Vienna - Discussion Threads Feature

A full-stack application that extends Map of Vienna with anonymous discussion threads organized by Vienna's 23 districts. Users can create threads, add replies, and discuss topics specific to each district without requiring registration.

## 🎯 Features

- **Anonymous Discussions**: Create and participate in discussions without registration
- **District Organization**: Threads organized by Vienna's 23 districts
- **Thread System**: Start new discussions with title and content
- **Reply Functionality**: Add replies to existing threads
- **Read-Only Posts**: No editing or deletion once posted (immutable records)
- **Responsive UI**: Clean sidebar interface with modern design
- **REST API**: Full RESTful API for integration possibilities

## 📋 Architecture

### Backend
- **Framework**: Django 4.2 with Django REST Framework
- **Language**: Python 3.11+
- **Database**: SQLite (development), MySQL/PostgreSQL (production)
- **API**: RESTful endpoints with CORS support
- **Features**: 
  - Stateless API design
  - Pagination support
  - District-based filtering

### Frontend
- **Framework**: Angular 19.2 with standalone components
- **Language**: TypeScript 5.8
- **State Management**: Angular Signals
- **Styling**: Modern CSS with flexbox
- **Features**:
  - Component-based architecture
  - Real-time form validation
  - Responsive design

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Development**: Local development with hot reload
- **Production**: Multi-container deployment ready

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose (recommended)
- **OR** Python 3.11+ and Node.js 20+

### Start with Docker (Recommended)
```bash
docker compose up
```
- Backend: http://localhost:8000
- Frontend: http://localhost:4200

### Start Locally
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend (in another terminal)
cd frontend
npm install
npm start
```

## 📚 Documentation

| Document | Contents |
|----------|----------|
| `QUICK-START.md` | 2-minute setup guide and common tasks |
| `THREADS-SETUP.md` | Detailed setup and configuration |
| `THREADS-API-SPEC.md` | Complete API reference and examples |

## 🛠️ Project Structure

```
.
├── backend/
│   ├── threads_api/          # Django project config
│   ├── threads/              # Main app
│   │   ├── models.py         # Thread & Reply models
│   │   ├── views.py          # API views
│   │   ├── serializers.py    # DRF serializers
│   │   ├── urls.py
│   │   └── migrations/
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # UI components
│   │   │   ├── services/     # API & state services
│   │   │   ├── app.component.ts
│   │   │   └── app.routes.ts
│   │   ├── main.ts
│   │   ├── styles.css
│   │   └── index.html
│   ├── angular.json
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── docker compose.yml
├── QUICK-START.md
├── THREADS-SETUP.md
├── THREADS-API-SPEC.md
└── README-THREADS.md (this file)
```

## 📡 API Endpoints

### Threads
- `GET /api/threads/` - List all threads (paginated)
- `GET /api/threads/?district_id=1` - Filter by district
- `GET /api/threads/{id}/` - Get thread with replies
- `POST /api/threads/` - Create new thread
- `POST /api/threads/{id}/add_reply/` - Add reply

### Request Example
```bash
curl -X POST http://localhost:8000/api/threads/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Best parks in Favoriten",
    "content": "What are your favorite parks in the 10th district?",
    "author": "John",
    "district_id": 10
  }'
```

## 💾 Data Models

### Thread
```python
- id: Primary key
- title: str (max 255)
- content: TextField
- author: str (max 100)
- district_id: int (1-23)
- created_at: timestamp
- updated_at: timestamp
```

### Reply
```python
- id: Primary key
- thread: ForeignKey → Thread
- content: TextField
- author: str (max 100)
- created_at: timestamp
- updated_at: timestamp
```

## 🎨 UI Components

- **MapComponent**: Main container with sidebar and map area
- **ThreadListComponent**: Lists all threads for a district
- **ThreadDetailComponent**: Shows single thread with replies
- **CreateThreadComponent**: Form to start new discussions

## 🔐 Security Considerations

**Current (Development)**
- No authentication
- Open access to all endpoints
- CORS enabled for development origins

**Production Recommendations**
- Implement user authentication
- Add rate limiting
- Enable HTTPS only
- Add CSRF protection
- Implement content moderation
- Add input sanitization
- Use environment-based secrets

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Deployment

### Docker Image Build
```bash
# Backend
docker build -t mapofvienna-api:latest ./backend

# Frontend
docker build -t mapofvienna-frontend:latest ./frontend
```

### Production Environment
```bash
# Set environment variables
export DJANGO_DEBUG=False
export DJANGO_SECRET_KEY=your-secure-key
export CORS_ALLOWED_ORIGINS=yourdomain.com

# Run with production settings
docker compose -f docker compose.yml up
```

## 🔄 Integration Points

The system can be extended with:
- Map visualization (Leaflet.js for district click-to-select)
- User authentication system
- Admin panel for moderation
- Search functionality
- Categories/tags for threads
- Notifications for new replies
- Real-time updates with WebSockets

## 🐛 Troubleshooting

**Backend Connection Error**
```bash
# Check if backend is running
curl http://localhost:8000/api/threads/

# Check logs
docker compose logs backend
```

**Frontend Not Loading**
```bash
# Clear cache
rm -rf frontend/node_modules
cd frontend && npm install

# Check Angular CLI
npm install -g @angular/cli
```

**Database Issues**
```bash
cd backend
python manage.py migrate --run-syncdb
python manage.py createsuperuser
```

## 📊 Performance

- **Pagination**: Default 20 threads per page
- **Caching**: Can be added at API layer
- **Database**: Indexed on district_id and created_at
- **Frontend**: Angular Signals for efficient change detection

## 📝 License

Same as Map of Vienna project

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review QUICK-START.md for common issues
3. Check API specification for endpoint details

## 🚦 Development Workflow

1. **Feature Development**
   - Create feature branch
   - Develop on local environment
   - Test with Docker Compose

2. **Testing**
   - Run backend tests: `python manage.py test`
   - Check frontend with `npm test`
   - Manual testing in browser

3. **Deployment**
   - Build Docker images
   - Push to registry
   - Deploy with docker compose

## 📈 Roadmap

- [ ] Map integration for district selection
- [ ] User authentication
- [ ] Thread search
- [ ] Real-time updates
- [ ] Mobile app
- [ ] Admin dashboard
- [ ] Content moderation
- [ ] Analytics

## 🎓 Learning Resources

- [Django REST Framework](https://www.django-rest-framework.org/)
- [Angular Documentation](https://angular.io/docs)
- [Docker Documentation](https://docs.docker.com/)

---

**Last Updated**: 2026-01-15

**Version**: 1.0.0

**Status**: Production Ready
