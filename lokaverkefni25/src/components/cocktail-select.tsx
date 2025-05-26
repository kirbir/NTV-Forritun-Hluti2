import type { Cocktails } from "@/types/types";
import api from "@/api/api";
import { useCallback, useContext, useEffect, useState } from "react";
import { useOrder } from "../app/providers";
import SelectionIcon from "./ui/icons/selection-icon";
import { OrderContext } from "../app/providers";

type SelectedCocktail = {
  quantity: number;
  isSelected: boolean;
};

const CocktailSelect = () => {
  const { searchValue, setSearchValue, searchIngredient, setSearchIngredient } =
    useOrder();
  const [cocktails, setCocktails] = useState<Cocktails[] | null>([]);
  const [selectedCocktails, setSelectedCocktails] = useState<
    Record<string, SelectedCocktail>
  >({});
  const { currentOrder, setCurrentOrder } = useContext(OrderContext)!;

  const updateOrderWithDrinks = useCallback((
    updatedSelectedCocktails: Record<string, SelectedCocktail>
  ) => {
    if (!currentOrder) return;

    const selectedDrinks = Object.entries(updatedSelectedCocktails)
      .filter(([_, value]) => value.isSelected)
      .map(([id, value]) => {
        const cocktail = cocktails?.find((c) => c.idDrink === id);
        if (!cocktail) return null;

        return {
          id: cocktail.idDrink,
          name: cocktail.strDrink,
          imageSource: cocktail.strDrinkThumb,
          price: 0,
          quantity: value.quantity,
        };
      })
      .filter((drink): drink is NonNullable<typeof drink> => drink !== null);

    setCurrentOrder({
      ...currentOrder,
      drinks: selectedDrinks,
    });
      console.log("Complete order with dish and drinks:", {
      ...currentOrder,
      drinks: selectedDrinks
    });
    
  }, [currentOrder, cocktails, setCurrentOrder]);

  const getCocktails = useCallback(async () => {
    try {
      const cocktailsResponse = await api.getCocktails();
      setCocktails(cocktailsResponse);
    } catch (error) {
      console.error("Error in Cocktails API call: ", error);
      window.alert(error);
    }
  }, []);

  useEffect(() => {
    console.log("running useEffect for getCocktails");
    getCocktails();

  }, [getCocktails]);

  const handleCocktailSelect = useCallback((cocktail: Cocktails) => {
    setSelectedCocktails((prev) => {
      const updated = {
        ...prev,
        [cocktail.idDrink]: {
          quantity: prev[cocktail.idDrink]?.quantity || 1,
          isSelected: !prev[cocktail.idDrink]?.isSelected,
        },
      };
      updateOrderWithDrinks(updated);
      return updated;
    });
  }, [updateOrderWithDrinks]);

  const filterCocktails =
    cocktails?.filter((cocktail) => {
      // Name filter
      const nameMatch =
        searchValue === "" ||
        cocktail.strDrink.toLowerCase().includes(searchValue.toLowerCase());

      // Ingredient filter -
      const ingredientMatch =
        searchIngredient === "" ||
        Array.from(
          { length: 15 },
          (_, i) => cocktail[`strIngredient${i + 1}`]
        ).some((ingredient) =>
          ingredient?.toLowerCase().includes(searchIngredient.toLowerCase())
        );

      return nameMatch && ingredientMatch;
    }) ?? [];

  const handleQuantityChange = (cocktailId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setSelectedCocktails((prev) => {
      const updated = {
        ...prev,
        [cocktailId]: {
          ...prev[cocktailId],
          quantity: newQuantity,
        },
      };
      updateOrderWithDrinks(updated);
      return updated;
    });
  };

  return (
    <div>
      {cocktails && cocktails.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 pl-5">
          {filterCocktails?.map((cocktail) => (
            <div
              key={cocktail.idDrink}
              className="relative max-w-sm border border-gray-300 bg-white rounded-lg shadow-md p-4 shadow-black/20"
            >
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-sm font-semibold">
                {cocktail.strDrink}
              </h3>
              <div>
                  {Array.from(
                    { length: 15 },
                    (_, i) =>
                      cocktail[`strIngredient${i + 1}`] && (
                        <span className="font-light text-sm" key={i}>{cocktail[`strIngredient${i + 1}`]}</span>
                      )
                  )}
           
              </div>

              <div className="flex items-center justify-between mt-4">
                {/* Selection Icon on the left */}
                <button
                  onClick={() => handleCocktailSelect(cocktail)}
                  className="flex items-center"
                >
                  <SelectionIcon
                    isSelected={selectedCocktails[cocktail.idDrink]?.isSelected}
                  />
                </button>

                {/* Quantity Input*/}
                {selectedCocktails[cocktail.idDrink]?.isSelected && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          cocktail.idDrink,
                          (selectedCocktails[cocktail.idDrink]?.quantity || 1) -
                            1
                        )
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">
                      {selectedCocktails[cocktail.idDrink]?.quantity || 1}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          cocktail.idDrink,
                          (selectedCocktails[cocktail.idDrink]?.quantity || 1) +
                            1
                        )
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Cocktails...</div>
      )}
    </div>
  );
};

export default CocktailSelect;
