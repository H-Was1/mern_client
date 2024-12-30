import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface Item {
  _id: string;
  name: string;
  description: string;
}

interface ItemListProps {
  items: Item[];
  onDeleteItem: (id: string) => Promise<void>;
  deletingItems: { [key: string]: boolean };
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  onDeleteItem,
  deletingItems,
}) => {
  return (
    <ul>
      {items.map((item) => (
        <Card
          key={item._id}
          className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg shadow"
        >
          <span className="font-medium">
            {item.name} - {item.description}
          </span>
          <Button
            onClick={() => onDeleteItem(item._id)}
            className="bg-red-500 text-white rounded-lg px-4 py-2 transition duration-200 hover:bg-red-600"
            disabled={deletingItems[item._id]}
          >
            {deletingItems[item._id] ? "Deleting..." : "Delete"}
          </Button>
        </Card>
      ))}
    </ul>
  );
};

export default ItemList;
