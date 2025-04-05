import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from './pages/Home'
function App() {
  

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </HashRouter>

    </div>
  );
}

export default App