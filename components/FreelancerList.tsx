import { motion } from "framer-motion";
import type { Provider } from "@/types";
import clsx from "clsx";

type FreelancerListProps = {
  freelancers: Provider[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFreelancerClick: (freelancer: Provider) => void;
  activeFreelancerSub: string | null;
};

export const FreelancerList = ({
  freelancers,
  searchTerm,
  onSearchChange,
  onFreelancerClick,
  activeFreelancerSub,
}: FreelancerListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{activeFreelancerSub}</h2>
        <input
          type="text"
          placeholder="Buscar freelancer..."
          className="w-64 px-3 py-1.5 rounded-md bg-white/10 text-sm text-white placeholder-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8e611]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="grid gap-4">
        {freelancers.map((person: Provider, index: number) => (
          <motion.div
            key={`${person.name}-${person.location}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                <p className="text-sm text-white/60">{person.location}</p>
              </div>
              <div className={clsx(
                "px-2 py-1 rounded text-xs font-medium",
                person.available ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
              )}>
                {person.available ? "Disponible" : "No disponible"}
              </div>
            </div>
            
            <div className="text-[#b8e611] mb-2">
              {"★".repeat(person.rating)}
              {"☆".repeat(5 - person.rating)}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {person.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={`${person.name}-${person.location}-${index}-skill-${idx}`}
                  className="px-2 py-1 text-xs rounded-full bg-white/10 text-white"
                >
                  {skill}
                </span>
              ))}
              {person.skills.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white">
                  +{person.skills.length - 3}
                </span>
              )}
            </div>
            
            <button
              onClick={() => onFreelancerClick(person)}
              className="w-full py-2 px-4 bg-[#b8e611] text-black font-medium rounded-md hover:bg-[#a5d00f] transition-colors"
            >
              Ver perfil completo
            </button>
          </motion.div>
        ))}

        {freelancers.length === 0 && (
          <p className="text-white/50 italic text-center py-8">
            No se encontraron freelancers con ese criterio.
          </p>
        )}
      </div>
    </div>
  );
}; 