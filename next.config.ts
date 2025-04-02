import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ✅ Activa el modo export estático
  images: {
    unoptimized: true, // ✅ Evita el uso de next/image optimizada
  },
  // 👇 Solo si tu repositorio no está en raíz (recomendado para GitHub Pages)
  basePath: "/baptist",
  assetPrefix: "/baptist/",
};

export default nextConfig;
