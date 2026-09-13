# Docker Troubleshooting Guide

## Common Issues & Solutions

### Issue 1: "Server just never starts"

**Symptoms**: Docker containers are running but services don't respond

**Solutions**:

```bash
# Check container logs
docker compose logs -f backend
docker compose logs -f frontend

# Check if containers are actually running
docker ps

# Restart services
docker compose restart

# Full rebuild from scratch
docker compose down
docker compose up --build
```

### Issue 2: "Port 8000 or 4200 already in use"

**Symptoms**: Error like "port is already allocated"

**Solutions**:

```bash
# Find what's using the port
lsof -i :8000
lsof -i :4200

# Kill the process
kill -9 <PID>

# Or change ports in docker compose.yml:
# Change "8000:8000" to "8001:8000" for backend
# Change "4200:4200" to "4201:4200" for frontend
```

### Issue 3: "Frontend can't connect to backend API"

**Symptoms**: Frontend loads but shows "Cannot connect to API"

**Solutions**:

1. **Check backend is running**:
```bash
docker compose logs backend
curl http://localhost:8000/api/threads/
```

2. **Check CORS settings** in `backend/threads_api/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]
```

3. **Check API URL in frontend** (`frontend/src/app/services/thread.service.ts`):
```typescript
private apiUrl = 'http://localhost:8000/api/threads';
```

### Issue 4: "Frontend compiles but shows blank page"

**Symptoms**: http://localhost:4200 loads but no content

**Solutions**:

```bash
# Check frontend logs
docker compose logs frontend

# Clear browser cache
# In Chrome: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)

# Restart frontend container
docker compose restart frontend

# Check if Angular is actually serving
curl http://localhost:4200
```

### Issue 5: "Build fails with npm/Python dependency errors"

**Symptoms**: Docker build fails during `npm install` or `pip install`

**Solutions**:

```bash
# Full clean rebuild
docker compose down
docker system prune -a
docker compose up --build

# Or rebuild specific service
docker compose build --no-cache backend
docker compose build --no-cache frontend
docker compose up
```

### Issue 6: "Database migration errors"

**Symptoms**: Backend logs show database errors

**Solutions**:

```bash
# Reset database
docker compose exec backend python manage.py migrate --reset-sequences

# Or clear the SQLite database
docker compose exec backend rm db.sqlite3
docker compose restart backend

# Check database
docker compose exec backend python manage.py dbshell
```

### Issue 7: "Services stop immediately after starting"

**Symptoms**: Containers start and then exit

**Solutions**:

```bash
# Check logs for error
docker compose logs

# Common causes:
# 1. Missing node_modules
docker compose exec frontend npm install

# 2. Python dependencies not installed
docker compose exec backend pip install -r requirements.txt

# 3. Port already in use
docker ps  # Check all containers
```

## Verification Steps

### 1. Backend Health Check

```bash
# Test API endpoints
curl http://localhost:8000/api/threads/

# Should return JSON like:
# {"count": 0, "next": null, "previous": null, "results": []}
```

### 2. Frontend Health Check

```bash
# Test frontend is serving
curl http://localhost:4200

# Should return HTML content
```

### 3. Network Communication

```bash
# Check containers can see each other
docker compose exec frontend curl http://backend:8000/api/threads/
docker compose exec backend curl http://frontend:4200
```

## Debugging Commands

### View Real-time Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend

# Last 100 lines
docker compose logs --tail=100 backend
```

### Execute Commands in Container

```bash
# Backend
docker compose exec backend python manage.py shell
docker compose exec backend python manage.py createsuperuser
docker compose exec backend ls -la

# Frontend
docker compose exec frontend npm list
docker compose exec frontend ls -la node_modules/@angular
```

### Inspect Container

```bash
# Get container IP
docker inspect mapofvienna-threads-api | grep IPAddress

# Get full container info
docker inspect mapofvienna-threads-ui
```

## Reset Everything

### Complete Fresh Start

```bash
# Stop all containers
docker compose down

# Remove volumes (deletes database)
docker compose down -v

# Remove images
docker compose down --rmi all

# Clean up unused Docker resources
docker system prune -a --volumes

# Start fresh
docker compose up --build
```

## Performance Tips

### Reduce Build Time

```bash
# Don't rebuild if nothing changed
docker compose up

# Force rebuild only when needed
docker compose up --build
```

### Check Resource Usage

```bash
# View CPU/Memory usage
docker stats

# Or
docker compose exec backend top
```

## Configuration Issues

### Environment Variables

Check `docker compose.yml` environment section:

```yaml
environment:
  - DJANGO_DEBUG=True
  - DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,backend
  - CORS_ALLOWED_ORIGINS=http://localhost:4200,http://frontend:4200
```

### Volume Mounts

If files don't update, check volume mounts in `docker compose.yml`:

```yaml
volumes:
  - ./backend:/app              # Syncs backend code
  - ./frontend/src:/app/src     # Syncs frontend source
  - /app/node_modules           # Doesn't sync node_modules
```

## Port Mapping

Default ports:
- Frontend: `4200` (maps to container's `4200`)
- Backend: `8000` (maps to container's `8000`)

To use different ports, edit `docker compose.yml`:

```yaml
services:
  backend:
    ports:
      - "8001:8000"  # Access at http://localhost:8001

  frontend:
    ports:
      - "4201:4200"  # Access at http://localhost:4201
```

Then update frontend API URL in `thread.service.ts`:
```typescript
private apiUrl = 'http://localhost:8001/api/threads';
```

## Still Having Issues?

1. **Check all prerequisites**:
   - Docker is installed: `docker --version`
   - Docker Compose is installed: `docker compose --version`
   - Ports 8000 and 4200 are available

2. **Review logs carefully**:
   - Read error messages fully
   - Check for connection refused errors
   - Look for permission denied errors

3. **Try minimal setup**:
   - Stop Docker: `docker compose down`
   - Start fresh: `docker compose up --build`
   - Give it time to initialize (first start takes 30-60 seconds)

4. **Alternative: Use local development**:
   - See `QUICK-START.md` for local setup
   - Local development is often easier for debugging

## Production Deployment

For production, use:

```bash
# Use docker compose with production config
docker compose -f docker compose.yml -f docker compose.prod.yml up

# Or modify docker compose.yml settings:
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=your-secure-key
# etc.
```

See `CONFIGURATION.md` for production setup details.

---

**Last Updated**: August 30, 2026

If you still can't resolve the issue:
1. Check Docker logs: `docker compose logs`
2. Review QUICK-START.md for alternative setup
3. Try local development setup instead
