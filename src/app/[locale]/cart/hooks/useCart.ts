import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  CartItemWithProduct,
  getCartWithProducts,
} from "@/firebase/dbFunctions";

export function useGetCart(userId?: string) {
  return useQuery<CartItemWithProduct[]>({
    queryKey: ["cart", userId],
    queryFn: () => getCartWithProducts(userId),
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });
}
