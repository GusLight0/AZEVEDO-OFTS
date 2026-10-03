"use client";

import { MessageCircle, X } from "lucide-react";
import { getWhatsAppUrl, whatsappContacts } from "@/lib/whatsapp";

interface WhatsAppContactPickerProps {
  message: string;
  onClose: () => void;
  onSelect: () => void;
}

export function WhatsAppContactPicker({
  message,
  onClose,
  onSelect,
}: WhatsAppContactPickerProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-picker-title"
        className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id="whatsapp-picker-title" className="text-lg font-700 text-[#0b1f3a]">
              Escolha um atendimento
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Seu pedido será enviado pelo WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Fechar seleção de atendimento"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2">
          {whatsappContacts.map((contact) => (
            <a
              key={contact.phone}
              href={getWhatsAppUrl(contact.phone, message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSelect}
              className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 transition-colors hover:border-green-300 hover:bg-green-50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                <MessageCircle size={19} />
              </span>
              <span>
                <span className="block font-600 text-gray-900">{contact.name}</span>
                <span className="block text-sm text-gray-500">{contact.display}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
