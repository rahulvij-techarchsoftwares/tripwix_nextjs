import { LoginForm } from '~/components/LoginForm';
import { Locale } from '~/i18n.config';

export default async function Login({
  params: { lang },
}: Readonly<{
  params: { lang: Locale };
}>) {
  return (
    <>
      <LoginForm lang={lang} />
    </>
  );
}
