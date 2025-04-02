export type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    requirements: string[];
    budget: string;
    skills: string[];
    postedDate: string;
    deadline: string;
    status: string;
};

export type Provider = {
    name: string;
    location: string;
    rating: number;
    desc: string;
    experience: number;
    available: boolean;
    skills: string[];
    works: string[];
}; 