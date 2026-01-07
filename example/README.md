# Recipe Finder 🍳

A beautiful, modern recipe finder application built with Next.js, TypeScript, and Tailwind CSS. Search for recipes, filter by category, and save your favorites!

## Features

### Core Functionality
- **🔍 Search Recipes** - Search by recipe name with real-time debounced search
- **📂 Category Filter** - Filter recipes by category using an elegant dropdown
- **🃏 Recipe Cards** - Beautiful cards showing recipe image, name, category, and area
- **📖 Recipe Details** - Full recipe information in a modal with ingredients and instructions
- **❤️ Favorites** - Save your favorite recipes (persisted in localStorage)

### Bonus Features
- **✨ Surprise Me** - Random recipe button for culinary inspiration
- **🎨 Dark Mode** - Beautiful dark theme with warm amber accents
- **🔄 Smooth Animations** - Staggered card animations and transitions
- **📱 Responsive Design** - Works great on mobile, tablet, and desktop
- **📤 Share Recipes** - Share recipes via Web Share API or copy link

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** HeadlessUI (accessible components)
- **Icons:** Heroicons
- **API:** TheMealDB (free, no API key required)

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and custom animations
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page component
├── components/
│   ├── CategoryFilter.tsx   # Category dropdown filter
│   ├── EmptyState.tsx       # Empty/error state component
│   ├── FavoritesPanel.tsx   # Slide-out favorites panel
│   ├── LoadingSpinner.tsx   # Loading states and skeletons
│   ├── RecipeCard.tsx       # Recipe card component
│   ├── RecipeModal.tsx      # Recipe detail modal
│   └── SearchBar.tsx        # Search input component
├── hooks/
│   ├── useDebounce.ts       # Debounce hook for search
│   └── useFavorites.ts      # Favorites with localStorage
├── lib/
│   └── api.ts               # TheMealDB API service
└── types/
    └── recipe.ts            # TypeScript type definitions
```

## Design Highlights

- **Typography:** Outfit (sans-serif) + Playfair Display (display)
- **Color Palette:** Warm stone/amber theme with rose accents
- **Animations:** Smooth transitions, staggered reveals, hover effects
- **Accessibility:** Keyboard navigation, focus states, ARIA labels

## API Reference

This app uses [TheMealDB](https://www.themealdb.com/api.php), a free recipe API.

Key endpoints:
- Search by name: `search.php?s={query}`
- Filter by category: `filter.php?c={category}`
- Get random meal: `random.php`
- Get meal by ID: `lookup.php?i={id}`
- List categories: `categories.php`

## License

MIT
