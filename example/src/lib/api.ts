import {
  Meal,
  MealSummary,
  Category,
  MealsResponse,
  MealsSummaryResponse,
  CategoriesResponse,
} from '@/types/recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

class MealDBApi {
  private async fetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    return response.json();
  }

  // Search meal by name
  async searchByName(query: string): Promise<Meal[]> {
    const data = await this.fetch<MealsResponse>(`/search.php?s=${encodeURIComponent(query)}`);
    return data.meals || [];
  }

  // List all meals by first letter
  async listByFirstLetter(letter: string): Promise<Meal[]> {
    const data = await this.fetch<MealsResponse>(`/search.php?f=${letter}`);
    return data.meals || [];
  }

  // Lookup full meal details by id
  async getMealById(id: string): Promise<Meal | null> {
    const data = await this.fetch<MealsResponse>(`/lookup.php?i=${id}`);
    return data.meals?.[0] || null;
  }

  // Lookup a random meal
  async getRandomMeal(): Promise<Meal | null> {
    const data = await this.fetch<MealsResponse>('/random.php');
    return data.meals?.[0] || null;
  }

  // List all meal categories
  async getCategories(): Promise<Category[]> {
    const data = await this.fetch<CategoriesResponse>('/categories.php');
    return data.categories || [];
  }

  // Filter by category
  async filterByCategory(category: string): Promise<MealSummary[]> {
    const data = await this.fetch<MealsSummaryResponse>(`/filter.php?c=${encodeURIComponent(category)}`);
    return data.meals || [];
  }

  // Filter by area/cuisine
  async filterByArea(area: string): Promise<MealSummary[]> {
    const data = await this.fetch<MealsSummaryResponse>(`/filter.php?a=${encodeURIComponent(area)}`);
    return data.meals || [];
  }
}

export const mealApi = new MealDBApi();

