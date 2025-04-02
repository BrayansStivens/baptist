import { useState } from 'react';
import { categories, providers } from '@/utils/mockData';
import type { Provider } from '@/types';

type ProviderKey = keyof typeof providers;

export const useFreelancerExplorer = () => {
    const [activeFreelancerCategory, setActiveFreelancerCategory] = useState<string | null>(null);
    const [activeFreelancerSub, setActiveFreelancerSub] = useState<ProviderKey | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<Provider | null>(null);
    const [freelancerSearchTerm, setFreelancerSearchTerm] = useState("");
    const [freelancerCategorySearchTerm, setFreelancerCategorySearchTerm] = useState("");

    const filteredFreelancerCategories = categories.filter((cat) => {
        const text = freelancerCategorySearchTerm.toLowerCase();
        return (
            cat.name.toLowerCase().includes(text) ||
            cat.subcategories.some((sub) => sub.toLowerCase().includes(text))
        );
    });

    const filteredProviders = activeFreelancerSub && providers[activeFreelancerSub]
        ? providers[activeFreelancerSub].filter((person: Provider) => {
            const text = freelancerSearchTerm.toLowerCase();
            return (
                person.name.toLowerCase().includes(text) ||
                person.location?.toLowerCase().includes(text) ||
                person.skills?.some((s: string) => s.toLowerCase().includes(text))
            );
        })
        : [];

    const handleFreelancerCategoryClick = (categoryName: string) => {
        setActiveFreelancerCategory((prev) => (prev === categoryName ? null : categoryName));
        setSelectedPerson(null);
        setActiveFreelancerSub(null);
        setFreelancerSearchTerm("");
    };

    const handleFreelancerClick = (person: Provider) => {
        setSelectedPerson(person);
    };

    const handleBackToList = () => {
        setSelectedPerson(null);
    };

    return {
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
        handleFreelancerCategoryClick,
        handleFreelancerClick,
        handleBackToList,
    };
}; 