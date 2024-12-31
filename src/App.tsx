import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/shared/Navbar";
import HomePage from "./components/pages/HomePage";
import ItemManagement from "./components/pages/ItemsManagement";
import OpenAIPrompt from "./components/pages/OpenAIPrompt";

function App() {
  return (
    <Router>
      <Helmet>
        <title>Item Management App</title>
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items" element={<ItemManagement />} />
        <Route path="/openai" element={<OpenAIPrompt />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
