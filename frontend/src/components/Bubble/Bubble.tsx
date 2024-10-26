import React from "react";

interface BubbleProps {
  senderName: string;
  message: string;
}

export default function Bubble({ senderName, message }: BubbleProps) {
  return (
    <p>
      {senderName}: {message}
    </p>
  );
}
