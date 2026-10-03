import type { Metadata } from "next";
import { MessageCircle, Camera, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a AZEVEDO OFTS via WhatsApp ou Instagram.",
};

export default function ContatoPage() {
  const whatsappNumbers = [
    { name: "Atendimento 1", phone: "5598991856123", display: "(98) 99185-6123" },
    { name: "Atendimento 2", phone: "5598984143767", display: "(98) 98414-3767" },
    { name: "Atendimento 3", phone: "5598991168586", display: "(98) 99116-8586" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-700 text-[#0b1f3a] mb-2">Contato</h1>
      <p className="text-gray-500 mb-10">Estamos aqui para ajudar. Fale conosco!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {whatsappNumbers.map((num, i) => (
          <a
            key={i}
            href={`https://wa.me/${num.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-5 bg-green-50 border border-green-100 rounded-2xl hover:bg-green-100 transition-colors group"
          >
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <MessageCircle size={22} />
            </div>
            <div>
              <p className="font-600 text-gray-900">{num.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">{num.display}</p>
              <p className="text-xs text-green-600 mt-1 font-500">Clique para conversar →</p>
            </div>
          </a>
        ))}

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-4 p-5 bg-pink-50 border border-pink-100 rounded-2xl hover:bg-pink-100 transition-colors"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <Camera size={22} />
          </div>
          <div>
            <p className="font-600 text-gray-900">Instagram</p>
            <p className="text-sm text-gray-500 mt-0.5">@azevedoofts</p>
            <p className="text-xs text-pink-600 mt-1 font-500">Ver perfil →</p>
          </div>
        </a>

        <div className="flex items-start gap-4 p-5 bg-[#e8edf7] rounded-2xl">
          <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <p className="font-600 text-gray-900">Horário de Atendimento</p>
            <p className="text-sm text-gray-500 mt-0.5">Segunda a Sexta: 9h–18h</p>
            <p className="text-sm text-gray-500">Sábado: 9h–13h</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 bg-[#e8edf7] rounded-2xl">
          <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <MapPin size={22} />
          </div>
          <div>
            <p className="font-600 text-gray-900">Localização</p>
            <p className="text-sm text-gray-500 mt-0.5">São Luís, MA</p>
            <p className="text-sm text-gray-500">Brasil</p>
          </div>
        </div>
      </div>
    </div>
  );
}
