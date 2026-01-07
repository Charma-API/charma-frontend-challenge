'use client';

import { useState, useEffect, useCallback } from 'react';
import { Meal } from '@/types/recipe';

const FAVORITES_KEY = 'recipe-finder-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((meal: Meal) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.idMeal === meal.idMeal)) {
        return prev;
      }
      return [...prev, meal];
    });
  }, []);

  const removeFavorite = useCallback((mealId: string) => {
    setFavorites((prev) => prev.filter((m) => m.idMeal !== mealId));
  }, []);

  const toggleFavorite = useCallback((meal: Meal) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.idMeal === meal.idMeal)) {
        return prev.filter((m) => m.idMeal !== meal.idMeal);
      }
      return [...prev, meal];
    });
  }, []);

  const isFavorite = useCallback(
    (mealId: string) => {
      return favorites.some((m) => m.idMeal === mealId);
    },
    [favorites]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    isLoaded,
  };
}

