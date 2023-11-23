import React from "react";

export default function Loading() {
  return (
    <div className="m-auto flex h-full w-full items-center justify-center">
      <svg className="loading-svg" viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50" />
      </svg>
    </div>
  );
}
