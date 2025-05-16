import { RegisterForm } from '~/components/RegisterForm';
import { Locale } from '~/i18n.config';

export default async function Signup({
  params: { lang },
}: Readonly<{
  params: { lang: Locale };
}>) {
  return <RegisterForm lang={lang} />;
}
