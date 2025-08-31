const Sizes = ({ sizes }: { sizes: string[] }) => {
  return (
    <>
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
    </>
  );
};

export default Sizes;
