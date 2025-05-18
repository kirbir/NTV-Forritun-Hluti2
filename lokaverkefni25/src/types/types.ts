export type OrderData = {
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
}

// let orders: Order[] = [
//     {
//       id: 1,
//       drinks: [
//         {
//           brewer: "vifilfell",
//           category: "beer",
//           description: "tasty beer",
//           id: "some-uuid",
//           imageSource:
//             "https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg",
//           name: "Gylltur",
//           price: 2500,
//         },
//       ],
//       email: "gunnsteinnskula@gmail.com",
//       count: 10,
//       date: new Date(),
//       dish: {
//         id: "53051",
//         category: "seafood",
//         cousine: "Malaysian",
//         description:
//           "In a medium saucepan over medium heat, stir together coconut milk, water, ground ginger, ginger root, salt, bay leaf, and rice. Cover, and bring to a boil. Reduce heat, and simmer for 20 to 30 minutes, or until done.\r\n\r\n Step 2\r\nPlace eggs in a saucepan, and cover with cold water. Bring water to a boil, and immediately remove from heat. Cover, and let eggs stand in hot water for 10 to 12 minutes. Remove eggs from hot water, cool, peel and slice in half. Slice cucumber.\r\n\r\n Step 3\r\nMeanwhile, in a large skillet or wok, heat 1 cup vegetable oil over medium-high heat. Stir in peanuts and cook briefly, until lightly browned. Remove peanuts with a slotted spoon and place on paper towels to soak up excess grease. Return skillet to stove. Stir in the contents of one package anchovies; cook briefly, turning, until crisp. Remove with a slotted spoon and place on paper towels. Discard oil. Wipe out skillet.\r\n\r\n Step 4\r\nHeat 2 tablespoons oil in the skillet. Stir in the onion, garlic, and shallots; cook until fragrant, about 1 or 2 minutes. Mix in the chile paste, and cook for 10 minutes, stirring occasionally. If the chile paste is too dry, add a small amount of water. Stir in remaining anchovies; cook for 5 minutes. Stir in salt, sugar, and tamarind juice; simmer until sauce is thick, about 5 minutes.\r\n\r\n Step 5\r\nServe the onion and garlic sauce over the warm rice, and top with peanuts, fried anchovies, cucumbers, and eggs.",
//         imageSource:
//           "https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg",
//         name: "Nasi lemak",
//         price: 2500,
//       },
//     },
//   ];
