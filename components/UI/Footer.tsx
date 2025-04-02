import { Wallet } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-8 px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo y descripción */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="text-2xl font-bold mb-2">
              <span className="text-[#b8e611]">b</span>
              <span className="text-white">a</span>
              <span className="text-[#b8e611]">p</span>
              <span className="text-white">tist</span>
            </div>
            <p className="text-white/70 text-sm max-w-md">
              Conectando talento global con oportunidades, potenciado por tecnología blockchain para pagos rápidos y seguros.
            </p>
          </div>

          {/* Tecnologías blockchain */}
          <div className="flex flex-col items-center lg:items-end">
            <div className="text-sm text-white/70 mb-3">Powered by</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Wallet className="text-[#14F195] w-5 h-5" />
                <div>
                  <div className="text-white text-sm font-medium">Solana</div>
                  <div className="text-white/50 text-xs">Pagos en 20s</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="text-[#627EEA] w-5 h-5" />
                <div>
                  <div className="text-white text-sm font-medium">ETH L2</div>
                  <div className="text-white/50 text-xs">Base & Linea</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center lg:text-left">
          <p className="text-white/50 text-sm">
            © 2025 Baptist. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}; 