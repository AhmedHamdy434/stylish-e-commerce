import {
  addToCart,
  decreaseCartQuantity,
  removeFromCart,
} from "@/firebase/dbFunctions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCounter = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newSize: string) => addToCart(id, newSize),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProductQuantity", id] });
      queryClient.invalidateQueries({ queryKey: ["cartButton"] });
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] });
    },
  });
};
export const useDecreaseCounter = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => decreaseCartQuantity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProductQuantity", id] });
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] });
    },
  });
};
export const useRemoveCounter = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeFromCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartButton"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartTotal"] });
    },
  });
};
// "use client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addToCart, decreaseCartQuantity } from "@/firebase/dbFunctions";
// import toast from "react-hot-toast";

// export function useCartActions(productId:string) {
//   const queryClient = useQueryClient();

//   const addMutation = useMutation({
//     mutationFn: async ( size : string ) =>
//       await addToCart(productId, size),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cartProductQuantity"] });
//     },
//     onError:()=>{
//         toast.error("something wrong")
//     }
//   });

//   const decreaseMutation = useMutation({
//     mutationFn: async () => await decreaseCartQuantity(productId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cartProductQuantity"] });
//     },
//   });

//   return {
//     addToCart: addMutation.mutateAsync,
//     decreaseCartQuantity: decreaseMutation.mutateAsync,
//     isAdding: addMutation.isPending,
//     isDecreasing: decreaseMutation.isPending,
//     addError: addMutation.error as Error | null,
//     decreaseError: decreaseMutation.error as Error | null,
//   };
// }
