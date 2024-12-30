import { create } from "zustand";

interface Item {
  _id: string;
  name: string;
  description: string;
}

interface ItemStore {
  items: Item[];
  addItem: (item: Item) => void;
  deleteItem: (id: string) => void;
  setItems: (items: Item[]) => void;
}

const useItemStore = create<ItemStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  deleteItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item._id !== id) })),
  setItems: (items) => set({ items }),
}));

export default useItemStore;
