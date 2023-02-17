import { createContext } from "react";

interface IJournalContext {
  width: number;
  height: number;
}

const def = { width: 0, height: 0 };

const JournalContext = createContext<IJournalContext>(def);

export default JournalContext;
