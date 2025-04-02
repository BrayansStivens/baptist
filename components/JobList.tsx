import { motion } from "framer-motion";
import type { Job } from "@/types";
import clsx from "clsx";

type JobListProps = {
  jobs: Job[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onJobClick: (job: Job) => void;
  activeJobSub: string | null;
};

export const JobList = ({
  jobs,
  searchTerm,
  onSearchChange,
  onJobClick,
  activeJobSub,
}: JobListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{activeJobSub}</h2>
        <input
          type="text"
          placeholder="Buscar trabajo..."
          className="w-64 px-3 py-1.5 rounded-md bg-white/10 text-sm text-white placeholder-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8e611]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="grid gap-4">
        {jobs.map((job: Job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                <p className="text-sm text-white/60">{job.company} • {job.location}</p>
              </div>
              <div className="bg-[#b8e611]/20 text-[#b8e611] px-3 py-1 rounded-full text-sm">
                {job.budget}
              </div>
            </div>

            <p className="text-white/80 mb-4">{job.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, idx) => (
                <span
                  key={`${job.id}-skill-${idx}`}
                  className="px-2 py-1 text-xs rounded-full bg-white/10 text-white"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm text-white/60">
              <div>Publicado: {new Date(job.postedDate).toLocaleDateString()}</div>
              <div>Deadline: {new Date(job.deadline).toLocaleDateString()}</div>
            </div>

            <button
              onClick={() => onJobClick(job)}
              className="w-full mt-4 py-2 px-4 bg-[#b8e611] text-black font-medium rounded-md hover:bg-[#a5d00f] transition-colors"
            >
              Ver detalles y aplicar
            </button>
          </motion.div>
        ))}

        {jobs.length === 0 && (
          <p className="text-white/50 italic text-center py-8">
            No se encontraron trabajos con ese criterio.
          </p>
        )}
      </div>
    </div>
  );
}; 