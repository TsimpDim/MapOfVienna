# Docker Connection Fix Guide

## What Was Fixed

The Docker setup has been updated to properly start both backend and frontend services. Key changes:

1. **docker compose.yml** - Updated with health checks and proper service dependencies
2. **Frontend Dockerfile** - Fixed to handle Angular dev server with polling
3. **Backend Dockerfile** - Changed to development mode for docker compose
4. **Debug Tools** - Added scripts to help troubleshoot

## How to Use

### Option 1: Quick Start with Docker (Recommended)

```bash
cd /home/dimitris/projects/mapofvienna

# Start services
docker compose up --build

# Wait for output like:
# ✔ Browser application bundle generation complete.
# ✔ Compiled successfully.
# ** Angular Live Development Server is listening on localhost:4200 **

# Then open browser:
# Frontend:  http://localhost:4200
# Backend:   http://localhost:8000/api/threads/
```

### Option 2: Debug if Services Don't Start

```bash
# Run debug script
./docker-debug.sh

# This will show:
# - Docker/Docker Compose status
# - Running containers
# - Port availability
# - API connectivity
# - Recent logs
```

### Option 3: View Logs

```bash
# All services
docker compose logs -f

# Backend only
docker compose logs -f backend

# Frontend only
docker compose logs -f frontend

# Last 50 lines
docker compose logs --tail=50
```

### Option 4: Reset Everything

```bash
# Stop all containers
docker compose down

# Remove all images
docker compose down --rmi all

# Full rebuild
docker compose up --build
```

## What to Expect

### Backend Service
- Takes 10-20 seconds to start
- Runs database migrations
- Available at `http://localhost:8000`
- API at `http://localhost:8000/api/threads/`

**Expected output:**
```
backend_1       | Operations to perform:
backend_1       |   Apply all migrations: admin, auth, contenttypes, sessions, threads
backend_1       | Migrations to perform: 0
backend_1       | Starting development server at 0.0.0.0:8000
backend_1       | Quit the server with CONTROL-C.
```

### Frontend Service
- Takes 30-60 seconds on first build (compiles Angular)
- Available at `http://localhost:4200`
- Hot-reload enabled

**Expected output:**
```
frontend_1      | ✔ Browser application bundle generation complete.
frontend_1      | ✔ Compiled successfully.
frontend_1      | ** Angular Live Development Server is listening on localhost:4200 **
```

## Common Issues & Quick Fixes

### Frontend Shows Blank Page

```bash
# Clear browser cache (Ctrl+Shift+Delete in Chrome)
# Then refresh the page

# Or restart frontend
docker compose restart frontend

# Or check logs
docker compose logs frontend
```

### Can't Connect to API

```bash
# Check if backend is running
docker compose ps

# Check backend logs
docker compose logs backend

# Test API directly
curl http://localhost:8000/api/threads/
```

### Port Already in Use

```bash
# Find what's using the port
lsof -i :8000
lsof -i :4200

# Kill the process
kill -9 <PID>

# Or change ports in docker compose.yml
```

### Services Won't Start

```bash
# Full clean start
docker compose down
docker system prune -a
docker compose up --build

# Give it 60 seconds to fully start
```

## Verify Everything Works

### 1. Check Services Running
```bash
docker ps
# Should show both backend and frontend containers
```

### 2. Test Backend API
```bash
curl http://localhost:8000/api/threads/
# Should return: {"count": 0, "next": null, "previous": null, "results": []}
```

### 3. Test Frontend
```bash
curl http://localhost:4200
# Should return HTML content
```

### 4. Create Test Thread via API
```bash
curl -X POST http://localhost:8000/api/threads/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test",
    "content": "Test content",
    "author": "TestUser",
    "district_id": 1
  }'
```

### 5. View in Frontend
Open http://localhost:4200 in browser and try to create a discussion

## File Changes Made

### docker compose.yml
- ✅ Added health checks
- ✅ Changed DJANGO_DEBUG to True for development
- ✅ Added proper CORS origins
- ✅ Added WATCHPACK_POLLING for frontend file watching
- ✅ Made frontend wait for backend with `depends_on` condition

### frontend/Dockerfile
- ✅ Added `--legacy-peer-deps` to npm install
- ✅ Fixed Angular dev server command with polling
- ✅ Bound server to 0.0.0.0 for container access

### backend/Dockerfile
- ✅ Changed default CMD to runserver (development)
- ✅ Added curl for health checks
- ✅ Kept original command override in docker compose

### New Files
- ✅ `docker-debug.sh` - Debug helper script
- ✅ `docker-entrypoint.sh` - Startup helper
- ✅ `DOCKER-TROUBLESHOOTING.md` - Detailed troubleshooting
- ✅ `backend/.dockerignore` - Exclude files from image
- ✅ `frontend/.dockerignore` - Exclude files from image

## Manual Testing Steps

### 1. Start Services
```bash
cd /home/dimitris/projects/mapofvienna
docker compose up --build
```

### 2. Wait for Compilation
Watch logs until you see:
- Backend: "Starting development server"
- Frontend: "Angular Live Development Server"

### 3. Open Browser
Visit: `http://localhost:4200`

### 4. Create Thread
1. Select a district (ID 1-23)
2. Click "New Discussion"
3. Fill in:
   - Your name
   - Discussion title
   - Description
4. Click "Post Discussion"

### 5. Verify in API
```bash
curl http://localhost:8000/api/threads/
# Should now show your thread in the results
```

## Performance Tips

### Speed Up Subsequent Starts
```bash
# Don't rebuild if nothing changed
docker compose up

# Only rebuild when you change Dockerfile
docker compose up --build
```

### Monitor Resource Usage
```bash
# View CPU/Memory
docker stats

# Or
docker compose exec backend top
```

## Advanced Options

### Use Local Development Instead
```bash
# Terminal 1: Backend
cd backend
python manage.py runserver

# Terminal 2: Frontend
cd frontend
npm install
npm start
```

### Production Mode
```bash
# Set production environment variables
export DJANGO_DEBUG=False
export DJANGO_SECRET_KEY=your-secure-key

# Then start
docker compose up
```

### Run Single Service
```bash
# Start only backend
docker compose up backend

# Start only frontend
docker compose up frontend
```

## Troubleshooting Commands

```bash
# View all container info
docker compose ps -a

# Check container logs (last 100 lines)
docker compose logs --tail=100 backend

# Execute command in running container
docker compose exec backend python manage.py shell

# View container environment variables
docker compose exec backend env

# Check network
docker network ls
docker network inspect mapofvienna-mapofvienna-network
```

## Still Not Working?

1. **Run debug script**:
   ```bash
   ./docker-debug.sh
   ```

2. **Check Docker daemon**:
   ```bash
   docker ps  # Should work without sudo
   ```

3. **Verify file permissions**:
   ```bash
   ls -la docker compose.yml
   ```

4. **Try local development** (see QUICK-START.md):
   ```bash
   cd backend && python manage.py runserver
   cd frontend && npm start
   ```

5. **Get help** with full logs:
   ```bash
   docker compose logs > debug.log
   # Share debug.log for analysis
   ```

## Summary

The Docker setup should now:
- ✅ Start both services automatically
- ✅ Handle file changes (hot reload)
- ✅ Show compilation errors clearly
- ✅ Provide health checks
- ✅ Work on first try

**To start**: `docker compose up --build`

---

**Last Updated**: August 30, 2026
**Status**: Ready to Use
