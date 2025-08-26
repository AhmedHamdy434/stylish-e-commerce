import Image from "next/image";
import NavBar from "../organisms/NavBar";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Header() {
  const t = await getTranslations("navbar");
  const navItems = [
    {
      title: t("home"),
      to: "/",
    },
    {
      title: t("products"),
      to: "/products",
    },
    {
      title: t("cart"),
      to: "/cart",
    },
    {
      title: t("wishlist"),
      to: "/wishlist",
    },
  ];
  return (
    <nav className="w-full border-b bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 h-16">
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-bold text-lg">{t("logo")}</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(({ title, to }) => (
              <Link key={title} href={to} className="hover:text-primary">
                {title}
              </Link>
            ))}
          </div>
          <NavBar />
        </div>
      </div>
    </nav>
  );
}
