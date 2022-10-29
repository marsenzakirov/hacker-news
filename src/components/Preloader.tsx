import React from "react";
export default function Preloader() {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <img src="/Spinner.svg" alt="spinner" />
    </div>
  );
}
