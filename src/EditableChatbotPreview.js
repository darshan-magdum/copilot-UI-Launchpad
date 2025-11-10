import React, { useState } from "react";
import { Rnd } from "react-rnd";

export default function EditableChatbotPreview() {
  const [botName, setBotName] = useState("My Chatbot");
  const [quote, setQuote] = useState("Welcome to my business! Let's chat.");
  const [chatbotPos, setChatbotPos] = useState({ x: 100, y: 400 });
  const [quotePos, setQuotePos] = useState({ x: 300, y: 200 });

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      height: "100vh",
      width: "100vw",
      background: "#f4f6f9",
      position: "relative",
      overflow: "hidden",
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
    },
    input: {
      fontSize: "16px",
      padding: "6px 8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    chatbotBox: {
      background: "white",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      borderRadius: "10px",
      width: "300px",
      height: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      overflow: "hidden",
    },
    chatHeader: {
      background: "#0066ff",
      color: "white",
      padding: "10px",
      fontWeight: "bold",
      textAlign: "center",
    },
    chatBody: {
      flex: 1,
      padding: "10px",
      overflowY: "auto",
    },
    chatFooter: {
      padding: "10px",
      borderTop: "1px solid #ddd",
    },
    quoteBox: {
      background: "rgba(255,255,255,0.8)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      cursor: "move",
      textAlign: "center",
      fontSize: "20px",
      width: "300px",
    },
  };

  return (
    <div style={styles.container}>
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
      </div>

      <Rnd
        bounds="parent"
        position={quotePos}
        onDragStop={(e, d) => setQuotePos({ x: d.x, y: d.y })}
      >
        <div style={styles.quoteBox}>{quote}</div>
      </Rnd>

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
        <div style={styles.chatbotBox}>
          <div style={styles.chatHeader}>{botName}</div>
          <div style={styles.chatBody}>
            <p><strong>Bot:</strong> Hello! How can I help you today?</p>
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
