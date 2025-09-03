"use client";

import { useTranslations } from "next-intl";
import { useIsInCart } from "../hooks/useCartItem";
import toast, { Toaster } from "react-hot-toast";
import {
  useAddCounter,
  useRemoveCounter,
} from "../../cart/hooks/useCartAction";
import { useAuth } from "@/context/AuthContext";

const AddToCartBtn = ({
  id,
  size,
  customClassName,
}: {
  id: string;
  size: string;
  customClassName?: string;
}) => {
  const t = useTranslations("search.card");
  const { user, loading } = useAuth();
  const userId = user?.uid;
  const { data: inCart, isLoading } = useIsInCart(id, userId);
  const { mutateAsync: add, isPending: addPending } = useAddCounter(id);
  const { mutateAsync: remove, isPending: decreasePending } =
    useRemoveCounter(id);

  const handleClick = async () => {
    if (!userId) {
      toast.error(t("toastsign"));
      return;
    }
    try {
      if (inCart) {
        await remove();
      } else {
        await add(size);
      }
      toast.success(inCart ? t("toastremove") : t("toastadd"));
    } catch {
      toast.error(t("toasterror"));
    }
  };
  return (
    <>
      <Toaster />
      <button
        type="button"
        disabled={addPending || decreasePending}
        className={`flex-1 truncate whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-95 disabled:opacity-60 ${customClassName}
      ${inCart ? "bg-blue-500" : "bg-primary"}`}
        data-action="add-to-cart"
        onClick={handleClick}
      >
        {!isLoading && !loading && inCart ? t("cartremove") : t("cart")}
      </button>
    </>
  );
};

export default AddToCartBtn;
