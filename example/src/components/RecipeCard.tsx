'use client';

import Image from 'next/image';
import { Meal, MealSummary } from '@/types/recipe';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface RecipeCardProps {
  meal: Meal | MealSummary;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onClick: () => void;
}

export function RecipeCard({
  meal,
  isFavorite = false,
  onToggleFavorite,
  onClick,
}: RecipeCardProps) {
  const category = 'strCategory' in meal ? meal.strCategory : null;

  return (
    <article
      className="group relative bg-stone-900/50 backdrop-blur-sm rounded-2xl overflow-hidden 
                 border border-stone-800/50 hover:border-amber-500/30 
                 transition-all duration-500 ease-out cursor-pointer
                 hover:shadow-2xl hover:shadow-amber-500/10
                 hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out 
                     group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent 
                        opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Category Badge */}
        {category && (
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium 
                          bg-amber-500/90 text-stone-900 rounded-full
                          shadow-lg shadow-amber-500/20">
            {category}
          </span>
        )}
        
        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-3 right-3 p-2 rounded-full 
                       bg-stone-900/70 backdrop-blur-sm border border-stone-700/50
                       hover:bg-stone-800 hover:border-amber-500/50
                       transition-all duration-300
                       group/btn"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <HeartSolidIcon className="w-5 h-5 text-rose-500 transition-transform duration-300 
                                        group-hover/btn:scale-110" />
            ) : (
              <HeartIcon className="w-5 h-5 text-stone-400 transition-all duration-300 
                                   group-hover/btn:text-rose-400 group-hover/btn:scale-110" />
            )}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-stone-100 line-clamp-2 
                       group-hover:text-amber-400 transition-colors duration-300">
          {meal.strMeal}
        </h3>
        
        {'strArea' in meal && meal.strArea && (
          <p className="mt-1 text-sm text-stone-400 flex items-center gap-1.5">
            <span className="text-amber-500">📍</span>
            {meal.strArea}
          </p>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                      transition-opacity duration-500 pointer-events-none
                      bg-gradient-to-br from-amber-500/5 via-transparent to-rose-500/5" />
    </article>
  );
}

