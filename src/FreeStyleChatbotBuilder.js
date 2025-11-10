import React, { useState } from "react";
import { Rnd } from "react-rnd";

export default function FreeStyleChatbotBuilder({ mode, goBack , botName , }) {
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
      : []
  );
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
       background: fullBg, // ← full-screen background
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
        botName: "My Chatbot",
        headerColor: "#0066ff",
        background: "#ffffff",
        textColor: "#000000",
        botMessageColor: "#e8f0ff",
        userMessageColor: "#d1ffd1",
        messageFontSize: 14,
        inputBorderRadius: 6,
        inputPlaceholderColor: "#888",
        inputPlaceholderSize: 14,
        buttonText: "Send",
        buttonBg: "#0066ff",
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
      left: 80, // float to left
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
              {[
                ["Bot Name", "botName", "text"],
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
                ["Button Font Size", "buttonSize", "number"],
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
                  <strong>You:</strong> Tell me about your business.
                </p>
              </div>
              <div
                style={{
                  padding: "10px",
                  borderTop: "1px solid #ddd",
                  display: "flex",
                  gap: "8px",
                }}
              >
                <input
                  type="text"
                  placeholder="Type here..."
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: el.inputBorderRadius,
                    border: "1px solid #ccc",
                    fontSize: el.inputPlaceholderSize,
                    color: el.inputPlaceholderColor,
                  }}
                />
                <button
                  style={{
                    background: el.buttonBg,
                    color: el.buttonColor,
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    fontSize: el.buttonSize,
                    fontFamily: el.buttonFontFamily,
                    cursor: "pointer",
                  }}
                >
                  {el.buttonText}
                </button>
              </div>
            </div>
          )}
        </Rnd>
      ))}

      {/* Preview Step 1 */}
      {previewMode && previewStep === 1 && (
        <>
          <button
            style={{
              position: "fixed",
              top: 10,
              right: 10,
              background: "#0066ff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              cursor: "pointer",
              zIndex: 1000,
            }}
            onClick={() => setPreviewMode(false)}
          >
            ✏️ Edit Again
          </button>
          <button
            style={{
              position: "fixed",
              top: 60,
              right: 10,
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              cursor: "pointer",
              zIndex: 1000,
            }}
            onClick={() => setPreviewStep(2)}
          >
            ➡️ Next
          </button>
        </>
      )}

      {/* Preview Step 2: Secret Code */}
      {previewMode && previewStep === 2 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "400px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <h2>Publish Bot</h2>
            <label>Bot Name:</label>
            <input
              type="text"
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc",cursor:"not-allowed" }}
              value={elements.find((el) => el.type === "chatbot")?.botName || ""}
              readOnly
              disabled
            
            />
            <label>Secret Code:</label>
            <input
              type="password"
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              placeholder="Enter secret code"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
            />
            <button
              style={{ background: "#28a745", color: "#fff", padding: "10px", borderRadius: "6px" }}
              onClick={handlePublish}
            >
              Save & Publish
            </button>
            <button
              style={{ background: "#ccc", color: "#000", padding: "10px", borderRadius: "6px" }}
              onClick={() => setPreviewStep(1)}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
