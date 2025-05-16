import { AccountDashboard, ClientArea } from '~/components/AccountDashboard';

export default async function Account() {
  return (
    <>
      <AccountDashboard>
        <ClientArea />
      </AccountDashboard>
    </>
  );
}
