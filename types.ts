export type FoodType = 'staple' | 'dish' | 'cold_dish' | 'soup' | 'drink';
export type Language = 'en' | 'zh';

export interface Ingredient {
  name: string;
  amount: string;
}

export interface FoodItem {
  id: string;
  name: string;
  type: FoodType;
  description: string;
  imageUrl: string;
  recipe: string; // Markdown content
  ingredients: Ingredient[];
  tags: string[];
}

export interface ShoppingListItem {
  name: string;
  amount: string;
  checked: boolean;
}

export interface SearchResultCandidate {
  title: string;
  snippet: string;
  sourceUrl: string;
  imageUrl?: string;
}