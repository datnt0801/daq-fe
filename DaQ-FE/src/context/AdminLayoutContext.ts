import { createContext, useContext } from "react";
import type { Buffet, Set } from "../shared/types/common";

export type AdminLayoutContextType = {
    Sets: Set[];
    Buffets: Buffet[];
    setSets: React.Dispatch<React.SetStateAction<Set[]>>;
    setBuffets: React.Dispatch<React.SetStateAction<Buffet[]>>;
};

export const AdminLayoutContext = createContext<AdminLayoutContextType | null>(null);

export function useAdminLayout() {
    const context = useContext(AdminLayoutContext);
    if (!context) throw new Error("useAdminLayout must be used within AdminLayoutContext.Provider");
    return context;
}
