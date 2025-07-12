import React, { useState } from "react";
import { glitchStructure } from "./glitchStructure";

type GlitchPickerPopupProps = {
  onSelect: (src: string) => void;
  onClose: () => void;
  selectedSrc: string | null;
  onTextChange?: (line1: string, line2: string, line3: string) => void;
  initialText?: { line1: string; line2: string; line3: string };
};

const GlitchPickerPopup = ({
  onSelect,
  onClose,
  selectedSrc,
  onTextChange,
  initialText,
}: GlitchPickerPopupProps) => {
  const [category, setCategory] = useState<string>("default");
  const [selected, setSelected] = useState<string | null>(selectedSrc);

  const [line1, setLine1] = useState(initialText?.line1 || "");
  const [line2, setLine2] = useState(initialText?.line2 || "");
  const [line3, setLine3] = useState(initialText?.line3 || "");

  const handleClick = (url: string) => {
    if (selected === url) {
      // Уже выбран — снимаем выбор
      setSelected(null);
      onSelect(""); // или onSelect(null), если поддерживается
    } else {
      // Новый выбор
      setSelected(url);
      onSelect(url);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        color: "#0ff",
        display: "flex",
        zIndex: 999,
        fontFamily: "monospace",
      }}
    >
      {/* Левая панель */}
      <div
        style={{
          width: "200px",
          borderRight: "1px solid #0ff",
          padding: "1rem",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>⚡ Глитч Категории</h3>
        {Object.keys(glitchStructure).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: category === cat ? "#000" : "#0ff",
              backgroundColor: category === cat ? "#0ff" : "transparent",
              border: "1px solid #0ff",
              padding: "6px 12px",
              width: "100%",
              cursor: "pointer",
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
        <button onClick={onClose} style={{ marginTop: "2rem", color: "#f00" }}>
          ✖ Закрыть
        </button>
        <div style={{ marginTop: "2rem" }}>
          <button
            disabled={!selected}
            onClick={() => {
              if (selected) {
                onSelect(selected);
                if (onTextChange) onTextChange(line1, line2, line3);
                onClose();
              }
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: selected ? "#0f0" : "#333",
              color: selected ? "#000" : "#777",
              border: "1px solid #0f0",
              cursor: selected ? "pointer" : "not-allowed",
              fontFamily: "monospace",
            }}
          >
            ✔ Применить глитч
          </button>
        </div>
      </div>

      {/* Контент */}
      <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
        <h3 style={{ marginBottom: "1rem" }}>🧬 Глитч-Интро</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {glitchStructure[category]?.map((url) => (
            <video
              key={url}
              src={url}
              muted
              loop
              playsInline
              onClick={() => handleClick(url)}
              style={{
                width: "100px",
                height: "120px",
                objectFit: "cover",
                cursor: "pointer",
                border: selected === url ? "3px solid #0f0" : "2px solid #0ff",
                borderRadius: "4px",
                boxShadow: "0 0 6px #00ffff",
              }}
            />
          ))}
        </div>

        {/* Текстовое поле */}
        <div style={{ marginTop: "2rem" }}>
          <label style={{ color: "#0ff", fontFamily: "monospace" }}>
            🧠 Текст для глитч-интро:
          </label>
          <textarea
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
            placeholder="строка 1"
            rows={1}
            style={inputStyle}
          />
          <textarea
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
            placeholder="строка 2"
            rows={1}
            style={inputStyle}
          />
          <textarea
            value={line3}
            onChange={(e) => setLine3(e.target.value)}
            placeholder="строка 3 (панчлайн)"
            rows={1}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  backgroundColor: "#111",
  color: "#0ff",
  fontFamily: "monospace",
  fontSize: "1rem",
  padding: "6px",
  borderRadius: "6px",
  marginTop: "0.4rem",
  border: "1px solid #0ff",
};

export default GlitchPickerPopup;
