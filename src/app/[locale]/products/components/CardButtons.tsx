"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import AddToCartBtn from "./AddToCartBtn";

const CardButtons = ({ id, size }: { id: string; size: string;}) => {
  const t = useTranslations("search.card");
  return (
    <div className="mt-4 flex items-center gap-3">
      <AddToCartBtn  id={id} size={size} />
      <Link
        href={`/products/${id}`}
        className="rounded-lg border px-2 py-2 text-sm font-medium hover:text-primary hover:underline border-border"
      >
        {t("details")}
      </Link>
    </div>
  );
};

export default CardButtons;
