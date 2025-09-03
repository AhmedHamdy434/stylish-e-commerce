"use client";
import Image from "next/image";
import ChangeSize from "./ChangeSize";
import CartCounter from "./CartCounter";
import { CartItemWithProduct } from "@/firebase/dbFunctions";
import { useGetSize } from "../hooks/useGetSize";

const CartCard = ({ cart }: { cart: CartItemWithProduct }) => {
  const { product } = cart;
  const { mainImage, title, sizes, id, sellerName, newPrice } = product;
  const { data } = useGetSize(id);
  const currentSize = data ?? sizes[0];
  return (
    <div className="flex gap-4 sm:h-50 border-2 shadow-2xl p-3 rounded-2xl">
      <div className="image aspect-square h-full">
        <Image
          src={mainImage}
          className="rounded-xl h-full object-cover"
          alt="mainImage"
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="body space-y-2">
          <h4>{title}</h4>
          <span className="text-xs text-foreground/50 block ">
            {sellerName || "Owner"}
          </span>
          <ChangeSize currentSize={currentSize} productId={id} sizes={sizes} />
        </div>
        <span className="sm:text-3xl text-primary block ">{newPrice} EGY</span>
      </div>
      <CartCounter size={currentSize} id={id} />
    </div>
  );
};

export default CartCard;
