const Prices = ({
  newPrice,
  oldPrice,discount
}: {
  newPrice: number;
  oldPrice: number;discount?:number
}) => {
  const currency = "EGP";

  const formatPrice = (n?: number) =>
    n == null ? "—" : `${n.toLocaleString()} ${currency}`;
  return (
    <div className="flex items-center gap-4">
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
     {discount &&<span className="rounded-full bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
            -{discount}%
          </span>}
      </div>
  );
};

export default Prices;
