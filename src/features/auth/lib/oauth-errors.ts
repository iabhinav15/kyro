const oauthErrorMessages: Record<string, string> = {
  access_denied: "Google sign-in was cancelled.",
  account_not_linked: "This Google account is not linked to your Kyro account.",
  email_not_found: "Google did not return an email address for this account.",
  invalid_code: "Google sign-in could not be verified. Please try again.",
  no_code: "Google sign-in did not complete. Please try again.",
  oauth_provider_not_found: "Google sign-in is not configured yet.",
  please_restart_the_process: "Google sign-in expired. Please try again.",
  state_mismatch: "Google sign-in could not be verified. Please try again.",
  unable_to_create_session:
    "Kyro could not start your session. Please try again.",
  unable_to_create_user:
    "Kyro could not create your account. Please try again.",
  unable_to_get_user_info:
    "Kyro could not read your Google profile. Please try again.",
  unable_to_link_account:
    "Kyro could not link this Google account. Please try again.",
};

export const getOAuthErrorMessage = (
  error?: string | null,
  description?: string | null,
) => {
  if (!error) {
    return null;
  }

  const normalizedError = error.trim().toLowerCase().replaceAll(" ", "_");

  return (
    oauthErrorMessages[normalizedError] ||
    description ||
    "Google sign-in failed. Please try again."
  );
};
