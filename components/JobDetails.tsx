import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Job } from "@/types";

type JobDetailsProps = {
  job: Job;
  onBack: () => void;
};

export const JobDetails = ({ job, onBack }: JobDetailsProps) => {
  return (
    <motion.div
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
          <h2 className="text-2xl font-bold text-white mb-2">{job.title}</h2>
          <div className="flex items-center gap-2 text-white/60">
            <span>{job.company}</span>
            <span>•</span>
            <span>{job.location}</span>
          </div>
        </div>
        <div className="bg-[#b8e611]/20 text-[#b8e611] px-3 py-1.5 rounded-full">
          {job.budget}
        </div>
      </div>

      <p className="text-white/80 mb-6 text-lg">{job.description}</p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Requisitos:</h3>
        <ul className="list-disc list-inside text-white/70 space-y-2">
          {job.requirements.map((req, idx) => (
            <li key={`${job.id}-req-${idx}`} className="text-lg">
              {req}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Habilidades requeridas:</h3>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, idx) => (
            <span
              key={`${job.id}-skill-${idx}`}
              className="px-3 py-1.5 text-sm rounded-full bg-white/10 text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-8 text-white/60">
        <div>Publicado: {new Date(job.postedDate).toLocaleDateString()}</div>
        <div>Deadline: {new Date(job.deadline).toLocaleDateString()}</div>
      </div>

      <button
        className="w-full py-3 bg-[#b8e611] text-black font-semibold rounded-lg hover:bg-[#a5d00f] transition-colors text-lg"
        onClick={() => {/* Implementar lógica de aplicación */}}
      >
        Aplicar a este trabajo
      </button>
    </motion.div>
  );
}; 