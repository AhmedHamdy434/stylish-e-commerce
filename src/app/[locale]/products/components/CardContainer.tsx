"use client";
import { useState } from "react";
import { useSearchProducts } from "../hooks/useSearchProducts";
import ProductCard from "./ProductCard";
import SearchSection from "./SearchSection";
import { useDebounce } from "@/hooks/useDebounce";
import { SortOption } from "@/firebase/firestore";
import Spinner from "@/components/atoms/Spinner";

const CardContainer = () => {
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>();
  const [category, setCategory] = useState("");
  const debounceSearch = useDebounce(keyword);
  const { products, loading, error, fetchProducts, hasMore } =
    useSearchProducts({
      keyword: debounceSearch,
      category: category === "all" ? "" : category,
      sortBy,
      limitCount: 3,
    });
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
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {loading && <Spinner/>}
      {error && <p className="text-red-500">{error}</p>}
      {hasMore && !loading && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => fetchProducts(false)}
        >
          Load More
        </button>
      )}
    </>
  );
};

export default CardContainer;
