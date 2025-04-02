"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, providers } from "@/utils/mockData";
import clsx from "clsx";
import { ChevronRight, X } from "lucide-react";

type ProviderKey = keyof typeof providers;
type Provider = {
  name: string;
  location: string;
  rating: number;
  desc: string;
  experience: number;
  available: boolean;
  skills: string[];
  works: string[];
};

export default function ServiceExplorer() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<ProviderKey | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Provider | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");

  useEffect(() => {
    const text = categorySearchTerm.toLowerCase();
    for (const cat of categories) {
      for (const sub of cat.subcategories) {
        if (sub.toLowerCase().includes(text)) {
          setActiveCategory(cat.name);
          setActiveSub(sub as ProviderKey);
          return;
        }
      }
    }
  }, [categorySearchTerm]);

  const filteredCategories = categories.filter((cat) => {
    const text = categorySearchTerm.toLowerCase();
    return (
      cat.name.toLowerCase().includes(text) ||
      cat.subcategories.some((sub) => sub.toLowerCase().includes(text))
    );
  });

  const filteredPeople =
    activeSub && providers[activeSub]
      ? providers[activeSub].filter((person: any) => {
          const text = searchTerm.toLowerCase();
          return (
            person.name.toLowerCase().includes(text) ||
            person.location?.toLowerCase().includes(text) ||
            person.skills?.some((s: string) => s.toLowerCase().includes(text))
          );
        })
      : [];

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory((prev) => (prev === categoryName ? null : categoryName));
    setSelectedPerson(null);
    setActiveSub(null);
    setSearchTerm("");
  };

  const closeMobileModal = () => setSelectedPerson(null);

  return (
    <>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)] gap-4 px-4 py-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 border-r border-white/10 overflow-y-auto p-5">
          <input
            type="text"
            placeholder="Buscar categoría o subcategoría..."
            className="w-full max-w-full mb-4 px-3 py-1.5 rounded-md bg-white/10 text-sm text-white placeholder-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8e611] box-border transition-all"
            value={categorySearchTerm}
            onChange={(e) => setCategorySearchTerm(e.target.value)}
          />

          {filteredCategories.map((cat) => (
            <div key={cat.name} className="mb-4">
              <button
                onClick={() => handleCategoryClick(cat.name)}
                className={clsx(
                  "flex items-center justify-between w-full text-left text-lg font-semibold mb-2 px-3 py-2 rounded-md transition-all",
                  "hover:text-[#b8e611] text-white cursor-pointer hover:scale-[1.01] hover:shadow-md group"
                )}
              >
                <span>{cat.name}</span>
                <ChevronRight
                  size={18}
                  className={clsx(
                    "transition-transform duration-300 group-hover:text-[#b8e611]",
                    activeCategory === cat.name
                      ? "rotate-90 text-[#b8e611]"
                      : "text-white/60"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {activeCategory === cat.name && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden space-y-1"
                  >
                    {cat.subcategories
                      .filter((sub) =>
                        sub
                          .toLowerCase()
                          .includes(categorySearchTerm.toLowerCase())
                      )
                      .map((sub) => (
                        <li key={sub}>
                          <button
                            onClick={() => {
                              setActiveSub(sub as ProviderKey);
                              setSelectedPerson(null);
                              setSearchTerm("");
                            }}
                            className={clsx(
                              "w-full text-left px-3 py-2 rounded-md transition-all text-sm",
                              activeSub === sub
                                ? "bg-[#b8e611] text-black font-bold"
                                : "hover:bg-white/10 text-white"
                            )}
                          >
                            {sub}
                          </button>
                        </li>
                      ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </aside>

        {/* Centro: Lista de personas */}
        <section className="w-full lg:w-1/2 overflow-y-auto p-5">
          <h2 className="text-xl font-bold mb-2 transition-all">
            {activeSub ? activeSub : "Selecciona una subcategoría"}
          </h2>

          {activeSub && (
            <>
              <input
                type="text"
                placeholder="Buscar por nombre, skill o ciudad..."
                className="w-full max-w-full mb-4 px-3 py-1.5 rounded-md bg-white/10 text-sm text-white placeholder-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8e611] box-border transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="space-y-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSub}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    {filteredPeople.map((person: any) => (
                      <motion.div
                        key={person.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white/5 p-4 rounded-xl cursor-pointer hover:scale-[1.015] hover:bg-white/10 transition-transform duration-300"
                        onClick={() => setSelectedPerson(person)}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-white">
                            {person.name}
                          </h3>
                          <span className="text-sm text-white/50">
                            {person.location}
                          </span>
                        </div>
                        <p className="text-sm text-white/80">{person.desc}</p>
                        <div className="text-[#b8e611] mt-1">
                          {"★".repeat(person.rating)}
                          {"☆".repeat(5 - person.rating)}
                        </div>
                      </motion.div>
                    ))}

                    {filteredPeople.length === 0 && (
                      <p className="text-white/40 italic text-sm">
                        No se encontraron personas con ese criterio.
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </section>

        {/* Panel lateral en desktop */}
        <aside className="w-full lg:w-1/4 border-l border-white/10 overflow-y-auto p-4 hidden lg:block">
          {selectedPerson ? (
            <PersonDetails person={selectedPerson} />
          ) : (
            <div className="text-white/50 italic">
              Selecciona una persona para ver su información.
            </div>
          )}
        </aside>
      </div>

      {/* Modal en mobile */}
      <AnimatePresence>
        {selectedPerson && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileModal}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) closeMobileModal();
              }}
              className="bg-[#111] w-full p-4 rounded-t-2xl max-h-[90%] overflow-y-auto shadow-xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">
                  {selectedPerson.name}
                </h2>
                <button
                  onClick={closeMobileModal}
                  className="text-white/60 hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>
              <PersonDetails person={selectedPerson} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Extraído como componente para compartir entre desktop y mobile
function PersonDetails({ person }: { person: Provider }) {
  return (
    <motion.div
      key={person.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className="text-white/80 mb-1 italic">
        {person.location} • {person.experience} años de experiencia
      </p>
      <div
        className={clsx(
          "inline-block text-xs px-2 py-1 rounded mb-2",
          person.available ? "bg-green-600 text-white" : "bg-red-600 text-white"
        )}
      >
        {person.available ? "Disponible" : "No disponible"}
      </div>
      <p className="text-white/80 mb-2">{person.desc}</p>
      <div className="text-[#b8e611] mb-4">
        {"★".repeat(person.rating)}
        {"☆".repeat(5 - person.rating)}
      </div>

      {person.skills && (
        <div className="mb-4">
          <p className="text-sm text-white/60 mb-1">Habilidades:</p>
          <div className="flex flex-wrap gap-2">
            {person.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-full bg-white/10 text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {person.works && (
        <>
          <p className="text-sm text-white/60">Trabajos realizados:</p>
          <ul className="list-disc list-inside text-white/70 mt-2 space-y-1">
            {person.works.map((work, idx) => (
              <li key={idx}>{work}</li>
            ))}
          </ul>
        </>
      )}
    </motion.div>
  );
}
