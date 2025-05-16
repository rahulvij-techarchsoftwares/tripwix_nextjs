// import NextAuth from 'next-auth';

// import { getAuthOptions } from '../_options';

// const handler = async (req: any, res: any) => {
//   const authOptions = await getAuthOptions();
//   return NextAuth(authOptions)(req, res);
// };

// export { handler as GET, handler as POST };
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';

import { getAuthOptions } from '../_options';

const handler = async (req: Request, context: any) => {
  const authOptions = await getAuthOptions();
  return NextAuth(authOptions)(req, context);
};

export { handler as GET, handler as POST };
