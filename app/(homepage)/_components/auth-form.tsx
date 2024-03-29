"use client";

import AuthSocialButton from "@/app/(homepage)/_components/auth-social-button";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs/input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if the current session status is authenticated
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", data);
          toast.success("Registered successfully");
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok) {
            toast.success("Logged in Successfully");
            router.push("/users");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // NextAuth Social Sign in
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok) {
          toast.success("Logged in Successfully");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          className="
                mt-6 
                text-center 
                text-3xl 
                font-bold 
                tracking-tight 
                text-gray-900
              "
        >
          {variant === "REGISTER"
            ? "Create your account"
            : "Login to your Account"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <Input
                register={register}
                errors={errors}
                id="name"
                label="Name"
              />
            )}
            <Input
              register={register}
              errors={errors}
              id="email"
              label="Email address"
              type="email"
              disabled={isLoading}
            />
            <Input
              register={register}
              errors={errors}
              id="password"
              label="Password"
              type="password"
              disabled={isLoading}
            />
            <div>
              {/* Since this Button has a type of "submit", we don't need an explicit onClick function for this Button, because this Button is inside of the form element. Which means that when we click on the Button , it is going to trigger onSubmit event  */}
              <Button disabled={isLoading} fullWidth type="submit">
                {variant === "LOGIN" ? "Sign In" : "Register"}
              </Button>
            </div>
          </form>

          {/* Container div for the Social buttons and a heading for the social buttons "Or continue with" */}
          <div className="mt-6">
            {/* This div is for the horizontal line on both sides + the "Or continue with" text in between */}
            <div className="relative">
              <div
                className="
                absolute 
                inset-0 
                flex 
                items-center
              "
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* This div is for the 2 AuthSocialButton's */}
            <div className="mt-6 flex gap-2">
              <AuthSocialButton
                icon={AiFillGithub}
                onClick={() => socialAction("github")}
              />
              <AuthSocialButton
                icon={FcGoogle}
                onClick={() => socialAction("google")}
              />
            </div>
          </div>

          {/* Container div for the Back Button QUESTION + Back Button LABEL */}
          <div
            className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
          >
            {/* Back Button Question */}
            <div>
              {variant === "LOGIN"
                ? "New to SwiftMsg?"
                : "Already have an account?"}
            </div>

            {/* Back Button Label */}
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
