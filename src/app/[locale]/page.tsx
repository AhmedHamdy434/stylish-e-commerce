import { LocaleToggle } from "@/components/atoms/LocaleToggle";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <div className="">
      <h1>{t("title")}</h1>
      <h6 className="mt-6 text-primary">{t("about")}</h6>
      <ThemeToggle />
      <LocaleToggle />
    </div>
  );
}
