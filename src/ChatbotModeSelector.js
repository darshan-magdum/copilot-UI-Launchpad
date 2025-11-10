import React, { useState, useEffect } from "react";
import FreeStyleChatbotBuilder from "./FreeStyleChatbotBuilder";

export default function ChatbotModeSelector() {
  const [mode, setMode] = useState(null); // "predefined" or "custom"
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (mode) {
    return <FreeStyleChatbotBuilder mode={mode} goBack={() => setMode(null)} />;
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
    padding: "0 20px",
  };



  const headingStyle = {
    fontSize: "3rem",
    color: "#0066ff",
    marginBottom: "10px",
    transform: animate ? "translateY(0)" : "translateY(-50px)",
    opacity: animate ? 1 : 0,
    transition: "all 0.8s ease",
  };

  const subheadingStyle = {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "50px",
    transform: animate ? "translateY(0)" : "translateY(-30px)",
    opacity: animate ? 1 : 0,
    transition: "all 1s ease",
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
    marginTop: "60px",
    color: "#555",
    fontSize: "0.95rem",
    maxWidth: "400px",
  };

  // Floating shapes background
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
      {/* Floating shapes */}
      {shapes.map((shape, idx) => (
        <div key={idx} style={shape}></div>
      ))}

    

      <h1 style={headingStyle}>🤖 Welcome to Copilot UI Launchpad</h1>
      <p style={subheadingStyle}>
        Build your intelligent assistant easily! Choose a mode to get started.
      </p>

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
          <p style={{ fontSize: "0.95rem", marginTop: "8px" }}>
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
          <p style={{ fontSize: "0.95rem", marginTop: "8px" }}>
            Get started quickly with beautifully designed chatbot templates.
          </p>
        </div>
      </div>

      <p style={tipStyle}>
        💡 Tip: Use predefined templates for a quick setup or customize your own for complete control.
      </p>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatShape {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-50px) rotate(45deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
