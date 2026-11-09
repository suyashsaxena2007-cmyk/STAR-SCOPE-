
import { useState, type FormEvent } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "What is a black hole?",
  "Explain light-years",
  "How do rockets work?",
  "What is an exoplanet?",
];

export default function SpaceAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey, space explorer! 🚀 I'm Starscope AI. Ask me about planets, galaxies, rockets, satellites, space missions, or any astronomy concept.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage(
    event?: FormEvent<HTMLFormElement>,
    suggestedQuestion?: string
  ) {
    event?.preventDefault();

    const question = (suggestedQuestion ?? input).trim();

    if (!question || loading) return;

    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", content: question },
    ];

    setMessages(updatedMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("AI server is not ready yet.");
      }

      const data = await response.json();

      if (typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error("The AI returned an empty response.");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setError(
        "Starscope AI isn't connected yet. Complete the backend setup to start chatting."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="space-ai"
      style={{
        padding: "64px 20px",
        color: "#f8fafc",
        background:
          "radial-gradient(ellipse at top, #172554 0%, #080d1c 55%, #030712 100%)",
        fontFamily: "inherit",
      }}
    >
      <div style={{ maxWidth: 850, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 38 }}>✦ 🚀 ✦</div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 42px)", margin: "12px 0" }}>
            Meet Starscope AI
          </h2>
          <p style={{ color: "#a5b4fc", lineHeight: 1.7 }}>
            Your personal guide to the universe.
            <br />
            Ask questions. Explore ideas. Understand space.
          </p>
        </div>

        <div
          style={{
            border: "1px solid #334155",
            borderRadius: 20,
            background: "rgba(15, 23, 42, 0.88)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #334155",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                display: "grid",
                placeItems: "center",
                borderRadius: 14,
                background: "#1e3a8a",
                fontSize: 22,
              }}
            >
              🌌
            </div>
            <div>
              <strong>Starscope AI</strong>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>
                Space & Astronomy Assistant
              </div>
            </div>
          </div>

          <div
            aria-live="polite"
            style={{
              padding: 20,
              minHeight: 250,
              maxHeight: 440,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  alignSelf:
                    message.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "88%",
                  padding: "12px 15px",
                  borderRadius: 16,
                  background:
                    message.role === "user" ? "#3730a3" : "#1e293b",
                  border: "1px solid #334155",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#cbd5e1",
                    marginBottom: 5,
                  }}
                >
                  {message.role === "user" ? "YOU" : "✦ STARSCOPE AI"}
                </div>
                {message.content}
              </div>
            ))}

            {loading && (
              <div style={{ color: "#a5b4fc" }}>
                Starscope is thinking...
              </div>
            )}

            {error && (
              <div
                role="alert"
                style={{
                  color: "#fca5a5",
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                {error}
              </div>
            )}
          </div>

          <div style={{ padding: "0 16px 16px" }}>
            <p style={{ color: "#94a3b8", fontSize: 12 }}>
              TRY ASKING
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 16,
              }}
            >
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  disabled={loading}
                  onClick={() => void sendMessage(undefined, suggestion)}
                  style={{
                    background: "#172554",
                    color: "#dbeafe",
                    border: "1px solid #3730a3",
                    borderRadius: 20,
                    padding: "9px 12px",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => void sendMessage(event)}
              style={{ display: "flex", gap: 10 }}
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask anything about space..."
                aria-label="Your space question"
                disabled={loading}
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: "14px 15px",
                  borderRadius: 12,
                  border: "1px solid #475569",
                  background: "#0f172a",
                  color: "#fff",
                  fontSize: 14,
                }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                style={{
                  padding: "0 18px",
                  borderRadius: 12,
                  border: 0,
                  background: "#4f46e5",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Send ↑
              </button>
            </form>
          </div>
        </div>

        <p
          style={{
            color: "#64748b",
            textAlign: "center",
            fontSize: 12,
            marginTop: 16,
          }}
        >
          Designed for curious minds exploring the universe.
        </p>
      </div>
    </section>
  );
}
