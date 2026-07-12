import RegisterForm from "@/features/auth/components/register-form";
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
    <RegisterForm
      oauthError={params.error}
      oauthErrorDescription={params.error_description}
    />
  );
};

export default Page;
