"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "@/firebase/firestore";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

type SearchSectionPropsType = {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  sortBy: SortOption | undefined;
  setSortBy: Dispatch<SetStateAction<SortOption | undefined>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
};

const SearchSection = ({
  keyword,
  setKeyword,
  sortBy,
  setSortBy,
  category,
  setCategory,
}: SearchSectionPropsType) => {
  const t = useTranslations("search");
  const sortOptions = [
    { value: "priceAsc", label: t("sort.priceAsc") },
    { value: "priceDesc", label: t("sort.priceDesc") },
    { value: "discount", label: t("sort.discount") },
    { value: "views", label: t("sort.views") },
    { value: "rate", label: t("sort.rate") },
  ];

  const categoryOptions = [
    { value: "all", label: t("categories.all") },
    { value: "men", label: t("categories.men") },
    { value: "women", label: t("categories.women") },
    { value: "kids", label: t("categories.kids") },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        placeholder={t("input")}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 min-w-40 max-w-100"
      />
      <Select value={category} onValueChange={(val) => setCategory(val)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue  placeholder={t("categories.category")} />
        </SelectTrigger>
        <SelectContent>
          {categoryOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sortBy}
        onValueChange={(val) => setSortBy(val as SortOption)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("sort.sort")} />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchSection;
