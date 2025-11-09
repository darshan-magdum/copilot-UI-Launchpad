import React, { useState } from "react";

const chatbotDesigns = [
  {
    id: "classic",
    name: "Classic Chat",
    description: "Simple, minimal chat interface.",
    preview: "https://via.placeholder.com/400x250?text=Classic+Chat",
  },
  {
    id: "modern",
    name: "Modern Bubble",
    description: "Rounded chat bubbles with gradients.",
    preview: "https://via.placeholder.com/400x250?text=Modern+Bubble",
  },
  {
    id: "assistant",
    name: "AI Assistant",
    description: "Professional layout for enterprise chatbots.",
    preview: "https://via.placeholder.com/400x250?text=AI+Assistant",
  },
  {
    id: "compact",
    name: "Compact Sidebar",
    description: "Perfect for small screens or embedded widgets.",
    preview: "https://via.placeholder.com/400x250?text=Compact+Sidebar",
  },
];

function ChatbotDesignSelector({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (design) => {
    setSelected(design.id);
    if (onSelect) onSelect(design);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Choose Your Chatbot Design
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatbotDesigns.map((design) => (
          <div
            key={design.id}
            onClick={() => handleSelect(design)}
            className={`border rounded-2xl overflow-hidden cursor-pointer transition-all ${
              selected === design.id
                ? "ring-2 ring-blue-500 shadow-lg"
                : "hover:shadow-md"
            }`}
          >
            <img
              src={design.preview}
              alt={design.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{design.name}</h3>
              <p className="text-gray-600 text-sm">{design.description}</p>
              {selected === design.id && (
                <p className="mt-2 text-sm text-blue-500 font-medium">
                  ✅ Selected
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-8 text-center">
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => alert(`You selected: ${selected}`)}
          >
            Confirm Design
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatbotDesignSelector;
