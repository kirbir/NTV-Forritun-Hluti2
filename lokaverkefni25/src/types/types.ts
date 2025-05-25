export type Order = {
  id: number,
  email: string,
  count: number,
  date: Date,
  drinks: {
    brewer: string;
    category: string;
    description: string;
    id: string;
    imageSource: string;
    name: string;
    price: number;
  }[];

  dish: {
    id: number;
    category: string;
    cousine: string;
    description: string;
    imageSource: string;
    name: string;
    price: number;
  };
};

export type Dish = {
        idMeal: string;
        strMeal: string;
        strCategory: string;
        strArea: string;
        strInstructions: string;
        strMealThumb: string;
};

export type Cocktails = {
    idDrink: string,
    strDrink: string,
    strDrinkThumb: string
    [key: `strIngredient${number}`]: string | null;
    ingredients: string[];
}
