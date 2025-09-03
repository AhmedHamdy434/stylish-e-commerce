"use client";

import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/atoms/Spinner";
import { useGetCart } from "../hooks/useCart";
import CartCard from "./CartCard";
import { Toaster } from "react-hot-toast";

const CartContainer = () => {
  const { user, loading } = useAuth();
  const userId = user?.uid;

  const { data, isLoading, isError, isFetching, refetch } = useGetCart(userId);

  if (isLoading || loading) return <Spinner />;

  if (!userId)
    return (
      <div className="flex h-full justify-center items-center">
        <p className="text-primary">You should sign in to view cart</p>
      </div>
    );
  if (isError)
    return (
      <div className="p-6">
        <p className="text-red-500">Failed to load cart. Please try again.</p>
        <button onClick={() => refetch} className="mt-3 underline">
          {isFetching ? "Loading..." : "Retry"}
        </button>
      </div>
    );
  if (!data || data.length === 0) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-medium mb-2">Your Cart</h3>
        <p>Your cart is empty.</p>
      </div>
    );
  }
  return (
    <div className="">
      <Toaster />
      <h3>Your Cart</h3>
      <div className="space-y-4">
        {data.map((product) => (
          <CartCard key={product.product.id} cart={product} />
        ))}
      </div>
    </div>
  );
};

export default CartContainer;
