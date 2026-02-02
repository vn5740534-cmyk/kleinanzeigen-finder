# Kleinanzeigen Finder

A modern web application for finding classified ads on Kleinanzeigen, built with Next.js and NestJS.

## 📋 Prerequisites / Előfeltételek

Before you begin, ensure you have the following installed:
- **Node.js** version 18.0.0 or higher
- **npm** version 9.0.0 or higher

Check your versions:
```bash
node --version
npm --version
```

---

## 🚀 Quick Start / Gyors kezdés

### 1. Install Dependencies / Függőségek telepítése

```bash
npm install
```

This will install all dependencies for both the web app and API server.

### 2. Run the Application / Alkalmazás futtatása

You need to run both the API server and the web application in **separate terminal windows**.

#### Option A: Two Terminal Windows (Recommended)

**Terminal 1 - Start the API Server:**
```bash
npm run dev:api
```
The API will start on `http://localhost:3001`

**Terminal 2 - Start the Web App:**
```bash
npm run dev
```
The web app will start on `http://localhost:3000`

#### Option B: Background Processes

**Start API in background:**
```bash
npm run dev:api &
```

**Then start web app:**
```bash
npm run dev
```

---

## 🌐 Access the Application / Alkalmazás elérése

Once both servers are running:
- **Web Application**: Open your browser and go to `http://localhost:3000`
- **API Server**: Available at `http://localhost:3001`
- **API Health Check**: `http://localhost:3001/health`

---

## 📁 Project Structure / Projekt szerkezet

```
kleinanzeigen-finder/
├── apps/
│   ├── web/              # Next.js web application
│   │   ├── app/          # App router pages
│   │   ├── public/       # Static files
│   │   └── .env.local    # Environment configuration
│   └── api/              # NestJS API server
│       └── src/          # API source code
├── packages/             # Shared packages (if any)
└── package.json          # Root workspace configuration
```

---

## 🛠️ Available Scripts / Elérhető parancsok

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the web app (port 3000) |
| `npm run dev:api` | Start the API server (port 3001) |
| `npm run build` | Build all workspaces |
| `npm run lint` | Lint all workspaces |

---

## 🔧 Configuration / Konfiguráció

### Web App Environment Variables

The web app uses environment variables defined in `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

This tells the web app where to find the API server.

---

## ❓ Troubleshooting / Hibaelhárítás

### Port already in use / A port már használatban van

If you see an error like "Port 3000 is already in use":

```bash
# Find and kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or for port 3001
lsof -ti:3001 | xargs kill -9
```

### Cannot connect to API / Nem lehet csatlakozni az API-hoz

1. Make sure the API server is running (`npm run dev:api`)
2. Check that it's running on port 3001
3. Verify the web app's `.env.local` has the correct API URL

### Dependencies not installed / Függőségek nincsenek telepítve

If you see module not found errors:

```bash
# Clean install
rm -rf node_modules package-lock.json
rm -rf apps/*/node_modules
npm install
```

---

## 🏗️ Development Workflow / Fejlesztési munkafolyamat

1. **Start the API server** first to ensure backend is ready
2. **Start the web app** in a separate terminal
3. Make your changes - both servers have **hot reload** enabled
4. Changes will be reflected automatically

---

## 📝 Hungarian Instructions / Magyar útmutató

### Telepítés és futtatás:

1. **Függőségek telepítése:**
   ```bash
   npm install
   ```

2. **API szerver indítása** (1. terminál):
   ```bash
   npm run dev:api
   ```
   Az API elérhető lesz a `http://localhost:3001` címen.

3. **Webalkalmazás indítása** (2. terminál):
   ```bash
   npm run dev
   ```
   A webalkalmazás elérhető lesz a `http://localhost:3000` címen.

4. **Böngészőben:** Nyisd meg a `http://localhost:3000` címet.

### Hibaelhárítás:

- **Port foglalt:** Ha a port már használatban van, állítsd le a folyamatot vagy használj másik portot.
- **API kapcsolat hiba:** Győződj meg róla, hogy az API szerver fut a 3001-es porton.
- **Modul nem található:** Futtasd újra az `npm install` parancsot.

---

## 📄 License

MIT