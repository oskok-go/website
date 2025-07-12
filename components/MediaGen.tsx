import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundPickerPopup, { bgStructure } from "./BackgroundPickerPopup";
import { billboardSamples } from "./billboardPhrases";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import EndingPickerPopup from "./EndingPickerPopup";
import GlitchPickerPopup from "./GlitchPickerPopup";
import { glitchStructure } from "./glitchStructure";

// --- Samples ---
const sampleAnimals = [
  "https://store4.gofile.io/download/direct/0f6abdb4-12a6-46d4-b601-eb92076bc4d3/puppy1.png",
  "https://store-eu-par-4.gofile.io/download/direct/4c66d6db-9c73-44c1-a00c-cbaa7de17c95/cat1.png",
  "https://store5.gofile.io/download/direct/8c94359b-b788-4252-981e-d1ecfde4588f/rabbit.png",
  "https://store-eu-par-1.gofile.io/download/direct/6d2f0538-6165-40fc-8e3b-a8d490bbd06f/raven3.png",
  "https://store-eu-par-3.gofile.io/download/direct/0e2a051c-803d-4c7e-838b-e39a7d419ee6/puppy2.png",
  "https://store-eu-par-3.gofile.io/download/direct/c4293764-adb2-4342-847b-8dc98dda1581/cat5.png",
  "https://store-eu-par-1.gofile.io/download/direct/c6943c87-a69f-4e07-9f98-8d4528711bd2/dragon2.png",
];
const sampleBatya = [
  "https://cold-eu-agl-1.gofile.io/download/direct/0ff03fd4-6c84-4b36-9f67-b043953a8083/batya1.png",
  "https://store5.gofile.io/download/direct/4cfbcaeb-497a-4d1f-bca5-3a3fef5f9ab7/batya2.png",
  "https://store5.gofile.io/download/direct/a0b2f864-8773-4b36-aef7-02a94129dc80/batya3.png",
  "https://store1.gofile.io/download/direct/1af7df3c-7ac0-49ac-98da-6beb1367a50a/batyaj.png",
  "https://store4.gofile.io/download/direct/d71626aa-124d-459a-9a64-03d4d3e0c610/batya4.png",
  "https://store5.gofile.io/download/direct/556c03a9-9bf2-4cf2-8070-726d9d1c4278/batya62.png",
  "https://store5.gofile.io/download/direct/6b749557-7b98-4b56-b1e6-7cfe39695040/batya8.png",
  "https://store-eu-par-4.gofile.io/download/direct/dfc2d1c0-ebcd-4ace-ac5d-b6dc7438d60f/batya12.png",
  "https://store2.gofile.io/download/direct/ebbe7443-470b-404c-a80d-82cacf9948ee/batyam.png",
];

const D_ID_API_KEY = "Basic cmVhbGJvb203M0BnbWFpbC5jb20:bTd5c7ElGri5TXC2vlNf-";

const TELEGRAM_BOT_TOKEN = "8077281002:AAE5gh5yfJSEu09AgoWKLlUjYuG3x2X2HVM";
const TELEGRAM_CHAT_ID = "475203820"; // или числовой ID

// --- Неоновый тост ---
function Toast({ message, type = "info", onClose, duration = 3400 }) {
  React.useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;
  return (
    <div className="toast" onClick={onClose}>
      <span style={{ marginRight: 8 }}>{type === "error" ? "❌" : "✅"}</span>
      {message}
      <style>{`
        .toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 9px 16px;
          background: ${type === "error" ? "#800020" : "#16213e"};
          color: #64ff1a;
          border: 2px solid #0ff;
          border-radius: 12px;
          font-family: monospace;
          font-size: 1rem;
          z-index: 9999;
          box-shadow: 0 4px 40px #0ff6, 0 0 2px #0ff;
          opacity: 0.98;
          min-width: 260px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: all .24s;
        }
        @media (max-width: 600px) {
          .toast {
            bottom: 12px;
            right: 8px;
            min-width: 150px;
            font-size: 0.92rem;
            padding: 7px 6px;
          }
        }
      `}</style>
    </div>
  );
}

