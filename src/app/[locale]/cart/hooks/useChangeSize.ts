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

// import { useState, useEffect } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { updateCartItemSize } from "@/firebase/dbFunctions";

// type Options = {
//   showToast?: boolean;
//   optimistic?: boolean;
//   onSuccess?: () => void;
//   onError?: (err: Error) => void;
// };

// export function useChangeSize(
//   productId: string,
//   initialSize: string | null,
//   opts: Options = {}
// ) {
//   const { showToast = false, optimistic = true } = opts;

//   const [size, setSize] = useState<string | null>(initialSize);
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     setSize(initialSize);
//   }, [initialSize]);

//   const mutation = useMutation({
//     mutationFn: async (newSize: string) => {
//       if (!productId) throw new Error("Invalid product id");
//       const promise = updateCartItemSize(productId, newSize);
//       if (!promise) throw new Error("Not signed in");
//       return promise;
//     },
//     onMutate: async (newSize: string) => {
//       if (!optimistic) return;

//       await queryClient.cancelQueries({ queryKey: ["cart"] });
//       const prevCart = queryClient.getQueryData(["cart"]);
//       setSize(newSize);
//       return { prevCart, prevSize: size };
//     },
//     onError: (err, newSize, context) => {
//       if (context?.prevSize) setSize(context.prevSize);
//       if (showToast)
//         toast.error((err as Error).message || "Failed to update size");
//     },
//   });

//   const updateSize = (newSize: string) => mutation.mutate(newSize);

//   return {
//     size,
//     isSaving: mutation.isPending,
//     updateSize,
//     setSizeLocal: setSize,
//   };
// }
