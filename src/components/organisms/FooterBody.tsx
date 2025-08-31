import { Link } from "@/i18n/navigation";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { getTranslations } from "next-intl/server";
const FooterBody = async () => {
  const t = await getTranslations("footer");
  const linksData = [
    {
      title: t("men"),
      to: "/products?category=men",
    },
    {
      title: t("women"),
      to: "/products?category=women",
    },
    {
      title: t("kids"),
      to: "/products?category=kids",
    },
  ];
  const linksAboutData = [
    {
      title: t("about_us"),
      to: "/",
    },
    {
      title: t("contact"),
      to: "/",
    },
    {
      title: t("faq"),
      to: "/",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-6 lg:px-12 py-10 grid gap-10 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold text-primary">{t("brand")}</h2>
          <p className="mt-3 text-sm">{t("about")}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-2">{t("shop")}</h3>
            <ul className="space-y-2 text-sm">
              {linksData.map(({ title, to }) => (
                <li key={title}>
                  <Link href={to} className="hover:text-primary">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">{t("company")}</h3>
            <ul className="space-y-2 text-sm">
              {linksAboutData.map(({ title, to }) => (
                <li key={title}>
                  <Link href={to} className="hover:text-primary">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{t("follow_us")}</h3>
          <div className="flex space-x-4">
            {logos.map(({ icon }, i) => (
              <Link
                key={i}
                href="#"
                className="p-2 rounded-full bg-primary/20 hover:bg-primary hover:text-white transition"
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-sm">
        © {new Date().getFullYear()} {t("rights")}
      </div>
    </>
  );
};

export default FooterBody;
const logos = [
  { icon: <Facebook size={20} /> },
  { icon: <Instagram size={20} /> },
  { icon: <Twitter size={20} /> },
];
