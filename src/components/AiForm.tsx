import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { showToast } from "@/lib/toast"; // Ensure you have your toast utility
import { Textarea } from "./ui/textarea"; // Adjust the import path as necessary
import { useTransition } from "react";
import { generateOpenAIResponse } from "@/lib/api"; // Import the new function

// Define the validation schema using Zod
const PromptSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

interface OpenAIPromptFormProps {
  onAddMessage: (prompt: string, response: string) => void;
}

export const OpenAIPromptForm: React.FC<OpenAIPromptFormProps> = ({
  onAddMessage,
}) => {
  const form = useForm<z.infer<typeof PromptSchema>>({
    resolver: zodResolver(PromptSchema),
    defaultValues: {
      prompt: "",
    },
  });

  // Use transition for managing loading state
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: z.infer<typeof PromptSchema>) => {
    try {
      // Start the transition for UI updates
      startTransition(() => {
        // Handle the async operation outside of this function
        handleOpenAIRequest(data.prompt);
      });
    } catch (error) {
      const errorMessage =
        (error as any).message || "Failed to fetch response from OpenAI.";
      showToast(errorMessage, "error");
    }
  };

  const handleOpenAIRequest = async (prompt: string) => {
    try {
      const answer = await generateOpenAIResponse(prompt); // Call the new function

      // Call the parent function to add the new message

      onAddMessage(prompt, answer.response); // Accessing response directly

      // Show success notification
      showToast("Successfully fetched response from OpenAI.", "success");

      form.reset(); // Reset the form after successful submission
    } catch (error) {
      const errorMessage =
        (error as any).message || "Failed to fetch response from OpenAI.";
      showToast(errorMessage, "error");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex p-4 bg-white border-t"
      >
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Textarea
                  placeholder="Enter your prompt here..."
                  {...field}
                  rows={1}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="ml-2">
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default OpenAIPromptForm;
