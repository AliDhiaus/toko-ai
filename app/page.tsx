"use client";

import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { useProduct } from "./hooks/useProduct";
import { ShoppingCartIcon } from "lucide-react";
import FilterControl from "./components/FilterControl";
import { useOrder } from "./hooks/useOrder";

export default function Home() {
  const { productsQuery } = useProduct();
  const { ordersQuery } = useOrder();

  const { data, isLoading } = productsQuery;
  const statusPending = ordersQuery.data?.filter(product => product.status === "pending"); ;
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <span className="text-gray-500 text-lg">Loading products...</span>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
        <p className="text-gray-500 mt-2">Explore our latest collection</p>
      </header>
      <div className="flex justify-between mb-4">
        <Link
          href="/cart"
          className="relative flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 bg-white text-indigo-600 rounded-full px-2 py-0.5 text-xs font-bold shadow-md">
            {statusPending?.length || 0}
          </span>
        </Link>
        <FilterControl />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ProductCard data={data || []} />
      </div>
    </div>
  );
}
