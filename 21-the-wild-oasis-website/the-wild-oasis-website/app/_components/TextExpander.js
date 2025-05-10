"use client";

import { useState } from "react";
// import Logo from "./Logo";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-primary-700 border-b pb-1 leading-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
      {/* <Logo /> */}
      {/* this <Logo /> instance will be a client component instance here even though it is a server component originally because it is now a child of a client component */}
    </span>
  );
}

export default TextExpander;
