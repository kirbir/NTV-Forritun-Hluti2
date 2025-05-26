const ConfirmOrder = () => {
    return (
        <div>
            <div>How many guests?</div>
            <input 
                type="number"
                min="1"
                max="10"
                defaultValue="1"
                className="border border-red-300 p-2 rounded"
                placeholder="Enter number of guests"
            />
        </div>
    )
}

export default ConfirmOrder;


