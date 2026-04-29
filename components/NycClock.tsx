'use client';

import { useEffect, useState } from 'react';

export function NycClock() {
  const [time, setTime] = useState('—');

  useEffect(() => {
    const tick = () => {
      const nyc = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTime(nyc);
    };
    tick();
    const id = setInterval(tick, 30 * 1000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time}</span>;
}
