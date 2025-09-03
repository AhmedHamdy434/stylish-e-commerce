import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCartItemQuantity } from "@/firebase/dbFunctions";

export function useGetQuantity(productId: string) {
  return useQuery<number>({
    queryKey: ["cartProductQuantity", productId],
    queryFn: () => getCartItemQuantity(productId),
    placeholderData: keepPreviousData,
  });
}
