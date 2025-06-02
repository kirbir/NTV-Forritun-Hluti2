import { Dish, Order } from "@/types/types";

type RequestMethod = "POST" | "GET" | "DELETE" | "PUT";

type ServerResponse<T> =
  | {
      success: true;
      response: T;
    }
  | {
      success: false;
      error: string;
    };

type RequestParams<R extends RequestMethod> = R extends "GET"
  ? [url: string, method: R, body?: undefined]
  : [url: string, method: R, body?: Record<string, unknown>];

const requestResponse = async <T, R extends RequestMethod = RequestMethod>(
  ...args: RequestParams<R>
) => {
  const [url, method, body] = args;

  const response = await fetch(`http://localhost:3001${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status !== 200) {
    console.log("here");
    throw new Error(`Response status: ${response.status}`);
  }

  const json: ServerResponse<T> = await response.json();

  if (!json.success) {
    console.log("there");
    throw new Error(json.error);
  }

  return json;
};

const getRandomDish = async () => {
  const response = await fetch(
    "https://themealdb.com/api/json/v1/1/random.php"
  );
  const data = await response.json();
  return data.meals[0];
};

const getCocktails = async () => {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=cocktail"
  );
  const data = await response.json();
  return data.drinks;
};

const getOrders = async () => {
  const response = await requestResponse<Order[]>("/api/orders", "GET");
  console.log(response.response);
  return response.response;
};

const getOrderByEmail = async (email:string) => {
  const response = await requestResponse<Order>(
    `/api/order/${email}`,
    "GET"
  );
  return response.response;
};

const updateOrder = async (order: Order) => {
  const response = await requestResponse<Order[]>(
    "/api/update-order",
    "PUT",
    order
  );
  return response.response;
};

const createOrder = async ({ name, cost }: Pick<Order, "cost" | "name">) => {
  const response = await requestResponse<Order>("/api/create-order", "POST", {
    name,
    cost,
  });
  return response.response;
};

const getExpenseById = async (id: number) => {
  const response = await requestResponse<Order>(`/api/expense/${id}`, "GET");
  return response.response;
};

const deleteExpense = async (id: number) => {
  const response = await requestResponse<Order[]>(
    `/api/expense/${id}`,
    "DELETE"
  );
  return response.response;
};

const api = {
  getRandomDish,
  getCocktails,
  getOrders,
  getOrderByEmail,
  createOrder,
  getExpenseById,
  deleteExpense,
  updateOrder,
};

export default api;
