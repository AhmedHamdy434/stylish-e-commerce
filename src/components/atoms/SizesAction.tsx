"use client";
import AddToCartBtn from "@/app/[locale]/products/components/AddToCartBtn";
import { useState } from "react";

const SizesAction = ({ id, sizes }: { id: string; sizes: string[] }) => {
  const [active, setActive] = useState(0);
  return (
    <>
      {sizes?.length > 0 && (
        <div className="space-x-2">
          {sizes.map((size, i) => (
            <span
              key={size}
              onClick={() => setActive(i)}
              className={`rounded-lg uppercase px-2.5 py-1 text-xs cursor-pointer ${
                active === i
                  ? "bg-primary"
                  : "border border-primary text-primary"
              }`}
              data-product-size={size}
            >
              {size}
            </span>
          ))}
        </div>
      )}
      <AddToCartBtn
        id={id}
        customClassName="w-full leading-7 mt-6"
        size={sizes[active]}
      />
    </>
  );
};

export default SizesAction;
