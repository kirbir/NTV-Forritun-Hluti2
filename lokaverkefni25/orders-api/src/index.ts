import express, { type Express, type Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import type { OrderData } from "./types";

// Initialize default orders and id
let nextId = 2;
let orders: OrderData[] = [
  {
    id: 1,
    drinks: [
      {
        idDrink: "some-uuid",
        strDrink: "Gylltur",
        strDrinkThumb: "https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg",
        strIngredients: [],
        quantity: 1,
        strIngredient1: "beer",
        strIngredient2: "sugar",

      }
    ],
    email: "gunnsteinnskula@gmail.com",
    count: 10,
    date: new Date(),
    dish: {
      idMeal: "53051",
      strMeal: "Nasi lemak",
      strCategory: "seafood",
      strArea: "fuckery",
      strInstructions: "In a medium saucepan over medium heat...",
      strMealThumb: "https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg",
      price: 2500
    },
    
  },
];

// Initialize api
const api: Express = express();
api.use(cors());
api.use(express.json());
api.use(bodyParser.urlencoded({ extended: false }));
const port = 3001;

// GET endpoint to get all orders
api.get("/api/orders", (_, res) => {
  console.log("Getting orders:", orders);
  return res.json({
    success: true,
    response: orders,
  });
});

// Validation function for order - note that the object validation might not be entirely accurate and might need some modification
const isOrder = (
  body: OrderData | Record<string, unknown>
): body is OrderData => {
  if (
    "email" in body &&
    typeof body.email === "string" &&
    "count" in body &&
    typeof body.count === "number" &&
    "date" in body &&
    (body.date instanceof Date || typeof body.date === "string") && // Allow string dates
    "dish" in body &&
    typeof body.dish === "object" &&
    "drinks" in body &&
    Array.isArray(body.drinks)
  ) {
    return true;
  }
  return false;
};

// POST endpoint for creating an order
api.post("/api/create-order", (req: Request<OrderData>, res) => {
  const emailAlreadyTaken = () => {
    if (!req.body.email) {
      return false;
    }
    // Returns true if email exists, and the index is 0 or higher. Returns false if it cannot find the item, resulting in -1
    return orders.findIndex((order) => order.email === req.body.email) >= 0;
  };

  if (!isOrder(req.body)) {
    res.json({
      success: false,
      error: "Must supply all properties of an order",
    });
    console.log("Error in creating order");
    return;
  }

  if (emailAlreadyTaken()) {
    res.json({
      success: false,
      error: "Email already reserved",
    });
    return;
  }

  const order: OrderData = {
    ...req.body,
    id: nextId,
  };

  orders.push(order);
  nextId += 1;

  return res.json({
    success: true,
    order,
  });
});

// PUT endpoint to update orders
api.put("/api/update-order", (req: Request<OrderData>, res) => {
  const emailDoesNotExist = () => {
    if (!req.body.email) {
      return false;
    }
    // Returns true if email does not exist, and the index is lower than 0, resulting in -1
    return orders.findIndex((order) => order.email === req.body.email) < 0;
  };

  if (!isOrder(req.body)) {
    res.json({
      success: false,
      error: "Must supply all properties of an order",
    });
    return;
  }

  if (emailDoesNotExist()) {
    res.json({
      success: false,
      error: "Email does not exist, cannot update",
    });
    return;
  }

  // Map over each item, if the item has the same email as the email in the body, update the order with the new order changes
  orders.map((o) => {
    if (o.email === req.body.email) {
      return req.body;
    }
    return o;
  });

  return res.json({
    success: true,
    order: req.body,
  });
});

// GET endpoint to get order by email
api.get("/api/order/:email", (req, res) => {
  const order = orders.find((order) => order.email === req.params.email);
  if (order) {
    return res.json({
      success: true,
      response: order,
    });
  }

  res.json({
    success: false,
    error: `Could not find order with email: ${req.params.email}`,
  });
});

// DELETE endpoint to delete order by id
api.delete("/api/order/:id", (req, res) => {
  const orderId = Number.parseInt(req.params.id, 10);
  const order = orders.find((e) => e.id === orderId);
  if (order) {
    orders = orders.filter((e) => e.id !== orderId);
    res.json({
      success: true,
      deletedorder: order,
    });
  } else {
    res.json({
      success: false,
      error: `Could not find order with id=${orderId}`,
    });
  }
});

// DELETE endpoint to delete order by email
api.delete("/api/order/:email", (req, res) => {
  const paramEmail = req.params.email;
  const order = orders.find((e) => e.email === paramEmail);
  if (order) {
    orders = orders.filter((e) => e.email !== paramEmail);
    res.json({
      success: true,
      deletedorder: order,
    });
  } else {
    res.json({
      success: false,
      error: `Could not find order with id=${paramEmail}`,
    });
  }
});

api.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
