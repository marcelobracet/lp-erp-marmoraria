import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Roda apenas no servidor — a service role key nunca vai ao browser
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET() {
  const { count, error } = await supabaseAdmin
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  if (error) {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }

  return NextResponse.json({ count: count ?? 0 });
}
