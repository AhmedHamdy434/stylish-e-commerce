"use client";
import { useState } from "react";
import { useSearchProducts } from "../hooks/useSearchProducts";
import ProductCard from "./ProductCard";
import SearchSection from "./SearchSection";
import { useDebounce } from "@/hooks/useDebounce";
import { SortOption } from "@/firebase/firestore";
import Spinner from "@/components/atoms/Spinner";
import { useTranslations } from "next-intl";

const CardContainer = ({
  categoryI,
  sortI,
}: {
  categoryI: string;
  sortI: SortOption;
}) => {
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState<SortOption | undefined>(sortI);
  const [category, setCategory] = useState(categoryI);
  const debounceSearch = useDebounce(keyword);
  const { products, loading, error, fetchProducts, hasMore } =
    useSearchProducts({
      keyword: debounceSearch,
      category: category === "all" ? "" : category,
      sortBy,
      limitCount: debounceSearch?15:3,
    });
  const t = useTranslations("search");
  return (
    <>
      <SearchSection
        keyword={keyword}
        setKeyword={setKeyword}
        sortBy={sortBy}
        setSortBy={setSortBy}
        category={category}
        setCategory={setCategory}
      />
      <div className="grid mt-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {loading && <Spinner />}
      {error && <p className="text-red-500">{error}</p>}
      {hasMore && !loading && !debounceSearch && (
        <button
          className="mt-4 px-4 py-2 bg-primary block mx-auto text-white rounded-lg"
          onClick={() => {
            fetchProducts(false);
          }}
        >
          {t("more")}
        </button>
      )}
    </>
  );
};

export default CardContainer;
