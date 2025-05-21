import type { Cocktails } from "@/types/types";
import api from "@/api/api";
import { useCallback, useEffect, useState } from "react";
import SelectionIcon from "./ui/icons/selection-icon";

type SelectedCocktail = {
  quantity: number;
  isSelected: boolean;
};

const CocktailSelect = () => {
  const [cocktails, setCocktails] = useState<Cocktails[] | null>([]);
  const [selectedCocktails, setSelectedCocktails] = useState<
    Record<string, SelectedCocktail>
  >({});

  const getCocktails = useCallback(async () => {
    try {
      const cocktailsResponse = await api.getCocktails();
      setCocktails(cocktailsResponse);
      console.log("Cocktails API Response:", cocktailsResponse);
    } catch (error) {
      console.error("Error in Cocktails API call: ", error);
      window.alert(error);
    }
  }, []);

  useEffect(() => {
    console.log("running useEffect for getCocktails");
    getCocktails();
  }, []);

  const handleCocktailSelect = (cocktail: Cocktails) => {
    setSelectedCocktails((prev) => ({
      ...prev,
      [cocktail.idDrink]: {
        quantity: prev[cocktail.idDrink]?.quantity || 1,
        isSelected: !prev[cocktail.idDrink]?.isSelected,
      },
    }));
  };

  const handleQuantityChange = (cocktailId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setSelectedCocktails((prev) => ({
      ...prev,
      [cocktailId]: {
        ...prev[cocktailId],
        quantity: newQuantity,
      },
    }));
  };

  return (
    <div>
      {cocktails && cocktails.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 pl-5">
          {cocktails.map((cocktail) => (
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
