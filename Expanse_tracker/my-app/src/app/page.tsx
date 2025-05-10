"use client";
import Expense from "@/types/expense";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  
  // Create refs instead of state for the inputs
  const expenseNameRef = useRef<HTMLInputElement>(null);
  const expenseCostRef = useRef<HTMLInputElement>(null);

  type Items = typeof expenses;
  type Item = Items[number] & {
    index: number;
  };

  const addExpense = () => {
    // Get values from refs only when button is pressed
    const name = expenseNameRef.current?.value;
    const cost = expenseCostRef.current?.value;

    if (cost && name) {
      setExpenses((prevExpenses) => [
        ...prevExpenses,
        {
          id: Date.now(),
          name: name,
          cost: Number(cost)
        },
      ]);
      setTotalCost((prevExpenseCost) => prevExpenseCost + Number(cost));
      
      // Clear inputs
      if (expenseNameRef.current) expenseNameRef.current.value = '';
      if (expenseCostRef.current) expenseCostRef.current.value = '';
    }
  };

  const removeExpense = (index: number) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
    setTotalCost((prevExpenseCost) => prevExpenseCost - Number(expenses[index].cost));
  };

  const ExpenseCard = ({ name, cost, index }: Item) => {
    const [isNew, setIsNew] = useState(true); // Start as true
    const [isRemoving, setIsRemoving] = useState(false);


    useEffect(() => {
      // After animation duration (500ms), set isNew to false
      const timer = setTimeout(() => {
        setIsNew(false);
      }, 500); 

      return () => clearTimeout(timer); // Cleanup
    }, []); // Empty dependency array - runs once when component mounts

    return (
      <div
        className={`flex flex-row w-fit items-start justify-between min-w-70 p-4 m-2  border border-red-300 rounded-3xl hover:scale-103 transition-transform  bg-teal-950 hover:bg-amber-900 ${
          isNew ? "animate-fade-in" : ""
        } ${isRemoving ? "animate-fade-out" : ""}`}
      >
        <div>
          <h1 className="font-bold">{name}</h1>
          <p>ISK {cost}</p>
        </div>
        <div
          onClick={() => {
            setIsRemoving(true);
            setTimeout(() => removeExpense(index), 700);
          }}
          className="box-border border-2 rounded-r-2xl border-b-emerald-700 p-2  hover:text-red-500 cursor-pointer"
        >
          <p className="font-extrabold text-lg hover:scale-103">❎</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col relative h-screen overflow-auto justify-center items-center space-x-5 w-[100%] md:flex md:flex-row md:ml-10 mt-10 md:p-10 p-4">
      <div className="flex flex-col gap-4 sticky top-0">
        <h1 className=" font-bold text-3xl">ADD EPXENSE</h1>
        <label htmlFor="expenseName">Expanse name</label>
        <input
          name="expenseName"
          ref={expenseNameRef}
          type="text"
          className="border border-amber-200 rounded-2xl p-2"
        />

        <label htmlFor="expenseCost">Cost</label>
        <input
          name="expenseCost"
          ref={expenseCostRef}
          type="number"
          className="border border-amber-200 rounded-2xl p-2"
        />
        <button
          onClick={addExpense}
          className="p-4 border border-amber-400 rounded-2xl cursor-pointer hover:bg-emerald-600 hover:scale-103 transition-transform"
        >
          ADD
        </button>
        <Link href={"/test"}>link to test page</Link>
        <h1 className="font-bold text-3xl">TOTAL</h1>
        <h1 className="font-bold text-3xl text-emerald-500">{totalCost}</h1>
      </div>
      <div className="flex flex-col gap-2 rounded-3xl m-2">
        {expenses.map((expense, index) => {
          return <ExpenseCard {...expense} index={index} key={expense.id} />;
        })}
      </div>
    </div>
  );
}
