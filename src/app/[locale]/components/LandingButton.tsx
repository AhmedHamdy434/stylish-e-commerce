import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const LandingButton = () => {
  const t = useTranslations("HomePage.LandingSection");

  return (
    <>
     
        <Link href="/products">
          <Button>{t("shopnow")}</Button>
        </Link>
   
    </>
  );
};

export default LandingButton;
