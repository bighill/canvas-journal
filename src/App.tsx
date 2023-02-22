import { useEffect, useRef, useState } from "react";

import Canvas from "./component/Canvas";
import alphaCircle from "./journal/AlphaCircle/alphaCircle";
import bravoDots from "./journal/BravoDots/bravoDots";

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeJournal, setActiveJournal] = useState<string | null>(null);
  const [mainWidth, setMainWidth] = useState(0);
  const [mainHeight, setMainHeight] = useState(0);

  useEffect(() => {
    if (!mainRef.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      setMainWidth(mainRef.current ? mainRef.current?.clientWidth : 0);
      setMainHeight(mainRef.current ? mainRef.current?.clientHeight : 0);
    });
    resizeObserver.observe(mainRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <main ref={mainRef}>
        {activeJournal === "AlphaCircle" && (
          <Canvas draw={alphaCircle} width={mainWidth} height={mainHeight} />
        )}
        {activeJournal === "BravoDots" && (
          <Canvas draw={bravoDots} width={mainWidth} height={mainHeight} />
        )}
      </main>

      <footer>
        <span className="btn" onClick={() => setActiveJournal(null)}>
          Home
        </span>
        <span className="btn" onClick={() => setActiveJournal("AlphaCircle")}>
          AlphaCircle
        </span>
        <span className="btn" onClick={() => setActiveJournal("BravoDots")}>
          BravoDots
        </span>
      </footer>
    </>
  );
}

export default App;
