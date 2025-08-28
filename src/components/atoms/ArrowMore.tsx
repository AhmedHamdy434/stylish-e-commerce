"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";

const ArrowMore = () => {
  const locale = useLocale();

  return locale === "en" ? (
    <ChevronRight className="w-5 h-5 p-0.75 text-white bg-primary rounded-full" />
  ) : (
    <ChevronLeft className="w-5 h-5 p-0.75 text-white bg-primary rounded-full" />
  );
};

export default ArrowMore;
