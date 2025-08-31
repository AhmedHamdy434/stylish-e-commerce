import Prices from "@/components/atoms/Prices";
import SizesAction from "@/components/atoms/SizesAction";
import StarsAll from "@/components/atoms/StarsAll";
import { ProductType } from "@/firebase/firestore";
import AddToCartBtn from "../../components/AddToCartBtn";

const Details = ({ data }: { data: ProductType }) => {
  const { title, rate, newPrice, oldPrice, discount, details, sizes, id } =
    data;

  return (
    <div className="flex-1 space-y-4">
      <h3 className="text-3xl font-semibold text-primary line-clamp-2">
        {title}
      </h3>
      <StarsAll rate={rate} />
      <Prices newPrice={newPrice} oldPrice={oldPrice} discount={discount} />
      <p className="text-sm leading-6">{details}</p>
      <SizesAction sizes={sizes} />
      <AddToCartBtn id={id} customClassName="w-full leading-7 mt-6" />
    </div>
  );
};

export default Details;
