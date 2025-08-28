export default function Spinner({
  size = "large",
}: {
  size?: "small" | "large";
}) {
  return (
    <div className="mt-30 flex justify-center items-center z-50">
      <div
        className={`${
          size === "large" ? "w-12 h-12 border-4" : "w-4 h-4 border-2"
        } border-primary border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}
