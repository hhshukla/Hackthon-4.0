"use client";
import React, { useState, FormEvent } from "react";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const getBotResponse = (input: string): string => {
  const text = input.toLowerCase();

  if (text.includes("hello") || text.includes("hi") || text.includes("hy")) {
    return "Hey there! How can I help you today?";
  } else if (text.includes("price")) {
    return "Prices vary by product. Can you be more specific?";
  } else if (text.includes("help")) {
    return "Sure! Let me know what you need help with.";
  } else if (text.includes("contact")) {
    return "You can reach us at contact@example.com.";
  } else if (text.includes("bye")) {
    return "Goodbye! Have a great day!";
  }

  return "I'm not sure I understand. Can you rephrase?";
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const botReply: Message = {
      text: getBotResponse(input),
      sender: "bot",
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botReply]);
    }, 500);

    setInput("");
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? " 💬" : " 💬"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 shadow-xl bg-white rounded-lg overflow-hidden border border-gray-300 z-40">
          <div className="bg-blue-600 text-white p-3 font-semibold flex justify-between items-center">
            <span>💬 ChatBot</span>
            <button
              className="text-white hover:text-gray-200"
              onClick={() => setIsOpen(false)}
              title="Close Chat"
            >
              ❌
            </button>
          </div>

          <div className="p-3 h-64 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex border-t p-2">
            <input
              className="flex-1 border rounded px-2 py-1 text-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="ml-2 bg-blue-600 text-white px-3 py-1 rounded"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
