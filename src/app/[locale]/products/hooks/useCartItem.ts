import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {  isInCart } from "@/firebase/dbFunctions";

export function useIsInCart(productId: string,userId?:string) {
  return useQuery<boolean>({
    queryKey: ["cartButton",userId, productId],
    queryFn: () => isInCart(productId,userId),
    placeholderData: keepPreviousData,
  });
}
