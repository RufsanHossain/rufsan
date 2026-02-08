"use client";

import { useState, useEffect } from "react";

export function useCounter(end: string | number, duration = 1800, trigger = false): number | string {
  const [val, setVal] = useState<number | string>(0);

  useEffect(() => {
    if (!trigger) return;

    const num = parseFloat(String(end));
    if (isNaN(num)) {
      setVal(end);
      return;
    }

    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setVal(num);
        clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, 16);

    return () => { clearInterval(timer); };
  }, [trigger, end, duration]);

  return typeof end === "string" && isNaN(parseFloat(end)) ? end : val;
}
