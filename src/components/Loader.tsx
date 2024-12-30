import { Loader } from "lucide-react"; // Import the Loader icon from Lucide

const CustomSpinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader className="animate-spin h-10 w-10 text-blue-500" />
      <span className="ml-2 text-lg">Loading...</span>
    </div>
  );
};

export default CustomSpinner;
