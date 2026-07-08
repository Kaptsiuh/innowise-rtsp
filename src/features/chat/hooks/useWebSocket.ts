import { useEffect, useRef, useState, useCallback } from "react";

type WebSocketStatus = "connecting" | "connected" | "disconnected";

export const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState<WebSocketStatus>("connecting");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
    };

    ws.onmessage = (event) => {
      const data = event.data;
      if (!data.startsWith("You: ")) {
        setMessages((prev) => [...prev, data]);
      }
    };

    ws.onclose = () => {
      setStatus("disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = useCallback((message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      setMessages((prev) => [...prev, `You: ${message}`]);
    } else {
      console.warn("WebSocket is not open");
    }
  }, []);

  return { messages, status, sendMessage };
};
