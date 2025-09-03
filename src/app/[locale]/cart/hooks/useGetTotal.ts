import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCartTotalPrice } from "@/firebase/dbFunctions";

export function useGetTotals(userId?:string) {
  return useQuery<number>({
    queryKey: ["cartTotal",userId],
    queryFn: () => getCartTotalPrice(userId),
    placeholderData: keepPreviousData,
  });
}
