"use client";

import { useTranslations } from "next-intl";

const AddToCartBtn = ({
  id,
  customClassName,
}: {
  id: string;
  customClassName?: string;
}) => {
  const t = useTranslations("search.card");

  return (
    <button
      type="button"
      className={`flex-1 whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-95 disabled:opacity-60 ${customClassName}`}
      data-action="add-to-cart"
      data-product-id={id}
    >
      {t("cart")}
    </button>
  );
};

export default AddToCartBtn;
