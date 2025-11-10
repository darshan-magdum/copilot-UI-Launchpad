import React, { useState, useEffect } from "react";
import FreeStyleChatbotBuilder from "./FreeStyleChatbotBuilder";

export default function ChatbotModeSelector() {
  const [mode, setMode] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [botName, setBotName] = useState("");
  const [botDescription, setBotDescription] = useState("");
  const [error, setError] = useState(""); // for AI design validation

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleAISubmit = () => {
    if (!botName.trim() || !botDescription.trim()) {
      setError("Please enter both Bot Name and Description!");
      return;
    }
    setError("");
 setMode("predefined")
  };

  if (mode) {
    return (
      <FreeStyleChatbotBuilder
        mode={mode} // "ai", "custom", "predefined"
        goBack={() => setMode(null)}
        botName={botName}
        botDescription={botDescription}
      />
    );
  }

  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #c3ecff, #f9f9ff)",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    padding: "0",
  };

  const headingStyle = {
    fontSize: "3rem",
    color: "#0066ff",
    marginBottom: "0px",
    transform: animate ? "translateY(0)" : "translateY(-50px)",
    opacity: animate ? 1 : 0,
    transition: "all 0.8s ease",
  };

  const subheadingStyle = {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "30px"
  };

  const inputContainerStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
    width: "100%",
    maxWidth: "600px",
    justifyContent: "center",
    alignItems: "center",
  };

  const inputStyle = {
    flex: 1,
    padding: "6px 8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.85rem",
    outline: "none",
    transition: "0.3s",
    background: "#fff",
  };

  const inputFocusStyle = {
    border: "1px solid #0066ff",
    boxShadow: "0 0 4px rgba(0,102,255,0.4)",
  };

  const submitButtonStyle = {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#0066ff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.85rem",
    transition: "0.3s",
  };

  const errorStyle = {
    color: "red",
    marginTop: "6px",
    fontSize: "0.85rem",
  };

  const cardContainer = {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const cardStyle = {
    width: "230px",
    padding: "25px 20px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "white",
    boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
    cursor: "pointer",
    transition: "0.3s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const cardHover = {
    transform: "scale(1.08)",
    boxShadow: "0 16px 30px rgba(0,0,0,0.3)",
  };

  const cardIconStyle = {
    fontSize: "2.5rem",
    marginBottom: "12px",
  };

  const tipStyle = {
    marginTop: "40px",
    color: "#555",
    fontSize: "0.95rem",
    maxWidth: "400px",
  };

  const shapes = Array.from({ length: 8 }).map((_, i) => ({
    width: Math.random() * 40 + 20,
    height: Math.random() * 40 + 20,
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    opacity: Math.random() * 0.3 + 0.2,
    animationDuration: `${Math.random() * 8 + 5}s`,
    background: "rgba(255,255,255,0.3)",
    borderRadius: "50%",
    position: "absolute",
    pointerEvents: "none",
    animation: "floatShape linear infinite",
  }));

  return (
    <div style={containerStyle}>
      {shapes.map((shape, idx) => (
        <div key={idx} style={shape}></div>
      ))}

      <h1 style={headingStyle}>🤖 Welcome to Copilot UI Launchpad</h1>

      {/* AI Bot Details Heading */}
      <p style={{ marginBottom: "10px", fontSize: "1rem", color: "#333" }}>
        ✨ Design your bot with AI — enter details below!
      </p>

      {/* Horizontal Compact Inputs + Submit */}
      <div style={inputContainerStyle}>
        <input
          type="text"
          placeholder="Bot Name"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
          onBlur={(e) =>
            Object.assign(e.target.style, { border: "1px solid #ccc", boxShadow: "none" })
          }
        />
        <input
          type="text"
          placeholder="Bot Description / Purpose"
          value={botDescription}
          onChange={(e) => setBotDescription(e.target.value)}
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
          onBlur={(e) =>
            Object.assign(e.target.style, { border: "1px solid #ccc", boxShadow: "none" })
          }
        />
        <button style={submitButtonStyle} onClick={handleAISubmit}>
          Submit
        </button>
      </div>
      {error && <div style={errorStyle}>{error}</div>}

      <p style={subheadingStyle}>Or choose a mode to get started quickly:</p>

      {/* Cards for Custom and Predefined modes */}
      <div style={cardContainer}>
        <div
          style={cardStyle}
          onClick={() => setMode("custom")}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, {
              transform: "scale(1)",
              boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
            })
          }
        >
          <span style={cardIconStyle}>🛠️</span>
          <h3>Customizable</h3>
          <p style={{ fontSize: "0.85rem", marginTop: "6px" }}>
            Start with a blank canvas and build your chatbot from scratch.
          </p>
        </div>

        <div
          style={cardStyle}
          onClick={() => setMode("predefined")}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, {
              transform: "scale(1)",
              boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
            })
          }
        >
          <span style={cardIconStyle}>🎨</span>
          <h3>Predefined Template</h3>
          <p style={{ fontSize: "0.85rem", marginTop: "6px" }}>
            Get started quickly with beautifully designed chatbot templates.
          </p>
        </div>
      </div>

      <p style={tipStyle}>
        💡 Tip: Use AI design for smart bot creation, or select a mode for quick setup.
      </p>

      <style>{`
        @keyframes floatShape {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-50px) rotate(45deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
