export const whatsappContacts = [
  { name: "Gustavo", phone: "5598991856123", display: "(98) 99185-6123" },
  { name: "Lucas", phone: "5598991168586", display: "(98) 99116-8586" },
  { name: "Micael", phone: "5598984143767", display: "(98) 98414-3767" },
];

export function getWhatsAppUrl(phone: string, message?: string) {
  const url = new URL(`https://wa.me/${phone}`);
  if (message) url.searchParams.set("text", message);
  return url.toString();
}
