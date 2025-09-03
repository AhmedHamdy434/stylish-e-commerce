import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addToFavorites,
  getFavoriteProducts,
  isInFavorites,
  removeFromFavorites,
} from "@/firebase/dbFunctions";
import toast from "react-hot-toast";
import { ProductType } from "@/firebase/firestore";
import { useTranslations } from "next-intl";

export function useGetWishList(userId?: string) {
  return useQuery<ProductType[] | null>({
    queryKey: ["wishlist", userId],
    queryFn: () => getFavoriteProducts(userId),
    placeholderData: keepPreviousData,
  });
}

export function useIsInWishList(productId: string) {
  return useQuery<boolean>({
    queryKey: ["isInWishlist", productId],
    queryFn: () => isInFavorites(productId),
    placeholderData: keepPreviousData,
  });
}

export const useAddToWishlist = (productId: string) => {
  const t = useTranslations("wishlist");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => addToFavorites(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isInWishlist", productId] });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(t("added"));
    },
    onError: () => {
      toast.error(t("toastError"));
    },
  });
};

export const useRemoveFromWishlist = (productId: string) => {
  const queryClient = useQueryClient();
  const t = useTranslations("wishlist");
  return useMutation({
    mutationFn: () => removeFromFavorites(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isInWishlist", productId] });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(t("removed"));
    },
    onError: () => {
      toast.error(t("toastError"));
    },
  });
};
