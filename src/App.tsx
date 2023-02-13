import { BrowserRouter, Route, Routes } from "react-router-dom";

import J000_Circle from "./journal/J000_Circle";

function App() {
  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<J000_Circle />} />
          </Routes>
        </BrowserRouter>
      </main>
      <footer>
        <em>footer</em>
      </footer>
    </>
  );
}

export default App;
