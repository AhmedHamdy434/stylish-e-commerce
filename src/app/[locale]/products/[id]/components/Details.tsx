import Prices from "@/components/atoms/Prices";
import SizesAction from "@/components/atoms/SizesAction";
import StarsAll from "@/components/atoms/StarsAll";
import { ProductType } from "@/firebase/firestore";
import Heart from "../../components/Heart";

const Details = ({ data }: { data: ProductType }) => {
  const { title, rate, newPrice, oldPrice, discount, details, sizes, id } =
    data;

  return (
    <div className="flex-1 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-3xl flex-1 font-semibold text-primary line-clamp-2">
          {title}
        </h3>
        <Heart position="" id={id}  color="text-foreground/60" />
      </div>
      <StarsAll rate={rate} />
      <Prices newPrice={newPrice} oldPrice={oldPrice} discount={discount} />
      <p className="text-sm leading-6">{details}</p>
      <SizesAction id={id} sizes={sizes} />
    </div>
  );
};

export default Details;
