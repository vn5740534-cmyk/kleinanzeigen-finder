# Kleinanzeigen Finder 🔍

A powerful, local-only web application for searching and filtering Kleinanzeigen (German classified ads) listings with an advanced UI and smart filtering capabilities.

![Kleinanzeigen Finder](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

## Features ✨

### Smart Category Filters
- **Free Items** - Find items offered for 0€
- **Dishwashers** - Up to customizable price (default: 50€)
- **Washing Machines** - Up to customizable price (default: 50€)
- **Chesterfield Sofas** - Classic leather furniture pieces
- **Chairs** - All types of seating
- **Free Kitchens** - Complete kitchen sets offered for free ("zu verschenken")
- **Electronics** - Items with quality indicators like "hibátlanul működik" (Hungarian: works flawlessly) or "einwandfrei" (German: flawless)

### Advanced Search Controls
- 🌍 **City Selector** - Choose from major German cities
- 📍 **Radius Control** - Search within 5-100km
- 🏷️ **Category Toggles** - Enable/disable specific categories
- 💰 **Max Price Inputs** - Set custom price limits
- 🔤 **Keyword Filtering** - Include specific terms in your search

### Modern UI/UX
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Strong Visual Hierarchy** - Clear, organized interface
- **Polished Layout** - Modern gradient backgrounds and smooth transitions
- **Listing Cards** with:
  - Primary image (or placeholder)
  - Title and price
  - Description snippet
  - Location information
  - Direct link to original listing

## Quick Start 🚀

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vn5740534-cmyk/kleinanzeigen-finder.git
   cd kleinanzeigen-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration ⚙️

The application can be configured through environment variables in `.env.local`:

```env
# Kleinanzeigen Base URL
KLEINANZEIGEN_BASE_URL=https://www.kleinanzeigen.de

# User Agent for web scraping
USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36

# Request delay in milliseconds (rate limiting)
REQUEST_DELAY_MS=2000

# Maximum requests per minute
MAX_REQUESTS_PER_MINUTE=20
```

### Configuration Options

| Variable | Description | Default |
|----------|-------------|---------|
| `KLEINANZEIGEN_BASE_URL` | Base URL for Kleinanzeigen | `https://www.kleinanzeigen.de` |
| `USER_AGENT` | User agent string for requests | Chrome user agent |
| `REQUEST_DELAY_MS` | Delay between requests (ms) | `2000` |
| `MAX_REQUESTS_PER_MINUTE` | Rate limit for requests | `20` |

## Usage 📖

1. **Select Your Location**
   - Choose a city from the dropdown
   - Adjust the search radius using the slider

2. **Choose Categories**
   - Toggle categories you're interested in
   - Set custom max prices for appliances

3. **Add Keywords** (Optional)
   - Enter comma-separated keywords
   - Filter results by specific terms

4. **Search**
   - Click the "Search Listings" button
   - View results in the responsive grid

5. **View Listings**
   - Click any listing card to open the original ad
   - Images, prices, and locations are displayed clearly

## Architecture 🏗️

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Scraping**: Axios + Cheerio
- **Rate Limiting**: rate-limiter-flexible

### Project Structure
```
kleinanzeigen-finder/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── search/
│   │   │       └── route.ts          # API endpoint for search
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── SearchInterface.tsx       # Main search interface
│   │   ├── FilterPanel.tsx           # Filter controls
│   │   ├── ListingGrid.tsx           # Listing grid layout
│   │   └── ListingCard.tsx           # Individual listing card
│   ├── lib/
│   │   └── scraper.ts                # Scraping service
│   └── types/
│       └── index.ts                  # TypeScript types
├── .env.local                        # Environment configuration
└── package.json
```

## Development 🛠️

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Development Mode

The app currently runs in **mock mode** by default, using sample data for development and testing. To enable real scraping:

1. Open `src/app/api/search/route.ts`
2. Change `searchMock` to `search`:
   ```typescript
   const listings = await scraper.search(params);
   ```

⚠️ **Important**: Real scraping should respect Kleinanzeigen's terms of service and be used responsibly with appropriate rate limiting.

## Rate Limiting & Resilience 🛡️

The scraper includes built-in protections:
- **Rate Limiter**: Limits requests per minute
- **Request Delays**: Adds delays between requests
- **Error Handling**: Graceful failure recovery
- **Retry Logic**: Continues with other queries on failure

## Responsive Design 📱

The application is fully responsive:
- **Mobile**: Stacked layout, touch-friendly controls
- **Tablet**: 2-column listing grid
- **Desktop**: 3-column grid with sticky filter panel

## Browser Support 🌐

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is for educational and personal use only. Please respect Kleinanzeigen's terms of service when using this tool.

## Disclaimer ⚠️

This tool is for local, personal use only. Users are responsible for complying with Kleinanzeigen's terms of service and applicable laws. The developers are not responsible for any misuse of this tool.

## Support 💬

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for the Kleinanzeigen community**
