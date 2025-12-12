import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  items?: string[];
  defaultItem?: string;
}

export default function Dropdown({
  items = ["HTML", "CSS", "JavaScript"],
  defaultItem = "HTML",
}: DropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(defaultItem);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: string) => {
    setSelected(item);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Nút chính */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-44 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-gray-800">{selected}</span>
        <svg
          className={`w-4 h-4 ml-3 transform transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Menu dropdown */}
      <div
        className={`absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform origin-top transition-all duration-300 ease-out
          ${
            open
              ? "opacity-100 scale-100 translate-y-0 max-h-60"
              : "opacity-0 scale-95 -translate-y-2 max-h-0"
          }
        `}
      >
        {items.map((item) => (
          <button
            key={item}
            onClick={() => handleSelect(item)}
            className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
              selected === item
                ? "bg-gray-100 text-blue-600"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
