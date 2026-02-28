# Pokemon Finder - Docker Setup

## Quick Start

### Option 1: With Nginx Reverse Proxy (Recommended for Production)
```bash
docker-compose up -d
```
This will start:
- Pokemon Finder app on port 3000 (internal)
- Nginx reverse proxy on port 80 (external)

### Option 2: App Only (Development)
```bash
docker-compose up -d app
```
This will start only the Pokemon Finder app on port 3000.

## URLs
- **With Nginx:** http://localhost
- **App Only:** http://localhost:3000

## Services

### App Service
- **Image:** Built from Dockerfile
- **Port:** 3000
- **Health Check:** Every 30 seconds
- **Restart:** Unless stopped

### Nginx Service
- **Image:** nginx:alpine
- **Ports:** 80, 443
- **Features:** Gzip compression, security headers
- **Restart:** Unless stopped

## Environment Variables
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`

## HTTPS Support
1. Uncomment the HTTPS server block in `nginx.conf`
2. Place SSL certificates in `./ssl/` directory:
   - `./ssl/cert.pem` - SSL certificate
   - `./ssl/key.pem` - SSL private key
3. Restart: `docker-compose up -d`

## Commands
```bash
# Start all services
docker-compose up -d

# Start only the app
docker-compose up -d app

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build

# View running containers
docker-compose ps
```

## Production Deployment
For production deployment:
1. Set proper domain in `nginx.conf`
2. Configure SSL certificates
3. Consider using environment variables for configuration
4. Set up monitoring and logging
5. Configure backup strategy

## Troubleshooting
- If port 3000 is in use, change it in `docker-compose.yml`
- Check logs with `docker-compose logs app`
- Verify health checks at `http://localhost/health`
