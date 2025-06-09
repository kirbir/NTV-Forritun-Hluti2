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
    price: number;
  }[];
  dish: {
    id: string;
    name: string;
    category: string;
    description: string;
    imageSource: string;
    area: string;
    price:number;
  };
};
