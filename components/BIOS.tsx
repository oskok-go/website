import React, { useEffect, useState, useRef } from "react";

// ===== helpers =====

const now = new Date();
const getScreenResolution = () =>
  `${window.screen.width}x${window.screen.height}`;
const getDeviceType = () =>
  /Mobile|Android|iP(ad|hone)/i.test(navigator.userAgent)
    ? "MOBILE"
    : "DESKTOP";
const pad = (n) => String(n).padStart(2, "0");
const timeString = `${pad(now.getDate())}/${pad(
  now.getMonth() + 1
)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
  now.getSeconds()
)}`;

function getOSType() {
  if (navigator.userAgent.indexOf("Win") !== -1) return "WINDOWS";
  if (navigator.userAgent.indexOf("Mac") !== -1) return "MAC";
  if (navigator.userAgent.indexOf("Linux") !== -1) return "LINUX";
  if (navigator.userAgent.indexOf("Android") !== -1) return "ANDROID";
  if (navigator.userAgent.indexOf("like Mac") !== -1) return "iOS";
  return "UNKNOWN";
}
function getBrowser() {
  const ua = navigator.userAgent;
  if (ua.indexOf("Chrome") !== -1 && ua.indexOf("Edg") === -1) return "CHROME";
  if (ua.indexOf("Firefox") !== -1) return "FIREFOX";
  if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1)
    return "SAFARI";
  if (ua.indexOf("Edg") !== -1) return "EDGE";
  return "BROWSER";
}
const lang = navigator.language ? navigator.language.toUpperCase() : "EN";

// ====== BIOS text ======
const biosLines = [
  "> BATYA-404 BIOS v1.08 (c)",
  "> USER SCAN ................. COMPLETED",
  `> SYS: ${timeString} | ${getDeviceType()} | ${getOSType()} | ${getBrowser()} | ${getScreenResolution()} |  `,
  "",
  "> MEMORY CHECK .............. OK",
  "> SYNTHWAVE MODE ............ ENABLED",
  "> PETS ...................... FEEDED",
  "> RETRO-LOVE ................ 100%",
  "> TEA CUP LEVEL ............. 79%",
  "> KARMA POINTS .............. 404 FOUND",
  "",
  "> UNAUTHORIZED SHENKI WILL BE BANNED",
  "> CRITICAL:PETS NOT PETTED .. 0 DAYS 8 HOURS",
  "PRESS ANY KEY TO CONTINUE_",
];

