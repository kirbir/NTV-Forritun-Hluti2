import ActionButton from "./ui/action-button";

const FilterCocktails = () => {
return (
    <div className="flex flex-row gap-2">
        <input  placeholder="Enter a drink name..."className="border border-gray-600 rounded-lg outline-none" type="text" id="cocktail-name" />
        <ActionButton variant={'filter'} text="Search"/>
    </div>
)
}

export default FilterCocktails;