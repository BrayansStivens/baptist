"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out",
        scrolled ? "backdrop-blur-md bg-background/70 shadow" : "bg-transparent"
      )}
      style={{
        backgroundColor: scrolled ? "var(--background)" : "transparent",
      }}
    >
      <div
        className={clsx(
          "max-w-7xl mx-auto px-6 py-6 transition-all duration-700 ease-in-out text-center"
        )}
      >
        <h1
          className={clsx(
            "transition-all duration-700 ease-in-out font-bold tracking-tight lowercase",
            scrolled ? "text-3xl" : "text-6xl"
          )}
        >
          <span className="text-[#b8e611]">b</span>
          <span className="text-white">a</span>
          <span className="text-[#b8e611]">p</span>
          <span className="text-white">t</span>
          <span className="relative inline-block z-10 text-white">
            <span
              className={clsx(
                "absolute z-0 rounded-full bg-white shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] pointer-events-none",
                scrolled ? "w-[0.4em] h-[0.4em]" : "w-[0.55em] h-[0.55em]"
              )}
              style={{
                top: scrolled ? "0.1em" : "0.15em",
                left: "50%",
                transform: "translateX(-43%)",
              }}
            />
            <span className="relative z-10">i</span>
          </span>
          <span className="text-white">s</span>
          <span className="text-white">t</span>
        </h1>
      </div>
    </nav>
  );
}