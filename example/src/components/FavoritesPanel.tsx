'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Meal } from '@/types/recipe';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';

interface FavoritesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Meal[];
  onRemove: (mealId: string) => void;
  onSelectRecipe: (meal: Meal) => void;
}

export function FavoritesPanel({
  isOpen,
  onClose,
  favorites,
  onRemove,
  onSelectRecipe,
}: FavoritesPanelProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-stone-900 border-l border-stone-800/50 shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800/50">
                      <Dialog.Title className="flex items-center gap-3 text-xl font-semibold text-stone-100">
                        <HeartIcon className="w-6 h-6 text-rose-500" />
                        Favorites
                        <span className="ml-2 px-2.5 py-0.5 text-sm bg-stone-800 text-stone-400 rounded-full">
                          {favorites.length}
                        </span>
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-stone-400 hover:text-stone-200 
                                   hover:bg-stone-800 transition-all"
                      >
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                      {favorites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center px-4">
                          <div className="text-5xl mb-4">💔</div>
                          <h3 className="text-lg font-medium text-stone-300 mb-2">
                            No favorites yet
                          </h3>
                          <p className="text-stone-500 text-sm">
                            Start exploring recipes and save your favorites here!
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {favorites.map((meal, index) => (
                            <div
                              key={meal.idMeal}
                              className="group flex items-center gap-4 p-3 
                                         bg-stone-800/30 hover:bg-stone-800/60 
                                         rounded-xl border border-stone-800/50 hover:border-stone-700
                                         cursor-pointer transition-all duration-300
                                         animate-in slide-in-from-right"
                              style={{ animationDelay: `${index * 50}ms` }}
                              onClick={() => {
                                onSelectRecipe(meal);
                                onClose();
                              }}
                            >
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={meal.strMealThumb}
                                  alt={meal.strMeal}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-stone-200 font-medium truncate 
                                               group-hover:text-amber-400 transition-colors">
                                  {meal.strMeal}
                                </h4>
                                <p className="text-sm text-stone-500">{meal.strCategory}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRemove(meal.idMeal);
                                }}
                                className="p-2 rounded-lg text-stone-500 hover:text-rose-400 
                                           hover:bg-rose-500/10 transition-all opacity-0 
                                           group-hover:opacity-100"
                                aria-label="Remove from favorites"
                              >
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

