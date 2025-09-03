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