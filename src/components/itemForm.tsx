import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showToast } from "@/lib/toast";

// Define the validation schema using Zod
const ItemSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
});

interface ItemFormProps {
  onAddItem: (name: string, description: string) => Promise<void>;
  isAdding: boolean;
}

export const ItemForm: React.FC<ItemFormProps> = ({ onAddItem, isAdding }) => {
  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ItemSchema>) => {
    try {
      await onAddItem(data.name, data.description);
      showToast("Item added successfully!", "success");
      form.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error adding item:", error);
      showToast("Failed to add item.", "error");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter item name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter item description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Item"}
        </Button>
      </form>
    </Form>
  );
};

export default ItemForm;