export default function BIOS({ onComplete }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [blink, setBlink] = useState(true);
  const FIRST_EGG_DELAY = 45000; // 1 минута (первая пасхалка)
  const SECOND_EGG_DELAY = 60000; // 1 минута (вторая пасхалка)

  // === Пасхалки
  const easterEggAudio1 = useRef<HTMLAudioElement | null>(null);
  const easterEggAudio2 = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Инициализируем оба трека
    easterEggAudio1.current = new Audio(
      "https://store2.gofile.io/download/direct/52d4bbec-cfa3-4df9-984d-24eb62dfe339/egg_skaju.mp3"
    );
    easterEggAudio1.current.load();

    easterEggAudio2.current = new Audio(
      "https://store4.gofile.io/download/direct/d47ec367-96b0-4b5f-ab82-c88ce4d2af96/batya_strannik.mp3"
    ); // поменяй на свой путь!
    easterEggAudio2.current.load();
  }, []);

  // Пасхальные таймеры
  useEffect(() => {
    if (!done) return;
    let timeout1: ReturnType<typeof setTimeout> | null = null;
    let timeout2: ReturnType<typeof setTimeout> | null = null;

    // --- Обработчик окончания —
    const finish = () => {
      if (timeout1) clearTimeout(timeout1);
      if (timeout2) clearTimeout(timeout2);
      easterEggAudio1.current?.pause();
      easterEggAudio1.current && (easterEggAudio1.current.currentTime = 0);
      easterEggAudio2.current?.pause();
      easterEggAudio2.current && (easterEggAudio2.current.currentTime = 0);
      if (onComplete) onComplete();
    };

    window.addEventListener("keydown", finish);
    window.addEventListener("mousedown", finish);

    // --- Первая пасхалка
    timeout1 = setTimeout(() => {
      easterEggAudio1.current?.play().catch(() => {});

      easterEggAudio1.current?.addEventListener("ended", () => {
        timeout2 = setTimeout(() => {
          easterEggAudio2.current?.play().catch(() => {});
        }, SECOND_EGG_DELAY); // ← используем переменную
      });
    }, FIRST_EGG_DELAY); // ← используем переменную

    return () => {
      if (timeout1) clearTimeout(timeout1);
      if (timeout2) clearTimeout(timeout2);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("mousedown", finish);
      easterEggAudio1.current?.pause();
      easterEggAudio1.current && (easterEggAudio1.current.currentTime = 0);
      easterEggAudio2.current?.pause();
      easterEggAudio2.current && (easterEggAudio2.current.currentTime = 0);
    };
  }, [done, onComplete]);

  // Typewriter effect
  const typeSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    typeSound.current = new Audio("/type.mp3");
    typeSound.current.load();
  }, []);

  useEffect(() => {
    if (lineIndex >= biosLines.length) {
      setDone(true);
      return;
    }
    const fullLine = biosLines[lineIndex] || "";
    if (charIndex < fullLine.length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + fullLine[charIndex]);
        setCharIndex((prev) => prev + 1);
        if (fullLine[charIndex]?.trim() && typeSound.current) {
          typeSound.current.currentTime = 0;
          typeSound.current.play().catch(() => {});
        }
      }, 30);
      return () => clearTimeout(timeout);
    } else if (lineIndex < biosLines.length) {
      const timeout = setTimeout(() => {
        if (lineIndex < biosLines.length - 1) {
          setDisplayedLines((prev) => [...prev, fullLine]);
        }
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex]);

  useEffect(() => {
    if (done) {
      const id = setInterval(() => setBlink((b) => !b), 420);
      return () => clearInterval(id);
    }
  }, [done]);

  // ======= Цвета для особых строк =======
  function getLineStyle(line: string) {
    if (
      line.startsWith("> CRITICAL") ||
      line.includes("ERROR") ||
      line.includes("FAILED")
    ) {
      return {
        color: "#ff4b4b",
        textShadow: "0 0 1px #ff3030, 0 0 33px #bb0000",
      };
    }
    if (line.toLowerCase().includes("unauthorized")) {
      return {
        color: "#ffe861",
        textShadow: "0 0 1px #fff066, 0 0 33px #fff250",
      };
    }
    return undefined;
  }

  // ======= Рендер =======
  return (
    <div className="bios-fullscreen">
      <div className="bios-text">
        {displayedLines.map((line, i) =>
          line.trim() === "" ? (
            <div key={i} style={{ height: 18 }} />
          ) : (
            <div key={i} style={getLineStyle(line)}>
              {line}
            </div>
          )
        )}
        {lineIndex < biosLines.length ? (
          <div style={getLineStyle(biosLines[lineIndex])}>
            {currentLine}
            <span className="bios-cursor">█</span>
          </div>
        ) : (
          biosLines[biosLines.length - 1].endsWith("_") && (
            <div style={{ marginTop: 22 }}>
              {biosLines[biosLines.length - 1].replace("_", "")}
              <span className="bios-cursor">{blink ? "█" : " "}</span>
            </div>
          )
        )}
      </div>
      <style>{`
        .bios-fullscreen {
          position: fixed;
          inset: 0;
          background: #000;
          color: #5cf95c;
          font-family: 'IBM Plex Mono', 'Fira Mono', 'Consolas', monospace;
          font-size: 1.13rem;
          letter-spacing: 0.03em;
          line-height: 1.65;
          text-shadow:
            0 0 0px #39e339,
            0 0 12px #156615;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          z-index: 99999;
          user-select: none;
        }
        .bios-text {
          width: 100%;
          max-width: 540px;
          min-width: 260px;
        }
        .bios-cursor {
          display: inline-block;
          margin-left: 3px;
          font-weight: 700;
          font-size: 1.13em;
          animation: bios-blink 1s steps(1) infinite;
        }
        @keyframes bios-blink {
          50% { opacity: 0.18; }
        }
        @media (max-width: 700px) {
          .bios-text {
            font-size: 0.98rem;
            padding: 0 7vw;
          }
        }
      `}</style>
    </div>
  );
}
