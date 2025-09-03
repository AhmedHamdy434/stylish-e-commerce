"use client";

import { useAuth } from "@/context/AuthContext";
import ProductCard from "../../products/components/ProductCard";
import { useGetWishList } from "../../products/hooks/useWishList";
import Spinner from "@/components/atoms/Spinner";
import { useTranslations } from "next-intl";

const WishListContainer = () => {
  const t = useTranslations("wishlist");
  const { user, loading } = useAuth();
  const userId = user?.uid;
  const { data, isError, refetch, isFetching, isLoading } =
    useGetWishList(userId);
  if (isLoading || !data || loading) return <Spinner />;
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
  if (data && data.length === 0) {
    return (
      <div className="p-6 pt-30 text-center">
        <h3 className="text-xl font-medium mb-4">{t("head")}</h3>
        <p>{t("empty")}</p>
      </div>
    );
  }
  return (
    <div className="grid mt-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default WishListContainer;
