"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! 👋 What would you like to search today? (Drink prices, recommendations, comparisons, or anything else about beverages!)",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call API to get AI response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Oops! Something went wrong. Try again! 😅",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "Network error bro 😢 Try again!",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <nav className="flex justify-between items-center px-6 md:px-8 py-5 bg-white dark:bg-gray-950 border-b-2 border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 hover:opacity-75 transition">
          <span className="text-3xl">🍺</span>
          <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white">
            BeverageCompare
          </h1>
        </Link>
        <div className="flex gap-2 md:gap-4">
          <Link href="/compare">
            <button className="px-3 md:px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-sm md:text-base">
              Compare
            </button>
          </Link>
          <Link href="/">
            <button className="px-3 md:px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition text-sm md:text-base font-semibold">
              Home
            </button>
          </Link>
        </div>
      </nav>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } animate-in fade-in slide-in-from-bottom-2`}
            >
              <div
                className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-amber-600 text-white rounded-br-none shadow-md hover:shadow-lg transition"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none shadow-md hover:shadow-lg transition border border-gray-300 dark:border-gray-700"
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap wrap-break-word">{message.text}</p>
                <span className={`text-xs mt-2 block ${message.sender === "user" ? "text-amber-100" : "text-gray-500 dark:text-gray-400"}`}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 dark:bg-gray-800 px-5 py-4 rounded-2xl rounded-bl-none shadow-md border border-gray-300 dark:border-gray-700">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce animation-delay-1"></div>
                  <div className="w-2.5 h-2.5 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce animation-delay-2"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-950 border-t-2 border-gray-200 dark:border-gray-800 px-4 md:px-6 py-5">
        <form onSubmit={handleSendMessage} className="max-w-2xl mx-auto">
          <div className="flex gap-2 md:gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about drinks! 🍻"
              className="flex-1 px-4 md:px-5 py-3 rounded-2xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-amber-600 dark:focus:border-amber-400 transition placeholder-gray-500 text-sm md:text-base"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-4 md:px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold transition hover:shadow-lg text-sm md:text-base"
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
