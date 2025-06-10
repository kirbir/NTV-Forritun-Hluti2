"use client";
import type { Cocktails } from "@/types/types";
import api from "@/api/api";
import { useCallback, useContext, useEffect, useState, useMemo, useRef } from "react";
import { useOrder } from "@/providers";
import { OrderContext } from "@/providers";
import SelectionIcon from "../ui/icons/selection-icon";
import Image from "next/image";

type SelectedCocktail = {
  quantity: number;
  isSelected: boolean;
};

const SelectCocktails = () => {
  const { searchValue, searchIngredient } = useOrder();
  const [cocktails, setCocktails] = useState<Cocktails[] | null>([]);
  const [selectedCocktails, setSelectedCocktails] = useState<
    Record<string, SelectedCocktail>
  >({});
  const { currentOrder, setCurrentOrder } = useContext(OrderContext)!;
  const cocktailsRef = useRef<HTMLDivElement>(null);
  

  const randomPrice = useMemo(() => Math.floor(Math.random() * (50 - 10 + 1)) + 10, []);

  const updateOrderWithDrinks = useCallback(
    (updatedSelectedCocktails: Record<string, SelectedCocktail>) => {
      if (!currentOrder) return;

      const selectedDrinks = Object.entries(updatedSelectedCocktails)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value.isSelected)
        .map(([id, value]) => {
          const cocktail = cocktails?.find((c) => c.idDrink === id);
          if (!cocktail) return null;

          return {
            idDrink: cocktail.idDrink,
            strDrink: cocktail.strDrink,
            strDrinkThumb: cocktail.strDrinkThumb,
            strIngredients: [],
            quantity: value.quantity,
            price: randomPrice
          };
        })
        .filter((drink): drink is NonNullable<typeof drink> => drink !== null);

      // Only update if the drinks array has actually changed
      const drinksChanged =
        JSON.stringify(currentOrder.drinks) !== JSON.stringify(selectedDrinks);

      if (drinksChanged) {
        setCurrentOrder({
          ...currentOrder,
          drinks: selectedDrinks,
        });
      }
    },
    [currentOrder, cocktails, setCurrentOrder, randomPrice]
  );

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

  useEffect(() => {
    // Initialize selectedCocktails from existing order drinks
    if (currentOrder?.drinks && currentOrder.drinks.length > 0 && cocktails) {
      const initialSelectedCocktails: Record<string, SelectedCocktail> = {};

      currentOrder.drinks.forEach((drink) => {
        initialSelectedCocktails[drink.idDrink] = {
          quantity: drink.quantity,
          isSelected: true,
        };
      });

      setSelectedCocktails(initialSelectedCocktails);
    }
  }, [currentOrder?.drinks, cocktails]); // Run when order drinks or cocktails change

  const handleCocktailSelect = useCallback((cocktail: Cocktails) => {
    setSelectedCocktails((prev) => {
      const updated = {
        ...prev,
        [cocktail.idDrink]: {
          quantity: prev[cocktail.idDrink]?.quantity || 1,
          isSelected: !prev[cocktail.idDrink]?.isSelected,
        },
      };
      return updated;
    });
  }, []);

  useEffect(() => {
    if (Object.keys(selectedCocktails).length > 0) {
      updateOrderWithDrinks(selectedCocktails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCocktails]);

  const searchValues = useMemo(
    () => ({
      name: searchValue.toLowerCase(),
      ingredient: searchIngredient.toLowerCase(),
    }),
    [searchValue, searchIngredient]
  );

  const filterCocktails = useMemo(() => {
    return (
      cocktails?.filter((cocktail) => {
        // Filter by drink name
        const nameMatch =
          searchValues.name === "" ||
          cocktail.strDrink.toLowerCase().includes(searchValues.name);

        // Filter by ingredient
        const ingredientMatch =
          searchValues.ingredient === "" ||
          Array.from(
            { length: 15 },
            (_, i) => cocktail[`strIngredient${i + 1}`]
          ).some((ingredient) =>
            ingredient?.toLowerCase().includes(searchValues.ingredient)
          );

        return nameMatch && ingredientMatch;
      }) ?? []
    );
  }, [cocktails, searchValues]);

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
      return updated;
    });
  };

  // Add this helper function to highlight matching text
  const highlightMatch = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={cocktailsRef} className="grid grid-cols-2 gap-4">
      {filterCocktails?.map((cocktail) => (
        <div
          key={cocktail.idDrink}
          className="cocktail-card flex flex-col items-center w-full h-[400px] border border-gray-300 bg-white/40 backdrop-blur-2xl rounded-lg shadow-md p-2 shadow-black/20"
        >
          <Image
            className="w-full h-64 object-cover rounded-lg flex-shrink-0"
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            height={300}
            width={300}
          />
          <p className="mt-2 text-md font-semibold text-center line-clamp-2">
            {highlightMatch(cocktail.strDrink, searchValue)}
          </p>
          <div className="w-full flex-1 overflow-hidden">
            <div className="text-sm text-gray-600 line-clamp-3">
              {Array.from(
                { length: 15 },
                (_, i) =>
                  cocktail[`strIngredient${i + 1}`] && (
                    <span key={i}>
                      {highlightMatch(
                        cocktail[`strIngredient${i + 1}`] || "",
                        searchIngredient
                      )}
                      {i < 14 && cocktail[`strIngredient${i + 2}`] ? ", " : ""}
                    </span>
                  )
              )}
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-between mt-4 gap-2">
            {/* Quantity Input - Now above the selection button */}
            {selectedCocktails[cocktail.idDrink]?.isSelected && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      cocktail.idDrink,
                      (selectedCocktails[cocktail.idDrink]?.quantity || 1) - 1
                    )
                  }
                  className="px-2 py-1 rounded hover:bg-gray-100/50"
                >
                  ◀️
                </button>
                <span className="w-8 text-center">
                  {selectedCocktails[cocktail.idDrink]?.quantity || 1}
                </span>
                <button
                  onClick={() =>
                    handleQuantityChange(
                      cocktail.idDrink,
                      (selectedCocktails[cocktail.idDrink]?.quantity || 1) + 1
                    )
                  }
                  className="px-2 py-1 rounded hover:bg-gray-100/50"
                >
                  ▶️
                </button>
              </div>
            )}

            {/* Selection Icon */}
            <button
              onClick={() => handleCocktailSelect(cocktail)}
              className={
                selectedCocktails[cocktail.idDrink]?.isSelected
                  ? "bg-red-900 p-2 rounded-sm w-full flex items-center justify-center"
                  : "bg-button-primary w-full p-2 rounded-sm flex items-center justify-center"
              }
            >
              <SelectionIcon
                isSelected={selectedCocktails[cocktail.idDrink]?.isSelected}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectCocktails;
