import type { Metadata } from "next";
import { ShoppingCart, MessageCircle, Bike, Store } from "lucide-react";

export const metadata: Metadata = {
  title: "Como Comprar",
  description: "Veja como é fácil comprar na AZEVEDO OFTS via WhatsApp.",
};

const steps = [
  {
    icon: <ShoppingCart size={28} />,
    step: "01",
    title: "Escolha seus produtos",
    desc: "Navegue pelo catálogo, use os filtros e a pesquisa para encontrar o que procura. Selecione o tamanho e adicione ao carrinho.",
  },
  {
    icon: <MessageCircle size={28} />,
    step: "02",
    title: "Finalize pelo WhatsApp",
    desc: "Clique em 'Finalizar pelo WhatsApp'. Você será redirecionado com a mensagem do pedido já preenchida automaticamente.",
  },
  {
    icon: <Bike size={28} />,
    step: "03",
    title: "Entrega ou Retirada",
    desc: "Escolha entre receber em casa via mototaxi (taxa fixa de R$ 7,00) ou retirar gratuitamente na nossa loja. Combinamos tudo pelo WhatsApp.",
  },
  {
    icon: <Store size={28} />,
    step: "04",
    title: "Confirme e pague",
    desc: "Após combinar a entrega ou retirada, confirme o pagamento via Pix ou transferência bancária e pronto!",
  },
];

export default function ComoComprarPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-700 text-[#0b1f3a] mb-2">Como Comprar</h1>
      <p className="text-gray-500 mb-12">Simples, rápido e seguro. Veja como funciona:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {steps.map((s) => (
          <div key={s.step} className="relative p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="absolute top-4 right-4 text-5xl font-800 text-[#e8edf7] select-none">
              {s.step}
            </div>
            <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center text-white mb-4">
              {s.icon}
            </div>
            <h3 className="font-700 text-gray-900 mb-2">{s.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Métodos de entrega */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-4 p-5 bg-[#e8edf7] rounded-2xl">
          <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <Bike size={22} />
          </div>
          <div>
            <p className="font-700 text-gray-900">Entrega via Mototaxi</p>
            <p className="text-sm text-gray-500 mt-1">Enviamos o produto até você usando Moto Uber. A taxa de entrega é fixa: R$ 7,00.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-5 bg-[#e8edf7] rounded-2xl">
          <div className="w-12 h-12 bg-[#0b1f3a] rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <Store size={22} />
          </div>
          <div>
            <p className="font-700 text-gray-900">Retirada na Loja</p>
            <p className="text-sm text-gray-500 mt-1">Retire seu pedido diretamente na nossa loja sem nenhum custo adicional. Combine o horário pelo WhatsApp.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-[#0b1f3a] rounded-2xl p-6 text-center text-white">
        <p className="font-700 text-lg mb-2">Ainda tem dúvidas?</p>
        <p className="text-blue-200 text-sm mb-4">Nossa equipe está pronta para ajudar via WhatsApp</p>
        <a
          href="https://wa.me/5598991856123"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-600 transition-colors"
        >
          <MessageCircle size={18} />
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
