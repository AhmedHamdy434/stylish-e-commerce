// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { removeFromCart } from "@/firebase/dbFunctions";

// type Options = {
//   showToast?: boolean;
//   optimistic?: boolean;
//   onSuccess?: () => void;
//   onError?: (err: Error) => void;
// };

// export function useRemoveFromCart(
//   productId: string,
//   opts: Options = {}
// ) {
//   const { showToast = true } = opts;

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: async () => {
//       if (!productId) throw new Error("Invalid product id");
//       const promise = removeFromCart(productId);
//       if (!promise) throw new Error("Not signed in");
//       return promise;
//     },
//      onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cart","cartButton"] });
//       if (showToast) toast.success("Size updated");
//     },

//     onError: (err) => {
//       if (showToast)
//         toast.error((err as Error).message || "Failed to update size");
//     },
//   });


//   return {
//     isPending: mutation.isPending,
//     removeFromCart: mutation.mutate
//   };
// }
