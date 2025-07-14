import { useEffect, useRef, useState } from "react";
import "./App.css";

type Event = {
  event: string;
  content: {
    type: string;
    invite: {
      id: string;
      step: string;
    };
  };
};

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [event, setEvent] = useState<Event[]>([]);
  const iframeSrc: string = "https://nuvidio.me/jgymnx";

  useEffect(() => {
    const handleMessage = (event: MessageEvent): void => {
      if (event.origin !== "http://localhost:5000") return;
      console.log("Evento recebido do iframe:", event.data);
      setEvent((prev) => [event.data, ...prev]);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <h1>Teste de iframe</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          onLoad={() => console.log("iframe carregado")}
          title="Projeto Iframe em localhost:5000"
          allow="camera; microphone; geolocation;"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-media-capture"
          style={{ width: "375px", height: "660px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            overflow: "auto",
            maxHeight: "660px",
          }}
        >
          <h2>Eventos recebidos:</h2>
          {event.map((e, i) => (
            <div
              key={i}
              style={{
                border: "1px solid white",
                paddingInline: "1rem",
                textAlign: "left",
              }}
            >
              <h3 style={{ color: "orange" }}>{e.event}</h3>
              <p>
                <strong>Tipo:</strong> {e.content.type}
              </p>
              <p>
                <strong>Invite id: </strong>
                {e.content.invite.id}
              </p>
              <p>
                <strong>Step:</strong> {e.content.invite.step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
