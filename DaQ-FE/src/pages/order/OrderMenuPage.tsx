import { useOutletContext } from "react-router-dom";
import type { Buffet, Item, Set } from "../../shared/types/common";

type CartItem = {
  buffet?: Buffet;
  set?: Set;
  item?: Item;
};

function OrderCart({
  cartItem,
  hidden,
  setIsModalOpen,
  setSelectedItem,
  setIsDetailModalOpen,
}: {
  cartItem: CartItem;
  hidden?: boolean;
  setIsModalOpen: (value: boolean) => void;
  setSelectedItem: (value: Set | Buffet | Item | null) => void;
  setIsDetailModalOpen: (value: boolean) => void;
}) {
  return (
    <div className="flex h-1/2 bg-gray-900 text-white rounded-2xl mx-1 justify-center">
       <div className="w-1/2 flex justify-end bg-gray-800 rounded-l-2xl">
        <div className="h-full overflow-hidden rounded-l-2xl">
          <img
          className="object-contain h-full"
          src={`${cartItem.buffet?.image || cartItem.set?.image || cartItem.item?.image}`}
          alt="abc"
        />
        </div>
      </div>
      <div className="w-1/2 flex justify-start bg-gray-800 rounded-r-2xl">
        <div className="flex flex-col justify-between items-start p-2 bg-gray-800">
          <div>
            <p className="text-sm">
              {cartItem.buffet?.name || cartItem.set?.name || cartItem.item?.name}{" "}
              •{" "}
              {cartItem.buffet?.price.toLocaleString() ||
                cartItem.set?.price.toLocaleString() ||
                cartItem.item?.price.toLocaleString()}
              đ
            </p>
            <h1 className="self-start text-3xl font-bold">
              {cartItem.buffet?.name || cartItem.set?.name || cartItem.item?.name}
            </h1>
            <p className="text-sm">
              {cartItem.buffet?.description || cartItem.set?.description || cartItem.item?.description}
            </p>
            <button className="text-md font-bold border rounded p-2 m-2">
              {cartItem.buffet?.price.toLocaleString() ||
                cartItem.set?.price.toLocaleString() ||
                cartItem.item?.price.toLocaleString()}
              đ
            </button>
          </div>
          <div className={`flex gap-4 justify-start ${hidden ? "hidden" : ""}`}>
            <button
              onClick={() => {
                setIsDetailModalOpen(true);
                setSelectedItem(
                  cartItem.set || cartItem.buffet || cartItem.item || null
                );
              }}
              className="p-2 rounded flex justify-center items-center border border-white"
            >
              Xem
            </button>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedItem(
                  cartItem.set || cartItem.buffet || cartItem.item || null
                );
              }}
              className="p-2 rounded flex justify-center items-center bg-red-700"
            >
              Chọn
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

function OrderMenuPage() {
  const {
    buffets,
    sets,
    monLe,
    doUong,
    tab,
    setIsModalOpen,
    setSelectedItem,
    setIsDetailModalOpen,
  } = useOutletContext<{
    buffets: Buffet[];
    sets: Set[];
    monLe: Item[];
    doUong: Item[];
    tab: boolean[];
    setIsModalOpen: (value: boolean) => void;
    setSelectedItem: (value: Set | Buffet | Item | null) => void;
    setIsDetailModalOpen: (value: boolean) => void;
  }>();

  return (
      <div className="flex h-full w-full flex-col gap-2 overflow-y-auto bg-gray-900">
        {tab[0]
          ? buffets.map((b) => (
              <OrderCart
                cartItem={{ buffet: b }}
                key={`buffet-${b.id}`}
                setIsModalOpen={setIsModalOpen}
                setSelectedItem={setSelectedItem}
                setIsDetailModalOpen={setIsDetailModalOpen}
              />
            ))
          : null}
        {tab[1]
          ? sets.map((s) => (
              <OrderCart
                cartItem={{ set: s }}
                key={`set-${s.id}`}
                setIsModalOpen={setIsModalOpen}
                setSelectedItem={setSelectedItem}
                setIsDetailModalOpen={setIsDetailModalOpen}
              />
            ))
          : null}
        {tab[2]
          ? monLe.map((s) => (
              <OrderCart
                cartItem={{ item: s }}
                key={`monLe-${s.id}`}
                setIsModalOpen={setIsModalOpen}
                setSelectedItem={setSelectedItem}
                setIsDetailModalOpen={setIsDetailModalOpen}
              />
            ))
          : null}
        {tab[3]
          ? doUong.map((s) => (
              <OrderCart
                cartItem={{ item: s }}
                key={`doUong-${s.id}`}
                hidden={true}
                setIsModalOpen={setIsModalOpen}
                setSelectedItem={setSelectedItem}
                setIsDetailModalOpen={setIsDetailModalOpen}
              />
            ))
          : null}
        {tab.every((t) => !t)
          ? [
              ...buffets.map((b) => (
                <OrderCart
                  cartItem={{ buffet: b }}
                  key={`buffet-${b.id}`}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedItem={setSelectedItem}
                  setIsDetailModalOpen={setIsDetailModalOpen}
                />
              )),
              ...sets.map((s) => (
                <OrderCart
                  cartItem={{ set: s }}
                  key={`set-${s.id}`}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedItem={setSelectedItem}
                  setIsDetailModalOpen={setIsDetailModalOpen}
                />
              )),
              ...monLe.map((s) => (
                <OrderCart
                  cartItem={{ item: s }}
                  key={`monLe-${s.id}`}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedItem={setSelectedItem}
                  setIsDetailModalOpen={setIsDetailModalOpen}
                />
              )),
              ...doUong.map((s) => (
                <OrderCart
                  cartItem={{ item: s }}
                  key={`doUong-${s.id}`}
                  hidden={true}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedItem={setSelectedItem}
                  setIsDetailModalOpen={setIsDetailModalOpen}
                />
              )),
            ]
          : null}
      </div>
  );
}

export default OrderMenuPage;
