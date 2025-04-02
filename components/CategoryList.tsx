import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

type Category = {
  name: string;
  subcategories: string[];
};

type CategoryListProps<T extends string> = {
  categories: Category[];
  activeCategory: string | null;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCategoryClick: (categoryName: string) => void;
  onSubcategoryClick: (subcategory: T) => void;
  activeSubcategory: T | null;
  title: string;
};

export const CategoryList = <T extends string>({
  categories,
  activeCategory,
  searchTerm,
  onSearchChange,
  onCategoryClick,
  onSubcategoryClick,
  activeSubcategory,
  title,
}: CategoryListProps<T>) => {
  return (
    <aside className="w-full lg:w-1/4 border-r border-white/10 overflow-y-auto p-5">
      <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
      <input
        type="text"
        placeholder={`Buscar categoría de ${title.toLowerCase()}...`}
        className="w-full max-w-full mb-4 px-3 py-1.5 rounded-md bg-white/10 text-sm text-white placeholder-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8e611] box-border transition-all"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {categories.map((cat) => (
        <div key={cat.name} className="mb-4">
          <button
            onClick={() => onCategoryClick(cat.name)}
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
                {cat.subcategories.map((sub) => (
                  <li key={sub}>
                    <button
                      onClick={() => onSubcategoryClick(sub as T)}
                      className={clsx(
                        "w-full text-left px-3 py-2 rounded-md transition-all text-sm",
                        activeSubcategory === sub
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
  );
}; 