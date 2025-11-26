# 🍺 BeverageCompare

A smart beverage price lookup and comparison platform powered by AI. Find real-time prices for your favorite alcoholic beverages and get intelligent recommendations.

## ✨ Features

### 💰 Price Lookup Chat
- Ask our AI chatbot about beverage prices in real-time
- Location-aware pricing (India-focused)
- Casual, conversational tone
- Instant, accurate results
- Support for multiple bottle sizes (750ml, 350ml, 180ml)

### ⚖️ Beverage Comparison
- Compare up to 10 beverages simultaneously
- Side-by-side comparison with key details:
  - Current prices by bottle size
  - Alcohol content (ABV)
  - Taste profile
  - Origin/region
  - Quality tier
  - Value for money
- AI-powered strengths and weaknesses analysis
- Smart recommendations based on your needs

### 🎨 User Experience
- Beautiful, responsive design
- Dark mode support
- Mobile-friendly interface
- Fast, smooth interactions
- Professional styling with Tailwind CSS

## 🚀 Tech Stack

- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.0-Flash API
- **Runtime**: Node.js
- **Package Manager**: npm/yarn

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn
- Google Gemini API key ([Get one here](https://ai.google.dev/))

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Devesh36/Beverage-compare.git
cd alcholocompare
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from [Google AI Studio](https://ai.google.dev/aistudio)

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 How to Use

### Check Prices
1. Click **"Check Prices"** from the landing page
2. Select your location (India-based)
3. Ask the chatbot about any beverage price
4. Get instant responses with current prices

**Example queries:**
- "What's the price of Old Monk?"
- "How much does Bacardi cost?"
- "Give me prices for Kingfisher beer"

### Compare Beverages
1. Click **"Compare Beverages"** from the landing page
2. Enter 2-10 beverage names
3. Click **"Compare Now"**
4. View detailed comparison with:
   - Attribute table
   - Key strengths of each beverage
   - Weaknesses to consider
   - Overall winner recommendation

## 🏗️ Project Structure

```
alcholocompare/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── chat/
│   │   └── page.tsx          # Chat interface
│   ├── compare/
│   │   └── page.tsx          # Comparison interface
│   └── api/
│       ├── chat/
│       │   └── route.ts      # Chat API endpoint
│       └── compare/
│           └── route.ts      # Compare API endpoint
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

## 🔌 API Endpoints

### POST `/api/chat`
Get beverage prices from AI

**Request:**
```json
{
  "message": "Price of Old Monk?",
  "location": "Mumbai"
}
```

**Response:**
```json
{
  "response": "Old Monk 750ml: ₹250-350 | 350ml: ₹130-180 | 180ml: ₹70-100"
}
```

### POST `/api/compare`
Compare multiple beverages

**Request:**
```json
{
  "beverages": ["Old Monk", "Bacardi Lemon", "Royal Stag"]
}
```

**Response:**
```json
{
  "comparison": "Attribute | Old Monk | Bacardi Lemon | Royal Stag\n..."
}
```

## 🎯 Features Coming Soon

- 📊 Price trend analytics
- 🔔 Price drop alerts
- 📍 Store locator with nearby prices
- 🏪 User reviews and ratings
- 💳 Best deals finder
- 🌍 Multi-location support
- 📱 Mobile app (iOS/Android)

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" and select your repo
4. Add `GEMINI_API_KEY` to environment variables
5. Deploy!

### Deploy to other platforms

The app is a standard Next.js app, so it can be deployed to:
- Netlify
- Railway
- Render
- AWS Amplify
- DigitalOcean

## ⚠️ Disclaimer

- Prices shown are for reference purposes and vary by location and retailer
- Always verify prices with local shops before purchase
- This app is for informational purposes only
- Please drink responsibly and follow local alcohol laws

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📧 Contact

Have questions or suggestions? Feel free to reach out!

---

**Made with ❤️ for beverage enthusiasts** 🍷🍺🍻
