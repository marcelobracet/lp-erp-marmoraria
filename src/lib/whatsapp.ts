export type WhatsAppOpenOptions = {
  phoneE164: string;
  message: string;
};

const sanitizeE164 = (phoneE164: string) => phoneE164.replace(/\D/g, '');

export const buildWhatsAppUrl = ({
  phoneE164,
  message,
}: WhatsAppOpenOptions) => {
  const phone = sanitizeE164(phoneE164);
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
};

export const openWhatsApp = ({ phoneE164, message }: WhatsAppOpenOptions) => {
  if (typeof window === 'undefined') {
    return;
  }

  const url = buildWhatsAppUrl({ phoneE164, message });
  window.open(url, '_blank', 'noopener,noreferrer');
};
