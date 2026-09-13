# 🗺️ Map of Vienna - Discussion Threads

## ⚡ Start in 60 seconds

```bash
# Navigate to project
cd /home/dimitris/projects/mapofvienna

# Start everything with Docker (first time takes longer)
docker compose up --build

# Wait for "Angular Live Development Server" message
# Then open in browser:
http://localhost:4200  # Frontend
http://localhost:8000/api/threads/  # Backend API
```

**First start takes 30-60 seconds while Angular compiles.** Subsequent starts are faster.

If services don't start, run:
```bash
./docker-debug.sh
```

---

## 📚 Documentation Quick Links

### 👉 I want to...

**...get started immediately** → [QUICK-START.md](QUICK-START.md)
- Fastest setup possible (2 minutes)
- Copy-paste commands
- Common issues

**...understand the project** → [README-THREADS.md](README-THREADS.md)
- Features overview
- Architecture explanation
- Technology stack

**...integrate the API** → [THREADS-API-SPEC.md](THREADS-API-SPEC.md)
- Complete API endpoints
- Request/response examples
- cURL and JavaScript samples

**...configure everything** → [CONFIGURATION.md](CONFIGURATION.md)
- Environment variables
- Database setup
- Production deployment

**...understand the code** → [IMPLEMENTATION-SUMMARY.md](IMPLEMENTATION-SUMMARY.md)
- Technical architecture
- File structure
- Implementation details

**...see everything at once** → [INDEX.md](INDEX.md)
- Complete documentation index
- Document descriptions and sizes
- Learning paths for different scenarios

---

## 🎯 What This Project Does

✅ **Anonymous Discussion Threads**
- No registration required
- Users provide username only
- Organized by Vienna districts (1-23)

✅ **Reply System**
- Add replies to threads
- Immutable posts (no edit/delete)
- Threaded conversations

✅ **Modern Stack**
- Backend: Django + REST Framework
- Frontend: Angular 19 with Signals
- Database: SQLite/MySQL/PostgreSQL

✅ **Production Ready**
- Docker containerized
- Fully documented
- Deployment ready

---

## 🚀 Three Ways to Start

### Option 1: Docker (Recommended) - 30 seconds
```bash
docker compose up
# Visit http://localhost:4200
```

### Option 2: Local Development - 2 minutes
```bash
# Terminal 1: Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Terminal 2: Frontend
cd frontend
npm install
npm start
```

### Option 3: Using Makefile
```bash
make install    # Install everything
make dev        # Start development servers
```

---

## 🧪 Test the API

### Create a thread
```bash
curl -X POST http://localhost:8000/api/threads/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Best views in Vienna",
    "content": "Which district has the best views?",
    "author": "John",
    "district_id": 1
  }'
```

### Get all threads
```bash
curl http://localhost:8000/api/threads/
```

### Get threads by district
```bash
curl http://localhost:8000/api/threads/?district_id=1
```

---

## 📂 Project Structure

```
mapofvienna/
├── backend/              # Django REST API
├── frontend/             # Angular SPA
├── docker compose.yml    # Container setup
├── Makefile              # Common commands
├── start-dev.sh          # Startup script
└── docs/                 # Documentation
    ├── QUICK-START.md          ← Read this first
    ├── README-THREADS.md
    ├── THREADS-API-SPEC.md
    ├── CONFIGURATION.md
    └── IMPLEMENTATION-SUMMARY.md
```

---

## 🌐 Vienna Districts (1-23)

All 23 Vienna districts are supported for discussions:

| ID | District | ID | District |
|----|----------|----|----|
| 1 | Innere Stadt | 12 | Meidling |
| 2 | Leopoldstadt | 13 | Hietzing |
| 3 | Landstraße | 14 | Penzing |
| 4 | Wieden | 15 | Rudolfsheim-Fünfhaus |
| 5 | Margareten | 16 | Ottakring |
| 6 | Mariahilf | 17 | Hernals |
| 7 | Neubau | 18 | Währing |
| 8 | Josefstadt | 19 | Döbling |
| 9 | Alsergrund | 20 | Brigittenau |
| 10 | Favoriten | 21 | Floridsdorf |
| 11 | Simmering | 22 | Donaustadt |
| | | 23 | Liesing |

---

## ⚙️ Key Endpoints

```
POST   /api/threads/                Create thread
GET    /api/threads/                List threads
GET    /api/threads/?district_id=1  Filter by district
GET    /api/threads/1/              Get thread with replies
POST   /api/threads/1/add_reply/    Add reply
```

---

## 🛠️ Makefile Commands

```bash
make help           # Show all commands
make install        # Install dependencies
make dev            # Start locally
make docker-up      # Start with Docker
make clean          # Clean build artifacts
make backend-test   # Run backend tests
```

---

## 🐛 Quick Troubleshooting

**Services won't start?**
```bash
# Run debug helper
./docker-debug.sh

# Or check logs
docker compose logs -f

# Full reset
docker compose down && docker compose up --build
```

**Frontend blank page?**
- Wait 30-60 seconds for Angular to compile
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page

**Can't connect to API?**
```bash
# Check if backend is running
curl http://localhost:8000/api/threads/

# View backend logs
docker compose logs backend
```

**Full reset**:
```bash
docker compose down -v
docker system prune -a
docker compose up --build
```

---

## 📖 Next Steps

1. **Start with Docker**: `docker compose up --build`
2. **Wait** for "Angular Live Development Server" message (30-60s first time)
3. **Visit** http://localhost:4200 in your browser
4. **Create a thread** by selecting a district and entering your name
5. **For issues**: Run `./docker-debug.sh` or check [DOCKER-FIX.md](DOCKER-FIX.md)

---

## 💡 Pro Tips

- Use `make dev` for faster local development
- Set DJANGO_DEBUG=False for production
- Test API with `curl` or Postman
- Check logs with `docker compose logs -f`
- Database file: `backend/db.sqlite3`

---

## 📞 Documentation

- **Quick Setup**: [QUICK-START.md](QUICK-START.md)
- **Full Overview**: [README-THREADS.md](README-THREADS.md)
- **API Reference**: [THREADS-API-SPEC.md](THREADS-API-SPEC.md)
- **Configuration**: [CONFIGURATION.md](CONFIGURATION.md)
- **Index**: [INDEX.md](INDEX.md)

---

**Created:** August 30, 2026
**Version:** 1.0.0
**Status:** ✅ Production Ready

Ready to start? Run `docker compose up` now! 🚀
