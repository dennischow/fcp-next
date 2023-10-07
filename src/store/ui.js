import { create } from "zustand";

const useUIStore = create((set) => {
    return {
        isPanelContactShow: false,
        isPanelSearchShow: false,
        setIsPanelContactShow: (value) => set({ isPanelContactShow: value }),
        setIsPanelSearchShow: (value) => set({ isPanelSearchShow: value }),
    };
});

export default useUIStore;
