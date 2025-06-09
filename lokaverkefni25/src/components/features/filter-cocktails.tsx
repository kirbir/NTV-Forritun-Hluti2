import { useOrder } from "../../app/providers";

const FilterCocktails = () => {
  const { searchValue, setSearchValue, searchIngredient, setSearchIngredient } =
    useOrder();
  return (
    <div className="flex flex-col gap-2">
      <details className="group">
        <summary className="flex items-center gap-2 cursor-pointer hover:text-[#d06656] transition-colors duration-200">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="group-open:rotate-180 transition-transform duration-200"
          >
            <path d="M3 4h18M3 12h18M3 20h18" />
          </svg>
          <span className="font-semibold">Filter</span>
        </summary>
        <div className="mt-4 space-y-4">
          <div className="flex flex-row relative gap-2">
            <p className="font-bold">Filter by name: </p>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter a drink name..."
              className="border grow border-gray-600 rounded-lg outline-none px-2 py-1"
              type="text"
              id="drinkSearchInput"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-700 hover:text-blue-500 hover:bg-transparent rounded">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
          <div className="flex flex-row relative gap-2">
            <p className="font-bold px-[2px]">By ingredient: </p>
            <input
              value={searchIngredient}
              onChange={(e) => setSearchIngredient(e.target.value)}
              placeholder="Enter an ingredient..."
              className="border grow border-gray-600 rounded-lg outline-none px-2 py-1"
              type="text"
              id="drinkSearchIngredientInput"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-700 hover:text-blue-500 hover:bg-transparent rounded">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>
      </details>
    </div>
  );
};

export default FilterCocktails;