// --- Неоновая кнопка с BIOS-лоадером ---
function NeonButton({ children, onClick, style, loading, disabled, ...props }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        background: hover ? "rgba(0,255,255,0.13)" : "none",
        border: "1px solid #0ff",
        color: "#0ff",
        padding: "12px 28px",
        borderRadius: 15,
        fontWeight: 700,
        fontFamily: "monospace",
        fontSize: "1.05rem",
        margin: "0 8px 12px 0",
        cursor: loading || disabled ? "not-allowed" : "pointer",
        boxShadow: hover
          ? "0 0 24px #0ff, 0 0 8px #0ff8, 0 0 2px #0ff"
          : "0 0 8px #0ff4, 0 0 2px #0ff",
        outline: "none",
        opacity: loading || disabled ? 0.54 : 1,
        transform: active ? "scale(0.97)" : hover ? "scale(1.045)" : "scale(1)",
        transition: "all 0.14s cubic-bezier(.4,2.3,.3,1)",
        letterSpacing: "0.06em",
        textShadow: "0 0 0px #0ff, 0 0 40px #0ff, 0 0 20px #0ff",
        animation: hover ? "neon-wave 1.3s infinite linear alternate" : "none",
        ...style,
      }}
      {...props}
    >
      {loading ? (
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="loader-bios" />
          <span style={{ fontFamily: "monospace", letterSpacing: "0.1em" }}>
            Загрузка...
          </span>
        </span>
      ) : (
        children
      )}
      <style>{`
        .loader-bios {
          display: inline-block;
          width: 19px;
          height: 19px;
          border: 2.5px dashed #0ff;
          border-radius: 50%;
          border-right-color: transparent;
          animation: biosspin 0.9s linear infinite;
          margin-bottom: -3px;
        }
        @keyframes biosspin {
          100% { transform: rotate(360deg);}
        }
        @keyframes neon-wave {
          0% {
            text-shadow:
              0 0 6px #0ff,
              0 0 16px #0ff,
              0 0 32px #00eaff,
              0 0 44px #006fff;
            filter: brightness(1);
          }
          30% {
            text-shadow:
              0 0 12px #0ff,
              0 0 22px #0ff,
              0 0 44px #00ffd0,
              0 0 50px #0041ff;
            filter: brightness(1.08);
          }
          60% {
            text-shadow:
              0 0 16px #0ff,
              0 0 32px #00eaff,
              0 0 60px #0ff,
              0 0 80px #00eaff;
            filter: brightness(1.15);
          }
          80% {
            text-shadow:
              0 0 10px #0ff,
              0 0 24px #0ff,
              0 0 54px #0041ff,
              0 0 34px #00ffd0;
            filter: brightness(1.07);
          }
          100% {
            text-shadow:
              0 0 6px #0ff,
              0 0 16px #0ff,
              0 0 32px #00eaff,
              0 0 44px #006fff;
            filter: brightness(1);
          }
        }
      `}</style>
    </button>
  );
}
const randomItem = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const MediaGen: React.FC = () => {
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [isAudioUploading, setIsAudioUploading] = useState(false);
  const [bgMusic, setBgMusic] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isUploadingWisdom, setIsUploadingWisdom] = useState(false);

  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [srtText, setSrtText] = useState<string>("");

  const [animal, setAnimal] = useState<string | null>(null);
  const [animalSide, setAnimalSide] = useState<"left" | "right">("left");
  const [muted, setMuted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bg, setBg] = useState<string | null>(null);
  const [batya, setBatya] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [generatedAssUrl, setGeneratedAssUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const [talkId, setTalkId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);

  const [sending, setSending] = useState(false);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [billboardText, setBillboardText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const insertPauseAtCursor = () => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const before = text.slice(0, start);
    const after = text.slice(end);

    const insert = `<break time="0.5s" />`;
    const newText = before + insert + after;

    setText(newText);

    // Вернуть курсор за вставку
    setTimeout(() => {
      el.selectionStart = el.selectionEnd = start + insert.length;
      el.focus();
    }, 0);
  };
  const [showEndingPicker, setShowEndingPicker] = useState(false);
  const [selectedEnding, setSelectedEnding] = useState<string | null>(null);
  const [isSrtPreparing, setIsSrtPreparing] = useState(false);
  const [isZipSending, setIsZipSending] = useState(false);
  const [showGlitchPopup, setShowGlitchPopup] = useState(false);
  const [glitchIntro, setGlitchIntro] = useState<string | null>(null);
  const [glitchLine1, setGlitchLine1] = useState("");
  const [glitchLine2, setGlitchLine2] = useState("");
  const [glitchLine3, setGlitchLine3] = useState("");

  const fetchFinalVideo = async () => {
    const res = await fetch("/proxy/download-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoUrl }),
    });

    const blob = await res.blob();
    const objectURL = URL.createObjectURL(blob);
    setVideoUrl(objectURL); // если перезаписываешь
  };

  const sendFullZipToTelegram = async () => {
    if (!generatedAssUrl || !videoUrl) {
      setToast({ message: "⚠️ Не хватает .ass или видео", type: "error" });
      return;
    }

    const assBlob = await fetch(generatedAssUrl).then((res) => res.blob());

    const logoUrl =
      "https://store6.gofile.io/download/direct/ecaf57e0-953b-4f4d-8e57-c12a261e230b/batya_logo.png";

    let logoBlob: Blob | null = null;
    try {
      const logoRes = await fetch(logoUrl);
      logoBlob = await logoRes.blob();
    } catch (err) {
      console.warn("⚠️ Не удалось скачать batya_logo.png:", err);
    }

    // 💡 Скачиваем mp4 через backend-прокси
    const res = await fetch(
      "https://batya-srt.onrender.com/proxy/download-video",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl }),
      }
    );

    const videoBlob = await res.blob();

    if (glitchIntro) {
      try {
        const glitchRes = await fetch(glitchIntro);
        const glitchBlob = await glitchRes.blob();
        inner?.file("glitch.mp4", glitchBlob);

        // 👇 Генерим bash-скрипт intro_f.sh с текстами
        const text1a = glitchLine1?.replace(/"/g, '\\"') ?? "";
        const text1b = glitchLine2?.replace(/"/g, '\\"') ?? "";
        const text2 = glitchLine3?.replace(/"/g, '\\"') ?? "";

        const introScript = `#!/bin/bash
    
    RES="720x1280"
    FONT_COLOR="white"
    FONT="Arial"
    FONTSIZE=42
    Y1_LINE1=360
    Y1_LINE2=420
    Y2=500
    DURATION=4
    MAIN_VIDEO="output.mp4"
    GLITCH_INPUT="glitch.mp4"
    
    TEXT1a="${text1a}"
    TEXT1b="${text1b}"
    TEXT2="${text2}"
    
    if ! command -v ffmpeg >/dev/null; then
      echo "❌ ffmpeg не найден!"
      exit 1
    fi
    
    if [ ! -f "$GLITCH_INPUT" ]; then
      echo "❌ Нет файла $GLITCH_INPUT"
      exit 1
    fi
    
    if [ ! -f "$MAIN_VIDEO" ]; then
      echo "❌ Нет видео '$MAIN_VIDEO'"
      exit 1
    fi
    
    FILTERS=$(cat <<EOF
    scale=\${RES},fps=30,
    drawtext=font='\${FONT}':fontsize=\${FONTSIZE}:fontcolor=\${FONT_COLOR}:box=1:boxcolor=black@0.75:boxborderw=20:text='\${TEXT1a}':x=(w-text_w)/2:y=\${Y1_LINE1}:enable='gte(t,0.5)',
    drawtext=font='\${FONT}':fontsize=\${FONTSIZE}:fontcolor=\${FONT_COLOR}:box=1:boxcolor=black@0.75:boxborderw=20:text='\${TEXT1b}':x=(w-text_w)/2:y=\${Y1_LINE2}:enable='gte(t,0.5)',
    drawtext=font='\${FONT}':fontsize=\${FONTSIZE}:fontcolor=\${FONT_COLOR}:box=1:boxcolor=black@0.75:boxborderw=20:text='\${TEXT2}':x=(w-text_w)/2:y=\${Y2}:enable='gte(t,2.0)'
    EOF
    )
    
    echo "🎞 Обработка глитча..."
    ffmpeg -i "$GLITCH_INPUT" -t $DURATION -vf "$FILTERS" -c:v libx264 -preset fast -c:a aac -b:a 128k -y intro.mp4
    
    echo "🔇 Добавляем тишину..."
    ffmpeg -f lavfi -i anullsrc=r=44100:cl=stereo -t $DURATION -q:a 9 -y silence.mp3
    ffmpeg -i intro.mp4 -i silence.mp3 -c:v copy -c:a aac -shortest -y intro_with_silence.mp4
    
    echo "🔗 Склеиваем звук..."
    ffmpeg -i silence.mp3 -i "$MAIN_VIDEO" -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1[outa]" -map "[outa]" -y combined_audio.aac
    
    echo "🎬 Склеиваем финал..."
    ffmpeg -i intro_with_silence.mp4 -i "$MAIN_VIDEO" -i combined_audio.aac \\
    -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[outv]" \\
    -map "[outv]" -map 2:a -c:v libx264 -c:a aac -y final.mp4
    
    echo "✅ Готово: final.mp4"
    `;

        inner?.file("intro_f.sh", introScript);
      } catch (err) {
        console.warn(
          "⚠️ Не удалось скачать glitch.mp4 или записать скрипт:",
          err
        );
      }
    }

    // 💾 Если есть selectedEnding — качаем его
    let endingBlob: Blob | null = null;
    if (selectedEnding) {
      try {
        const endingRes = await fetch(selectedEnding);
        endingBlob = await endingRes.blob();
      } catch (err) {
        console.warn("Не удалось скачать ending:", err);
      }
    }
    let glitchBlob: Blob | null = null;
    if (glitchIntro) {
      try {
        const glitchRes = await fetch(glitchIntro);
        glitchBlob = await glitchRes.blob();
      } catch (err) {
        console.warn("⚠️ Не удалось скачать glitch.mp4:", err);
      }
    }
    const zip = new JSZip();
    const now = new Date();
    const folderName = `batya_${now.getHours()}-${now.getMinutes()}`;
    const inner = zip.folder(folderName);

    inner?.file("final.ass", assBlob);
    inner?.file("d-id-result.mp4", videoBlob);
    if (logoBlob) inner?.file("batya_logo.png", logoBlob);
    if (endingBlob) {
      const isGif = selectedEnding!.toLowerCase().endsWith(".gif");
      inner?.file(isGif ? "ending.gif" : "ending.mp4", endingBlob);
    }

    inner?.file(
      "README.txt",
      `📼 Инструкция:

      
       cd "/Users/Jack/Downloads/${folderName}"
    
    3. Сделай скрипт исполняемым:
    
       chmod +x render.sh
    
       bash render.sh && bash intro_f.sh`
    );

    inner?.file(
      "render.sh",
      `#!/bin/bash
    
    cd "/Users/Jack/Downloads/${folderName}" || exit
    chmod +x render.sh
    
    echo "🎬 Обработка основного видео с сабами..."
    
    ffmpeg -i d-id-result.mp4 \\
      -vf "ass=final.ass,setsar=1" \\
      -af "volume=1.1,dynaudnorm" \\
      -c:v libx264 -c:a aac -b:a 128k \\
      -y main_with_subs.mp4
    
    WIDTH=720
    HEIGHT=1280
    FPS=25
    
    VF_CENTERED="scale=iw*min(\${WIDTH}/iw\\,\${HEIGHT}/ih):ih*min(\${WIDTH}/iw\\,\${HEIGHT}/ih),pad=\${WIDTH}:\${HEIGHT}:(\${WIDTH}-iw*min(\${WIDTH}/iw\\,\${HEIGHT}/ih))/2:(\${HEIGHT}-ih*min(\${WIDTH}/iw\\,\${HEIGHT}/ih))/2,setsar=1"
    
    if [ -f ending.mp4 ]; then
      echo "✂️ Обрезаем 37px снизу из ending.mp4..."
      ffmpeg -i ending.mp4 -vf "crop=iw:ih-37:0:0" -c:v libx264 -c:a copy -y ending37.mp4
    
      echo "🎞️ Центруем и нормализуем ending37.mp4..."
      ffmpeg -i ending37.mp4 \\
        -vf "\$VF_CENTERED" -r \$FPS \\
        -c:v libx264 -c:a aac -b:a 128k \\
        -y ending_fixed.mp4
    
      echo "🔗 Склеиваем основное видео и концовку..."
      ffmpeg -i main_with_subs.mp4 -i ending_fixed.mp4 \\
        -filter_complex "[0:v:0][0:a:0][1:v:0][1:a:0]concat=n=2:v=1:a=1[outv][outa]" \\
        -map "[outv]" -map "[outa]" -y output.mp4
    
    elif [ -f ending.gif ]; then
      echo "🌀 Обнаружен ending.gif — лупим, добавляем звук и нормализуем..."
    
      ffmpeg -stream_loop -1 -t 15 -i ending.gif \\
        -vf "\$VF_CENTERED,fps=\$FPS" \\
        -pix_fmt yuv420p -y ending_tmp.mp4
    
      ffmpeg -i ending_tmp.mp4 -f lavfi -t 15 -i anullsrc=channel_layout=stereo:sample_rate=44100 \\
        -shortest -c:v copy -c:a aac -b:a 128k -y ending_looped.mp4
    
      ffmpeg -i main_with_subs.mp4 -i ending_looped.mp4 \\
        -filter_complex "[0:v:0][0:a:0][1:v:0][1:a:0]concat=n=2:v=1:a=1[outv][outa]" \\
        -map "[outv]" -map "[outa]" -y output.mp4
    
    else
      echo "⚠️ Концовка не найдена — сохраняем только основной видос"
      mv main_with_subs.mp4 output.mp4
    fi
    
if [[ -f "output.mp4" && -f "batya_logo.png" ]]; then
  echo "🧢 Прячем D-ID и ставим Батю в угол..."
  ffmpeg -y -i output.mp4 -i batya_logo.png \\
    -filter_complex "[0:v]crop=120:98:0:ih-98,boxblur=10:1[blurred];[0:v][blurred]overlay=0:H-98[base];[1:v]scale=120:100[logo];[base][logo]overlay=0:main_h-100" \\
    -c:v libx264 -c:a copy output_cleaned.mp4
  mv output_cleaned.mp4 output.mp4
  echo "🧼 Батя перекрыл логотип D-ID!"
else
  echo "⚠️ Логотип Бати не найден — скип постобработку"
fi

    
    echo "✅ Готово: output.mp4"
    `
    );

    if (glitchBlob) {
      // Упрощённая проверка: минимум 1 строка есть
      const lines = [glitchLine1, glitchLine2, glitchLine3].filter(
        (l) => l.trim() !== ""
      );

      inner?.file("glitch.mp4", glitchBlob);
      if (glitchLine1.trim()) inner?.file("text1.txt", glitchLine1);
      if (glitchLine2.trim()) inner?.file("text2.txt", glitchLine2);
      if (glitchLine3.trim()) inner?.file("text3.txt", glitchLine3);

      inner?.file(
        "intro_f.sh",
        `#!/bin/bash
      
      RES="720x1280"
      FONT_COLOR="white"
      FONT="Arial"
      FONTSIZE=42
      Y1_LINE1=360
      Y1_LINE2=420
      Y2=500
      DURATION=4
      MAIN_VIDEO="output.mp4"
      GLITCH_INPUT="glitch.mp4"
      
      # ✅ Проверка ffmpeg
      if ! command -v ffmpeg >/dev/null; then
        echo "❌ ffmpeg не найден!"
        exit 1
      fi
      
      if [ ! -f "\$GLITCH_INPUT" ]; then
        echo "❌ Нет файла \$GLITCH_INPUT"
        exit 1
      fi
      
      if [ ! -f "\$MAIN_VIDEO" ]; then
        echo "❌ Нет видео '\$MAIN_VIDEO'"
        exit 1
      fi
      
      # 🖋️ Текстовые фильтры
      FILTERS="scale=\${RES},fps=30"
      
      if [ -f text1.txt ]; then
        FILTERS+=",drawtext=font='\${FONT}':fontsize=\${FONTSIZE}:fontcolor=\${FONT_COLOR}:box=1:boxcolor=black@0.75:boxborderw=20:textfile='text1.txt':x=(w-text_w)/2:y=\${Y1_LINE1}:enable='gte(t,0.5)'"
      fi
      if [ -f text2.txt ]; then
        FILTERS+=",drawtext=font='\${FONT}':fontsize=\${FONTSIZE}:fontcolor=\${FONT_COLOR}:box=1:boxcolor=black@0.75:boxborderw=20:textfile='text2.txt':x=(w-text_w)/2:y=\${Y1_LINE2}:enable='gte(t,0.5)'"
      fi
      if [ -f text3.txt ]; then
        FILTERS+=",drawtext=font='\${FONT}':fontsize=\${FONTSIZE}:fontcolor=\${FONT_COLOR}:box=1:boxcolor=black@0.75:boxborderw=20:textfile='text3.txt':x=(w-text_w)/2:y=\${Y2}:enable='gte(t,2.0)'"
      fi
      
      # ✂️ Обрезка и фильтрация глитча + наложение текста
      echo "🎞 Обработка глитча..."
      ffmpeg -i "\$GLITCH_INPUT" -t \$DURATION -vf "\$FILTERS" -c:v libx264 -preset fast -c:a aac -b:a 128k -y intro.mp4
      
      # 🔇 Тишина
      ffmpeg -f lavfi -i anullsrc=r=44100:cl=stereo -t \$DURATION -q:a 9 -y silence.mp3
      ffmpeg -i intro.mp4 -i silence.mp3 -c:v copy -c:a aac -shortest -y intro_with_silence.mp4
      
      # 🔗 Склеиваем звук
      ffmpeg -i silence.mp3 -i "\$MAIN_VIDEO" -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1[outa]" -map "[outa]" -y combined_audio.aac
      
      # 🎬 Финал
      ffmpeg -i intro_with_silence.mp4 -i "\$MAIN_VIDEO" -i combined_audio.aac \\
      -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[outv]" \\
      -map "[outv]" -map 2:a -c:v libx264 -c:a aac -y final.mp4
      
      echo "✅ Готово: final.mp4"
      `
      );
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const formData = new FormData();
    formData.append("file", zipBlob, `${folderName}.zip`);

    const tgRes = await fetch("https://batya-srt.onrender.com/proxy/send-zip", {
      method: "POST",
      body: formData,
    });

    if (tgRes.ok) {
      setToast({ message: "📤 ZIP отправлен в Telegram!", type: "success" });
    } else {
      setToast({ message: "❌ Ошибка отправки в Telegram", type: "error" });
    }
  };

  const getDidVideoBlob = async (videoUrl: string): Promise<Blob> => {
    const res = await fetch(
      "https://batya-srt.onrender.com/proxy/download-video",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl }),
      }
    );

    return await res.blob();
  };

  const prepareSrt = async () => {
    if (!audioBlob) {
      setToast({ message: "⚠️ Сначала сгенерируй аудио!", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("file", audioBlob, "voice.mp3");

    try {
      // 🧠 Получаем SRT из Whisper
      const res = await fetch("https://batya-srt.onrender.com/proxy/whisper", {
        method: "POST",
        body: formData,
      });

      const srt = await res.text();
      setSrtText(srt);
      setToast({ message: "📄 SRT получен!", type: "success" });

      // 🎨 Отправляем SRT на преобразование в ASS
      const assFormData = new FormData();
      assFormData.append(
        "file", // 🟢 Ключ должен быть "file", не "srt"
        new Blob([srt], { type: "text/plain" }),
        "file.srt"
      );

      const assRes = await fetch(
        "https://batya-srt.onrender.com/proxy/srt-to-ass",
        {
          method: "POST",
          body: assFormData,
        }
      );

      const assText = await assRes.text();
      const assBlob = new Blob([assText], { type: "text/plain" });
      const assUrl = URL.createObjectURL(assBlob);
      setGeneratedAssUrl(assUrl);
      setToast({ message: "🎬 ASS готов!", type: "success" });
    } catch (err) {
      console.error("❌ Ошибка при получении SRT или генерации ASS:", err);
      setToast({ message: "❌ Ошибка генерации субтитров", type: "error" });
    }
  };

  const insertRandomJoke = async () => {
    try {
      const res = await fetch("https://batya-api.onrender.com/api/random-joke");
      const data = await res.json();
      setText((prev) => (prev ? prev + "\n" + data.text : data.text)); // ✅ добавляет строку
    } catch (err) {
      console.error("Не удалось получить фразу:", err);
    }
  };

  const approveUpload = async () => {
    if (!audioBlob) {
      setToast({ message: "⚠️ Сначала сгенерируй аудио!", type: "error" });
      return;
    }

    const goFileToken = "BoSO6antCj4iuGsJlbwpTF9vDkjaa5zq";
    const folderId = "d7c3ed03-c202-40dd-bc11-299fa57f1599";

    // 🔤 Транслитерация
    const transliterate = (text: string) =>
      text
        .toLowerCase()
        .replace(/ё/g, "yo")
        .replace(/ж/g, "zh")
        .replace(/ч/g, "ch")
        .replace(/ш/g, "sh")
        .replace(/щ/g, "shch")
        .replace(/ю/g, "yu")
        .replace(/я/g, "ya")
        .replace(/ц/g, "ts")
        .replace(/а/g, "a")
        .replace(/б/g, "b")
        .replace(/в/g, "v")
        .replace(/г/g, "g")
        .replace(/д/g, "d")
        .replace(/е/g, "e")
        .replace(/з/g, "z")
        .replace(/и/g, "i")
        .replace(/й/g, "j")
        .replace(/к/g, "k")
        .replace(/л/g, "l")
        .replace(/м/g, "m")
        .replace(/н/g, "n")
        .replace(/о/g, "o")
        .replace(/п/g, "p")
        .replace(/р/g, "r")
        .replace(/с/g, "s")
        .replace(/т/g, "t")
        .replace(/у/g, "u")
        .replace(/ф/g, "f")
        .replace(/х/g, "h")
        .replace(/ы/g, "y")
        .replace(/э/g, "e")
        .replace(/ь/g, "")
        .replace(/ъ/g, "")
        .replace(/[^a-z0-9]/g, "_");

    try {
      // 🕒 Генерируем имя файла
      const now = new Date();
      const timestamp = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const firstWord = text.trim().split(/\s+/)[0] || "audio";
      const slug = transliterate(firstWord);
      const filename = `${slug}_${timestamp}.mp3`;

      // 📤 Загружаем на GoFile
      const formData = new FormData();
      formData.append("file", audioBlob, filename);
      formData.append("folderId", folderId);

      const uploadRes = await fetch("https://upload.gofile.io/uploadFile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${goFileToken}`,
        },
        body: formData,
      });

      const uploadData = await uploadRes.json();
      console.log("📦 uploadData:", uploadData);

      if (uploadData.status !== "ok") {
        throw new Error("❌ Ошибка загрузки файла");
      }

      const fileId = uploadData.data.id;
      if (!fileId) {
        throw new Error("❌ fileId не найден в ответе GoFile");
      }

      // 🔗 Получаем прямую ссылку
      const directLinkRes = await fetch(
        `https://api.gofile.io/contents/${fileId}/directlinks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${goFileToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const directLinkData = await directLinkRes.json();
      console.log("🔗 directLinkData:", directLinkData);

      if (directLinkData.status !== "ok" || !directLinkData.data?.directLink) {
        throw new Error("❌ Не удалось получить прямую ссылку");
      }

      const finalLink = directLinkData.data.directLink;
      console.log("✅ Прямая ссылка на MP3:", finalLink);

      // 🧠 Сохраняем в базу мудростей
      const saveRes = await fetch("https://batya-api.onrender.com/addWisdom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: finalLink }),
      });

      const saveData = await saveRes.json();

      if (!saveData.success) {
        throw new Error("❌ Ошибка при сохранении мудрости");
      }

      setToast({
        message: "🧠 Мудрость успешно добавлена!",
        type: "success",
      });
    } catch (err: any) {
      console.error("❌ Ошибка:", err.message);
      setToast({
        message: err.message || "❌ Что-то пошло не так",
        type: "error",
      });
    }
  };

  <div style={{ margin: "1rem 0" }}>
    <input
      type="text"
      placeholder="НЕОНОВАЯ НАДПИСЬ"
      value={billboardText}
      onChange={(e) => setBillboardText(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        backgroundColor: "#051b0a", // тёмно-зелёный, почти чёрный
        color: "#39ff14", // ярко-зелёный
        border: "2px solid #39ff14", // неоновая рамка
        borderRadius: 10,
        fontFamily: "monospace",
        fontSize: "1.25rem",
        boxShadow: "0 0 12px #39ff1488, 0 0 40px #14ff2e44", // неон
        textShadow: "0 0 8px #39ff14cc, 0 0 40px #14ff2e33",
        letterSpacing: "0.08em",
        outline: "none",
        transition: "0.18s box-shadow, 0.18s border-color",
      }}
    />
  </div>;

  // useEffect для пуллинга:
  React.useEffect(() => {
    if (!polling || !talkId) return;
    let interval = setInterval(async () => {
      try {
        const response = await fetch(`https://api.d-id.com/talks/${talkId}`, {
          headers: {
            accept: "application/json",
            Authorization: D_ID_API_KEY,
          },
        });
        const data = await response.json();
        if (data.result_url) {
          setVideoUrl(data.result_url);
          setPolling(false);
          setToast({ message: "✅ Видео готово!", type: "success" });
        }
      } catch {}
    }, 3000);
    return () => clearInterval(interval);
  }, [polling, talkId]);
  // ==== КНОПКА РАНДОМ ====
  const [billboardType, setBillboardType] = useState("default");

  const handleRandom = () => {
    const categories = Object.keys(bgStructure);
    const randomCategory = randomItem(categories);
    const randomBg = randomItem(bgStructure[randomCategory]); // это уже url
    const randomBatya = randomItem(sampleBatya);
    const randomAnimal = randomItem(sampleAnimals);
    const randomBillboard = randomItem(billboardSamples);
    setBillboardText(randomBillboard.text);
    setBillboardType(randomBillboard.bios ? "bios" : "default");

    setBg(randomBg);
    setBatya(randomBatya);
    setAnimal(randomAnimal);
  };

  const handleRandomNeon = () => {
    const randomBillboard = randomItem(billboardSamples);
    setBillboardText(randomBillboard.text);
    setBillboardType(randomBillboard.bios ? "bios" : "default");
  };

  // ==== APPROVE PNG → D-ID (c лоадером) ====
  const approveImageUpload = async () => {
    if (!canvasRef.current) {
      setToast({
        message: "⚠️ Сначала выбери фон и Батю и собери картинку!",
        type: "error",
      });
      return;
    }
    const canvas = canvasRef.current;

    // Проверяем размеры — канвас пуст если 0x0 (или очень маленький)
    if (
      !canvas.width ||
      !canvas.height ||
      canvas.width < 50 ||
      canvas.height < 50
    ) {
      setToast({
        message: "⚠️ Сначала собери изображение на канвасе!",
        type: "error",
      });
      return;
    }

    // Проверяем содержимое: есть ли хоть 1 НЕпрозрачный пиксель
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let nonTransparentPixel = false;
    for (let i = 3; i < imgData.length; i += 4) {
      if (imgData[i] !== 0) {
        // alpha channel
        nonTransparentPixel = true;
        break;
      }
    }
    if (!nonTransparentPixel) {
      setToast({
        message: "Канвас пустой. Сначала собери изображение!",
        type: "error",
      });
      return;
    }

    setLoadingApprove(true); // твой BIOS style loader
    try {
      const imageBlob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((blob) => resolve(blob!), "image/png")
      );
      const formData = new FormData();
      formData.append("image", imageBlob, "batya.png");
      const res = await fetch("https://api.d-id.com/images", {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: D_ID_API_KEY,
        },
        body: formData,
      });
      const data = await res.json();
      if (data?.url) {
        setImageUrl(data.url);
        setToast({
          message: "✅ Изображение загружено в D-ID!",
          type: "success",
        });
      } else {
        setToast({
          message: "❌ Ошибка загрузки: " + (data?.description || "неизвестно"),
          type: "error",
        });
      }
    } catch (err) {
      setToast({
        message: "❌ Ошибка загрузки изображения в D-ID",
        type: "error",
      });
    } finally {
      setLoadingApprove(false);
    }
  };

  // ==== СОБРАТЬ ИЗОБРАЖЕНИЕ ====
  const generateImage = async () => {
    if (!bg || !batya || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgImg = new Image();
    const batyaImg = new Image();
    const animalImg = new Image();
    bgImg.crossOrigin =
      batyaImg.crossOrigin =
      animalImg.crossOrigin =
        "anonymous";

    bgImg.src = bg;
    batyaImg.src = batya;
    if (animal) animalImg.src = animal;

    let bgLoaded = false,
      batyaLoaded = false,
      animalLoaded = !animal;

    const tryDraw = () => {
      if (bgLoaded && batyaLoaded && animalLoaded) {
        canvas.width = bgImg.width;
        canvas.height = bgImg.height;
        ctx.drawImage(bgImg, 0, 0);

        if (billboardText.trim()) {
          ctx.save();
          ctx.font = "bold 44px 'IBM Plex Mono', 'Fira Mono', monospace";
          ctx.textAlign = "center";
          const x = canvas.width / 2;
          const y = 320;
          const lineHeight = 60;

          // Разбиваем на строки по абзацам (\n)
          const lines = billboardText.split("\n").map((line) => line.trim());

          // --- Чёрная подложка под весь блок текста ---
          const maxWidth = Math.max(
            ...lines.map((line) => ctx.measureText(line).width)
          );
          const blockHeight = lines.length * lineHeight;
          ctx.globalAlpha = 0.78;
          ctx.fillStyle = "#0d0d0d";
          ctx.fillRect(
            x - maxWidth / 2 - 26,
            y - 46,
            maxWidth + 52,
            blockHeight + 10
          );
          ctx.globalAlpha = 1;

          // --- Рисуем все строки по очереди ---
          // --- Рисуем все строки по очереди ---
          lines.forEach((line, i) => {
            const yy = y + i * lineHeight;

            if (billboardType === "bios") {
              ctx.shadowColor = "#00ff1a";
              ctx.shadowBlur = 42;
              ctx.fillStyle = "#00ff80";
            } else if (billboardType === "roza") {
              ctx.shadowColor = "#ff00ff";
              ctx.shadowBlur = 60;
              ctx.fillStyle = "#ff66ff";
            } else if (billboardType === "blue") {
              ctx.shadowColor = "#33ccff";
              ctx.shadowBlur = 72;
              ctx.fillStyle = "#33ddff";
              ctx.strokeStyle = "#e0f7ff"; // почти бело-голубая обводка
              ctx.lineWidth = 1.2;
              ctx.strokeText(line, x, yy);
            } else {
              ctx.shadowColor = "#ffe95b";
              ctx.shadowBlur = 100;
              ctx.fillStyle = "#ffe411";
            }
            ctx.fillText(line, x, yy);

            // Блик как обычно
            ctx.shadowColor = "#fff";
            ctx.shadowBlur = 14;
            ctx.globalAlpha = 0.15;
            ctx.fillText(line, x, yy - 4);

            ctx.globalAlpha = 1;
          });

          ctx.restore();
        }

        ctx.globalAlpha = 1;
        const batyaScale = 0.77;
        const bw = batyaImg.width * batyaScale;
        const bh = batyaImg.height * batyaScale;
        const bx = (canvas.width - bw) / 2.5;
        const by = canvas.height - bh - 90;
        ctx.drawImage(batyaImg, bx, by, bw, bh);

        // Питомец
        if (animal) {
          const isRaven = animal?.includes("raven") ?? false;
          const isPuppy = animal?.includes("puppy") ?? false;
          let animalScale, ax, ay;

          if (isRaven) {
            // Ворона садится на правое плечо
            animalScale = 0.34;
            const aw = animalImg.width * animalScale;
            const ah = animalImg.height * animalScale;
            ax = bx + bw * 0.16;
            ay = by + bh * 0.31;
            ctx.drawImage(animalImg, ax, ay, aw, ah);
          } else if (isPuppy) {
            // Щенок puppy1 — индивидуальный размер и позиция!
            animalScale = 0.52; // (напр. чуть меньше)
            aw = animalImg.width * animalScale;
            ah = animalImg.height * animalScale;
            // Координаты подбери “на глаз”, например:
            ax = bx + bw * 0.1;
            ay = by + bh - ah * 0.95;
            ctx.drawImage(animalImg, ax, ay, aw, ah);
          } else {
            // Обычные питомцы (на полу)
            animalScale = 0.37;
            const aw = animalImg.width * animalScale;
            const ah = animalImg.height * animalScale;
            ax = animalSide === "left" ? bx + aw - 220 : bx + bw - 134;
            ay = by + (bh - ah);
            ctx.drawImage(animalImg, ax, ay, aw, ah);
          }
        }
      }
    };

    bgImg.onload = () => {
      bgLoaded = true;
      tryDraw();
    };
    batyaImg.onload = () => {
      batyaLoaded = true;
      tryDraw();
    };
    if (animal) {
      animalImg.onload = () => {
        animalLoaded = true;
        tryDraw();
      };
    }
  };

  // ==== AUDIO GEN (через backend /proxy/tts) ====
  const generateAudio = async () => {
    if (!text.trim()) {
      setToast({ message: "⚠️ Введи текст для генерации!", type: "error" });
      return;
    }

    const voiceId = "zFy2tCZcTGOETvhp3lY6";

    try {
      const ttsResponse = await fetch(
        "https://batya-api.onrender.com/proxy/tts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, voiceId }),
        }
      );

      if (!ttsResponse.ok) {
        const error = await ttsResponse.json();
        throw new Error(error?.message || "Ошибка генерации аудио");
      }

      const blob = await ttsResponse.blob();
      const objectUrl = URL.createObjectURL(blob);
      setGeneratedAudioUrl(objectUrl);
      setAudioBlob(blob);
      setToast({ message: "Аудио готово!", type: "success" });
    } catch (err) {
      console.error("❌ Ошибка при генерации аудио:", err);
      setToast({ message: "❌ Ошибка генерации аудио", type: "error" });
    }
  };

  // ==== APPROVE MP3 → D-ID ====
  const approveAudioToDID = async () => {
    if (!audioBlob) {
      setToast({ message: "⚠️ Сначала сгенерируй аудио!", type: "error" });
      return;
    }
    setIsAudioUploading(true); // ← старт загрузки
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "batya.mp3");
      const upload = await fetch("https://api.d-id.com/audios", {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: D_ID_API_KEY,
        },
        body: formData,
      });
      const result = await upload.json();
      if (result?.url) {
        setUploadedAudioUrl(result.url);
        setToast({ message: "✅ Аудио загружено в D-ID!", type: "success" });
      } else {
        setToast({
          message:
            "❌ Ошибка при загрузке аудио: " +
            (result?.description || "неизвестно"),
          type: "error",
        });
      }
    } catch (err) {
      setToast({ message: "❌ Ошибка загрузки аудио", type: "error" });
    } finally {
      setIsAudioUploading(false); // ← стоп загрузки
    }
  };

  // ==== ГЕНЕРАЦИЯ ВИДЕО D-ID ====
  const generateDidVideo = async () => {
    if (!imageUrl || !uploadedAudioUrl) {
      setToast({
        message: "❌ Сначала загрузите изображение и аудио в D-ID",
        type: "error",
      });
      return;
    }
    setIsVideoGenerating(true);
    setVideoUrl(null);
    setTalkId(null);
    setPolling(false);

    const requestBody = {
      source_url: imageUrl,
      script: { type: "audio", audio_url: uploadedAudioUrl },
      config: { stitch: true },
    };

    try {
      const response = await fetch("https://api.d-id.com/talks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: D_ID_API_KEY,
        },
        body: JSON.stringify(requestBody),
      });
      const result = await response.json();
      if (!response.ok) {
        setToast({
          message:
            "❌ Ошибка создания видео: " +
            (result?.description || "Неизвестная ошибка"),
          type: "error",
        });
        return;
      }
      if (result?.id) {
        setToast({
          message: `🎉 Видео создаётся! ID: ${result.id}`,
          type: "success",
        });
        setTalkId(result.id); // <--- сохраняем ID
        setPolling(true); // запускаем опрос
      } else {
        setToast({
          message: "❌ Видео не создано — проверь параметры запроса.",
          type: "error",
        });
      }
    } catch (err) {
      setToast({ message: "❌ D-ID error", type: "error" });
    } finally {
      setIsVideoGenerating(false); // <--- стоп загрузки
    }
  };

  React.useEffect(() => {
    generateImage();
    // eslint-disable-next-line
  }, [animal, bg, batya]);

  React.useEffect(() => {
    generateImage();
    // eslint-disable-next-line
  }, [billboardText, billboardType]);

  // ==== UI ====
  return (
    <div
      style={{
        padding: 24,
        fontFamily: "monospace",
        color: "#0ff",
        background: "#070e19",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "2.2rem",
          color: "#00eaff",
          textShadow: "0 0 6px #00eaff, 0 0 24px #0044ff",
          letterSpacing: "0.15em",
        }}
      >
        🧬 MEDIA.GEN <span style={{ color: "#ff0099" }}>ULTRA</span>ProMAX™
      </h1>
      <div style={{ marginBottom: 16 }}>
        <NeonButton
          onClick={() => navigate("/")}
          style={{
            color: "#5aff5a",
            background: "#060b06",
            border: "1.7px solid #21ff21",
            borderRadius: 10,
            padding: "12px 28px",
            fontFamily: "'IBM Plex Mono', 'Fira Mono', 'Consolas', monospace",
            fontSize: "1.12rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            boxShadow: "0 0 6px #21ff2180, 0 0 12px #21ff2170",
            textShadow: "0 0 6px #5aff5a, 0 0 18px #21ff21",
            marginRight: 8,
            cursor: "pointer",
            transition: "box-shadow 0.18s, transform 0.12s, filter 0.2s",
          }}
        >
          💾 Boot Menu
        </NeonButton>
        <NeonButton onClick={() => setMuted(!muted)}>
          {muted ? "🔇" : "🔈"}
        </NeonButton>
        <NeonButton onClick={() => setIsPopupOpen(true)}>
          🖼️ Выбрать фон
        </NeonButton>
      </div>

      {isPopupOpen && (
        <BackgroundPickerPopup
          selected={bg}
          onSelect={(src) => setBg(src)}
          onClose={() => setIsPopupOpen(false)}
        />
      )}

      {showEndingPicker && (
        <EndingPickerPopup
          onSelect={(url) => setSelectedEnding(url)}
          onClose={() => setShowEndingPicker(false)}
          selectedSrc={selectedEnding}
        />
      )}

      {showGlitchPopup && (
        <GlitchPickerPopup
          selectedSrc={glitchIntro}
          onSelect={(src) => setGlitchIntro(src)}
          onTextChange={(l1, l2, l3) => {
            setGlitchLine1(l1);
            setGlitchLine2(l2);
            setGlitchLine3(l3);
          }}
          initialText={{
            line1: glitchLine1,
            line2: glitchLine2,
            line3: glitchLine3,
          }}
          onClose={() => setShowGlitchPopup(false)}
        />
      )}

      <button
        onClick={() => setShowGlitchPopup(true)}
        style={{
          background: "rgba(0, 255, 255, 0.08)",
          border: "1.5px solid #00ffff",
          color: "#00ffff",
          borderRadius: "12px",
          padding: "10px 24px",
          fontSize: "1.1rem",
          fontFamily: "monospace",
          cursor: "pointer",
          boxShadow: "0 0 8px #00ffff88, 0 0 24px #00ffff44",
          textShadow: "0 0 12px #00ffff",
          margin: "0.5rem",
          transition: "all 0.2s ease-in-out",
        }}
      >
        🎛 Глитч-Интро
      </button>

      <div>
        <h2>👤 Batya</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "18px",
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
            minHeight: 140,
            maxWidth: "100%",
            overflowX: "auto",
          }}
        >
          {sampleBatya.map((src) => (
            <img
              key={src}
              src={src}
              onClick={() => setBatya(src)}
              style={{
                height: "130px",
                marginRight: "10px",
                border: batya === src ? "2px solid #0ff" : "1px solid #233",
                borderRadius: 8,
                cursor: "pointer",
                filter: batya === src ? "drop-shadow(0 0 16px #0ff)" : "none",
                transition: "all .13s",
              }}
            />
          ))}
        </div>
      </div>

      <audio
        src="https://store-na-phx-1.gofile.io/download/direct/4c8c65a9-f94c-42e1-b23f-bf1a560409a4/cyberpunk.mp3 "
        autoPlay
        loop
        muted={muted}
      />

      <div>
        <h2>🐾 Pet</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
            minHeight: 120,
            maxWidth: "100%",
            overflowX: "auto",
          }}
        >
          {sampleAnimals.map((src) => (
            <img
              key={src}
              src={src}
              onClick={() => setAnimal(src)}
              style={{
                height: "100px",
                marginRight: "10px",
                border: animal === src ? "2px solid #0ff" : "1px solid #233",
                borderRadius: 8,
                cursor: "pointer",
                filter: animal === src ? "drop-shadow(0 0 12px #0ff)" : "none",
                transition: "all .13s",
              }}
            />
          ))}
        </div>
      </div>
      <NeonButton
        onClick={() => {
          setAnimal(null);
        }}
        style={{
          color: "#ff7070",
          background: "rgba(60,0,0,0.30)",
          border: "1.4px solid #ff7070",
          marginRight: 8,
        }}
      >
        🐾 Leave Pet at Home
      </NeonButton>

      <div
        style={{
          background: "#151d2b",
          border: "2px solid #0ff",
          borderRadius: 18,
          padding: 18,
          maxWidth: 520,
          margin: "0 auto 28px auto",
          boxShadow: "0 0 32px #0ff6",
          textAlign: "center",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            maxWidth: "320px",
            borderRadius: 8,
            border: "1px solid #0ff",
            minHeight: 200,
            background: "#090e18",
          }}
        />
      </div>

      <div style={{ margin: "1.5em " }}>
        <label style={{ color: "#ff00cc", fontFamily: "monospace" }}></label>
        <textarea
          value={billboardText}
          onChange={(e) => {
            setBillboardText(e.target.value);
            setBillboardType("default");
          }}
          placeholder="Чемпион Людей"
          style={{
            width: "95%",
            marginTop: 16,
            padding: "8px",
            borderRadius: 12,
            border: "1.4px solid #ff00cc",
            background: "#14081b",
            color: "#fff",
            fontSize: 16,
            fontFamily: "monospace",
            boxShadow: "0 0 8px #ff00cc80",
            letterSpacing: "0.03em",
            outline: "none",
            textAlign: "center",
          }}
        />
      </div>

      <NeonButton
        onClick={handleRandomNeon}
        style={{
          background: "rgba(255, 0, 255, 0.07)",
          border: "1px solid #ff00ff",
          color: "#ff66ff",
          boxShadow: "0 0 12px #ff00ff88, 0 0 32px #ff00ff44",
          textShadow: "0 0 2px #ff00ff, 0 0 12px #ff00ff",
          fontSize: "0.95rem",
          padding: "10px 22px",
          marginTop: 12,
          marginBottom: 8,
          letterSpacing: "0.05em",
        }}
      >
        🎲
      </NeonButton>

      <NeonButton
        onClick={handleRandom}
        style={{
          color: "#e6e6fa",
          background: "linear-gradient(90deg, #ff00cc, #3333ff 90%)",
          border: "none",
          borderRadius: "12px",
          padding: "0.75em 2em",
          fontSize: "1.2em",
          boxShadow: "0 0 10px #ff00cc, 0 0 20px #3333ff, 0 0 40px #00fff7",
          transition: "box-shadow 0.2s, transform 0.2s",
          textShadow: "0 0 4px #fff, 0 0 8px #ff00cc",
          marginLeft: 12,
        }}
      >
        🎲
      </NeonButton>

      <div style={{ marginBottom: 10 }}>
        <NeonButton
          onClick={() => {
            const types = ["default", "bios", "roza", "blue"];
            const currentIndex = types.indexOf(billboardType);
            const nextType = types[(currentIndex + 1) % types.length];
            setBillboardType(nextType);
          }}
          style={{
            background: "#191919",
            border: "1px solid #999",
            color: "#fff",
            boxShadow: "0 0 12px #9994",
            fontSize: "0.95rem",
            padding: "10px 18px",
            marginTop: 8,
            marginBottom: 24,
          }}
        >
          🎛️ ({billboardType})
        </NeonButton>

        <NeonButton
          onClick={approveImageUpload}
          style={{ color: "#e7ff16" }}
          loading={loadingApprove}
          disabled={loadingApprove}
        >
          ✅ Approve (PNG ⮕ D-ID)
        </NeonButton>
      </div>

      <div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Текст для Бати"
          style={{
            width: "80%",
            height: "120px",
            padding: "10px",
            backgroundColor: "#111",
            color: "#0ff",
            border: "1px solid #0ff",
            borderRadius: 8,
            marginTop: "1rem",
            fontFamily: "monospace",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "0.8rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
            overflow: "visible", // ← 🔥 это главное
          }}
        >
          <NeonButton
            onClick={insertRandomJoke}
            style={{
              color: "#e6e6fa",
              background: "linear-gradient(90deg, #ff00cc, #3333ff 90%)",
              border: "none",
              borderRadius: "12px",
              padding: "0.75em 2em",
              fontSize: "1.2em",
              boxShadow: "0 0 10px #ff00cc, 0 0 20px #3333ff, 0 0 40px #00fff7",
              transition: "box-shadow 0.2s, transform 0.2s",
              textShadow: "0 0 0px #fff, 0 0 8px #ff00cc",
            }}
          >
            Add Neuron
          </NeonButton>

          <NeonButton
            onClick={() => setText("")}
            style={{
              background: "rgba(255, 0, 255, 0.1)",
              border: "1px solid #ff00ff",
              color: "#ff99ff",
              borderRadius: "12px",
              padding: "0.75em 2em",
              fontSize: "1.2em",
              boxShadow: "0 0 12px #ff00ffaa, 0 0 26px #ff00ffaa",
              textShadow: "0 0 44px #fff, 0 0 0px #ff00ff",
            }}
          >
            🧹 Clean
          </NeonButton>
          <NeonButton
            onClick={insertPauseAtCursor}
            style={{
              background: "rgba(0, 255, 255, 0.1)",
              border: "1px solid #00ffff",
              color: "#99ffff",
              borderRadius: "12px",
              padding: "0.3em 1em",
              fontSize: "1.2em",
              boxShadow: "0 0 12px #00ffffaa, 0 0 26px #00ffffaa",
              textShadow: "0 0 44px #fff, 0 0 0px #00ffff",
              marginLeft: "1rem",
            }}
          >
            ⏸
          </NeonButton>
        </div>

        <NeonButton
          onClick={generateAudio}
          style={{
            background: "linear-gradient(90deg, #00ffff, #0066ff)",
            border: "1px solid #00ffff",
            color: "#ffffff",
            borderRadius: "12px",
            padding: "0.75em 2em",
            fontSize: "1.2em",
            boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffffaa",
            textShadow: "0 0 0px #fff, 0 0 120px #00ffff",
            marginTop: "1rem",
          }}
        >
          🎤 Generate Audio
        </NeonButton>

        {generatedAudioUrl && (
          <div style={{ marginTop: "1rem" }}>
            <p>🎧 Предпрослушивание:</p>
            <audio
              controls
              src={generatedAudioUrl}
              autoPlay={false}
              muted={muted}
              style={{
                width: "70%",
                background: "#222",
                border: "1px solid #0ff",
                borderRadius: 8,
                marginBottom: 12,
              }}
            />
          </div>
        )}

        <button
          onClick={async () => {
            setIsSrtPreparing(true); // ⏳ только для этой кнопки
            try {
              await prepareSrt();
            } catch (err) {
              console.error("Ошибка в prepareSrt:", err);
            } finally {
              setIsSrtPreparing(false);
            }
          }}
          disabled={isSrtPreparing}
          style={{
            marginRight: "12px",
            marginLeft: "12px",
            color: "#ccffcc",
            background: "linear-gradient(90deg, #00ff88, #0066ff)",
            border: "none",
            borderRadius: "12px",
            padding: "0.75em 2em",
            fontSize: "1.1em",
            boxShadow: "0 0 12px #00ff88aa, 0 0 24px #0066ffaa",
            textShadow: "0 0 4px #fff, 0 0 10px #00ff88",
            cursor: isSrtPreparing ? "not-allowed" : "pointer",
            transition: "transform 0.15s ease-in-out, box-shadow 0.2s",
            opacity: isSrtPreparing ? 0.6 : 1,
          }}
          onMouseOver={(e) => {
            if (!isSrtPreparing) {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1.04)";
            }
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          {isSrtPreparing ? "⏳ Обработка..." : "📥 SRT"}
        </button>

        {/* 
        {srtText && <textarea value={srtText} rows={12} cols={60} readOnly />}
*/}

        <NeonButton
          onClick={approveUpload}
          style={{
            color: "#41fff9",
            minWidth: 210,
          }}
        >
          ⮕ /audio/wisdom
        </NeonButton>

        <NeonButton
          onClick={approveAudioToDID}
          disabled={isAudioUploading}
          style={{
            color: "#f9ff41",
            opacity: isAudioUploading ? 0.5 : 1,
            pointerEvents: isAudioUploading ? "none" : "auto",
            position: "relative",
            minWidth: 210,
          }}
        >
          {isAudioUploading ? (
            <span>
              <span
                className="loader"
                style={{
                  display: "inline-block",
                  marginRight: 10,
                  width: 16,
                  height: 16,
                  border: "3px solid #f9ff41",
                  borderTop: "3px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              Загрузка...
              {/* Спиннер анимация ниже */}
              <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
            </span>
          ) : (
            "✅ Approve (MP3 ⮕ D-ID)"
          )}
        </NeonButton>
      </div>

      <div>
        <NeonButton
          onClick={generateDidVideo}
          style={{ marginTop: "1rem" }}
          loading={isVideoGenerating}
          disabled={isVideoGenerating}
        >
          🎬 Render (D-ID)
        </NeonButton>
      </div>

      <NeonButton
        onClick={() => setShowEndingPicker(true)}
        style={{
          background: "rgba(255, 255, 0, 0.1)",
          border: "1px solid #ffff00",
          color: "#ffff99",
          borderRadius: "12px",
          padding: "0.6em 2em",
          fontSize: "1.1em",
          boxShadow: "0 0 12px #ffff00aa, 0 0 26px #ffff00aa",
          textShadow: "0 0 24px #fff, 0 0 0px #ffff00",
          marginBottom: "1rem",
        }}
      >
        🎬 Выбрать Конец
      </NeonButton>

      <NeonButton
        onClick={async () => {
          setIsZipSending(true);
          try {
            await sendFullZipToTelegram();
          } catch (err) {
            console.error("Ошибка при отправке ZIP:", err);
          } finally {
            setIsZipSending(false);
          }
        }}
        disabled={isZipSending}
        style={{
          color: "#e6e6fa",
          background: "linear-gradient(90deg, #ff00cc, #3333ff 90%)",
          border: "none",
          borderRadius: "12px",
          padding: "0.75em 2em",
          fontSize: "1.2em",
          boxShadow: "0 0 10px #ff00cc, 0 0 20px #3333ff, 0 0 40px #00fff7",
          transition: "box-shadow 0.2s, transform 0.2s",
          textShadow: "0 0 0px #fff, 0 0 8px #ff00cc",
          opacity: isZipSending ? 0.6 : 1,
          cursor: isZipSending ? "not-allowed" : "pointer",
        }}
      >
        {isZipSending ? "⏳ Отправка..." : "📤 ZIP ⮕ Telegram"}
      </NeonButton>

      {/* Вот сюда! */}
      {videoUrl && (
        <div style={{ margin: "24px 0", textAlign: "center" }}>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0ff",
              fontSize: 20,
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            ▶️ Смотреть готовое видео
          </a>
          <video
            controls
            style={{ width: "100%", maxWidth: 420, marginTop: 12 }}
          >
            <source src={videoUrl} type="video/mp4" />
            Видео недоступно для предпросмотра
          </video>
        </div>
      )}

      {/* Toast уведомления */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />
    </div>
  );
};

export default MediaGen;
