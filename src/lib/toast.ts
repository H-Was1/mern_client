import { toast } from "sonner";

export const showToast = (message: string) => {
  toast(message, {
    style: {
      backgroundColor: "#1e1e1e",
      color: "#fff",
      borderRadius: "0.5rem",
    },
  });
};
