const Star = ({ filled }: { filled: boolean }) => (
  <svg
    aria-hidden
    width="16"
    height="16"
    viewBox="0 0 24 24"
    className={`inline-block ${filled ? "text-yellow-400" : "text-zinc-300"}`}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1"
  >
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.177L12 18.896 4.664 23.175l1.402-8.177L.132 9.21l8.2-1.192z" />
  </svg>
);

const Stars = ({ rate }: { rate: number }) => {
  const fullStars = Math.max(0, Math.min(5, Math.floor(rate || 0)));

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < fullStars} />
      ))}
    </div>
  );
};

export default Stars;
