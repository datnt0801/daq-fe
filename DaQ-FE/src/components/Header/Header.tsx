import { Armchair, Phone, ShoppingBasket } from "lucide-react";
import { useOrderLayout } from "../../context/OrderLayoutContext";

type HeaderProps = {
  open: "sidebar" | "cart" | null;
  setOpen: (value: "sidebar" | "cart" | null) => void;
  hideCartSidebar?: boolean;
};

export default function Header({
  open,
  setOpen,
  hideCartSidebar,
}: HeaderProps) {
  const { foodItemSelected } = useOrderLayout();

  return (
    <header className="bg-black shadow flex justify-between items-center gap-1 p-1">
      <button
        onClick={() => setOpen("sidebar")}
        className="p-3 rounded transition text-white cursor-pointer md:text-black md:cursor-default"
      >
        ☰
      </button>

      <button className="p-2 flex items-center gap-2 rounded text-white cursor-pointer">
        <Phone color="yellow" />
        Gọi nhân viên
      </button>
      <button className="p-2 flex items-center gap-2 rounded text-white cursor-pointer">
        <Armchair />
        Bàn A12
      </button>

      <button
        onClick={() => setOpen("cart")}
        className={
          hideCartSidebar
            ? " text-black"
            : "p-3 flex items-center gap-2 rounded text-white cursor-pointer"
        }
      >
        <ShoppingBasket />
        <div
          className={
            hideCartSidebar
              ? "text-black"
              : " bg-red-700 rounded-full w-4 h-4 flex items-center justify-center"
          }
        >
          {foodItemSelected.reduce((acc, item) => acc + item.quantity, 0)}
        </div>
      </button>
    </header>
  );
}
