"use client";
import {useEffect} from "react";

/**
 * Progressive-enhancement scroll reveal.
 * Adds the hidden state only after hydration so content remains visible
 * when JavaScript is unavailable. Motion is disabled for reduced-motion users.
 */
export function ScrollReveal({selector = ".homeV2 > section:not(.hvHero)"}: {selector?: string}) {
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("hv-in");
            io.unobserve(entry.target);
          }
        }
      },
      {threshold: 0.12, rootMargin: "0px 0px -8% 0px"}
    );
    for (const section of sections) {
      section.classList.add("hv-reveal");
      io.observe(section);
    }
    return () => io.disconnect();
  }, [selector]);
  return null;
}
