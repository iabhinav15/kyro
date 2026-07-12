"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type GoogleAuthButtonProps = {
  disabled?: boolean;
  errorCallbackURL: string;
};

export const GoogleAuthButton = ({
  disabled,
  errorCallbackURL,
}: GoogleAuthButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleGoogleAuth = async () => {
    setIsPending(true);

    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/",
        errorCallbackURL,
      },
      {
        onSuccess: () => {
          toast.success("Redirecting to Google...");
        },
        onError: (ctx) => {
          setIsPending(false);
          toast.error(
            ctx.error.message ||
              "Google sign-in could not start. Please try again.",
          );
        },
      },
    );
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      type="button"
      disabled={disabled || isPending}
      onClick={handleGoogleAuth}
    >
      <Image src="/logos/google.svg" width={20} height={20} alt="Google logo" />
      {isPending ? "Connecting to Google..." : "Continue with Google"}
    </Button>
  );
};
