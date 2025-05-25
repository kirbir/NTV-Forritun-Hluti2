import ActionButton from "./ui/action-button";
import { useOrder } from "../app/providers";


const FilterCocktails = () => {
    const { searchValue, setSearchValue, searchIngredient,setSearchIngredient} = useOrder();
return (
    <div className="flex flex-col gap-2">
        <input  value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Enter a drink name..."className="border border-gray-600 rounded-lg outline-none" type="text" id="drinkSearchInput" />
        <input  value={searchIngredient} onChange={e => setSearchIngredient(e.target.value)} placeholder="Enter an ingredient..."className="border border-gray-600 rounded-lg outline-none" type="text" id="drinkSearchIngredientInput" />
        <ActionButton variant={'filter'} text="Search"/>
    </div>
)
}

export default FilterCocktails;