import {
  Crown,
  Search,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

const SectionHome3 = async () => {
  const t = await getTranslations("HomePage.features");
  const commonClass="w-10 h-10 text-primary mx-auto";
  const GivingSecData = [
    {
      icon: <ShoppingBag className={commonClass} />,
      heading: t("peace.subtitle"),
      paragraph: t("peace.description"),
    },
    {
      icon: <ShieldCheck  className={commonClass} />,
      heading: t("security.subtitle"),
      paragraph: t("security.description"),
    },
    {
      icon: <Crown  className={commonClass} />,
      heading: t("luxury.subtitle"),
      paragraph: t("luxury.description"),
    },
    {
      icon: <Tag  className={commonClass} />,
      heading: t("price.subtitle"),
      paragraph: t("price.description"),
    },
    {
      icon: <Truck className={commonClass} />,
      heading: t("location.subtitle"),
      paragraph: t("location.description"),
    },
    {
      icon: <Search  className={commonClass} />,
      heading: t("efficient.subtitle"),
      paragraph: t("efficient.description"),
    },
  ];
  return (
    <div className="container mx-auto">
      <h4 className="mb-7 md:mb-12 text-primary text-3xl lg:text-5xl font-semibold">
        {t("header.title")}
      </h4>
      <div className="boxes grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {GivingSecData.map(({ icon, heading, paragraph }) => (
          <div key={heading} className="space-y-4 text-center bg-secondary rounded-2xl p-5">
            {icon}
            <h5 className="leading-9.5 text-primary text-3xl font-bold">
              {heading}
            </h5>
            <p className="text-[rgba(115,120,140,1)] leading-[1.625rem]">
              {paragraph}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHome3;
