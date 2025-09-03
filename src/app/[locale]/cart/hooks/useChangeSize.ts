import { updateCartItemSize } from "@/firebase/dbFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useChangeSize = (id:string,) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newSize:string) => updateCartItemSize(id,newSize),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cartProductSize"] });
    },
  });
};