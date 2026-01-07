'use client';

import { useState, useEffect, useCallback } from 'react';
import { Meal, MealSummary, Category } from '@/types/recipe';
import { mealApi } from '@/lib/api';
import { useFavorites } from '@/hooks/useFavorites';
import { useDebounce } from '@/hooks/useDebounce';
import { RecipeCard } from '@/components/RecipeCard';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { RecipeModal } from '@/components/RecipeModal';
import { FavoritesPanel } from '@/components/FavoritesPanel';
import { LoadingSpinner, RecipeGridSkeleton } from '@/components/LoadingSpinner';
import { EmptyState } from '@/components/EmptyState';
import {
  HeartIcon,
  SparklesIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function Home() {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoritesPanelOpen, setIsFavoritesPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isRandomLoading, setIsRandomLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const { favorites, toggleFavorite, removeFavorite, isFavorite } = useFavorites();
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Load categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await mealApi.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setIsCategoriesLoading(false);
      }
    }
    loadCategories();
  }, []);

  // Search effect
  useEffect(() => {
    async function search() {
      setIsLoading(true);
      setError(null);

      try {
        if (selectedCategory) {
          // Filter by category - returns MealSummary, need to fetch full details
          const summaries = await mealApi.filterByCategory(selectedCategory);
          // Fetch full details for each meal (limit to first 12 for performance)
          const fullMeals = await Promise.all(
            summaries.slice(0, 12).map((s) => mealApi.getMealById(s.idMeal))
          );
          const filtered = fullMeals.filter((m): m is Meal => m !== null);
          
          // If there's a search query, filter the results
          if (debouncedSearch) {
            const query = debouncedSearch.toLowerCase();
            setMeals(filtered.filter((m) => m.strMeal.toLowerCase().includes(query)));
          } else {
            setMeals(filtered);
          }
        } else if (debouncedSearch) {
          // Search by name
          const data = await mealApi.searchByName(debouncedSearch);
          setMeals(data);
        } else {
          // Default: show some popular recipes (search for 'a' to get variety)
          const data = await mealApi.searchByName('a');
          setMeals(data.slice(0, 12));
        }
      } catch (err) {
        console.error('Search failed:', err);
        setError('Failed to load recipes. Please try again.');
        setMeals([]);
      } finally {
        setIsLoading(false);
      }
    }

    search();
  }, [debouncedSearch, selectedCategory]);

  // Handle recipe click
  const handleRecipeClick = useCallback(async (meal: Meal | MealSummary) => {
    // If we have a MealSummary, fetch the full details
    if (!('strInstructions' in meal)) {
      const fullMeal = await mealApi.getMealById(meal.idMeal);
      if (fullMeal) {
        setSelectedMeal(fullMeal);
        setIsModalOpen(true);
      }
    } else {
      setSelectedMeal(meal);
      setIsModalOpen(true);
    }
  }, []);

  // Get random recipe
  const handleRandomRecipe = async () => {
    setIsRandomLoading(true);
    try {
      const meal = await mealApi.getRandomMeal();
      if (meal) {
        setSelectedMeal(meal);
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error('Failed to get random recipe:', err);
    } finally {
      setIsRandomLoading(false);
    }
  };

  // Handle category change
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    // Clear search when changing category
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-stone-800/50 backdrop-blur-md bg-stone-950/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍳</span>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  <span className="gradient-text">Recipe</span>
                  <span className="text-stone-100"> Finder</span>
                </h1>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Random Recipe Button */}
              <button
                onClick={handleRandomRecipe}
                disabled={isRandomLoading}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 
                           bg-gradient-to-r from-amber-500 to-amber-600
                           hover:from-amber-400 hover:to-amber-500
                           text-stone-900 font-semibold rounded-xl
                           transition-all duration-300 hover:scale-105
                           shadow-lg shadow-amber-500/20
                           disabled:opacity-50 disabled:hover:scale-100"
              >
                {isRandomLoading ? (
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                ) : (
                  <SparklesIcon className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">Surprise Me</span>
              </button>

              {/* Favorites Button */}
              <button
                onClick={() => setIsFavoritesPanelOpen(true)}
                className="relative flex items-center gap-2 px-3 sm:px-4 py-2
                           bg-stone-800/50 hover:bg-stone-800
                           border border-stone-700/50 hover:border-rose-500/30
                           rounded-xl transition-all duration-300"
              >
                {favorites.length > 0 ? (
                  <HeartSolidIcon className="w-5 h-5 text-rose-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-stone-400" />
                )}
                <span className="hidden sm:inline text-stone-300">Favorites</span>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center
                                   bg-rose-500 text-white text-xs font-bold rounded-full">
                    {favorites.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-12 sm:py-16 text-center px-4">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-[var(--font-display)]">
          <span className="text-stone-100">Discover </span>
          <span className="gradient-text">Delicious</span>
          <span className="text-stone-100"> Recipes</span>
        </h2>
        <p className="text-stone-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Explore thousands of recipes from around the world. Search by name, filter by category, and save your favorites.
        </p>
      </section>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search for recipes..."
            />
          </div>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={handleCategoryChange}
            isLoading={isCategoriesLoading}
          />
        </div>

        {/* Active Filters */}
        {(selectedCategory || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-stone-500 text-sm">Showing:</span>
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 
                               bg-amber-500/20 text-amber-400 rounded-full text-sm">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="ml-1 hover:text-amber-300"
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 
                               bg-stone-800 text-stone-300 rounded-full text-sm">
                &quot;{searchQuery}&quot;
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-1 hover:text-stone-100"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results */}
        {error ? (
          <EmptyState
            title="Oops! Something went wrong"
            description={error}
            icon="😵"
            action={{
              label: 'Try Again',
              onClick: () => window.location.reload(),
            }}
          />
        ) : isLoading ? (
          <RecipeGridSkeleton count={6} />
        ) : meals.length === 0 ? (
          <EmptyState
            title="No recipes found"
            description={
              searchQuery || selectedCategory
                ? 'Try adjusting your search or category filter'
                : 'Start searching to discover delicious recipes'
            }
            icon="🔍"
            action={
              searchQuery || selectedCategory
                ? {
                    label: 'Clear Filters',
                    onClick: () => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    },
                  }
                : undefined
            }
          />
        ) : (
          <>
            <p className="text-stone-500 text-sm mb-4">
              Found {meals.length} recipe{meals.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal, index) => (
                <div
                  key={meal.idMeal}
                  className="animate-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <RecipeCard
                    meal={meal}
                    isFavorite={isFavorite(meal.idMeal)}
                    onToggleFavorite={() => toggleFavorite(meal)}
                    onClick={() => handleRecipeClick(meal)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-stone-800/50 py-8 text-center">
        <p className="text-stone-500 text-sm">
          Powered by{' '}
          <a
            href="https://www.themealdb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:text-amber-400 transition-colors"
          >
            TheMealDB
          </a>
        </p>
      </footer>

      {/* Recipe Modal */}
      <RecipeModal
        meal={selectedMeal}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMeal(null);
        }}
        isFavorite={selectedMeal ? isFavorite(selectedMeal.idMeal) : false}
        onToggleFavorite={() => {
          if (selectedMeal) {
            toggleFavorite(selectedMeal);
          }
        }}
      />

      {/* Favorites Panel */}
      <FavoritesPanel
        isOpen={isFavoritesPanelOpen}
        onClose={() => setIsFavoritesPanelOpen(false)}
        favorites={favorites}
        onRemove={removeFavorite}
        onSelectRecipe={(meal) => {
          setSelectedMeal(meal);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
}
