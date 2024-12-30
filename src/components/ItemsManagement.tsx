import { useEffect, useState, useCallback, useRef } from "react";
import useItemStore from "@/store/itemStore";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import CustomSpinner from "./Loader";
import { Helmet } from "react-helmet";

import {
  fetchItems as fetchItemsAPI,
  addItem as addItemAPI,
  deleteItem as deleteItemAPI,
} from "@/lib/api"; // Importing API functions
import { showToast } from "@/lib/toast"; // Importing showToast function

interface fetchProps {
  _id: string;
  name: string;
  description: string;
}

const ItemManagement = () => {
  const { items, setItems, addItem, deleteItem } = useItemStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deletingItems, setDeletingItems] = useState<{
    [key: string]: boolean;
  }>({});

  // Ref for the name input
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Fetch items from the backend
  const fetchItems = useCallback(async () => {
    setLoadingItems(true);
    try {
      const data = await fetchItemsAPI();
      setItems(data as fetchProps[]);
    } catch (error) {
      console.error("Error fetching items:", error);
      setErrorMessage("Failed to fetch items.");
    } finally {
      setLoadingItems(false);
    }
  }, [setItems]);

  // Handle adding a new item
  const handleAddItem = async (name: string, description: string) => {
    if (!name || !description) return;

    setIsAdding(true);
    try {
      const data = (await addItemAPI(name, description)) as fetchProps;
      addItem({ _id: data._id, name, description });
      showToast("Item added successfully!"); // Show success toast
      setName("");
      setDescription("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding item:", error);
      setErrorMessage("Failed to add item.");
    } finally {
      setIsAdding(false);
    }
  };

  // Handle deleting an item
  const handleDeleteItem = async (id: string) => {
    setDeletingItems((prev) => ({ ...prev, [id]: true }));

    try {
      await deleteItemAPI(id);
      deleteItem(id);
      showToast("Item deleted successfully!"); // Show success toast
    } catch (error) {
      console.error("Error deleting item:", error);
      setErrorMessage("Failed to delete item.");
    } finally {
      setDeletingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <>
      <Helmet>
        <title>Manage Your Items - Item Management App</title>
        <meta
          name="description"
          content="Easily manage your items with our intuitive item management app."
        />
        <meta
          name="keywords"
          content="item management, add items, delete items"
        />
      </Helmet>

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4 border">
        <h1 className="text-3xl font-bold text-center mb-6">Item Management</h1>

        {errorMessage && (
          <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddItem(name, description);
          }}
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

        {/* Show loading spinner while fetching items */}
        {loadingItems ? (
          <CustomSpinner />
        ) : (
          <>
            {items.length === 0 ? (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">No Items Found</h2>
                <p className="mb-4">
                  It looks like you haven't added any items yet.
                </p>
              </div>
            ) : (
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
                      onClick={() => handleDeleteItem(item._id)}
                      className="bg-red-500 text-white rounded-lg px-4 py-2 transition duration-200 hover:bg-red-600"
                      disabled={deletingItems[item._id]}
                    >
                      {deletingItems[item._id] ? "Deleting..." : "Delete"}
                    </Button>
                  </Card>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ItemManagement;
