import React, { useState } from "react";
import { Rnd } from "react-rnd";

export default function ChatbotBuilder() {
  const [step, setStep] = useState(1);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [botName, setBotName] = useState("My Chatbot");
  const [quote, setQuote] = useState("Welcome to my business!");
  const [chatbotPos, setChatbotPos] = useState({ x: 100, y: 400 });
  const [quotePos, setQuotePos] = useState({ x: 300, y: 200 });

  // 🎨 Simple inline style object
  const styles = {
    app: {
      fontFamily: "Arial, sans-serif",
      height: "100vh",
      width: "100vw",
      background: "#f4f6f9",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: "28px",
      marginBottom: "20px",
      color: "#222",
    },
    designList: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    designBox: (isSelected) => ({
      width: "220px",
      height: "260px",
      background: "white",
      borderRadius: "10px",
      boxShadow: isSelected
        ? "0 0 10px 2px #0066ff"
        : "0 2px 8px rgba(0,0,0,0.2)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      transition: "0.3s",
    }),
    chatPreview: {
      width: "150px",
      height: "180px",
      borderRadius: "10px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    previewHeader: (color) => ({
      background: color,
      color: "white",
      textAlign: "center",
      padding: "8px",
      fontWeight: "bold",
    }),
    previewBody: {
      flex: 1,
      background: "#f9f9f9",
      padding: "10px",
      fontSize: "12px",
    },
    header: {
      width: "100%",
      background: "#0066ff",
      color: "white",
      padding: "15px 20px",
      fontSize: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      top: 0,
      left: 0,
    },
    input: {
      fontSize: "16px",
      padding: "6px 8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    editorContainer: {
      position: "relative",
      width: "100vw",
      height: "100vh",
      background: "#eef2f8",
      overflow: "hidden",
    },
    chatbotBox: (color) => ({
      background: "white",
      borderRadius: "10px",
      width: "300px",
      height: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      overflow: "hidden",
    }),
    chatHeader: (color) => ({
      background: color,
      color: "white",
      padding: "10px",
      textAlign: "center",
      fontWeight: "bold",
    }),
    chatBody: {
      flex: 1,
      padding: "10px",
    },
    chatFooter: {
      padding: "10px",
      borderTop: "1px solid #ddd",
    },
    quoteBox: {
      background: "rgba(255,255,255,0.9)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      cursor: "move",
      textAlign: "center",
      fontSize: "20px",
      width: "300px",
    },
    backButton: {
      background: "#ccc",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      position: "absolute",
      top: 15,
      right: 20,
    },
  };

  const designs = [
    { id: 1, name: "Classic Blue", color: "#0066ff" },
    { id: 2, name: "Emerald Green", color: "#00b894" },
    { id: 3, name: "Royal Purple", color: "#6c5ce7" },
    { id: 4, name: "Crimson Red", color: "#d63031" },
  ];

  

  // 🧭 Step 1: Design selection screen
  if (step === 1) {
    return (
      <div style={styles.app}>
        <h2 style={styles.title}>Select Your Chatbot Design</h2>
        <div style={styles.designList}>
          {designs.map((d) => (
            <div
              key={d.id}
              style={styles.designBox(selectedDesign === d.id)}
              onClick={() => {
                setSelectedDesign(d.id);
                setStep(2);
              }}
            >
              <div style={styles.chatPreview}>
                <div style={styles.previewHeader(d.color)}>{d.name}</div>
                <div style={styles.previewBody}>
                  <p>💬 Chat UI preview</p>
                </div>
              </div>
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>{d.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 🧭 Step 2: Editable UI after design selection
  const themeColor = designs.find((d) => d.id === selectedDesign)?.color;

  return (
    <div style={styles.editorContainer}>
      {/* Header Controls */}
      <div style={styles.header}>
        <div>
          <strong>Bot Name:</strong>{" "}
          <input
            style={styles.input}
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
          />
        </div>
        <div>
          <strong>Main Quote:</strong>{" "}
          <input
            style={styles.input}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
          />
        </div>
        <div
          style={styles.backButton}
          onClick={() => {
            setStep(1);
          }}
        >
          ⬅ Back
        </div>
      </div>

      {/* Editable Quote */}
      <Rnd
        bounds="parent"
        position={quotePos}
        onDragStop={(e, d) => setQuotePos({ x: d.x, y: d.y })}
      >
        <div style={styles.quoteBox}>{quote}</div>
      </Rnd>

      {/* Editable Chatbot */}
      <Rnd
        bounds="parent"
        size={{ width: 300, height: 400 }}
        position={chatbotPos}
        onDragStop={(e, d) => setChatbotPos({ x: d.x, y: d.y })}
        enableResizing={{
          bottomRight: true,
          bottomLeft: true,
          topRight: true,
          topLeft: true,
        }}
      >
        <div style={styles.chatbotBox(themeColor)}>
          <div style={styles.chatHeader(themeColor)}>{botName}</div>
          <div style={styles.chatBody}>
            <p><strong>Bot:</strong> Hello! How can I help you?</p>
            <p><strong>You:</strong> Tell me about your business.</p>
          </div>
          <div style={styles.chatFooter}>
            <input
              type="text"
              placeholder="Type a message..."
              style={{ width: "100%", padding: "5px" }}
            />
          </div>
        </div>
      </Rnd>
    </div>
  );
}
