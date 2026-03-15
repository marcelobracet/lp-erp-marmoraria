import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, PreApproval } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

// Mapeamento server-side — plan IDs nunca expostos ao cliente
const PLAN_IDS: Record<string, string | undefined> = {
  essencial: process.env.MP_PLAN_ID_ESSENCIAL,
  profissional: process.env.MP_PLAN_ID_PROFISSIONAL,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planKey, companyName, adminEmail, adminName } = body;

    if (!planKey || !adminEmail || !companyName || !adminName) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes' },
        { status: 400 }
      );
    }

    const planId = PLAN_IDS[planKey as string];
    if (!planId) {
      return NextResponse.json({ error: 'Plano inválido' }, { status: 400 });
    }

    const preApproval = new PreApproval(client);

    const response = await preApproval.create({
      body: {
        preapproval_plan_id: planId,
        payer_email: adminEmail,
        // Dados do tenant transportados pelo MP até o webhook
        external_reference: JSON.stringify({
          company_name: companyName,
          admin_email: adminEmail,
          admin_name: adminName,
          plan: planKey,
        }),
        back_url: `${process.env.NEXT_PUBLIC_APP_URL}/sucesso`,
      },
    });

    if (!response.init_point) {
      return NextResponse.json(
        { error: 'Falha ao gerar link de pagamento' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: response.init_point });
  } catch (err) {
    console.error('[checkout] Erro:', err);
    return NextResponse.json(
      { error: 'Erro interno ao processar pagamento' },
      { status: 500 }
    );
  }
}
