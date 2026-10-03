"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Como faço um pedido?",
    a: "Adicione os produtos ao carrinho, escolha os tamanhos e clique em 'Finalizar pelo WhatsApp'. Você será redirecionado para um de nossos atendentes com a mensagem do pedido já preenchida automaticamente.",
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Trabalhamos com pagamento via WhatsApp. Aceitamos Pix e transferência bancária, combinados diretamente com nossa equipe.",
  },
  {
    q: "Como funciona a entrega?",
    a: "Realizamos entregas em São Luís via mototaxi (Moto Uber). A taxa de entrega é fixa: R$ 7,00. Combinamos todos os detalhes pelo WhatsApp antes do envio.",
  },
  {
    q: "Posso retirar na loja?",
    a: "Sim! Você pode retirar seu pedido diretamente na nossa loja em São Luís sem nenhum custo adicional. Basta combinar o horário pelo WhatsApp.",
  },
  {
    q: "Vocês fazem trocas ou devoluções?",
    a: "Não trabalhamos com trocas ou devoluções. Por isso, recomendamos verificar bem o tamanho e as informações do produto antes de finalizar o pedido. Em caso de dúvidas, fale com um de nossos atendentes pelo WhatsApp antes de comprar.",
  },
  {
    q: "Os produtos são originais?",
    a: "Sim, todos os nossos produtos são 100% originais com qualidade garantida. Trabalhamos apenas com fornecedores de confiança.",
  },
  {
    q: "Qual o prazo para receber após o pedido?",
    a: "Após a confirmação do pagamento, entramos em contato para combinar a entrega ou retirada. O prazo depende da sua localização em São Luís e da disponibilidade do mototaxi.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-600 text-gray-800 text-sm pr-4">{q}</span>
        <ChevronDown
          size={18}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-700 text-[#0b1f3a] mb-2">Perguntas Frequentes</h1>
      <p className="text-gray-500 mb-10">Encontre respostas para as dúvidas mais comuns.</p>
      <div className="space-y-3">
        {faqs.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </div>
    </div>
  );
}
