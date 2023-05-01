import { Progress } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

interface TimerProps {
  from: Timestamp;
  to: Timestamp;
  onDone: () => void;
}

export function Timer({ from, to, onDone }: TimerProps) {
  const [now, setNow] = useState(Timestamp.now());
  const [callOnEnd, setCallOnEnd] = useState(false);

  useEffect(() => {
    const inter = setInterval(() => {
      setNow(Timestamp.now());
    }, 1000);

    return () => {
      clearInterval(inter);
    };
  }, []);

  const currentTime = useMemo(() => {
    let time = to.seconds - now.seconds;
    if (time < 0) {
      time = 0;
      if (!callOnEnd) {
        onDone();
      }
      setCallOnEnd(true);
    }
    return `${Math.floor(time / 60)}phút:${time % 60}s`;
  }, [now, to]);

  return (
    <div className="flex flex-col items-center gap-3 my-[25px]">
      <div>{currentTime}</div>
      <div className="w-full">
        <Progress
          hasStripe
          min={from.seconds}
          max={to.seconds}
          value={now.seconds}
        />
      </div>
    </div>
  );
}
