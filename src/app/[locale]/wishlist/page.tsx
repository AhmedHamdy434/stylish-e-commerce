import { getTranslations } from "next-intl/server";
import WishListContainer from "./components/WishListContainer"

const page = async () => {
    const t = await getTranslations("wishlist");

  return (
   <div className="container px-3 mx-auto py-8 min-h-screen">
        <h3 className="text-3xl mb-6 md:text-4xl font-bold tracking-tight text-primary">
        {t("head")}
      </h3>
      <WishListContainer />
    </div>
  )
}

export default page
