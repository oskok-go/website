import React, { useState } from "react";

// 🔁 Импортируй свою структуру с видео-концовками
import { endingStructure } from "./endingStructure";

type EndingPickerPopupProps = {
  onSelect: (src: string) => void;
  onClose: () => void;
  selectedSrc: string | null;
};

const EndingPickerPopup = ({ onSelect, onClose }: EndingPickerPopupProps) => {
  const [category, setCategory] = useState<string>("funny");
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (url: string) => {
    setSelected(url);
    onSelect(url);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        color: "#0ff",
        display: "flex",
        zIndex: 999,
        fontFamily: "monospace",
      }}
    >
      {/* Панель категорий */}
      <div
        style={{
          width: "200px",
          borderRight: "1px solid #0ff",
          padding: "1rem",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>🎞️ Категории</h3>
        {Object.keys(endingStructure).map((cat) => (
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
            ✔ Применить конец
          </button>
        </div>
      </div>

      {/* Панель выбора концовок */}
      <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
        <h3 style={{ marginBottom: "1rem" }}>🎬 Завершающие клипы</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {endingStructure[category]?.map((url) => {
            const isGif = url.toLowerCase().endsWith(".gif");
            return isGif ? (
              <img
                key={url}
                src={url}
                loading="lazy"
                onClick={() => handleClick(url)}
                style={{
                  width: "100px",
                  height: "120px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border:
                    selected === url ? "3px solid #0f0" : "2px solid #0ff",
                  borderRadius: "4px",
                  boxShadow: "0 0 6px #00ffff",
                }}
              />
            ) : (
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
                  border:
                    selected === url ? "3px solid #0f0" : "2px solid #0ff",
                  borderRadius: "4px",
                  boxShadow: "0 0 6px #00ffff",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EndingPickerPopup;
