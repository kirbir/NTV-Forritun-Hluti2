"use client";
import api from "@/api/api";
import type { Expense } from "@/types/types";
import { useCallback, useEffect, useRef, useState } from "react";

const Home = () => {
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const expenseNameRef = useRef<HTMLInputElement>(null);
  const expenseCostRef = useRef<HTMLInputElement>(null);

  const generateId = () => {
    return Date.now() + Math.random().toString(36).substring(2, 9);
  };

  const postNewItem = async () => {
    if (!expenseNameRef.current || !expenseCostRef.current) return;

    const expenseName = expenseNameRef.current.value;
    const expenseCost = expenseCostRef.current.value;

    const NEXT_EXPENSE_ITEM: Expense = {
      id: Number(generateId),
      name: expenseName,
      cost: Number(expenseCost),
    };

    try {
      const newExpenseItem = await api.createExpense(NEXT_EXPENSE_ITEM);
      setExpenses((e) => {
        if (e) {
          return [...e, newExpenseItem];
        }
        return e;
      });
    } catch (error) {
      window.alert(error);
    }
  };

  const deleteExpense = async (expenseIndex: number) => {
    try {
      const newExpenses = await api.deleteExpense(expenseIndex);
      setExpenses(newExpenses);
    } catch (error) {
      window.alert(error);
    }
  };

  const getExpenses = useCallback(async () => {
    try {
      const expenseResponse = await api.getExpenses();
      setExpenses(expenseResponse);
    } catch (error) {
      window.alert(error);
    }
  }, []);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  if (!expenses) {
    return (
      <div className="p-20">
        <p>Expenses not found, something went wrong!</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center mt-20 bg-gray-50">
      <div className="w-md border border-gray-300 rounded-md bg-gray-50 p-5 drop-shadow-lg">
        <h1 className="font-bold text-3xl">Add new expense</h1>
        <form action="" className="flex flex-col space-y-2 mt-2">
          <input
            type="text"
            ref={expenseNameRef}
            name="expenseName"
            placeholder="Expense name"
            className="p-2 border border-gray-300 rounded-sm"
          />
          <label htmlFor="expenseName"></label>
          <input
            type="number"
            ref={expenseCostRef}
            name="expenseCost"
            placeholder="Cost"
            className="p-2 border border-gray-300 rounded-sm"
          />
          <label htmlFor="expenseCost"></label>
          <button
            onClick={postNewItem}
            className="bg-sky-700 text-gray-100 p-2 rounded-sm"
          >
            Add expense
          </button>
        </form>
      </div>

      <div className="h-10"></div>

      <div className="flex flex-col space-y-2 w-md border border-gray-300 rounded-md bg-gray-50 p-5 drop-shadow-lg">
        <h1 className="font-bold text-3xl">Your expenses</h1>
        {expenses.map((e, index) => (
          <div
            key={e.id}
            className="flex flex-row justify-between items-center p-2 border border-gray-300 rounded-md"
          >
            <div className="">
              <p className=" text-lg font-bold">
                {e.name}
                {` - `}
                <span className="text-lg font-light text-sky-400">
                  {"$"}
                  {e.cost
                    .toLocaleString(navigator.language, {
                      minimumFractionDigits: 0,
                      useGrouping: true,
                      style: "decimal",
                      maximumFractionDigits: 0,
                    })
                    .replace(/,/g, ".")}
                </span>
              </p>
            </div>
            <button
              key={index}
              className="border border-red-800 p-2 rounded-md text-red-600"
              onClick={() => {
                deleteExpense(e.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
