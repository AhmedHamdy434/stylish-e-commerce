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
  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1"
      />
      <Select value={category} onValueChange={(val) => setCategory(val)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
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
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by" />
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

const sortOptions = [
  { value: "priceAsc", label: "Price: Low to High" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "discount", label: "Top Discount" },
  { value: "views", label: "Most Viewed" },
  { value: "rate", label: "Top Rated" },
];
const categoryOptions: { value: string; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "kids", label: "Kids" },
  { value: "shoes", label: "Shoes" },
];
