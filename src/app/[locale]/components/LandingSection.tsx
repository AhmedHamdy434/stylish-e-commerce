import Image from "next/image";
import { getTranslations } from "next-intl/server";
import LandingButton from "./LandingButton";

const LandingSection = async () => {

const t = await getTranslations("HomePage.LandingSection");

  return (
    <section className="relative !mb-0 min-h-[calc(100vh_-4rem)] flex items-center">
      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-center md:text-start ltr:animate-fade-in-left rtl:animate-fade-in-right">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t("title")} <span className="text-primary">{t("highlight")}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto md:mx-0">
            {t("description1")} <strong>{t("bold")} </strong>{" "}
            {t("description2")}
          </p>
            <LandingButton />
        </div>
        <div className="flex justify-center animate-zoom-in">
          <Image
            src="/landing.png"
            alt="Fashion Banner"
            width={500}
            height={500}
            className="w-full h-auto max-w-125 object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
