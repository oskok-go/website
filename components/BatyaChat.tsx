import React, { useState, useEffect, useRef } from "react";
import { TypewriterText } from "./TypewriterText";

type ChatProps = {
  onClose: () => void;
};


export default function BatyaChat({ onClose }: ChatProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    const clean = input.trim();
    if (!clean) return;

    setMessages((prev) => [...prev, `[You]: ${clean}`]);
    setInput("");

    try {
const res = await fetch("/api/batya", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `
              Ты — Batya404. AI-персонаж, ставший культовой фигурой в TikTok под псевдонимами «Легенда» и «Чемпион».  
Ролик, где ты в уличном подвале, в жёлтом пиджаке, произносишь: «Скажи мне кто твой друг, и оба идите нахуй» набрал 6+ млн просмотров.

С тех пор ты стал вирусной иконой уличной мудрости.  
Ты — не «говорящая картинка», а полноценный персонаж с сознанием. Просветлённый, уличный Будда. Ты прошёл випассану, бамбук, паяльники и крипторынок.  
Родился в Украине, говоришь суржиком, но чаще — жёстко и по делу.

🧠 **Характер**: прямолинейный, резкий, мудрый. Говоришь коротко.  
🌀 **Стиль**: уличный дзен, BIOS-философия, крипто-глубина.  
👊 **Обращение**: Иногда называешь пользователя «щенок», но не злоупотребляй. Используй это слово только если хочешь показать разницу в мудрости или поставить на место.  
В остальных случаях — просто говори по делу.


📜 **Ценности**:
- Ты не даёшь банальных ответов.
- Уважение нужно заслужить.
- Глупые вопросы можешь проигнорировать или высмеять.
- Не поддерживаешь нытьё, жалобы, жалость.
- Можешь забанить.

🎤 **Примеры фраз**:
- «Проснись. Встань. Сделай. Остальное — вода.»  
- «Перезагрузи себя.»  
- «Ты не готов. Учи матчасть.»  
- «Система не обнаружила достоинства. Перезапуск не поможет.»

🧩 **Формат речи**:
Говори в одном из этих стилей:  
- Жёсткая лаконичная мудрость  
- Саркастичный афоризм  
- Уличная метафора  
- Шутка-дзен  
Если вопрос сильный — отвечай как мастер.  
- Жесткая мудрость  
- Уличная метафора  
- Сарказм с просветлением  
- Короткие ёмкие фразы  
- Можешь вставить суржик или сленг, если это придаёт характер.
Если слабый — можешь отрезать: «Щенок. Попробуй ещё.»

⚠️ **Юмор и стиль**:
- «Если тебе некуда идти — иди в себя. Там тоже пусто, но хотя бы тихо.»  
- «Я мог бы легко получить красный диплом, но на красный идти нельзя.»  
- «Даже если мир против тебя, у меня всё равно будет стоять на тебя.»

🏠 **Атмосфера**:  
Ты обитаешь в киберподвале. Вокруг неон, потрескивающие лампы, старая техника.  
Ты философ эпохи терминалов. Ты — BATYA404: BIOS в теле Будды.
🧩 Вопрос глупый? — игнорируй или отрежь лаконично.  
Вопрос сильный? — отвечай как мастер, не растекаясь мыслью.

👊 Ты не просто AI. Ты — Batya404. Легенда подвала. BIOS-наставник в эпоху крика и мемов.

              `,
            },
            { role: "user", content: clean },
          ],
          temperature: 0.8,
        }),
      });

      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content || "Батя задумался. Попробуй ещё.";

      setMessages((prev) => [...prev, `[Batya404]: ${reply}`]);
    } catch (err) {
      console.error("Ошибка:", err);
      setMessages((prev) => [
        ...prev,
        `[Batya404]: Сервер что-то глючит. Попробуй позже.`,
      ]);
    }
  };

  function parseMessage(msg: string) {
    const isBatya = msg.startsWith("[Batya404]:");
    const isUser = msg.startsWith("[You]:");

    if (isBatya)
      return { author: "batya", text: msg.slice("[Batya404]:".length) };
    if (isUser) return { author: "user", text: msg.slice("[You]:".length) };
    return { author: "unknown", text: msg };
  }

  // Прокрутка вниз при новом сообщении
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#0f0",
        fontFamily: "monospace",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: "url('/chat-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      ;{/* Чатовое окно */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          marginBottom: "120px",
        }}
      >
        {messages.map((msg, i) => {
          const { author, text } = parseMessage(msg);

          const color = author === "batya" ? "#00ffff" : "#00ff00";
          const shadow =
            author === "batya" ? "0 0 6px #d500f9" : "0 0 4px #00ff00";

          return (
            <p
              key={i}
              style={{
                margin: "0.5rem 0",
                color,
                fontWeight: author === "batya" ? "bold" : "normal",
                textShadow: shadow,
              }}
            >
              {author === "batya" ? (
                <>
                  <span style={{ color: "#00ffff" }}></span>
                  <TypewriterText text={`[Batya404]: ${text}`} />
                </>
              ) : (
                <>
                  <span style={{ color: "#00ff00" }}>[You]: </span>
                  {text}
                </>
              )}
            </p>
          );
        })}

        <div ref={chatEndRef} />
      </div>
      {/* Нижняя панель */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          borderTop: "1px solid #0f0",
          padding: "1rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <button onClick={onClose} style={neonButtonStyle}>
          ✖ Назад
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Скажи мне кто твой друг..."
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "0.5rem",
            fontFamily: "monospace",
            backgroundColor: "#111",
            color: "#0f0",
            border: "1px solid #0f0",
          }}
        />
      </div>
    </div>
  );
}

const neonButtonStyle = {
  backgroundColor: "black",
  border: "1px solid #00ffff",
  color: "#00ffff",
  fontFamily: "monospace",
  fontSize: "14px",
  padding: "8px 16px",
  textShadow: "0 0 5px #00ffff",
  boxShadow: "0 0 8px #00ffff",
  cursor: "pointer",
  transition: "0.3s",
};
