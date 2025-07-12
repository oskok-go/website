
import { useState } from "react";
import BIOS from "../components/BIOS";
import Landing from "../components/Landing";
import BatyaChat from "../components/BatyaChat";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [showChat, setShowChat] = useState(false);

  if (!booted) {
    return <BIOS onComplete={() => setBooted(true)} />;
  }

  return showChat ? (
    <BatyaChat onClose={() => setShowChat(false)} />
  ) : (
    <Landing onChatOpen={() => setShowChat(true)} />
  );
}
