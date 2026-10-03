import { Bike, Store, Shield, MessageCircle } from "lucide-react";

const benefits = [
  {
    icon: <Bike size={24} />,
    title: "Entrega",
    desc: "Enviamos via moto até você",
  },
  {
    icon: <Store size={24} />,
    title: "Retirada na Loja",
    desc: "Retire pessoalmente sem custo",
  },
  {
    icon: <Shield size={24} />,
    title: "Produto Original",
    desc: "100% originais com qualidade garantida",
  },
  {
    icon: <MessageCircle size={24} />,
    title: "Atendimento Rápido",
    desc: "Suporte via WhatsApp todos os dias",
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-[#0b1f3a] py-10 mt-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {benefits.map((b) => (
          <div key={b.title} className="flex flex-col items-center text-center gap-2">
            <div className="text-blue-300">{b.icon}</div>
            <p className="text-white font-600 text-sm">{b.title}</p>
            <p className="text-blue-200 text-xs">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
