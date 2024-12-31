import { Helmet } from "react-helmet";
import { useState } from "react";
import OpenAIPromptForm from "../AiForm";

const OpenAIPrompt = () => {
  // State to hold chat messages
  const [messages, setMessages] = useState<
    { prompt: string; response: string }[]
  >([]);

  // Function to handle adding new messages
  const addMessage = (prompt: string, response: string) => {
    setMessages((prevMessages) => [...prevMessages, { prompt, response }]);
  };

  return (
    <>
      <Helmet>
        <title>OpenAI Prompt - AI Chat App</title>
        <meta
          name="description"
          content="Experience the power of AI with our intuitive AI chat app."
        />
        <meta
          name="keywords"
          content="AI chat, AI chat app, AI chatbot, AI assistant, AI prompt, OpenAI"
        />
      </Helmet>
      <div className="flex flex-col bg-gray-50 min-h-[90vh]">
        <h1 className="text-4xl font-bold mb-4 text-center">
          OpenAI Prompt Page
        </h1>
        <p className="text-lg mb-6 text-center">
          Here you can enter prompts for OpenAI.
        </p>

        {/* Messages Container */}
        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div key={index} className="mb-4">
              <div className="font-semibold text-blue-600">You:</div>
              <div className="p-2 bg-white rounded-lg shadow">{msg.prompt}</div>
              <div className="font-semibold text-gray-800 mt-2">AI:</div>
              <div className="p-2 bg-gray-200 rounded-lg shadow">
                {msg.response}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <OpenAIPromptForm onAddMessage={addMessage} />
      </div>
    </>
  );
};

export default OpenAIPrompt;
