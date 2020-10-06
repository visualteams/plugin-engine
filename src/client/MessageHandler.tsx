// @ts-ignore
import React, { useEffect } from "react";
import { CALLBACKS } from "../both/callMethod";

const MessageHandler: React.FC = (): null => {
  useEffect(() => {
    const handleEvent = (event: any) => {
      const { message, data } = event;

      const _message = message || data;

      if (CALLBACKS[_message.id]) {
        CALLBACKS[_message.id](_message.err, _message.res);
      }
    };

    window.addEventListener("message", handleEvent, false);
    return () => {
      window.removeEventListener("message", handleEvent);
    };
  });

  return null;
};

export default MessageHandler;
