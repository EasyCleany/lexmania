# lexmania Vercel Deployment

## Struktur
- `public/` enthält das statische Frontend.
- `api/` enthält die Serverless Functions für Vercel.

## Lokales Testen
```bash
npm i -g vercel
vercel dev
```

## API Endpoints
- `GET /api/health`
- `POST /api/intake`
- `GET /api/categories`
- `GET /api/providers?category=wohnen`
- `GET /api/offers`
- `GET /api/slots?providerId=lm-101`

## Zugriff auf das Backend
Mit Vercel Serverless Functions kannst du lokal oder live via HTTP zugreifen.

### Lokal
1. `vercel dev`
2. API Beispiel:
   ```bash
   curl http://localhost:3000/api/health
   ```

### Live (nach Deploy)
1. Öffne die Vercel-URL deines Projekts.
2. API Beispiel:
   ```bash
   curl https://<dein-projekt>.vercel.app/api/health
   ```

## Admin-Seite
Die Admin-Seite ist unter `/admin/` erreichbar und erlaubt den direkten Zugriff auf die API-Links.
