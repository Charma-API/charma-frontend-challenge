'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Meal, getIngredients } from '@/types/recipe';
import {
  XMarkIcon,
  HeartIcon,
  ShareIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface RecipeModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function RecipeModal({
  meal,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}: RecipeModalProps) {
  if (!meal) return null;

  const ingredients = getIngredients(meal);
  const instructions = meal.strInstructions
    .split(/\r\n|\n|\r/)
    .filter((line) => line.trim());

  const handleShare = async () => {
    const shareData = {
      title: meal.strMeal,
      text: `Check out this recipe: ${meal.strMeal}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${meal.strMeal}\n${window.location.origin}?recipe=${meal.idMeal}`
        );
        alert('Recipe link copied to clipboard!');
      }
    } catch (err) {
      console.log('Share failed:', err);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel
                className="w-full max-w-4xl transform overflow-hidden 
                           rounded-3xl bg-stone-900 border border-stone-800/50
                           shadow-2xl transition-all"
              >
                {/* Header Image */}
                <div className="relative h-64 sm:h-80">
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full z-10
                               bg-stone-900/70 backdrop-blur-sm border border-stone-700/50
                               text-stone-300 hover:text-white hover:bg-stone-800
                               transition-all duration-300"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                    <button
                      onClick={handleShare}
                      className="p-3 rounded-full
                                 bg-stone-900/70 backdrop-blur-sm border border-stone-700/50
                                 text-stone-300 hover:text-amber-400 hover:border-amber-500/50
                                 transition-all duration-300"
                      aria-label="Share recipe"
                    >
                      <ShareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={onToggleFavorite}
                      className="p-3 rounded-full
                                 bg-stone-900/70 backdrop-blur-sm border border-stone-700/50
                                 transition-all duration-300
                                 hover:border-rose-500/50"
                      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {isFavorite ? (
                        <HeartSolidIcon className="w-5 h-5 text-rose-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5 text-stone-300 hover:text-rose-400" />
                      )}
                    </button>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pr-28">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 text-xs font-medium bg-amber-500 text-stone-900 rounded-full">
                        {meal.strCategory}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-stone-800 text-stone-300 rounded-full">
                        📍 {meal.strArea}
                      </span>
                      {meal.strTags &&
                        meal.strTags.split(',').map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-stone-800/80 text-stone-400 rounded-full"
                          >
                            #{tag.trim()}
                          </span>
                        ))}
                    </div>
                    <Dialog.Title className="text-2xl sm:text-3xl font-bold text-white">
                      {meal.strMeal}
                    </Dialog.Title>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
                  {/* YouTube Link */}
                  {meal.strYoutube && (
                    <a
                      href={meal.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mb-6 px-4 py-2 
                                 bg-rose-600/20 border border-rose-500/30 rounded-lg
                                 text-rose-400 hover:bg-rose-600/30 hover:text-rose-300
                                 transition-all duration-300"
                    >
                      <PlayCircleIcon className="w-5 h-5" />
                      Watch on YouTube
                    </a>
                  )}

                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Ingredients */}
                    <div className="md:col-span-1">
                      <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-500/10">
                          🥘
                        </span>
                        Ingredients
                      </h3>
                      <ul className="space-y-2">
                        {ingredients.map((ingredient, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-stone-300 py-2 
                                       border-b border-stone-800/50 last:border-0"
                          >
                            <span className="text-amber-500 text-sm">•</span>
                            <span className="flex-1">{ingredient.name}</span>
                            <span className="text-stone-500 text-sm">{ingredient.measure}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructions */}
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-500/10">
                          📝
                        </span>
                        Instructions
                      </h3>
                      <div className="space-y-4">
                        {instructions.map((step, index) => (
                          <p key={index} className="text-stone-300 leading-relaxed">
                            {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Source */}
                  {meal.strSource && (
                    <div className="mt-8 pt-6 border-t border-stone-800">
                      <a
                        href={meal.strSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-stone-500 hover:text-amber-400 transition-colors"
                      >
                        View original source →
                      </a>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

