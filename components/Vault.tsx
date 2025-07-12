import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "https://batya-api.onrender.com/api";

export default function Vault() {
  const [newText, setNewText] = useState("");
  const [newType, setNewType] = useState("humor");
  const [current, setCurrent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const getRandom = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/random-joke`);
      const data = await res.json();
      setCurrent(data.text);
    } catch (err) {
      setCurrent("❌ Ошибка при получении шутки");
    } finally {
      setLoading(false);
    }
  };

  const addJoke = async () => {
    if (!newText.trim()) return;
    setSubmitting(true);
    try {
      await fetch(`${API_BASE}/add-joke`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText, type: newType }),
      });
      setCurrent(newText);
      setNewText("");
    } catch (err) {
      setCurrent("❌ Ошибка при добавлении шутки");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (current) navigator.clipboard.writeText(current).catch(() => {});
  }, [current]);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "monospace",
        background: "#111",
        color: "#0f0",
        minHeight: "100vh",
      }}
    >
      {/* Назад */}
      <Link
        to="/"
        style={{
          display: "inline-block",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          border: "1px solid #00ffff",
          color: "#00ffff",
          fontSize: "14px",
          padding: "8px 16px",
          marginBottom: "20px",
          textDecoration: "none",
          boxShadow: "inset 0 0 4px #00ffff, 0 0 8px #00ffff",
        }}
      >
        ← Назад
      </Link>

      <h1
        style={{
          fontSize: "24px",
          color: "#33ff99", // 🍃 умеренно-мятный
          textShadow: "0 0 6px #22cc88",
          fontFamily: "monospace",
          textAlign: "center",
          marginBottom: "30px",
          letterSpacing: "1px",
        }}
      >
        AI LEARNING MODULE™
      </h1>

      {/* Кнопка + добавление */}
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={getRandom}
          disabled={loading}
          style={{
            padding: "14px 28px",
            background: "transparent",
            border: "1px solid #33ff99",
            color: "#33ff99",
            fontFamily: "monospace",
            fontSize: "15px",
            textShadow: "0 0 6px #22cc88",
            boxShadow: "inset 0 0 3px #33ff99, 0 0 10px #22cc88",
            borderRadius: "8px",
            transition: "all 0.3s ease-in-out",
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "wait" : "pointer",
            marginBottom: "30px",
          }}
        >
          {loading ? "⏳ Reading..." : "🧬 Read Neuron"}
        </button>

        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // блокируем перенос строки
              addJoke(); // вызываем отправку
            }
          }}
          placeholder="Add Neuron for Batya404 ... and press Enter"
          style={{
            padding: "22px 12px",
            border: "#cc33aa",
            color: "#f0a6dc",
            backgroundColor: "#1a001a",
            fontFamily: "monospace",
            fontSize: "14px",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "650px",
            textShadow: "inset 0 0 3px #cc33aa, 0 0 7px #f0a6dc",
            boxShadow: "inset 0 0 4px #b76cff, 0 0 10px #ddbfff",
            marginBottom: "30px",
          }}
        />

        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          style={{
            padding: "18px 24px", // ← было 18px 0px
            background: "linear-gradient(145deg, #111111, #1c1c1c)",
            border: "1px solid #00f0ff",
            color: "#00f0ff",
            cursor: submitting ? "wait" : "pointer",
            fontFamily: "monospace",
            fontSize: "16px",
            textShadow: "0 0 6px #00f0ff",
            boxShadow: "0 0 14px #00f0ff, inset 0 0 6px #00f0ff",
            borderRadius: "10px",
            transition: "all 0.3s ease-in-out",
            opacity: submitting ? 0.6 : 1,
            minWidth: "150px",
            letterSpacing: "1px",
            textAlignLast: "center", // 👈 для центрирования выбранного текста
          }}
        >
          <option value="humor">😂 HUMOR</option>
          <option value="absurd">🤡 ABSURD</option>
          <option value="wisdom">📜 WISDOM</option>
          <option value="zen">🪷 ZEN</option>
          <option value="news">📰 NEWS</option>
          <option value="crypto">₿ CRYPTO</option>
          <option value="rage">😡 RAGE</option>
          <option value="threat">🔪 THREAT</option>
          <option value="meta">🧩 META</option>
          <option value="bios">💾 BIOS</option>
          <option value="glitch">🔁 GLITCH</option>
        </select>
        <button
          onClick={addJoke}
          disabled={submitting}
          style={{
            padding: "18px 0px",
            background: "linear-gradient(145deg, #111111, #1c1c1c)",
            border: "1px solid #00f0ff",
            color: "#00f0ff",
            cursor: submitting ? "wait" : "pointer",
            fontFamily: "monospace",
            fontSize: "16px",
            textShadow: "0 0 6px #00f0ff",
            boxShadow: "0 0 14px #00f0ff, inset 0 0 6px #00f0ff",
            borderRadius: "10px",
            transition: "all 0.3s ease-in-out",
            opacity: submitting ? 0.6 : 1,
            minWidth: "200px",
            letterSpacing: "1px",
          }}
        >
          {submitting ? "⏳ Processing..." : "🔌 Add Neuron"}
        </button>
      </div>

      <p style={{ fontSize: "1.2rem", color: "#0ff", marginBottom: "10" }}>
        а́ е́ и́ о́ у́ ы́ э́ ю́ я́
      </p>

      {/* Фраза по центру */}
      {current && (
        <div
          style={{
            position: "relative",
            top: "99px",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#111",
            fontSize: "15px",
            padding: "20px 30px",
            whiteSpace: "pre-wrap",
            color: "#66ffaa",
            textShadow: "0 0 4px #44ddaa",
            borderRadius: "12px",
            maxWidth: "80vw",
            zIndex: 999,
          }}
        >
          {current}
          <div style={{ height: "10px" }} />
          <button
            onClick={async () => {
              await fetch(
                `${API_BASE}/delete-joke?text=${encodeURIComponent(current!)}`,
                {
                  method: "DELETE",
                }
              );
              setCurrent(null);
            }}
            style={{
              marginTop: "10px",
              padding: "6px 16px",
              background: "transparent",
              border: "1px solid red",
              color: "red",
              cursor: "pointer",
              marginRight: "10px", // вот тут!
            }}
          >
            💀 Kill Neuron
          </button>
          <button
            onClick={() => {
              if (current) {
                navigator.clipboard.writeText(current).catch(() => {});
              }
              setCurrent(null);
            }}
            style={{
              marginTop: "12px",
              padding: "6px 15px",
              background: "transparent",
              border: "1px solid #0f0",
              color: "#0f0",
              cursor: "pointer",
            }}
          >
            📋 Copy
          </button>
        </div>
      )}
    </div>
  );
}
