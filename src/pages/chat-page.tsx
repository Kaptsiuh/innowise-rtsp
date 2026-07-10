import { useState, useRef, useEffect } from "react";
import { useWebSocket } from "@/features/chat/hooks/useWebSocket";
import { cn } from "@/shared/lib/utils";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from "@/shared/components";

const STATUS = {
  connected: { label: "Online", emoji: "\u{1F7E2}" },
  connecting: { label: "Connecting...", emoji: "\u{1F7E1}" },
  disconnected: { label: "Offline", emoji: "\u{1F534}" },
} as const;

export const ChatPage = () => {
  const [input, setInput] = useState("");
  const { messages, status, sendMessage } = useWebSocket("wss://ws.ifelse.io");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && status === "connected") {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="h-[70vh] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Chat</span>
            <span className="text-sm font-normal text-muted-foreground">
              {STATUS[status].emoji} {STATUS[status].label}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden min-h-0">
          <div
            ref={messagesEndRef}
            className="flex-1 overflow-y-auto pr-4 space-y-2 scrollbar-thumb-amber-50"
          >
            {messages.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-8">
                No messages yet. Start chatting!
              </p>
            )}
            {messages.map((msg, id) => {
              const isOwn = msg.startsWith("You: ");
              const displayText = isOwn ? msg.replace("You: ", "") : msg;
              return (
                <div
                  key={id}
                  className={cn(
                    "p-3 rounded-2xl max-w-[80%] break-words",
                    isOwn
                      ? "bg-primary text-primary-foreground ml-auto rounded-br-none"
                      : "bg-muted rounded-bl-none",
                  )}
                >
                  {displayText}
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={status !== "connected"}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || status !== "connected"}
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
