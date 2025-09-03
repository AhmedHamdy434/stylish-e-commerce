type OrderPropsType = { title: string; number: number; isEnd?: boolean };

const Order = ({ title, number, isEnd = false }: OrderPropsType) => {
  return (
    <div
      className={`flex ${
        isEnd ? "font-semibold" : "text-sm"
      } justify-between items-center`}
    >
      <span className={`${!isEnd && "text-foreground/50"}`}>{title}</span>
      <span>{number} EGY</span>
    </div>
  );
};

export default Order;
