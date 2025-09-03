import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {  isInCart } from "@/firebase/dbFunctions";

export function useIsInCart(productId: string,userId?:string) {
  return useQuery<boolean>({
    queryKey: ["cartButton",userId, productId],
    queryFn: () => isInCart(productId,userId),
    placeholderData: keepPreviousData,
  });
}


// import { useEffect, useState, useCallback } from "react";
// import { addToCart, removeFromCart, isInCart } from "@/firebase/dbFunctions";
// import toast from "react-hot-toast";

// export function useCartItem(id: string, size: string) {
//   const [inCart, setInCart] = useState<boolean | null>(null);
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     let active = true;
//     (async () => {
//       try {
//         const exists = await isInCart(id);
//         if (active) setInCart(exists);
//       } catch {
//         if (active) setInCart(false);
//       }
//     })();
//     return () => {
//       active = false;
//     };
//   }, [id]);

//   const toggleCart = useCallback(async () => {
//     if (inCart === null || isSaving) return;

//     const prev = inCart;
//     const next = !prev;

//     setInCart(next);
//     setIsSaving(true);

//     try {
//       if (next) {
//         await addToCart(id, size);
//       } else {
//         await removeFromCart(id);
//       }
//     } catch (err) {
//       setInCart(prev);
//       throw err;
//     } finally {
//       setIsSaving(false);
//     }
//   }, [inCart, isSaving, id, size]);

//   const handleClick = async () => {
//     try {
//       await toggleCart();
//       toast.success(inCart ? "Removed from cart" : "Added to cart");
//     } catch {
//       toast.error("Failed to update cart. Please try again.");
//     }
//   };

//   return { inCart, isSaving, handleClick };
// }
