import { ResetPasswordForm } from '~/components/Password';
import { SearchParams } from '~/lib/types';

export default async function ResetPassword({
  searchParams,
}: Readonly<{
  searchParams: SearchParams;
}>) {
  return (
    <>
      <ResetPasswordForm token={searchParams.token} />
    </>
  );
}
