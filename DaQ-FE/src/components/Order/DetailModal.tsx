import { ArrowLeftIcon } from "lucide-react";
import type { Set, Buffet, Item } from "../../shared/types/common";
import { useEffect, useState } from "react";
import { getItemsByBuffetId, getItemsBySetId } from "./orderService";
import { getItems } from "../Menu/menuService";
import { OrderCart } from "../../pages/order/OrderPage";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: Set | Buffet | Item | null;
}

function DetailModal({ isOpen, onClose, item }: DetailModalProps) {
  const [detailItem, setDetailItem] = useState<Item[]>();

  const fetchDetailItem = async () => {
    if (!item) return;
    setDetailItem(undefined);
    if (item.type === "buffet") {
      const res = await getItemsByBuffetId(item.id.toString());
      setDetailItem(res);
    }
    if (item.type === "set") {
      const res = await getItemsBySetId(item.id.toString());
      setDetailItem(res);
    }
    if (item.type === "item") {
      const res = await getItems(1, 99, "", "", "", "");
      setDetailItem(res);
    }
  };

  useEffect(() => {
    fetchDetailItem();
  }, [item]);

  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 bg-gray-900 w-full overflow-y-auto flex flex-col z-40">
      <div className="sticky top-0 bg-gray-900 z-50">
        <button
          onClick={onClose}
          className="text-white flex gap-2 items-center px-2 py-3"
        >
          <ArrowLeftIcon className="" />
          Quay lại
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {detailItem?.map((item) => (
          <OrderCart key={item.id} item={item} hidden={true} />
        ))}
        {detailItem?.map((item) => (
          <OrderCart key={item.id} item={item} hidden={true} />
        ))}
        {detailItem?.map((item) => (
          <OrderCart key={item.id} item={item} hidden={true} />
        ))}
      </div>
    </div>
  );
}

export default DetailModal;
