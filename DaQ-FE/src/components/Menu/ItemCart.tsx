import type { Item } from "../../shared/types/common";

export default function ItemCart({
  item,
  onEdit,
  onDelete,
  onClick,
}: {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
  onClick: () => void;
}) {
  return (
    <div
      className="w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] "
      onClick={onClick}
    >
      <div className="inset-0 w-full ">
        <img
          className="border rounded-3xl"
          src={`${item.image}`}
          // src="https://brand-pcms.ggg.systems/media/catalog/product/cache/fccf9bc1c56510f6f2e84ded9c30a375/6/0/60001584-ba-chi-heo-iberico_2_1.jpg"
          alt="mon an"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <b>{item.name}</b>
        <p>{item.description}</p>
        <p>{item.price.toLocaleString()}đ</p>
        <div className="flex justify-center gap-2 p-2">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100 font-semibold focus:bg-gray-100 focus:underline"
            onClick={() => onEdit(item)}
          >
            Edit
          </button>
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100 font-semibold focus:bg-gray-100 focus:underline"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
