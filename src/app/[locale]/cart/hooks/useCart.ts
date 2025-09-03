import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  CartItemWithProduct,
  getCartWithProducts,
} from "@/firebase/dbFunctions";

export function useGetCart(userId?: string) {
  return useQuery<CartItemWithProduct[]>({
    queryKey: ["cart",userId],
    queryFn: () => getCartWithProducts(userId),
      enabled: !!userId,
    placeholderData: keepPreviousData,
  });
}

// import { useMemo } from "react";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { getCartItems } from "@/firebase/dbFunctions";
// import { getProductsByIds, ProductType } from "@/firebase/firestore";

// export type CartType = {
//   id: string;
//   quantity: number;
//   size: string | null;
// };
// export type CartItemWithProduct = {
//   cartItem: CartType;
//   product: ProductType;
// };

// export function useCart(userId?: string) {
//   const cartQuery = useQuery<CartType[]>({
//     queryKey: ["cart"],
//     queryFn:  () =>  getCartItems(),
//     enabled: !!userId,
//     placeholderData: keepPreviousData,
//   });
//   const ids = useMemo(
//     () => cartQuery.data?.map((c) => c.id) ?? [],
//     [cartQuery.data]
//   );
//   const productsAndItemsQuery = useQuery<CartItemWithProduct[]>(
//     {
//       queryKey: ["cart-products", ids],
//       queryFn: async () => {
//       if (ids.length === 0) return [] as CartItemWithProduct[];
//        const products = await getProductsByIds(ids);
//       const cart = cartQuery.data ?? [];

//       return cart
//         .map((ci) => {
//           const product = products.find((p) => p.id === ci.id);
//           if (!product) return null;
//           return { cartItem: ci, product } as CartItemWithProduct;
//         })
//         .filter(Boolean) as CartItemWithProduct[];

//       },
//       enabled: !!userId && ids.length > 0,
//       placeholderData: keepPreviousData,
//     }
//   );
//   const items = productsAndItemsQuery.data ?? [];

//   const loading = cartQuery.isLoading || productsAndItemsQuery.isLoading;
//   const error = cartQuery.error ?? productsAndItemsQuery.error ?? null;

//   const refresh = async () => {
//     await Promise.all([cartQuery.refetch(), productsAndItemsQuery.refetch()]);
//   };

//   return {
//     items,
//     loading,
//     error: error as Error | null,
//     refresh,
//   };
// }
