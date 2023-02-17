import { useState } from "react";

import routes from "./routes";

function App() {
  const [activeJournal, setActiveJournal] = useState<number | null>(null);

  const renderJournal = () => {
    if (activeJournal !== null) {
      const Component = routes[activeJournal].component;
      return <Component />;
    }
    return null;
  };

  return (
    <>
      <main>
        <div>{renderJournal()}</div>
      </main>
      <footer>
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
