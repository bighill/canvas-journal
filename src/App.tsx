import { useRef, useState } from "react";

import JournalContext from "./JournalContext";
import routes from "./routes";

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeJournal, setActiveJournal] = useState<number | null>(null);

  const renderJournal = () => {
    if (activeJournal !== null && mainRef.current !== null) {
      const Component = routes[activeJournal].component;
      const value = {
        width: mainRef.current.clientWidth,
        height: mainRef.current.clientHeight,
      };
      return (
        <JournalContext.Provider value={value}>
          <Component />
        </JournalContext.Provider>
      );
    }
    return null;
  };

  return (
    <>
      <main ref={mainRef}>{renderJournal()}</main>
      <footer>
        <span className="btn" onClick={() => setActiveJournal(null)}>
          Home
        </span>
        {routes.map((route, i) => (
          <span
            key={route.title}
            className="btn"
            onClick={() => setActiveJournal(i)}
          >
            {route.title}
          </span>
        ))}
      </footer>
    </>
  );
}

export default App;
