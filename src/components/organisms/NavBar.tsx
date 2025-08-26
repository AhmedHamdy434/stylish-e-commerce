"use client";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { LocaleToggle } from "../atoms/LocaleToggle";
import { useTranslations } from "next-intl";
import AuthDialogue from "./AuthDialogue";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/firebase/auth";
const NavBar = () => {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("navbar");
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
  const handleLogOut = async () => {
    await logout();
  };
  return (
    <>
      <div className="hidden md:flex items-center">
        {loading ? (
          <div className=""></div>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-xs">
                <User className="h-4 w-4" />
                <span>{user.displayName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">{t("profile")}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}>
                <LogOut className="mr-2 h-4 w-4" />
                {t("signout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <AuthDialogue />
        )}
      </div>
      <div className="absolute flex gap-4 end-15 md:-translate-x-20 md:rtl:translate-x-20">
        <ThemeToggle />
        <LocaleToggle />
      </div>
      <div className="md:hidden relative flex items-center">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        {isOpen && (
          <div className="md:hidden absolute mt-2 top-full z-30 end-0 min-w-40 rounded-2xl border-t bg-background">
            <div className="px-4 py-3 flex flex-col gap-3">
              {navItems.map(({ title, to }) => (
                <Link key={title} href={to} className="hover:text-primary">
                  {title}
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/profile" className="hover:text-primary">
                    {t("profile")}
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="text-left text-destructive flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" /> {t("signout")}
                  </button>
                </>
              ) : (
                <AuthDialogue />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
