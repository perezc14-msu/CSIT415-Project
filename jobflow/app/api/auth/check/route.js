// app/api/auth/check/route.js

import { getAuth } from '@clerk/nextjs/server';  // Server-side import for Clerk

export async function GET(req) {
  const { userId } = getAuth(req);  // Extract userId from the request

  return new Response(JSON.stringify({ userId }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
