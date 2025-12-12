import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Buffet, Set, Item } from "../../shared/types/common";
import type { ItemWithCategory } from "../../layout/OrderLayout";

type Props = {
  open: "sidebar" | "cart" | null;
  setOpen: (value: "sidebar" | "cart" | null) => void;
  buffets: Buffet[];
  sets: Set[];
  monLe: Set[];
  doUong: Item[];
  tab: boolean[];
  setTab: (value: boolean[]) => void;
  itemsAndCategories: ItemWithCategory[];
};

export default function ToggleSidebar({
  open,
  setOpen,
  buffets,
  sets,
  monLe,
  doUong,
  tab,
  setTab,
  itemsAndCategories,
}: Props) {
  const [openTabs, setOpenTabs] = useState<Record<string, boolean>>({});

  const toggleTab = (tab: string) => {
    setOpenTabs((prev) => ({
      ...prev,
      [tab]: !prev[tab],
    }));
  };

  const menus = [
    { tab: "Buffet", children: buffets.map((b) => b.name) },
    { tab: "Set Menu", children: sets.map((s) => s.name) },
    { tab: "Món Lẻ", children: monLe.map((s) => s.name) },
    { tab: "Đồ Uống", children: doUong.map((s) => s.name) },
  ];

  return (
    <>
      <div
        className={`
          fixed top-0 left-0 h-full bg-black text-white shadow-lg
          transition-transform duration-300 ease-in-out
          w-64 z-50
          ${open === "sidebar" ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
          overflow-y-auto
        `}
      >
        <div className="flex justify-between p-3 sticky top-0 z-50 bg-black">
          <h1 className="text-2xl font-bold text-red-500">DaQ LOGO</h1>
          <button
            onClick={() => setOpen(null)}
            className="text-white hover:bg-gray-800 p-2 rounded md:hidden"
          >
            ×
          </button>
        </div>

        {itemsAndCategories.length > 0 ? (
          <nav className="mt-2 space-y-1 px-3 text-white">
            {itemsAndCategories.map((m) => {
              if (m.items.length === 0) return null;
              const isOpen = openTabs[m.category.name];
              return (
                <div key={m.category.name}>
                  <button
                    onClick={() => {
                      toggleTab(m.category.name);
                      setTab(
                        m.category.name === "Buffet"
                          ? tab.map((t, i) => (i === 0 ? !t : t))
                          : m.category.name === "Set Menu"
                          ? tab.map((t, i) => (i === 1 ? !t : t))
                          : m.category.name === "Món Lẻ"
                          ? tab.map((t, i) => (i === 2 ? !t : t))
                          : m.category.name === "Đồ Uống"
                          ? tab.map((t, i) => (i === 3 ? !t : t))
                          : tab
                      );
                    }}
                    className={`w-full text-left p-2 cursor-pointer hover:bg-gray-800 rounded flex justify-between items-center ${
                      isOpen ? "bg-red-900" : ""
                    }`}
                  >
                    <span>{m.category.name}</span>
                    {isOpen ? (
                      <ChevronUp size={16} className="transition-transform" />
                    ) : (
                      <ChevronDown size={16} className="transition-transform" />
                    )}
                  </button>

                  <div
                    className={`pl-6 overflow-visible transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  ><div className="overflow-x-auto">
                    <ul className="list-none space-y-1 py-1">
                      {m.items.map((c) => (
                        <li
                          key={c.id}
                          className="cursor-pointer hover:text-red-400 transition-colors"
                        >
                          <button className="w-full text-left p-2 hover:bg-gray-800 rounded focus:bg-red-900">
                            {c.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        ) : (
          <nav className="mt-2 space-y-1 px-3 text-white">
            {menus.map((m) => {
              const isOpen = openTabs[m.tab];
              return (
                <div key={m.tab}>
                  <button
                    onClick={() => {
                      toggleTab(m.tab);
                      setTab(
                        m.tab === "Buffet"
                          ? tab.map((t, i) => (i === 0 ? !t : t))
                          : m.tab === "Set Menu"
                          ? tab.map((t, i) => (i === 1 ? !t : t))
                          : m.tab === "Món Lẻ"
                          ? tab.map((t, i) => (i === 2 ? !t : t))
                          : m.tab === "Đồ Uống"
                          ? tab.map((t, i) => (i === 3 ? !t : t))
                          : tab
                      );
                    }}
                    className={`w-full text-left p-2 cursor-pointer hover:bg-gray-800 rounded flex justify-between items-center ${
                      isOpen ? "bg-red-900" : ""
                    }`}
                  >
                    <span>{m.tab}</span>
                    {isOpen ? (
                      <ChevronUp size={16} className="transition-transform" />
                    ) : (
                      <ChevronDown size={16} className="transition-transform" />
                    )}
                  </button>

                  <div
                    className={`pl-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="list-none space-y-1 py-1">
                      {m.children.map((c) => (
                        <li
                          key={c}
                          className="cursor-pointer hover:text-red-400 transition-colors"
                        >
                          <button className="w-full text-left p-2 hover:bg-gray-800 rounded focus:bg-red-900">
                            {c}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>
        )}
      </div>

      {open === "sidebar" && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(null)}
        />
      )}
    </>
  );
}
