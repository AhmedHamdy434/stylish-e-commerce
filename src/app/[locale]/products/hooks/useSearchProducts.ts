"use client";

import { useEffect, useState } from "react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { ProductType, searchFilterSortProducts, SortOption } from "@/firebase/firestore";

interface UseProductsParams {
  keyword?: string;
  category?: string;
  sortBy?: SortOption;
  limitCount?: number;
}

export function useSearchProducts({ keyword = "", category = "", sortBy, limitCount = 10 }: UseProductsParams) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (reset = false) => {
    setLoading(true);
    setError(null);

    try {
      const { products: fetched, lastDoc: newLastDoc } = await searchFilterSortProducts({
        keyword,
        category,
        sortBy,
        limitCount,
        lastDoc: reset ? null : lastDoc,
      });

      if (reset) {
        setProducts(fetched);
      } else {
        setProducts((prev) => [...prev, ...fetched]);
      }

      setLastDoc(newLastDoc);
      setHasMore(!!newLastDoc);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial + refresh when filters change
  useEffect(() => {
    setProducts([]);
    setLastDoc(null);
    fetchProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, category, sortBy, limitCount]);

  return { products, loading, error, fetchProducts, hasMore };
}
