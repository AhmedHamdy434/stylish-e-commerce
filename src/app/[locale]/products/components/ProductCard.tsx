import { ProductType } from "@/firebase/firestore";
import Image from "next/image";
import CardButtons from "./CardButtons";
import StarsAll from "@/components/atoms/StarsAll";
import Prices from "@/components/atoms/Prices";
import Sizes from "@/components/atoms/Sizes";
import Views from "@/components/atoms/Views";

const ProductCard = ({ product }: { product: ProductType }) => {
  const {
    id,
    description,
    images,
    mainImage,
    newPrice,
    oldPrice,
    discount,
    rate,
    sizes,
    title,
    views,
    sellerName,
  } = product;

  return (
    <article
      aria-labelledby={`product-${id}-title`}
      className="group relative rounded-2xl bg-sidebar-border shadow-sm transition"
      data-product-id={id}
    >
      {/* IMAGE */}
      <figure className="relative rounded-2xl aspect-[4/3] w-full">
        <Image
          width={400}
          height={300}
          src={mainImage || (images && images[0]) || "/placeholder.png"}
          alt={title}
          loading="lazy"
          className="h-full w-full rounded-t-2xl object-cover transition duration-300 group-hover:scale-105"
        />
        {/* discount badge */}
        {discount > 0 && (
          <span className="absolute end-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
            -{discount}%
          </span>
        )}
        <Sizes sizes={sizes} />
      </figure>

      {/* BODY */}
      <div className="p-4">
        {/* title */}
        <div className="flex items-start justify-between gap-3">
          <h3
            id={`product-${id}-title`}
            className="text-sm truncate font-semibold text-zinc-900 line-clamp-2 dark:text-zinc-100"
          >
            {title}
          </h3>

          {/* views */}
          <Views views={views} />
        </div>

        {/* seller + rating */}
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-600 dark:text-zinc-400">
            by{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {sellerName || "Owner"}
            </span>
          </div>
          <StarsAll rate={rate} />
        </div>

        {/* description */}
        <p className="mt-3 text-sm h-10 leading-5 line-clamp-2 text-zinc-600 dark:text-zinc-300 max-h-16 overflow-hidden">
          {description}
        </p>
        {/* prices */}
        <Prices newPrice={newPrice} oldPrice={oldPrice} />
        <CardButtons  size={sizes[0]} id={id} />
      </div>
    </article>
  );
};

export default ProductCard;
