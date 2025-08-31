import MostSectionComponent from "@/components/molecules/MostSectionComponent";
import { filterByCategory } from "@/firebase/firestore";
import { getTranslations } from "next-intl/server";

const SimilarProducts = async ({ category,id }: { category: string;id:string }) => {
  const data = await filterByCategory(category, 4,id);
  const t=await getTranslations("search.categories")
  return (
    <div>
      <MostSectionComponent
        heading={t("similarProductsHeading", { category })}    
        paragraph=""
        data={data}
        to={`/products?category=${category}`}
      />
    </div>
  );
};

export default SimilarProducts;
