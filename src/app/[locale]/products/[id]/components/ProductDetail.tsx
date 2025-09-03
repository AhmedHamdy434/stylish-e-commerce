import { ProductType } from "@/firebase/firestore";
import ImagesSide from "./ImagesSide";
import Details from "./Details";

const ProductDetail = ({ data }: { data: ProductType }) => {
  const { images } = data;
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <ImagesSide images={images} />
      <Details data={data} />
    </div>
  );
};

export default ProductDetail;
