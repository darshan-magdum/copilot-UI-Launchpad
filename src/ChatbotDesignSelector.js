import React, { useState } from "react";

const chatbotDesigns = [
  {
    id: "classic",
    name: "Classic Chat",
    description: "Simple, minimal chat interface.",
    style: {
      container: {
        backgroundColor: "#f9fafb",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "10px",
        height: "260px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
      userMsg: {
        alignSelf: "flex-end",
        backgroundColor: "#0078d4",
        color: "white",
        padding: "6px 12px",
        borderRadius: "15px 15px 0 15px",
      },
      botMsg: {
        alignSelf: "flex-start",
        backgroundColor: "#e5e7eb",
        color: "#111827",
        padding: "6px 12px",
        borderRadius: "15px 15px 15px 0",
      },
    },
  },
  {
    id: "modern",
    name: "Modern Bubble",
    description: "Rounded chat bubbles with gradients.",
    style: {
      container: {
        background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
        borderRadius: "20px",
        padding: "12px",
        height: "260px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
      userMsg: {
        alignSelf: "flex-end",
        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
        color: "white",
        padding: "8px 14px",
        borderRadius: "18px 18px 0 18px",
      },
      botMsg: {
        alignSelf: "flex-start",
        background: "white",
        color: "#1e3a8a",
        padding: "8px 14px",
        borderRadius: "18px 18px 18px 0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      },
    },
  },
  {
    id: "assistant",
    name: "AI Assistant",
    description: "Professional layout for enterprise chatbots.",
    style: {
      container: {
        backgroundColor: "#1e293b",
        borderRadius: "16px",
        padding: "12px",
        height: "260px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "white",
      },
      userMsg: {
        alignSelf: "flex-end",
        backgroundColor: "#38bdf8",
        color: "#0f172a",
        padding: "8px 14px",
        borderRadius: "18px 18px 0 18px",
      },
      botMsg: {
        alignSelf: "flex-start",
        backgroundColor: "#334155",
        color: "white",
        padding: "8px 14px",
        borderRadius: "18px 18px 18px 0",
      },
    },
  },
  {
    id: "compact",
    name: "Compact Sidebar",
    description: "Perfect for small embedded widgets.",
    style: {
      container: {
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        height: "260px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "8px",
      },
      userMsg: {
        alignSelf: "flex-end",
        backgroundColor: "#10b981",
        color: "white",
        padding: "6px 10px",
        borderRadius: "10px",
        fontSize: "13px",
      },
      botMsg: {
        alignSelf: "flex-start",
        backgroundColor: "#f3f4f6",
        color: "#111827",
        padding: "6px 10px",
        borderRadius: "10px",
        fontSize: "13px",
      },
    },
  },
];

export default function ChatbotDesignSelector({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (design) => {
    setSelected(design.id);
    if (onSelect) onSelect(design);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        Choose Your Chatbot Design
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {chatbotDesigns.map((design) => (
          <div
            key={design.id}
            onClick={() => handleSelect(design)}
            style={{
              border:
                selected === design.id
                  ? "2px solid #3b82f6"
                  : "1px solid #d1d5db",
              borderRadius: "16px",
              padding: "10px",
              cursor: "pointer",
              transition: "0.2s",
              boxShadow:
                selected === design.id
                  ? "0 4px 10px rgba(59,130,246,0.3)"
                  : "0 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ fontWeight: "600", fontSize: "16px", marginBottom: "4px" }}>
              {design.name}
            </h3>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
              {design.description}
            </p>

            {/* Chat Preview Box */}
            <div style={design.style.container}>
              <div style={design.style.botMsg}>Hello! How can I help you?</div>
              <div style={design.style.userMsg}>Show me my bot connections.</div>
            </div>

            {selected === design.id && (
              <div
                style={{
                  textAlign: "center",
                  color: "#2563eb",
                  marginTop: "6px",
                  fontWeight: "500",
                }}
              >
                ✅ Selected
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
