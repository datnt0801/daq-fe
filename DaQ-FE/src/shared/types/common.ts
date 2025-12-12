export interface Staff {
  id: number;
  name: string;
  email: string;
  status: string;
  userType: string;
}

export interface Table {
  id: number;
  name: string;
  status: string;
  capacity: number;
  floor: number;
}

export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
  image: string;
  type: "item";
}

export interface Set {
  id: string;
  name: string;
  price: number;
  type: "set";
  image: string;
}

export interface Buffet {
  id: string;
  name: string;
  price: number;
  type: "buffet";
  image: string;
}
