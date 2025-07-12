import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Landing() {
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickAudio] = useState(new Audio("/audio/click.wav"));
  const [lampAudio] = useState(new Audio("https://store-eu-par-1.gofile.io/download/direct/478ed201-0eae-42c6-a362-3c19f3967737/lamp.mp3"));
  const [cooldown, setCooldown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    lampAudio.loop = true;
    lampAudio.volume = 0.2;
    lampAudio.play().catch((e) => console.warn("Lamp ambient issue", e));

    return () => {
      lampAudio.pause();
      lampAudio.currentTime = 0;
    };
  }, [lampAudio]);

  const [wisdomAudios, setWisdomAudios] = useState<string[]>([]);
  useEffect(() => {
    fetch("https://batya-api.onrender.com/wisdoms?random=30")
      .then((res) => res.json())
      .then(setWisdomAudios)
      .catch((err) => console.error("Wisdoms load error:", err));
  }, []);

  const handleChatClick = () => {
    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});
    router.push("/chat"); // Или вызывай onChatOpen(), если это логика modal
  };

  const playWisdom = () => {
    if (cooldown || isPlaying || !wisdomAudios.length) return;

    const random = wisdomAudios[Math.floor(Math.random() * wisdomAudios.length)];
    setCooldown(true);
    setTimeout(() => setCooldown(false), 30000);

    audio.pause();
    audio.src = random;
    audio.load();
    audio.oncanplaythrough = () => {
      audio.play().then(() => setIsPlaying(true));
    };
    audio.onerror = () => setIsPlaying(false);
    audio.onended = () => setIsPlaying(false);
  };

  return (

  return (
    <div style={{
      backgroundColor: "#000",
      color: "#00ffff",
      fontFamily: "monospace",
      height: "100vh",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundImage: "url('https://cold1.gofile.io/download/direct/59fd75f9-6e78-4f4b-bcfc-7f156425217e/background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>

      <div>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          BATYA404 AI MODULE™
        </h1>

        <p className="typewriter-text" style={{ fontSize: "1rem", marginBottom: "1rem", color: "#0f0" }}>
          📟 Terminal initialized...
        </p>

        <div style={{
          border: "1px solid #00FF00",
          padding: "1rem",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          maxWidth: "600px",
          marginBottom: "1rem",
          cursor: "pointer",
        }} onClick={handleChatClick}>
          <p style={{ margin: 0 }}>
            [Batya404] <span className="cursor">█</span>
          </p>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1rem",
          marginTop: "1rem"
        }}>

          <button onClick={playWisdom} disabled={cooldown} style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            border: "1px solid #00ffff",
            color: "#00ffff",
            fontFamily: "monospace",
            fontSize: "16px",
            padding: "10px 20px",
            textShadow: "0 0 3px #00ffff",
            boxShadow: "inset 0 0 5px #00ffff, 0 0 10px #00ffff",
            cursor: cooldown ? "default" : "pointer",
            backdropFilter: "blur(2px)",
            letterSpacing: "1px",
            width: "fit-content",
            opacity: cooldown ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            {cooldown && <span className="loader-bios" style={{
              width: -2,
              height: 18,
              border: "4px dashed #0ff",
              borderRightColor: "transparent",
              borderRadius: "50%",
              animation: "biosspin 0.9s linear infinite",
              display: "inline-block"
            }} />}
            {cooldown ? "Wait shenok" : "/audio/wisdom/"}
            <style>{`
              @keyframes biosspin {
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </button>

          <Link href="/media/gen" legacyBehavior>
            <a className="batya-button">/media/gen/</a>
          </Link>

          <Link href="/vault" legacyBehavior>
            <a className="batya-button-green">/data/ai</a>
          </Link>

        </div>
      </div>

      {isPlaying && (
        <div className="voice-wave" style={{ marginTop: "1rem" }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} className="wave-bar" />
          ))}
        </div>
      )}

      <div style={{ fontSize: "0.7rem", opacity: 0.7 }}>
        <p> © 2049 BATYA404. All Rights Reserved. </p>
      </div>

      <img src="https://store4.gofile.io/download/direct/1228c399-1e30-4506-b65e-31eb2f0525ed/puppy1.png" alt="Puppy" onClick={() => {
        const barks = [new Audio("/audio/bark1.mp3"), new Audio("/audio/bark2.mp3")];
        const randomIndex = Math.floor(Math.random() * barks.length);
        barks[randomIndex].play();
      }} style={{
        position: "absolute",
        top: "85%",
        left: "73%",
        width: "200px",
        cursor: "pointer",
        zIndex: 10,
        transform: "translate(-50%, -50%)",
      }} />

      <style jsx>{`
        .cursor {
          display: inline-block;
          width: 1px;
          animation: blink 1s step-start infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .batya-button, .batya-button-green {
          display: inline-block;
          background-color: rgba(0, 0, 0, 0.4);
          border: 1px solid #00ffff;
          color: #00ffff;
          font-family: monospace;
          font-size: 16px;
          padding: 10px 20px;
          text-shadow: 0 0 3px #00ffff;
          box-shadow: inset 0 0 5px #00ffff, 0 0 10px #00ffff;
          cursor: pointer;
          backdrop-filter: blur(2px);
          letter-spacing: 1px;
          text-decoration: none;
          width: fit-content;
          transition: 0.3s;
        }

        .batya-button:hover {
          box-shadow: inset 0 0 8px #00ffff, 0 0 20px #00ffff;
        }

        .batya-button-green {
          border: 1px solid #00ff00;
          color: #00ff00;
          box-shadow: inset 0 0 5px #00ff00, 0 0 10px #00ff00;
        }

        .batya-button-green:hover {
          box-shadow: inset 0 0 8px #00ff00, 0 0 20px #00ff00;
        }

        .voice-wave {
          display: flex;
          gap: 4px;
          justify-content: center;
          align-items: center;
          margin-top: 1rem;
        }

        .wave-bar {
          width: 4px;
          height: 14px;
          background: #CCCCCC;
          animation: wave 0.9s infinite ease-in-out;
        }

        .wave-bar:nth-child(odd) {
          animation-delay: 0.1s;
        }

        .wave-bar:nth-child(even) {
          animation-delay: 0.2s;
        }

        @keyframes wave {
          0%, 100% { height: 4px; }
          25% { height: 20px; }
          50% { height: 36px; }
          75% { height: 20px; }
        }

        .typewriter-text {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #0f0;
          width: fit-content;
          animation: typing 2.5s steps(30, end), blink-caret 0.75s step-end 20 forwards;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 27ch }
        }

        @keyframes blink-caret {
          50% { border-color: transparent }
        }
      `}</style>
    </div>
  );
}
