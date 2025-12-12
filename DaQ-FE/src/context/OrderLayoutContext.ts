import { createContext, type Dispatch, type SetStateAction, useContext } from "react";
import type { Item, Set, Buffet } from "../shared/types/common";
import type { ItemWithQuantity } from "../layout/OrderLayout";

export type OrderLayoutContextType = {
    foodItemSelected: ItemWithQuantity[];
    addFoodItem: (item: Item) => void;
    removeFoodItem: (id: number) => void;
    clearFoodItems: () => void;
    selectedItem: Item | Set | Buffet | null;
    paymentModal: boolean;
    setPaymentModal: Dispatch<SetStateAction<boolean>>;
  };
  

  export const OrderLayoutContext = createContext<OrderLayoutContextType | null>(null);

  export function useOrderLayout() {
    const context = useContext(OrderLayoutContext);
    if (!context) throw new Error("useOrderLayout must be used within OrderLayoutContext.Provider");
    return context;
  }
  
