"use client";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import DialogComponent from "./DialogComponent";
import AuthForm from "./AuthForm";

const AuthDialogue = () => {
  const t = useTranslations("navbar");

  return (
    <DialogComponent buttonJSX={<Button type="button">{t("signin")}</Button>}>
      <AuthForm />
    </DialogComponent>
  );
};

export default AuthDialogue;
