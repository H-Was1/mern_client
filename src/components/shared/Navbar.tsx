import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Home
        </Link>
        <div className="space-x-4">
          <Link to="/items" className="text-white hover:text-blue-200">
            Items
          </Link>
          <Link to="/openai" className="text-white hover:text-blue-200">
            OpenAI Prompt
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
