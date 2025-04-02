"use client";
import { useState } from "react";
import { useJobExplorer } from "@/hooks/useJobExplorer";
import { useFreelancerExplorer } from "@/hooks/useFreelancerExplorer";
import { CategoryList } from "./CategoryList";
import { JobList } from "./JobList";
import { JobDetails } from "./JobDetails";
import { FreelancerList } from "./FreelancerList";
import { FreelancerDetails } from "./FreelancerDetails";
import { jobs, providers } from "@/utils/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";

type JobKey = keyof typeof jobs;
type ProviderKey = keyof typeof providers;

type MobileView = "categories" | "list" | "details";

export default function ServiceExplorer() {
  const [showingProvidersList, setShowingProvidersList] = useState(true);
  const [activeSection, setActiveSection] = useState<"jobs" | "freelancers">("jobs");
  const [mobileView, setMobileView] = useState<MobileView>("categories");

  const {
    activeJobCategory,
    activeJobSub,
    selectedJob,
    jobSearchTerm,
    jobCategorySearchTerm,
    filteredJobCategories,
    filteredJobs,
    setActiveJobSub,
    setJobSearchTerm,
    setJobCategorySearchTerm,
    handleJobCategoryClick: handleJobCategoryClickBase,
    handleJobClick,
    handleBackToList: handleJobBackToList,
  } = useJobExplorer();

  const {
    activeFreelancerCategory,
    activeFreelancerSub,
    selectedPerson,
    freelancerSearchTerm,
    freelancerCategorySearchTerm,
    filteredFreelancerCategories,
    filteredProviders,
    setActiveFreelancerSub,
    setFreelancerSearchTerm,
    setFreelancerCategorySearchTerm,
    handleFreelancerCategoryClick: handleFreelancerCategoryClickBase,
    handleFreelancerClick,
    handleBackToList: handleFreelancerBackToList,
  } = useFreelancerExplorer();

  const handleJobClickWithList = (job: any) => {
    handleJobClick(job);
    setShowingProvidersList(false);
    setMobileView("details");
  };

  const handleFreelancerClickWithList = (person: any) => {
    handleFreelancerClick(person);
    setShowingProvidersList(false);
    setMobileView("details");
  };

  const handleBackToList = () => {
    setShowingProvidersList(true);
    setMobileView("list");
    handleJobBackToList();
    handleFreelancerBackToList();
  };

  const handleJobCategoryClick = (category: string) => {
    setActiveSection("jobs");
    setActiveFreelancerSub(null);
    setFreelancerSearchTerm("");
    handleFreelancerBackToList();
    handleJobCategoryClickBase(category);
    setShowingProvidersList(true);
  };

  const handleFreelancerCategoryClick = (category: string) => {
    setActiveSection("freelancers");
    setActiveJobSub(null);
    setJobSearchTerm("");
    handleJobBackToList();
    handleFreelancerCategoryClickBase(category);
    setShowingProvidersList(true);
  };

  const handleJobSubcategoryClick = (sub: JobKey) => {
    setActiveSection("jobs");
    setActiveFreelancerSub(null);
    setFreelancerSearchTerm("");
    handleFreelancerBackToList();
    setActiveJobSub(sub);
    setJobSearchTerm("");
    setMobileView("list");
    setShowingProvidersList(true);
  };

  const handleFreelancerSubcategoryClick = (sub: ProviderKey) => {
    setActiveSection("freelancers");
    setActiveJobSub(null);
    setJobSearchTerm("");
    handleJobBackToList();
    setActiveFreelancerSub(sub);
    setFreelancerSearchTerm("");
    setMobileView("list");
    setShowingProvidersList(true);
  };

  const handleBackToCategories = () => {
    setMobileView("categories");
  };

  return (
    <div className="h-[calc(100vh-5rem)]">
      {/* Vista móvil */}
      <div className="lg:hidden flex flex-col h-full">
        {/* Tabs alineados a la izquierda */}
        <div className="border-b border-white/10">
          <div className="flex px-3">
            <button
              onClick={() => {
                setActiveSection("jobs");
                setMobileView("categories");
              }}
              className={`py-3 mr-6 text-sm font-medium relative ${
                activeSection === "jobs"
                  ? "text-[#b8e611]"
                  : "text-white/70"
              }`}
            >
              Trabajos
              {activeSection === "jobs" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b8e611]" />
              )}
            </button>
            <button
              onClick={() => {
                setActiveSection("freelancers");
                setMobileView("categories");
              }}
              className={`py-3 text-sm font-medium relative ${
                activeSection === "freelancers"
                  ? "text-[#b8e611]"
                  : "text-white/70"
              }`}
            >
              Freelancers
              {activeSection === "freelancers" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b8e611]" />
              )}
            </button>
          </div>
        </div>

        {/* Contenido a pantalla completa */}
        <div className="flex-1 overflow-y-auto">
          {/* Vista de categorías */}
          {mobileView === "categories" && (
            <div className="px-3 py-4">
              {activeSection === "jobs" && (
                <CategoryList<JobKey>
                  categories={filteredJobCategories}
                  activeCategory={activeJobCategory}
                  searchTerm={jobCategorySearchTerm}
                  onSearchChange={setJobCategorySearchTerm}
                  onCategoryClick={handleJobCategoryClick}
                  onSubcategoryClick={handleJobSubcategoryClick}
                  activeSubcategory={activeJobSub}
                  title="Trabajos"
                />
              )}

              {activeSection === "freelancers" && (
                <CategoryList<ProviderKey>
                  categories={filteredFreelancerCategories}
                  activeCategory={activeFreelancerCategory}
                  searchTerm={freelancerCategorySearchTerm}
                  onSearchChange={setFreelancerCategorySearchTerm}
                  onCategoryClick={handleFreelancerCategoryClick}
                  onSubcategoryClick={handleFreelancerSubcategoryClick}
                  activeSubcategory={activeFreelancerSub}
                  title="Freelancers"
                />
              )}
            </div>
          )}

          {/* Vista de lista */}
          {mobileView === "list" && (
            <div className="px-3 py-4">
              <div className="flex items-center mb-6">
                <button
                  onClick={handleBackToCategories}
                  className="text-white/70 hover:text-white flex items-center gap-2 text-sm"
                >
                  <ChevronLeft size={16} />
                  Volver
                </button>
              </div>

              {activeSection === "jobs" && activeJobSub && (
                <JobList
                  jobs={filteredJobs}
                  searchTerm={jobSearchTerm}
                  onSearchChange={setJobSearchTerm}
                  onJobClick={handleJobClickWithList}
                  activeJobSub={activeJobSub}
                />
              )}

              {activeSection === "freelancers" && activeFreelancerSub && (
                <FreelancerList
                  freelancers={filteredProviders}
                  searchTerm={freelancerSearchTerm}
                  onSearchChange={setFreelancerSearchTerm}
                  onFreelancerClick={handleFreelancerClickWithList}
                  activeFreelancerSub={activeFreelancerSub}
                />
              )}
            </div>
          )}
        </div>

        {/* Vista de detalles */}
        <AnimatePresence>
          {mobileView === "details" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50"
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-x-0 top-16 bottom-0 bg-gray-900 rounded-t-2xl overflow-y-auto"
              >
                <div className="sticky top-0 left-0 right-0 flex items-center justify-between px-3 py-4 bg-gray-900/80 backdrop-blur-sm border-b border-white/10">
                  <button
                    onClick={handleBackToList}
                    className="text-white/70 hover:text-white flex items-center gap-2 text-sm"
                  >
                    <ChevronLeft size={16} />
                    Volver
                  </button>
                  <button
                    onClick={handleBackToList}
                    className="text-white/70 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="px-3 py-4">
                  {selectedJob && (
                    <JobDetails job={selectedJob} onBack={handleBackToList} />
                  )}
                  {selectedPerson && (
                    <FreelancerDetails
                      freelancer={selectedPerson}
                      onBack={handleBackToList}
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vista desktop - Layout original */}
      <div className="hidden lg:flex flex-row gap-4 px-4 py-6 h-full">
        {/* Columna izquierda - Trabajos */}
        <CategoryList<JobKey>
          categories={filteredJobCategories}
          activeCategory={activeJobCategory}
          searchTerm={jobCategorySearchTerm}
          onSearchChange={setJobCategorySearchTerm}
          onCategoryClick={handleJobCategoryClick}
          onSubcategoryClick={handleJobSubcategoryClick}
          activeSubcategory={activeJobSub}
          title="Trabajos"
        />

        {/* Centro - Información seleccionada */}
        <section className="w-1/2 overflow-y-auto p-5">
          {activeSection === "jobs" && (
            <>
              {activeJobSub && showingProvidersList && (
                <JobList
                  jobs={filteredJobs}
                  searchTerm={jobSearchTerm}
                  onSearchChange={setJobSearchTerm}
                  onJobClick={handleJobClickWithList}
                  activeJobSub={activeJobSub}
                />
              )}

              {selectedJob && !showingProvidersList && (
                <JobDetails job={selectedJob} onBack={handleBackToList} />
              )}
            </>
          )}

          {activeSection === "freelancers" && (
            <>
              {activeFreelancerSub && showingProvidersList && (
                <FreelancerList
                  freelancers={filteredProviders}
                  searchTerm={freelancerSearchTerm}
                  onSearchChange={setFreelancerSearchTerm}
                  onFreelancerClick={handleFreelancerClickWithList}
                  activeFreelancerSub={activeFreelancerSub}
                />
              )}

              {selectedPerson && !showingProvidersList && (
                <FreelancerDetails
                  freelancer={selectedPerson}
                  onBack={handleBackToList}
                />
              )}
            </>
          )}

          {!activeJobSub && !activeFreelancerSub && !selectedJob && !selectedPerson && (
            <div className="text-white/50 italic text-center mt-10">
              Selecciona una categoría para ver los trabajos o freelancers disponibles
            </div>
          )}
        </section>

        {/* Columna derecha - Freelancers */}
        <CategoryList<ProviderKey>
          categories={filteredFreelancerCategories}
          activeCategory={activeFreelancerCategory}
          searchTerm={freelancerCategorySearchTerm}
          onSearchChange={setFreelancerCategorySearchTerm}
          onCategoryClick={handleFreelancerCategoryClick}
          onSubcategoryClick={handleFreelancerSubcategoryClick}
          activeSubcategory={activeFreelancerSub}
          title="Freelancers"
        />
      </div>
    </div>
  );
}
