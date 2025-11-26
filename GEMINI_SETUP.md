# Setup Guide for BeverageCompare

## Getting Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

## Environment Setup

Create a `.env.local` file in the root directory of your project:

```
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the actual API key from Google AI Studio.

## Running the Application

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000`

## Features

### Chat Page (`/chat`)
- Ask the AI about beverage prices
- Get detailed information about alcoholic beverages
- Real-time responses powered by Gemini API

### Compare Page (`/compare`)
- Compare multiple beverages side-by-side
- Get AI recommendations on which beverage is better
- Detailed analysis of prices, taste, ABV, and more

### Landing Page (`/`)
- Clean, modern interface
- Links to chat and compare features
- Professional footer with navigation

## API Endpoints

### POST `/api/chat`
Request:
```json
{
  "message": "What's the price of Old Monk?"
}
```

Response:
```json
{
  "response": "AI generated response about the beverage"
}
```

### POST `/api/compare`
Request:
```json
{
  "beverages": ["Old Monk", "Johnnie Walker", "Kingfisher"]
}
```

Response:
```json
{
  "comparison": "Detailed comparison and recommendation"
}
```

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Deployment**: Vercel (recommended)

## Notes

- Prices are approximate and vary by location
- API calls are made server-side for security
- The Gemini API has rate limits on the free tier
