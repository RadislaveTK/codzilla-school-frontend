"use client";

import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверяем наличие window только внутри useEffect (на клиенте)
    const check = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= breakpoint);
      }
    };
    
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}