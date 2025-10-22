import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = { from: "user" | "bot"; text: string };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "안녕하세요. 무엇을 도와드릴까요?" }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text?.trim()) return;
    setMessages(prev => [...prev, { from: "user", text }]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text })
      });
      const data = await res.json();
      const reply = data?.reply ?? "죄송합니다. 응답을 받지 못했습니다.";
      setMessages(prev => [...prev, { from: "bot", text: String(reply) }]);
    } catch (e) {
      setMessages(prev => [...prev, { from: "bot", text: "서버 오류가 발생했습니다." }]);
      console.error(e);
    }
  }

  const quicks = [
    "제품을 반품하고 싶습니다",
    "구독을 해지하고 싶습니다",
    "배송 현황을 알고 싶습니다",
    "일반 정보를 알고 싶습니다"
  ];

  return (
    <div className="page-wrapper">
      <aside className="sidebar">
        <div className="title">빠른 메뉴</div>
        <div className="quick-buttons">
          {quicks.map((q) => (
            <button
              key={q}
              className="quick-btn"
              onClick={() => sendMessage(q)}
            >
              {q}
            </button>
          ))}
        </div>
        <p style={{marginTop:20, color:"var(--muted)"}}>
          팁: 빠른메뉴를 눌러 바로 질문을 보낼 수 있습니다.
        </p>
      </aside>

      <main className="main">
        <header className="header">
          <h1>AI 고객 서비스 챗봇</h1>
          <p>OpenAI ChatKit + Agent SDK로 구현된 실시간 상담 시스템</p>
        </header>

        <div className="status">정상 작동 중</div>

        <div className="chat-wrap">
          <section className="chat-panel">
            <div className="messages" id="messages">
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.from === "bot" ? "bot" : "user"}`}>
                  {m.from === "bot" ? (
                    // 봇 메시지는 Markdown으로 렌더링 (목록/볼드/줄바꿈 등 지원)
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.text ?? ""}
                    </ReactMarkdown>
                  ) : (
                    // 유저 메시지는 평문으로, 줄바꿈 보존
                    <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
                  )}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="input-area">
              <input
                type="text"
                placeholder="메시지를 입력하십시오..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(input);
                }}
              />
              <button className="send-btn" onClick={() => sendMessage(input)}>전송</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
