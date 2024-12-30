import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ItemFormProps {
  onAddItem: (name: string, description: string) => Promise<void>;
  isAdding: boolean;
}

const ItemForm: React.FC<ItemFormProps> = ({ onAddItem, isAdding }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddItem(name, description);
    setName("");
    setDescription("");
    nameInputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2"
    >
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        ref={nameInputRef}
        className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button
        type="submit"
        className="bg-blue-500 text-white rounded-lg px-4 py-2 transition duration-200 hover:bg-blue-600"
        disabled={isAdding}
      >
        {isAdding ? "Adding..." : "Add Item"}
      </Button>
    </form>
  );
};

export default ItemForm;
