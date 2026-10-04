"use client";

import { Bike, Store, Shield, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="bg-[#0b1f3a] py-6 md:py-10 mt-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile: Carousel / Desktop: Static Grid */}
        <div className="flex md:block">
          <motion.div
            className="flex gap-8 md:hidden"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity
            }}
          >
            {[...benefits, ...benefits].map((b, i) => (
              <div
                key={`${b.title}-${i}`}
                className="flex flex-col items-center text-center gap-1 min-w-[140px]"
              >
                <div className="text-blue-300">{b.icon}</div>
                <p className="text-white font-600 text-xs">{b.title}</p>
                <p className="text-blue-200 text-[10px] leading-tight">{b.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 gap-6 w-full">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="text-blue-300">{b.icon}</div>
                <p className="text-white font-600 text-sm">{b.title}</p>
                <p className="text-blue-200 text-xs leading-tight">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}