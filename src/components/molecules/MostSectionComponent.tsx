import ProductCard from "@/app/[locale]/products/components/ProductCard";
import { ProductType } from "@/firebase/firestore";
import { Link } from "@/i18n/navigation";
import ArrowMore from "../atoms/ArrowMore";
import { getTranslations } from "next-intl/server";

type MostCardsComponentType = {
  heading: string;
  paragraph: string;
  data: ProductType[];
};
const MostSectionComponent = async ({
  heading,
  paragraph,
  data,
}: MostCardsComponentType) => {
  const t = await getTranslations("HomePage.sections");

  return (
    <>
      <div className="flex flex-col gap-10 sm:flex-row sm:justify-between sm:items-end">
        <div className="text">
          <h3 className="text-4xl lg:text-5xl text-primary font-semibold mb-4 lg:mb-6">
            {heading}
          </h3>
          <p className="text-foreground/80">{paragraph}</p>
        </div>
        <Link
          href="/"
          className="group flex justify-end pt-3 gap-2 items-center sm:min-w-46 ms-auto text-sm lg:text-lg text-main font-medium leading-6.5 tracking-[0.5px]"
        >
          <span className="group-hover:text-primary">{t("showMore")}</span>
          <ArrowMore />
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default MostSectionComponent;
