import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}