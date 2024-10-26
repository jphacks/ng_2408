import React from "react";
import { MessageInterface } from "@/types/interface";

export default function Bubble({ bubble }: { bubble: MessageInterface }) {
  return (
    <p>
      {bubble.senderName} @{bubble.addressHash}: {bubble.message}
    </p>
  );
}
