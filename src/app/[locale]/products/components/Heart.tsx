"use client";

import { useAuth } from "@/context/AuthContext";
import {
  useAddToWishlist,
  useIsInWishList,
  useRemoveFromWishlist,
} from "../hooks/useWishList";
import { HeartSVG } from "./HeartSVG";
type HeartPropsType = {
  id: string;
  position: string;
  color: string;
};
const Heart = ({ id, position, color }: HeartPropsType) => {
  const { user, loading } = useAuth();
  const userId = user?.uid;
  const { data } = useIsInWishList(id);
  const { mutateAsync: add, isPending: addLoading } = useAddToWishlist(id);
  const { mutateAsync: remove, isPending: removeLoading } =
    useRemoveFromWishlist(id);

  const isInWishList = data ?? false;
  const handleClick = async () => {
    if (isInWishList) await remove();
    else await add();
  };
  if (loading) return;
  return (
    <button
      disabled={!userId || addLoading || removeLoading}
      className={`${position} disabled:cursor-default!`}
      onClick={handleClick}
    >
      <HeartSVG
        className={`w-7 h-7  ${isInWishList ? "text-red-500" : color}`}
      />
    </button>
  );
};

export default Heart;
