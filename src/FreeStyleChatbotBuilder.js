import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import axios from "axios";

export default function FreeStyleChatbotBuilder({ mode, goBack, botName ,botDescription }) {


  
    const [elements, setElements] = useState(
    mode === "predefined"
      ? [
          {
            id: Date.now(),
            type: "chatbot",
            x: 800,
            y: 100,
            width: 340,
            height: 440,
            botName: "Smart Assistant",
            headerColor: "#2c3e50",
            background: "#ffffff",
            textColor: "#333",
            botMessageColor: "#dce6f7",
            userMessageColor: "#d1ffd1",
            messageFontSize: 15,
            inputBorderRadius: 10,
            inputPlaceholderColor: "#888",
            inputPlaceholderSize: 14,
            buttonText: "Send",
            buttonBg: "#2c3e50",
            buttonColor: "#ffffff",
            buttonFontFamily: "Poppins",
            buttonSize: 15,
          },
          {
            id: Date.now() + 1,
            type: "text",
            content:
              "Welcome to Smart Assistant! I’m here to help you get answers, automate tasks, and make your day a little easier. How can I assist you today?",
            x: 50,
            y: 200,
            width: 500,
            height: 120,
            fontSize: 18,
            fontFamily: "Poppins",
            color: "#2c3e50",
            background: "transparent",
            bold: false,
            italic: false,
            underline: false,
          },
        ]
      : [] // AI mode will be dynamically loaded
  );

  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Function to fetch AI theme
  // -----------------------------
 const fetchAITheme = async () => {
  setLoading(true);
  try {
    const prompt = `
Generate a JSON theme, a tagline for bot name, and initial text for a chatbot based on:
Bot Name: ${botName}
Bot Description: ${botDescription}

JSON must include:
headerColor, background, textColor, botMessageColor, userMessageColor, 
messageFontSize, inputBorderRadius, inputPlaceholderColor, 
 buttonBg, buttonColor, buttonFontFamily,
fullBackground,
title,        // <-- AI should generate a short, catchy title
titleBg,      // <-- optional background highlight for title
initialText   // <-- AI should generate initial greeting or instruction text

Make the title attractive, bold, and relevant to the bot's theme. Return only valid JSON.
`;

    const response = await axios.post(
      "https://decesion-engine-openai-b6f0.openai.azure.com/openai/deployments/gpt-4.1/chat/completions?api-version=2025-01-01-preview",
      {
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400,
      },
      {
        headers: {
          "api-key": "6221eddfddb045868d62ed42d088befd",
          "Content-Type": "application/json",
        },
      }
    );

    const aiMessage = response.data.choices[0].message.content;
    const theme = JSON.parse(aiMessage);

    // Update elements with dynamic theme
    setElements([
      {
        id: Date.now(),
        type: "chatbot",
        x: 800,
        y: 90,
        width: 360,
        height: 480,
        botName: botName || "AI Assistant",
        headerColor: theme.headerColor,
        background: theme.background,
        textColor: theme.textColor,
        botMessageColor: theme.botMessageColor,
        userMessageColor: theme.userMessageColor,
        messageFontSize: theme.messageFontSize,
        inputBorderRadius: theme.inputBorderRadius,
        inputPlaceholderColor: theme.inputPlaceholderColor,
        
        buttonBg: theme.buttonBg,
        buttonColor: theme.buttonColor,
        buttonFontFamily: theme.buttonFontFamily,
      },
      {
        id: Date.now() + 1,
        type: "text",
        content: theme.title || "Welcome!",
        x: 50,
        y: 120, // above main text
        width: 500,
        height: 60,
        fontSize: (theme.messageFontSize || 16) + 6,
        fontFamily: theme.buttonFontFamily || "Poppins",
        color: theme.headerColor,
        background: theme.titleBg || "rgba(255,255,255,0.1)",
        bold: true,
        italic: false,
        underline: false,
        textAlign: "center",
        borderRadius: 8,
        padding: 6,
      },
      {
        id: Date.now() + 2,
        type: "text",
        content: theme.initialText || "Hello! Ask me anything.",
        x: 50,
        y: 180,
        width: 500,
        height: 120,
        fontSize: (theme.messageFontSize || 16) + 2,
        fontFamily: theme.buttonFontFamily || "Poppins",
        color: theme.headerColor,
        background: "transparent",
        bold: true,
        italic: false,
        underline: false,
      },
    ]);
  } catch (error) {
    console.error("Failed to fetch AI theme:", error);
  } finally {
    setLoading(false); // stop loading
  }
};


  
  // -----------------------------
  // Load AI theme when mode or bot info changes
  // -----------------------------
  useEffect(() => {
    if (mode === "ai" && botName && botDescription) {
      fetchAITheme();
    }
  }, [mode, botName, botDescription]);

  const [fullBg, setFullBg] = useState("#f4f6f9"); // default full-screen background
  const [selectedId, setSelectedId] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewStep, setPreviewStep] = useState(1); // 1: Preview, 2: Secret Code
  const [secretCode, setSecretCode] = useState(""); // secret code input


  
  const styles = {
    container: {
      height: "100vh",
      width: "100vw",
      position: "relative",
      background: fullBg,
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
    },
    toolbar: {
      position: "fixed",
      top: 60,
      left: 10,
      background: "rgba(255,255,255,0.9)",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      padding: "10px",
      display: "flex",
      gap: "10px",
      zIndex: 999,
    },
    btn: {
      background: "#0066ff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "8px 10px",
      cursor: "pointer",
    },
    propertyPanel: {
      position: "fixed",
      top: 10,
      right: 10,
      background: "rgba(255,255,255,0.97)",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      padding: "10px",
      width: "250px",
      zIndex: 999,
      maxHeight: "90vh",
      overflowY: "auto",
    },
    input: {
      width: "100%",
      padding: "5px",
      margin: "5px 0",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
  };

  const addText = () => {
    setElements([
      ...elements,
      {
        id: Date.now(),
        type: "text",
        content: "New Text",
        x: 100,
        y: 100,
        width: 200,
        height: 60,
        fontSize: 18,
        fontFamily: "Arial",
        color: "#000000",
        background: "transparent",
        bold: false,
        italic: false,
        underline: false,
      },
    ]);
  };

  const addChatbot = () => {
    setElements([
      ...elements,
      {
        id: Date.now(),
        type: "chatbot",
        x: 400,
        y: 300,
        width: 320,
        height: 420,
        botName: mode === "ai" ? "AI Assistant" : "My Chatbot",
        headerColor: mode === "ai" ? "#8e44ad" : "#0066ff",
        background: "#ffffff",
        textColor: "#000000",
        botMessageColor: mode === "ai" ? "#f3e5f5" : "#e8f0ff",
        userMessageColor: "#d1ffd1",
        messageFontSize: mode === "ai" ? 16 : 14,
        inputBorderRadius: mode === "ai" ? 12 : 6,
        inputPlaceholderColor: "#888",
        inputPlaceholderSize: 14,
        buttonText:"Send",
        buttonBg: mode === "ai" ? "#8e44ad" : "#0066ff",
        buttonColor: "#fff",
        buttonFontFamily: "Arial",
        buttonSize: 14,
      },
    ]);
  };

  const updateElement = (id, updates) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, ...updates } : el)));
  };

  const deleteElement = (id) => {
    setElements(elements.filter((el) => el.id !== id));
    setSelectedId(null);
  };

  const selected = elements.find((el) => el.id === selectedId);

  const handlePublish = () => {
    if (!secretCode) {
      alert("Please enter a secret code before publishing!");
      return;
    }
    alert("Bot is ready! (No live saving implemented yet.)");
  };

  return (
    <div style={styles.container}>

         {loading && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(255,255,255,0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 5000,
          fontSize: "20px",
          fontWeight: "bold",
          color: "#333",
          flexDirection: "column",
        }}
      >
        <div className="spinner" style={{ marginBottom: "10px" }}>⏳</div>
        Loading AI Theme...
      </div>
    )}
      {/* Back Button */}
      {!previewMode && (
        <button
          style={{
            position: "fixed",
            top: 10,
            left: 10,
            background: "#e61616ff",
            color: "#f3ebebff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 12px",
            cursor: "pointer",
            zIndex: 1000,
          }}
          onClick={goBack}
        >
          Back
        </button>
      )}

      {/* Full-Screen Background Picker */}
      {!previewMode && (
        <div
          style={{
            position: "fixed",
            top: 8,
            left: 80,
            background: "rgba(255,255,255,0.95)",
            padding: "8px 10px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 1000,
            fontFamily: "Arial, sans-serif",
          }}
        >
          <label style={{ fontWeight: "bold" }}>Background:</label>
          <input
            type="color"
            value={fullBg}
            onChange={(e) => setFullBg(e.target.value)}
            style={{
              width: "130px",
              height: "30px",
              border: "none",
              cursor: "pointer",
              padding: 0,
              background: "transparent",
            }}
          />
          <span style={{ fontSize: "14px" }}>{fullBg}</span>
        </div>
      )}

      {/* Toolbar */}
      {!previewMode && (
        <div style={styles.toolbar}>
          <button style={styles.btn} onClick={addText}>
            ➕ Add Text
          </button>
          <button style={styles.btn} onClick={addChatbot}>
            🤖 Add Chatbot
          </button>
          <button
            style={{ ...styles.btn, background: "#28a745" }}
            onClick={() => setPreviewMode(true)}
          >
            💾 Save & Preview
          </button>
        </div>
      )}

      {/* Property Panel */}
      {selected && !previewMode && (
        <div style={styles.propertyPanel}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h4 style={{ margin: 0 }}>⚙️ Properties</h4>
            <button
              style={{ background: "transparent", border: "none", color: "red", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setSelectedId(null)}
            >
              ❌
            </button>
          </div>

          {selected.type === "text" && (
            <>
              <label>Text:</label>
              <input
                style={styles.input}
                value={selected.content}
                onChange={(e) => updateElement(selected.id, { content: e.target.value })}
              />
              <label>Font Size:</label>
              <input
                type="number"
                style={styles.input}
                value={selected.fontSize}
                onChange={(e) => updateElement(selected.id, { fontSize: parseInt(e.target.value) })}
              />
              <label>Font Family:</label>
              <select
                style={styles.input}
                value={selected.fontFamily}
                onChange={(e) => updateElement(selected.id, { fontFamily: e.target.value })}
              >
                {["Arial", "Poppins", "Roboto", "Times New Roman", "Courier New"].map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <label>Text Color:</label>
              <input
                type="color"
                style={styles.input}
                value={selected.color}
                onChange={(e) => updateElement(selected.id, { color: e.target.value })}
              />
              <label>Background:</label>
              <input
                type="color"
                style={styles.input}
                value={selected.background}
                onChange={(e) => updateElement(selected.id, { background: e.target.value })}
              />
              <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                <button
                  style={{ ...styles.btn, background: selected.bold ? "#444" : "#888", flex: 1 }}
                  onClick={() => updateElement(selected.id, { bold: !selected.bold })}
                >
                  <b>B</b>
                </button>
                <button
                  style={{ ...styles.btn, background: selected.italic ? "#444" : "#888", flex: 1 }}
                  onClick={() => updateElement(selected.id, { italic: !selected.italic })}
                >
                  <i>I</i>
                </button>
                <button
                  style={{ ...styles.btn, background: selected.underline ? "#444" : "#888", flex: 1 }}
                  onClick={() => updateElement(selected.id, { underline: !selected.underline })}
                >
                  <u>U</u>
                </button>
              </div>
              <button
                style={{ ...styles.btn, background: "#e74c3c", marginTop: "10px" }}
                onClick={() => deleteElement(selected.id)}
              >
                🗑 Delete
              </button>
            </>
          )}

          {selected.type === "chatbot" && (
            <>
              {[["Bot Name", "botName", "text"],
                ["Header Color", "headerColor", "color"],
                ["Body Color", "background", "color"],
                ["Bot Message Color", "botMessageColor", "color"],
                ["User Message Color", "userMessageColor", "color"],
                ["Bot Text Color", "textColor", "color"],
                ["User Text Color", "userTextColor", "color"],
                ["Message Font Size", "messageFontSize", "number"],
                ["Input Radius", "inputBorderRadius", "number"],
                ["Placeholder Color", "inputPlaceholderColor", "color"],
                ["Placeholder Size", "inputPlaceholderSize", "number"],
                ["Button Text", "buttonText", "text"],
                ["Button Bg", "buttonBg", "color"],
                ["Button Text Color", "buttonColor", "color"],
                ["Button Font", "buttonFontFamily", "text"],
                ["Button Font Size", "buttonSize", "number"]
              ].map(([label, key, type]) => (
                <div key={key}>
                  <label>{label}:</label>
                  <input
                    type={type}
                    style={styles.input}
                    value={selected[key] || ""}
                    onChange={(e) =>
                      updateElement(selected.id, {
                        [key]: type === "number" ? parseInt(e.target.value) : e.target.value,
                      })
                    }
                  />
                </div>
              ))}

            

              <button
                style={{ ...styles.btn, background: "#e74c3c" }}
                onClick={() => deleteElement(selected.id)}
              >
                🗑 Delete Bot
              </button>
            </>
          )}
        </div>
      )}

      {/* Canvas & Chatbot rendering */}
      {elements.map((el) => (
        <Rnd
          key={el.id}
          bounds="parent"
          size={{ width: el.width, height: el.height }}
          position={{ x: el.x, y: el.y }}
          onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
          onResizeStop={(e, dir, ref, delta, pos) =>
            updateElement(el.id, { width: ref.offsetWidth, height: ref.offsetHeight, ...pos })
          }
          onClick={() => !previewMode && setSelectedId(el.id)}
          disableDragging={previewMode}
          enableResizing={!previewMode}
        >
          {el.type === "text" ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: el.background,
                color: el.color,
                fontSize: el.fontSize,
                fontFamily: el.fontFamily,
                fontWeight: el.bold ? "bold" : "normal",
                fontStyle: el.italic ? "italic" : "normal",
                textDecoration: el.underline ? "underline" : "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: previewMode ? "default" : "move",
                border: selectedId === el.id && !previewMode ? "2px solid #0066ff" : "none",
                borderRadius: "6px",
              }}
            >
              {el.content}
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                overflow: "hidden",
                background: el.background,
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                border: selectedId === el.id && !previewMode ? "2px solid #0066ff" : "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  background: el.headerColor,
                  color: "white",
                  textAlign: "center",
                  padding: "8px",
                  fontWeight: "bold",
                }}
              >
                {el.botName}
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "10px",
                  color: el.textColor || "#000",
                  overflow: "auto",
                  fontSize: el.messageFontSize,
                }}
              >
                <p
                  style={{
                    background: el.botMessageColor,
                    color: el.textColor || "#000",
                    padding: "6px",
                    borderRadius: "8px",
                    display: "inline-block",
                  }}
                >
                  <strong>Bot:</strong> Hello! How can I help you?
                </p>
                <br />
                <p
                  style={{
                    background: el.userMessageColor,
                    color: el.userTextColor || "#000",
                    padding: "6px",
                    borderRadius: "8px",
                    display: "inline-block",
                  }}
                >
                  <strong>User:</strong> Hi!
                </p>
              </div>
              <div
                style={{
                  padding: "6px",
                  borderTop: "1px solid #ccc",
                  display: "flex",
                  gap: "4px",
                }}
              >
                <input
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    borderRadius: el.inputBorderRadius,
                    border: "1px solid #ccc",
                    padding: "6px",
                    fontSize: el.inputPlaceholderSize,
                    color: el.inputPlaceholderColor,
                  }}
                  disabled={previewMode}
                />
                <button
                  style={{
                    background: el.buttonBg,
                    color: el.buttonColor,
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontFamily: el.buttonFontFamily,
                    fontSize: el.buttonSize,
                  }}
                >
                  send
                </button>
              </div>
            </div>
          )}
        </Rnd>
      ))}

      {/* Preview Mode */}
      {previewMode && (
        <div
          style={{
            position: "fixed",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.95)",
            padding: "10px 15px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 2000,
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >

          {previewStep === 1 && (
            <button
              style={styles.btn}
              onClick={() => setPreviewStep(2)}
            >
              Next
            </button>
          )}
          {previewStep === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter Secret Code"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                style={styles.input}
              />
              <button style={{ ...styles.btn, background: "#28a745" }} onClick={handlePublish}>
                Save & Publish
              </button>
            </>
          )}
          <button style={{ ...styles.btn, background: "#e61616ff" }} onClick={() => setPreviewMode(false)}>
            Back to Edit
          </button>
        </div>
      )}
    </div>
  );
}
