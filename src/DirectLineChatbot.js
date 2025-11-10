// File: DirectLineChatbot.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DirectLineChatbot({ directLineSecret }) {

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [watermark, setWatermark] = useState(null);

  useEffect(() => {
    const startConversation = async () => {
      try {
        const res = await axios.post(
          "https://directline.botframework.com/v3/directline/conversations",
          {},
          { headers: { Authorization: `Bearer ${directLineSecret}` } }
        );
        setConversationId(res.data.conversationId);
      } catch (err) {
        console.error("Error starting conversation:", err);
      }
    };
    startConversation();
  }, [directLineSecret]);

  useEffect(() => {
    if (!conversationId) return;
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities${
            watermark ? `?watermark=${watermark}` : ""
          }`,
          { headers: { Authorization: `Bearer ${directLineSecret}` } }
        );

        const newActivities = res.data.activities.filter(
          (a) => a.from.id !== "user"
        );

        if (newActivities.length > 0) {
          setMessages((prev) => [...prev, ...newActivities]);
          setWatermark(res.data.watermark);
        }
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [conversationId, watermark, directLineSecret]);

  const sendMessage = async () => {
    if (!input.trim() || !conversationId) return;
    const userMessage = { from: { id: "user" }, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      await axios.post(
        `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`,
        { type: "message", from: { id: "user", name: "User" }, text: input },
        { headers: { Authorization: `Bearer ${directLineSecret}`, "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10, minHeight: 300, maxHeight: 400, overflowY: "auto", background: "#f9f9f9" }}>
      {messages.map((msg, idx) => (
        <div key={idx} style={{ textAlign: msg.from.id === "user" ? "right" : "left", margin: "5px 0" }}>
          {msg.text && (
            <span style={{ display: "inline-block", padding: "8px 12px", borderRadius: 16, background: msg.from.id === "user" ? "#0078d4" : "#e1e1e1", color: msg.from.id === "user" ? "#fff" : "#000", maxWidth: "80%" }}>
              {msg.text}
            </span>
          )}
        </div>
      ))}

      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, padding: 8, borderRadius: 4, marginRight: 8 }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} style={{ padding: "8px 16px", borderRadius: 4, background: "#0078d4", color: "#fff", border: "none" }}>
          Send
        </button>
      </div>
    </div>
  );
}
