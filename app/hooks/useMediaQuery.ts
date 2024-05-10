"use client";

import { useEffect, useState } from "react";

export function useMediaQuery() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateIsDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };

    if (typeof window !== "undefined") {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
      window.addEventListener("resize", updateIsDesktop);

      return () => {
        window.removeEventListener("resize", updateIsDesktop);
      };
    }
  }, []);

  return isDesktop;
}
