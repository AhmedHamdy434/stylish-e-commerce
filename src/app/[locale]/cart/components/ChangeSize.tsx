"use client";
// import { useState } from "react";
import { useChangeSize } from "../hooks/useChangeSize";

const ChangeSize = ({
  productId,
  currentSize,
  sizes,
}: {
  productId: string;
  currentSize:string
  sizes: string[];
}) => {
 
  const { mutateAsync, isPending } = useChangeSize(productId);
  // const [active, setActive] = useState(currentSize);

  const handleClick = async (newSize: string) => {
    // if (isLoading || currentSize === newSize) return;
    await mutateAsync(newSize);
    // setActive(newSize);

    // try {
    //    updateSize(newSize);
    // } catch (err) {
    //   console.error("Failed to update size:", err);
    //   setActive(size);
    // }
  };

  return (
    <>
      {sizes?.length > 0 && (
        <div className="flex gap-2 flex-nowrap">
          {sizes.map((sizeItem) => (
            <button
              key={sizeItem}
              onClick={() => handleClick(sizeItem)}
              disabled={isPending}
              className={`rounded-lg uppercase whitespace-nowrap px-2.5 py-1 text-xs cursor-pointer ${
                currentSize === sizeItem
                  ? "bg-primary"
                  : "border border-primary text-primary"
              }`}
              data-product-size={sizeItem}
            >
              {sizeItem}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default ChangeSize;
