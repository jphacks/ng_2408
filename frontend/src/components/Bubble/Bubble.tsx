import React from "react";

interface BubbleProps {
  senderName: string;
  addressHash: string;
  message: string;
}

export default function Bubble({
  senderName,
  addressHash,
  message,
}: BubbleProps) {
  return (
    <p>
      {senderName} @{addressHash} : {message}
    </p>
  );
}
