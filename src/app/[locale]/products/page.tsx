import { SortOption } from "@/firebase/firestore";
import CardContainer from "./components/CardContainer";
import { getTranslations } from "next-intl/server";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ sort: SortOption; category: string }>;
}) => {
  const { sort, category } = await searchParams;
  const t=await getTranslations("search")

  return (
    <div className="container px-3 mx-auto py-8 min-h-screen">
        <h1 className="text-3xl mb-6 md:text-4xl font-bold tracking-tight text-primary">
        {t("heading")}
      </h1>
      <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed">
        {t("paragraph")}
      </p>
      <CardContainer sortI={sort} categoryI={category} />
    </div>
  );
};

export default page;
