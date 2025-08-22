"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LocaleToggle() {
  const t = useTranslations("navbar"); 
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.push(`/${nextLocale}${pathname?.replace(/^\/(en|ar)/, "")}`);
  };

  return (
    <Button variant="outline" onClick={toggleLocale}>
      {t("language")}
    </Button>
  );
}
