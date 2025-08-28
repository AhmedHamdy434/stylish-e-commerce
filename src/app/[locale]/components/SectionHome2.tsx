import MostSectionComponent from "@/components/molecules/MostSectionComponent";
import { getMostDiscount } from "@/firebase/firestore";
import { getTranslations } from "next-intl/server";

const SectionHome2 = async () => {
  const data = await getMostDiscount(4);
  const t= await getTranslations("HomePage.sections")
  return (
    <div className="container !mt-4 mx-auto">
      <MostSectionComponent
        data={data}
        heading={t("headDiscount")}
        paragraph={t("paragraphDiscount")}
      />
    </div>
  );
};

export default SectionHome2;
