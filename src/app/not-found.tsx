import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-800 text-[#e8edf7]">404</p>
      <h1 className="text-2xl font-700 text-[#0b1f3a] mt-2 mb-2">Página não encontrada</h1>
      <p className="text-gray-500 text-sm mb-8">O produto ou página que você procura não existe.</p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          href="/"
          className="bg-[#0b1f3a] text-white px-6 py-3 rounded-xl font-600 hover:bg-[#153a72] transition-colors"
        >
          Voltar ao início
        </Link>
        <Link
          href="/produtos"
          className="border border-[#0b1f3a] text-[#0b1f3a] px-6 py-3 rounded-xl font-600 hover:bg-[#e8edf7] transition-colors"
        >
          Ver produtos
        </Link>
      </div>
    </div>
  );
}
