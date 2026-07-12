import LoginForm from "@/features/auth/components/login-form";
import { requireUnAuth } from "@/lib/auth-utils";

type Props = {
  searchParams: Promise<{
    error?: string;
    error_description?: string;
  }>;
};

const Page = async ({ searchParams }: Props) => {
  await requireUnAuth();
  const params = await searchParams;

  return (
    <LoginForm
      oauthError={params.error}
      oauthErrorDescription={params.error_description}
    />
  );
};

export default Page;
