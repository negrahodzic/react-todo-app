import { useEffect, useState } from "react";
import styles from "./Message.module.css";

export function showMessage(message: string, type: MessageType, setMessage: Function, setMessageType: Function, setMessageKey: Function) {
  setMessage(message);
  setMessageType(type);
  setMessageKey(Date.now());
}

export type MessageType = "success" | "error" | "info";

type MessageProps = {
  message: string;
  type: MessageType;
};

function Message({ message, type }: MessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.messageContainer} ${styles[type]} ${
        isVisible ? styles.visible : ""
      }`}
    >
      {message}
    </div>
  );
}

export default Message;
