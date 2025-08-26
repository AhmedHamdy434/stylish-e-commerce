import { getMostViewed } from "@/firebase/firestore";
import ProductCard from "./ProductCard";

const CardContainer = async () => {
  const products = await getMostViewed(10);
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CardContainer;
