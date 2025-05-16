import { revalidatePath, revalidateTag } from 'next/cache';

// TODO: UPDATE TO POST
export function GET() {
  revalidatePath('/');
  revalidateTag('all');
  return new Response('Cache cleared');
}

export function POST() {
  revalidatePath('/');
  return new Response('Cache cleared');
}
