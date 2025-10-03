import React from "react";
import Image from "next/image";
import { productType } from "../types/data";
import { formatePrice } from "../utils";
import { useOrder } from "../hooks/useOrder";

const ProductCard = ({ data }: { data: productType[] }) => {
  const { ordersQuery, createOrder, destroyOrder } = useOrder();
  const orders = ordersQuery.data || [];

  const handleOrder = async (product: productType) => {
    try {
      await createOrder.mutateAsync({
        product_id: product.id,
        total: product.price,
        status: "pending",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (orderId: string) => {
    try {
      await destroyOrder.mutateAsync(orderId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {data.map((product) => {
        const orderInCart = orders.find(
          (o) => o.product_id === product.id && o.status === "pending"
        );

        return (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="relative w-full h-56">
              <Image
                src={product.image as string}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 flex flex-col justify-between h-56">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3">
                  {product.description}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-indigo-600">
                  {formatePrice(product.price)}
                </span>
                {orderInCart ? (
                  <button
                    onClick={() => handleDelete(orderInCart.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => handleOrder(product)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
