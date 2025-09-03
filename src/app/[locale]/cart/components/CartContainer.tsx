"use client";

import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/atoms/Spinner";
import { useGetCart } from "../hooks/useCart";
import CartCard from "./CartCard";
import { Toaster } from "react-hot-toast";
import OrderSummary from "./OrderSummary";
import { useTranslations } from "next-intl";

const CartContainer = () => {
  const t = useTranslations("cart");
  const { user, loading } = useAuth();
  const userId = user?.uid;

  const { data, isLoading, isError, isFetching, refetch } = useGetCart(userId);

  if (isLoading || loading) return <Spinner />;
  if (!userId)
    return (
      <div className="flex h-full justify-center items-center">
        <p className="text-primary">{t("signIn")}</p>
      </div>
    );
  if (isError)
    return (
      <div className="p-6">
        <p className="text-destructive">{t("error")}</p>
        <button onClick={() => refetch} className="mt-3 underline">
          {isFetching ? t("loading") : t("retry")}
        </button>
      </div>
    );
  if (!data || data.length === 0) {
    return (
      <div className="p-6 pt-30 text-center">
        <h3 className="text-xl font-medium mb-4">{t("head")}</h3>
        <p>{t("empty")}</p>
      </div>
    );
  }
  return (
    <>
      <Toaster />
      <h3 className="text-3xl text-primary mb-4">{t("head")}</h3>
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 lg:gap-20">
        <div className="flex-1 max-w-250 space-y-4">
          {data.map((product) => (
            <CartCard key={product.product.id} cart={product} />
          ))}
        </div>
        <OrderSummary />
      </div>
    </>
  );
};

export default CartContainer;
