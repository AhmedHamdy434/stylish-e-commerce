"use client";
import { signInWithGoogle } from "@/firebase/auth";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

const GoogleButton = ({ isDisabled }: { isDisabled: boolean }) => {
  const t = useTranslations("navbar.auth");
  const handleGoogle = async () => {
    await signInWithGoogle("buyer");
  };
  return (
    <Button
      type="button"
      disabled={isDisabled}
      className="w-full bg-blue-500!"
      onClick={handleGoogle}
    >
      {t("continueWithGoogle")}
    </Button>
  );
};

export default GoogleButton;
