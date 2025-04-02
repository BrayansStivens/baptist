import { useState } from 'react';
import { categories, jobs } from '@/utils/mockData';
import type { Job } from '@/types';

type JobKey = keyof typeof jobs;

export const useJobExplorer = () => {
    const [activeJobCategory, setActiveJobCategory] = useState<string | null>(null);
    const [activeJobSub, setActiveJobSub] = useState<JobKey | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [jobSearchTerm, setJobSearchTerm] = useState("");
    const [jobCategorySearchTerm, setJobCategorySearchTerm] = useState("");

    const filteredJobCategories = categories.filter((cat) => {
        const text = jobCategorySearchTerm.toLowerCase();
        return (
            cat.name.toLowerCase().includes(text) ||
            cat.subcategories.some((sub) => sub.toLowerCase().includes(text))
        );
    });

    const filteredJobs = activeJobSub && jobs[activeJobSub]
        ? jobs[activeJobSub].filter((job: Job) => {
            const text = jobSearchTerm.toLowerCase();
            return (
                job.title.toLowerCase().includes(text) ||
                job.company.toLowerCase().includes(text) ||
                job.location.toLowerCase().includes(text) ||
                job.skills.some((s: string) => s.toLowerCase().includes(text))
            );
        })
        : [];

    const handleJobCategoryClick = (categoryName: string) => {
        setActiveJobCategory((prev) => (prev === categoryName ? null : categoryName));
        setSelectedJob(null);
        setActiveJobSub(null);
        setJobSearchTerm("");
    };

    const handleJobClick = (job: Job) => {
        setSelectedJob(job);
    };

    const handleBackToList = () => {
        setSelectedJob(null);
    };

    return {
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
        handleJobCategoryClick,
        handleJobClick,
        handleBackToList,
    };
}; 