import { create } from "zustand";

const useEntriesStore = create((set) => {
    return {
        projectEntries: false,
        articleEntries: false,
        testimonialEntries: false,
        setProjectEntries: (value) => set({ projectEntries: value }),
        setArticleEntries: (value) => set({ articleEntries: value }),
        setTestimonialEntries: (value) => set({ testimonialEntries: value }),
    };
});

export default useEntriesStore;
