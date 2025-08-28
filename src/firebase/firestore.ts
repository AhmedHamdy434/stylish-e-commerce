import {
  collection,
  doc,
  query,
  orderBy,
  limit,
  getDocs,
  getDoc,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
} from "firebase/firestore";
import { db } from "./config";
export type ProductType = {
  id: string;
  description: string;
  details: string;
  mainImage: string;
  images: string[];
  category: string;
  newPrice: number;
  oldPrice: number;
  discount: number;
  rate: number;
  sizes: string[];
  title: string;
  views: number;
  sellerId: number;
  sellerName: string;
};
export type SortOption =
  | "priceAsc"
  | "priceDesc"
  | "discount"
  | "views"
  | "rate";

export const getProductById = async (id: string): Promise<ProductType> => {
  try {
    const productRef = doc(db, "products", id);
    const snapshot = await getDoc(productRef);
    if (!snapshot.exists()) {
      throw new Error("Product not found");
    }
    return snapshot.data() as ProductType;
  } catch {
    throw new Error("Product not found");
  }
};
export const getProductsByIds = async (
  ids: string[]
): Promise<ProductType[]> => {
  try {
    const productPromises = ids.map(async (id) => {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data() as ProductType;
      }
      return [];
    });

    const results = await Promise.all(productPromises);
    return results.filter(
      (product): product is ProductType => product !== null
    );
  } catch (error) {
    console.error("Error getting products by IDs:", error);
    return [];
  }
};

export const getMostViewed = async (n: number) => {
  const q = query(
    collection(db, "products"),
    orderBy("views", "desc"),
    limit(n)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data()) as ProductType[];
};

export const filterByCategory = async (category: string) => {
  const q = query(
    collection(db, "products"),
    where("category", "==", category)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};

export const getMostDiscount = async (n: number) => {
  const q = query(
    collection(db, "products"),
    orderBy("discount", "desc"),
    limit(n)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data()) as ProductType[];
};
interface SearchFilterSortParams {
  keyword?: string;
  category?: string;
  sortBy?: SortOption;
  limitCount?: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
}

export const searchFilterSortProducts = async ({
  keyword = "",
  category = "",
  sortBy,
  limitCount = 10,
  lastDoc = null,
}: SearchFilterSortParams): Promise<{
  products: ProductType[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const qRef = collection(db, "products");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const constraints: any[] = [];

    if (category) {
      constraints.push(where("category", "==", category));
    }

    if (sortBy === "priceAsc") constraints.push(orderBy("newPrice", "asc"));
    else if (sortBy === "priceDesc")
      constraints.push(orderBy("newPrice", "desc"));
    else if (sortBy === "discount")
      constraints.push(orderBy("discount", "desc"));
    else if (sortBy === "views") constraints.push(orderBy("views", "desc"));
    else if (sortBy === "rate") constraints.push(orderBy("rate", "desc"));

    constraints.push(limit(limitCount));

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    const snapshot = await getDocs(query(qRef, ...constraints));
    let products = snapshot.docs.map((doc) => ({
      ...(doc.data() as ProductType),
    }));

    // keyword filtering (after fetch because Firestore doesn't support `contains`)
    if (keyword) {
      const keywordLower = keyword.toLowerCase();
      products = products.filter((p) =>
        p.title.toLowerCase().includes(keywordLower)
      );
    }

    return {
      products,
      lastDoc: snapshot.docs.length
        ? snapshot.docs[snapshot.docs.length - 1]
        : null,
    };
  } catch (error) {
    console.error("Error in searchFilterSortProducts:", error);
    return { products: [], lastDoc: null };
  }
};
