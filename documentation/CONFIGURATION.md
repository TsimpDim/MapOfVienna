# Configuration Guide

## Backend Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory or set environment variables:

```bash
# Django Core Settings
DJANGO_DEBUG=True                    # Set to False in production
DJANGO_SECRET_KEY=your-secret-key   # Change in production!
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration
# Default: SQLite (db.sqlite3)
# For MySQL/PostgreSQL, use DATABASE_URL format

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:4200,http://localhost:3000

# Server Settings
API_PORT=8000
API_WORKERS=4
```

### Django Settings

Edit `backend/threads_api/settings.py`:

```python
# Debug Mode
DEBUG = os.environ.get('DJANGO_DEBUG', 'True') == 'True'

# Allowed Hosts
ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', 
    'localhost,127.0.0.1,0.0.0.0').split(',')

# Database Configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
    "http://localhost:3000",
    "http://127.0.0.1:4200",
]
```

### Database Configuration

#### SQLite (Default - Development)
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

#### MySQL
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mapofvienna_threads',
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

Then install: `pip install mysqlclient`

#### PostgreSQL
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mapofvienna_threads',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

Then install: `pip install psycopg2`

### REST Framework Settings

```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}
```

### Static & Media Files

```python
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

### Logging Configuration

Add to `settings.py`:

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}
```

### Email Configuration (Optional)

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-password'
```

## Frontend Configuration

### Environment Variables

The frontend reads its configuration from environment variables via `frontend/scripts/set-env.js`, which is run automatically before `npm start` and `npm run build`. It regenerates `src/environments/environment.ts` (development) and `src/environments/environment.prod.ts` (production).

```bash
# CARTO basemaps API key (optional)
MAP_OF_VIENNA_MAP_API_KEY=your-carto-key

# Backend API base URL (optional — defaults below)
MAP_OF_VIENNA_API_URL=https://api.mapofvienna.com
```

Defaults:

| Build | API base URL |
|-------|--------------|
| development (`npm start`) | `http://localhost:8000` |
| production (`npm run build -- --configuration production`) | `https://api.mapofvienna.com` |

The production build swaps in `environment.prod.ts` via `fileReplacements` in `frontend/angular.json`.

### API Service Configuration

The API base URL is set in `src/environments/environment.ts` / `environment.prod.ts` and consumed by `frontend/src/app/services/comment.service.ts`:

```typescript
private apiUrl = `${environment.apiBaseUrl}/api/comments`;
```

### Angular Build Configuration

Edit `frontend/angular.json`:

```json
{
  "projects": {
    "mapofvienna-threads": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/mapofvienna-threads",
            "index": "src/index.html",
            "main": "src/main.ts"
          }
        }
      }
    }
  }
}
```

## Docker Configuration

### Backend Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    gcc

# Copy and install Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run migrations
RUN python manage.py migrate

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "threads_api.wsgi:application"]
```

### Frontend Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]
```

### Docker Compose Configuration

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DJANGO_DEBUG=False
      - DJANGO_SECRET_KEY=your-key
      - CORS_ALLOWED_ORIGINS=http://localhost:4200
    volumes:
      - ./backend:/app

  frontend:
    build: ./frontend
    ports:
      - "4200:4200"
    volumes:
      - ./frontend:/app
    depends_on:
      - backend
```

## Production Deployment

### Backend Production Settings

```python
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']  # Use secure key from secrets manager

# Use PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ['DB_NAME'],
        'USER': os.environ['DB_USER'],
        'PASSWORD': os.environ['DB_PASSWORD'],
        'HOST': os.environ['DB_HOST'],
        'PORT': os.environ['DB_PORT'],
    }
}

# Static files to CDN
STATIC_URL = 'https://cdn.yourdomain.com/static/'
STATIC_ROOT = '/var/www/static/'

# Security
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
```

### Frontend Production Build

```bash
cd frontend
npm run build -- --configuration production
```

### Nginx Configuration

```nginx
upstream backend {
    server backend:8000;
}

server {
    listen 80;
    server_name yourdomain.com;

    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

## Performance Tuning

### Backend

```python
# Database connection pooling
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'CONN_MAX_AGE': 600,  # Connection pool timeout
        'OPTIONS': {
            'connect_timeout': 10,
        }
    }
}

# Cache configuration
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}
```

### Frontend

```bash
# Enable compression in Angular build
ng build --configuration production --aot --build-optimizer
```

## Monitoring & Logging

### Backend Monitoring

```python
# Sentry Integration
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True
)
```

## Security Checklist

- [ ] Change `DJANGO_SECRET_KEY`
- [ ] Set `DEBUG = False`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Enable HSTS headers
- [ ] Set secure cookies
- [ ] Regular security updates

## Troubleshooting Configuration

### Common Issues

**Module not found errors**
```bash
pip install -r backend/requirements.txt
cd frontend && npm install
```

**CORS errors**
- Check `CORS_ALLOWED_ORIGINS` in settings
- Ensure frontend and backend URLs match exactly

**Database connection errors**
- Check database credentials
- Verify database is running
- Check firewall rules

**Port conflicts**
- Change port in settings or Docker Compose
- Check if ports are already in use: `lsof -i :8000`

---

For more information, see the main documentation files.
