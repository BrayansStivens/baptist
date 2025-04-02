import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Provider } from "@/types";
import clsx from "clsx";

type FreelancerDetailsProps = {
  freelancer: Provider;
  onBack: () => void;
};

export const FreelancerDetails = ({ freelancer, onBack }: FreelancerDetailsProps) => {
  return (
    <motion.div
      key={`detail-${freelancer.name}-${freelancer.location}-${freelancer.experience}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="bg-white/5 p-6 rounded-xl"
    >
      <button
        onClick={onBack}
        className="flex items-center text-white/60 hover:text-white mb-6 transition-colors"
      >
        <ChevronRight className="rotate-180 mr-1" size={16} />
        Volver a la lista
      </button>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{freelancer.name}</h2>
          <div className="flex items-center gap-2 text-white/60">
            <span>{freelancer.location}</span>
            <span>•</span>
            <span>{freelancer.experience} años de experiencia</span>
          </div>
        </div>
        <div className={clsx(
          "px-3 py-1.5 rounded text-sm font-medium",
          freelancer.available ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
        )}>
          {freelancer.available ? "Disponible" : "No disponible"}
        </div>
      </div>

      <div className="text-[#b8e611] mb-4 text-xl">
        {"★".repeat(freelancer.rating)}
        {"☆".repeat(5 - freelancer.rating)}
      </div>

      <p className="text-white/80 mb-6 text-lg">{freelancer.desc}</p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Habilidades:</h3>
        <div className="flex flex-wrap gap-2">
          {freelancer.skills.map((skill, idx) => (
            <span
              key={`detail-${freelancer.name}-${freelancer.location}-${freelancer.experience}-skill-${idx}`}
              className="px-3 py-1.5 text-sm rounded-full bg-white/10 text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-3">Trabajos realizados:</h3>
        <ul className="list-disc list-inside text-white/70 space-y-2">
          {freelancer.works.map((work, idx) => (
            <li 
              key={`detail-${freelancer.name}-${freelancer.location}-${freelancer.experience}-work-${idx}`}
              className="text-lg"
            >
              {work}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="w-full py-3 bg-[#b8e611] text-black font-semibold rounded-lg hover:bg-[#a5d00f] transition-colors text-lg"
        onClick={() => {/* Implementar lógica de contacto */}}
      >
        Contactar freelancer
      </button>
    </motion.div>
  );
}; 