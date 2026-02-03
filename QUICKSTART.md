# Kleinanzeigen Finder - Quick Start Guide

Get the app running in 5 minutes! 🚀

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Configure Environment
```bash
# Copy example environment file
cp .env.example .env.local

# The defaults are already configured, but you can customize:
# - KLEINANZEIGEN_BASE_URL: Base URL for scraping
# - USER_AGENT: Browser user agent string
# - REQUEST_DELAY_MS: Delay between requests (default: 2000ms)
# - MAX_REQUESTS_PER_MINUTE: Rate limit (default: 20)
```

## Step 3: Run Development Server
```bash
npm run dev
```

## Step 4: Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## Using the App

### 1. Select Location
- Choose a city from the dropdown
- Adjust search radius with the slider (5-100 km)

### 2. Choose Categories
Select the types of items you're looking for:
- ✅ **Free Items (0€)** - Items offered for free
- 🍽️ **Dishwashers** - Set max price (default: 50€)
- 👕 **Washing Machines** - Set max price (default: 50€)
- 🛋️ **Chesterfield Sofas** - Classic furniture
- 🪑 **Chairs** - All types of seating
- 🏠 **Free Kitchens** - Complete kitchen sets
- 💻 **Electronics (works flawlessly)** - Items with quality indicators

### 3. Add Keywords (Optional)
Enter comma-separated keywords to refine your search:
```
braun, leder, modern
```

### 4. Search
Click the **"Search Listings"** button

### 5. Browse Results
- View listing cards with images, titles, and prices
- Click any card to open the original listing on Kleinanzeigen

## Production Build

To create a production build:
```bash
npm run build
npm start
```

## Development Notes

### Mock Data
The app currently uses mock data by default. To enable real scraping:

1. Open `src/app/api/search/route.ts`
2. Change line 21 from:
   ```typescript
   const listings = await scraper.searchMock(params);
   ```
   to:
   ```typescript
   const listings = await scraper.search(params);
   ```

⚠️ **Important**: Real scraping must respect Kleinanzeigen's terms of service and rate limits.

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
PORT=3001 npm run dev
```

### Dependencies Issues
Try clearing cache and reinstalling:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Ensure you're using Node.js 18 or higher:
```bash
node --version
```

## Support

For issues or questions, please check the main [README.md](./README.md) or open an issue on GitHub.

---

Happy searching! 🎉
