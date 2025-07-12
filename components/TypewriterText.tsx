import React, { useEffect, useState } from "react";

export const TypewriterText = ({
  text,
  speed = 60,
}: {
  text: string;
  speed?: number;
}) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) return;

    let i = -1;

    const cleanedText = text.replace(/^[:\s\n]+/, ""); // удаляем пробелы/абзацы в начале
    setDisplayed("");

    const interval = setInterval(() => {
      i++;
      setDisplayed((prev) => prev + (cleanedText[i] || ""));
      if (i >= cleanedText.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <div>{displayed}</div>;
};
