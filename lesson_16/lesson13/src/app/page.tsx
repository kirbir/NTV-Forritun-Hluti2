"use client";
import Products from "../../constants/products";
import { useState } from "react";

export default function Home() {
  const [products, setProducts] = useState(Products);
  type Items = typeof Products;
  type Item = Items[number] & {
    index: number;
    isVisible: boolean;
  };

  const removeFirstItem = () => {
    const productToRemove = products[0];
    productToRemove.isVisible = false;
    const newProducts = products.slice(1);
    setProducts([productToRemove, ...newProducts]);
    setTimeout(() => {
      setProducts(newProducts);
    }, 500);
  };

  const ItemCard = ({
    name,
    description,
    price,
    qtyRemaining,
    index,
    isVisible,
  }: Item) => {
    return (
      <div
        className={`border-1 p-5 m-4 w-2xl bg-blue-950 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${isVisible ? "motion-safe:animate-fade-in" : "motion-safe:animate-fade-out"}`}
        style={{
          animationFillMode: "both",
          animationDelay: `${isVisible ? index * 350 :  0}ms`,
        }}
      >
        <h1>{name}</h1>
        <p>{description}</p>
        <p>{qtyRemaining}</p>
        <p>{price}</p>
      </div>
    );
  };

  // type productDATA = typeof productsArray
  const [show, setShow] = useState(true);
  return (
    <div>
      <div className="flex gap-2 m-2 p-4">
        <button type="button" onClick={removeFirstItem}>
          Remove Item
        </button>
        <button type="button" onClick={() => setShow((s) => !s)}>
          Show
        </button>
      </div>

      {show && (
        <div className="flex flex-col space-y-2 justify-center items-center mt-10">
          {products.map((product, index) => {
            return <ItemCard {...product} key={product.id} index={index} />;
          })}
        </div>
      )}
    </div>
  );
}
