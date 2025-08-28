import Stars from "@/components/atoms/Stars";
import { ProductType } from "@/firebase/firestore";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

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
  const currency = "EGP";
  const computedDiscount = (() => {
    if (typeof discount === "number" && discount > 0)
      return Math.round(discount);
    if (oldPrice && oldPrice > newPrice) {
      return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    }
    return 0;
  })();

  const formatPrice = (n?: number) =>
    n == null ? "—" : `${n.toLocaleString()} ${currency}`;

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
        {computedDiscount > 0 && (
          <span className="absolute end-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
            -{computedDiscount}%
          </span>
        )}

        {sizes?.length > 0 && (
          <div className="absolute start-3 bottom-3 hidden space-x-2 md:flex">
            {sizes.map((size) => (
              <span
                key={size}
                className="rounded-lg uppercase bg-primary px-2.5 py-1 text-xs text-black/90"
                data-product-size={size}
              >
                {size}
              </span>
            ))}
          </div>
        )}
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
          <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="inline-block"
            >
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{Intl.NumberFormat().format(views || 0)}</span>
          </div>
        </div>

        {/* seller + rating */}
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-600 dark:text-zinc-400">
            by{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {sellerName || "Owner"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Stars rate={rate} />
            <span className="text-xs text-foreground/60">
              {(rate ?? 0).toFixed(1)}
            </span>
          </div>
        </div>

        {/* description */}
        <p className="mt-3 text-sm h-10 leading-5 line-clamp-2 text-zinc-600 dark:text-zinc-300 max-h-16 overflow-hidden">
          {description}
        </p>

        {/* prices */}
        <div className="flex items-baseline gap-3">
          <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {formatPrice(newPrice)}
          </div>
          {oldPrice && oldPrice > newPrice && (
            <div className="text-sm text-zinc-500 line-through dark:text-zinc-500">
              {formatPrice(oldPrice)}
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            className="flex-1 whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-95 disabled:opacity-60"
            data-action="add-to-cart"
            data-product-id={id}
          >
            Add to cart
          </button>
          <Link
            href={`/products/${id}`}
            className="rounded-lg border px-2 py-2 text-sm font-medium hover:text-primary hover:underline border-border"
            aria-label={`View details for ${title}`}
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
