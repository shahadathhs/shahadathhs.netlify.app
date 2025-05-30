"use client";

import { useState } from "react";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );

  const askAI = async () => {
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ question: input }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow rounded p-4 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-${m.role === "user" ? "blue" : "green"}-700`}
          >
            <strong>{m.role === "user" ? "You" : "SajibBot"}:</strong> {m.text}
          </div>
        ))}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={askAI}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
