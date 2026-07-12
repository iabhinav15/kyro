"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { getOAuthErrorMessage } from "../lib/oauth-errors";

type OAuthErrorToastProps = {
  error?: string | null;
  errorDescription?: string | null;
};

export const OAuthErrorToast = ({
  error,
  errorDescription,
}: OAuthErrorToastProps) => {
  useEffect(() => {
    const message = getOAuthErrorMessage(error, errorDescription);

    if (message) {
      toast.error(message);
    }
  }, [error, errorDescription]);

  return null;
};
