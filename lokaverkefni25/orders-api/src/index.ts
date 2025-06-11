import express, { type Express, type Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import type { OrderData } from "./types";

// Initialize default orders and id
let nextId = 2;
let orders: OrderData[] = [
  {
    id: 1,
    email: "gunnsteinnskula@gmail.com",
    count: 5,
    date: new Date("2025-06-10T00:00:00.000Z"),
    drinks: [
      {
        idDrink: "11019",
        strDrink: "Alfie Cocktail",
        strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/ypxsqy1483387829.jpg",
        strIngredients: [],
        quantity: 3,
        price: 10
      },
      {
        idDrink: "17834",
        strDrink: "Abbey Cocktail",
        strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/mr30ob1582479875.jpg",
        strIngredients: [],
        quantity: 3,
        price: 10
      }
    ],
    dish: {
      id: "52954",
      name: "Hot and Sour Soup",
      category: "Pork",
      description: "STEP 1 - MAKING THE SOUP\r\nIn a wok add chicken broth and wait for it to boil.\r\nNext add salt, sugar, sesame seed oil, white pepper, hot pepper sauce, vinegar and soy sauce and stir for few seconds.\r\nAdd Tofu, mushrooms, black wood ear mushrooms to the wok.\r\nTo thicken the sauce, whisk together 1 Tablespoon of cornstarch and 2 Tablespoon of water in a bowl and slowly add to your soup until it's the right thickness.\r\nNext add 1 egg slightly beaten with a knife or fork and add it to the soup and stir for 8 seconds\r\nServe the soup in a bowl and add the bbq pork and sliced green onions on top.",
      imageSource: "https://www.themealdb.com/images/media/meals/1529445893.jpg",
      price: 27,
      area: "Chinese"
    }
  }
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
    response: order
  });
});

// PUT endpoint to update orders
api.put("/api/update-order", (req: Request<OrderData>, res) => {
  console.log("Update order request received: ", orders);
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
  orders = orders.map((o) => {
    if (o.email === req.body.email) {
      return req.body;
    }
    return o;
  });

  console.log("orders state after update: ", orders);
  return res.json({
    success: true,
    response: orders
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
api.delete("/api/order/id/:id", (req, res) => {
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
api.delete("/api/order/email/:email", (req, res) => {
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
      error: `Could not find order with email=${paramEmail}`,
    });
  }
});

api.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
