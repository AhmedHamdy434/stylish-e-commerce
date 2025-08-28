import MostSectionComponent from "@/components/molecules/MostSectionComponent";
import { getMostViewed } from "@/firebase/firestore";
import { getTranslations } from "next-intl/server";

const SectionHome4 = async () => {
  const data = await getMostViewed(4);
  const t= await getTranslations("HomePage.sections")
  return (
    <div className="container !mt-4 mx-auto">
      <MostSectionComponent
        data={data}
        heading={t("headNewArrivals")}
        paragraph={t("paragraphNewArrivals")}
      />
    </div>
  );
}

export default SectionHome4
