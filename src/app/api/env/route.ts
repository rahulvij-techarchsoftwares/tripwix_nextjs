export function GET() {
  return new Response(
    `Your env is ${process.env.NEXT_PUBLIC_ENVIRONMENT} | ${process.env.NEXTAUTH_URL}`
  );
}
