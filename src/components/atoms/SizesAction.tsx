"use client";
import { useState } from "react";

const SizesAction = ({ sizes }: { sizes: string[] }) => {
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
    </>
  );
};

export default SizesAction;
