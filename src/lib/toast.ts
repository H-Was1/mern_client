import { toast } from "sonner";

export const showToast = (message: string, type: "success" | "error") => {
  toast(message, {
    style: {
      backgroundColor: type === "error" ? "#e74c3c" : "#1e1e1e",
      color: type === "error" ? "#000" : "#fff",
    },
  });
};
