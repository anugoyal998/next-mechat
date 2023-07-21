"use client"
import React from "react";

const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

export default function useWindowSize() {
  // const isSSR = typeof window !== "undefined";
  const [windowSize, setWindowSize] = React.useState({
    width: isBrowser() ? window.innerWidth : 1200,
    height: isBrowser() ? window.innerHeight : 800,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  React.useEffect(() => {
    isBrowser() && window.addEventListener("resize", changeWindowSize);

    return () => {
      isBrowser() && window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}