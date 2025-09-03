import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCartItemSize } from "@/firebase/dbFunctions";

export function useGetSize(productId: string) {
  return useQuery<string | null>({
    queryKey: ["cartProductSize", productId],
    queryFn: () => getCartItemSize(productId),
    placeholderData: keepPreviousData,
  });
}
