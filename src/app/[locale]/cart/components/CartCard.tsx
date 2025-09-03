"use client";
import Image from "next/image";
import ChangeSize from "./ChangeSize";
import CartCounter from "./CartCounter";
import { CartItemWithProduct } from "@/firebase/dbFunctions";
import { useGetSize } from "../hooks/useGetSize";
import { useGetQuantity } from "../hooks/useGetQuantity";

const CartCard = ({ cart }: {cart: CartItemWithProduct }) => {
  const { product } = cart;
  const { mainImage, title, sizes, id, sellerName, newPrice } = product;
  const { data: size } = useGetSize(id);
  const { data: quantity  } = useGetQuantity(id);

  const currentSize = size ?? sizes[0];
  const currentQuantity = quantity ?? 1;

  return (
    <div className="flex sm:h-50 border-2 shadow-2xl p-3 rounded-2xl">
     <div className="flex flex-col sm:flex-row gap-4">
      <div className="image aspect-square ">
        <Image
          src={mainImage}
          className="rounded-xl max-h-full object-cover"
          alt="mainImage"
          width={180}
          height={180}
          />
      </div>
      <div className="flex flex-col gap-2 justify-between">
        <div className="body space-y-2">
          <h4>{title}</h4>
          <span className="text-xs text-foreground/50 hidden sm:block ">
            {sellerName || "Owner"}
          </span>
          <ChangeSize currentSize={currentSize} productId={id} sizes={sizes} />
        </div>
        <span className="text-xl sm:text-3xl text-primary block ">
          {currentQuantity * newPrice} EGY
        </span>
          </div>
      </div>
      <CartCounter quantity={currentQuantity} size={currentSize} id={id} />
    </div>
  );
};

export default CartCard;
