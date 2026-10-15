import { proxy } from '@/lib/proxy.mjs';
import { demo } from '@/lib/demo.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function handle(request, context) {
  const { path } = await context.params;
  return proxy(request, path, {
    base: process.env.API_BASE_URL,
    origin: process.env.API_FRONTEND_ORIGIN,
    demo: process.env.DEMO_MODE === 'true' ? demo : null,
  });
}

export { handle as GET, handle as POST, handle as PATCH, handle as DELETE };
