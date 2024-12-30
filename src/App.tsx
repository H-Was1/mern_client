import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import OpenAIPrompt from "./components/OpenAIPrompt";
import Navbar from "./components/Navbar";
import ItemManagement from "./components/ItemsManagement";
import { Helmet } from "react-helmet";
import { Toaster } from "./components/ui/sonner";

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
