"use client";
import { useAuth } from "@/context/AuthContext";
import { useGetTotals } from "../hooks/useGetTotal";
import Order from "./Order";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const OrderSummary = () => {
    const t=useTranslations("cart.summary")
  const deliveryFee = 45;
  const { user } = useAuth();
  const userId = user?.uid;
  const { data } = useGetTotals(userId);
  const total = data ?? 0;
  return (
    <div className="border-2 shadow-2xl w-full md:max-w-100 space-y-5 p-3 rounded-2xl">
      <h4 className="font-semibold text-xl ">{t("head")}</h4>
      <Order title={t("subTotal")} number={total} />
      <Order title={t("delivery")} number={deliveryFee} />
      <hr />
      <Order title={t("total")} number={total + deliveryFee} isEnd />
      <Button className="w-full">{t("checkout")}</Button>
    </div>
  );
};

export default OrderSummary;
