export type OrderData = {
  id: number;
  email: string;
  count: number;
  date: Date;
  drinks: {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    [key: `strIngredient${number}`]: string | null;
    strIngredients: string[];
    quantity: number;
  }[];
  dish: {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    price: number;
  };
};
