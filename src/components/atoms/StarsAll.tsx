import Stars from "./Stars";

const StarsAll = ({ rate }: { rate: number }) => {
  return (
    <div className="flex items-center gap-2">
      <Stars rate={rate} />
      <span className="text-xs text-foreground/60">
        {(rate ?? 0).toFixed(1)}
      </span>
    </div>
  );
};

export default StarsAll;
