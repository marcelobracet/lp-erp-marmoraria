import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, PreApproval } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

function generateTempPassword(): string {
  return (
    Math.random().toString(36).slice(-8) +
    Math.random().toString(36).toUpperCase().slice(-4) +
    '!2'
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log('MP Webhook recebido:', JSON.stringify(body));

  const { type, data } = body;

  if (type !== 'preapproval') {
    return NextResponse.json({ received: true });
  }

  const preApproval = new PreApproval(client);
  const subscription = await preApproval.get({ id: data.id });

  if (subscription.status !== 'authorized') {
    return NextResponse.json({ received: true });
  }

  let meta: {
    company_name: string;
    admin_email: string;
    admin_name: string;
    plan: string;
  };

  try {
    meta = JSON.parse(subscription.external_reference!);
  } catch {
    console.error('Falha ao parsear external_reference');
    return NextResponse.json({ error: 'Invalid metadata' }, { status: 400 });
  }

  const tempPassword = generateTempPassword();

  const apiResponse = await fetch(
    `${process.env.ERP_API_URL}/api/v1/auth/provision`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.ERP_INTERNAL_SECRET!,
      },
      body: JSON.stringify({
        company_name: meta.company_name,
        admin_name: meta.admin_name,
        admin_email: meta.admin_email,
        admin_password: tempPassword,
        plan: meta.plan,
      }),
    }
  );

  if (!apiResponse.ok) {
    const errBody = await apiResponse.text();
    console.error('ProvisionTenant falhou:', errBody);
    return NextResponse.json({ error: 'Provision failed' }, { status: 500 });
  }

  console.log(
    `✅ Tenant provisionado: ${meta.company_name} (${meta.admin_email})`
  );

  return NextResponse.json({ received: true });
}
