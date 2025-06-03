
// Order types
export type Order = {
  id: number;
  email: string;
  count: number;
  date: Date;
  drinks: Cocktails[];
  dish: {
    id:string,
    name:string,
    category:string,
    description:string,
    imageSource:string,
    price:0,
    area:string,
  };
};

// API response types (for external APIs)
export type Dish = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
};
export type Cocktails = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  [key: `strIngredient${number}`]: string | null;
  strIngredients: string[];
  quantity:number;
};
