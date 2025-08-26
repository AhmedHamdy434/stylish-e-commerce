"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { loginWithEmail, registerWithEmail } from "@/firebase/auth";
import ErrorHead from "../atoms/ErrorHead";
import GoogleButton from "../atoms/GoogleButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Switch } from "../ui/switch";

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}
const AuthForm = () => {
  const [isNew, setIsNew] = useState(false);
  const [role, setRole] = useState<"seller" | "buyer">("seller");
  const t = useTranslations("navbar.auth");

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    shouldUnregister: true,
    mode: "onSubmit",
  });

  const handleSignUp: SubmitHandler<IFormInput> = async (data) => {
    const email = data.email.trim();
    const password = data.password.trim();
    const confirmPassword = data.confirmPassword?.trim();
    if (isNew) {
      await registerWithEmail(
        email,
        password,
        confirmPassword,
        data.username,
        role
      );
    } else {
      await loginWithEmail(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="z-50 space-y-4 ">
      <h2 className="text-2xl font-bold text-center">
        {isNew ? t("signUp") : t("signIn")}
      </h2>
      {isNew && (
        <>
          <Input
            placeholder={t("username")}
            {...register("username", {
              required: t("usernameRequired"),
              minLength: {
                value: 3,
                message: t("usernameMin"),
              },
            })}
          />
          <div className="flex items-center gap-5">
            <span className="font-medium">
              {role === "seller" ? t("seller") : t("buyer")}
            </span>
            <Switch
              checked={role === "buyer"}
              onCheckedChange={(checked) =>
                setRole(checked ? "buyer" : "seller")
              }
            />
          </div>
        </>
      )}
      {errors?.username?.message && (
        <ErrorHead message={errors.username.message} />
      )}
      <Input
        type="email"
        placeholder={t("email")}
        {...register("email", {
          required: t("emailRequired"),
          pattern: { value: /^\S+@\S+$/i, message: t("emailInvalid") },
        })}
      />{" "}
      {errors?.email?.message && <ErrorHead message={errors.email.message} />}
      <Input
        type="password"
        placeholder={t("password")}
        {...register("password", {
          required: t("passwordRequired"),
          minLength: {
            value: 6,
            message: t("passwordMin"),
          },
        })}
      />
      {errors?.password?.message && (
        <ErrorHead message={errors.password.message} />
      )}
      {isNew && (
        <Input
          type="password"
          placeholder={t("confirmPassword")}
          {...register("confirmPassword", {
            required: t("confirmPasswordRequired"),
            validate: (val, formValues) =>
              val === formValues.password || t("confirmPasswordMismatch"),
          })}
        />
      )}
      {errors?.confirmPassword?.message && (
        <ErrorHead message={errors.confirmPassword.message} />
      )}
      <Button disabled={isSubmitting} type="submit" className="w-full">
        {isNew ? t("signUp") : t("signIn")}
      </Button>
      <GoogleButton isDisabled={isSubmitting} />
      <h6 className="text-center">
        {isNew ? t("alreadyHaveAccount") : t("dontHaveAccount")}{" "}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            reset({}, { keepErrors: false });
            clearErrors();
            setIsNew((prev) => !prev);
          }}
          className="text-primary underline!"
        >
          {isNew ? t("login") : t("signUpNow")}
        </button>
      </h6>
    </form>
  );
};

export default AuthForm;
